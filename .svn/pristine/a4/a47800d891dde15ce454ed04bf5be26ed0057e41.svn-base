<template>
  <a-drawer
    :destroyOnClose="true"
    :title="
      (config.optionType === 'department' ? $t('部门') : $t('角色')) +
      (optionMode === 'default' ? $t('-单选') : $t('-多选'))
    "
    :width="500"
    :visible="visible"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-card
          v-if="selectList.length > 0"
          size="small"
          style="border: 1px dashed #e8e8e8"
          @mouseenter="delShow = true"
          @mouseleave="delShow = false"
        >
          <a-tooltip :title="$t('清空')">
            <a-icon
              v-if="delShow"
              type="delete"
              style="position: absolute; top: 0px; right: 0px; color: #f5222d"
              @click="selectList = []"
            />
          </a-tooltip>
          <a-row :gutter="[0, 5]" type="flex">
            <a-col v-for="tag in selectList" :key="tag.name">
              <a-tag closable @close="deleteTag(tag)">{{ tag.name }}</a-tag>
            </a-col>
          </a-row>
        </a-card>
        <a-card v-else size="small" style="text-align: center; border: 1px dashed #e8e8e8; color: #7f7f7f">
          {{ $t('暂无数据') }}
        </a-card>
        <div v-if="config.optionType === 'department'">
          <a-form-item style="margin: 10px 0 0 0">
            <a-select
              showSearch
              :value="undefined"
              :placeholder="$t('请输入部门关键字进行搜索')"
              allowClear
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
              @search="getDepartment"
              @popupScroll="popupScroll"
              @change="
                (e) => {
                  if (!e) {
                    department = []
                  }
                }
              "
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option
                v-for="dep in departmentData"
                :key="dep.departmentId"
                :value="dep.departmentId"
                @click="dataSelect('', '', dep)"
              >
                {{ dep.fullDepartmentName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <div>
            <a-tree
              :tree-data="dataList"
              :load-data="onLoadData"
              :replace-fields="{
                key: 'value',
                title: 'label'
              }"
              @select="dataSelect"
            />
          </div>
        </div>
        <a-card v-else size="small" style="margin: 10px 0 0 0">
          <a-input-search
            style="margin-bottom: 8px"
            :placeholder="config.optionType === 'department' ? $t('请输入部门名称搜索') : $t('请输入角色名称搜索')"
            @search="onChange"
          />
          <s-table
            ref="table"
            size="small"
            rowKey="id"
            :columns="columnsRole"
            :data="loadDataTable"
            :sorter="{ field: 'listOrder', order: 'ascend' }"
          >
            <span slot="action" slot-scope="index, record">
              <a
                href="javascript:;"
                :disabled="
                  config.dataType === 'optionCustom'
                    ? false
                    : config.optionCustom &&
                      config.optionCustom.length &&
                      config.optionCustom.every((opItem) => opItem.roleId !== record.roleId)
                    ? true
                    : false
                "
                @click="dataSelect('', '', record, 'role')"
              >
                {{ $t('选择') }}
              </a>
            </span>
          </s-table>
        </a-card>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('确定') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  i18n: window.lang('admin'),
  data () {
    this.getDepartment = debounce(this.getDepartment, 800)
    return {
      optionMode: '',
      config: {},
      checkedNodes: [],
      replaceFields: {
        children: 'children',
        title: 'name'
      },
      lastFetchId: 0,
      queryParam: {},
      dataList: [],
      expandedKeys: [],
      rowKeyList: [],
      selectValue: [], // 初始值和右边显示值
      selectList: [], // 选中值
      visible: false,
      loading: false,
      delShow: false,
      fetching: false,
      scrollStats: true,
      autoExpandParent: false,
      form: this.$form.createForm(this),
      data: {},
      page: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      searchData: '',
      departmentData: [],
      columnsDepartment: [{
        title: this.$t('部门'),
        dataIndex: 'name',
        width: 450,
        scopedSlots: { customRender: 'name' }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        scopedSlots: { customRender: 'action' }
      }],
      columnsRole: [{
        title: this.$t('角色'),
        dataIndex: 'roleName'
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 60,
        scopedSlots: { customRender: 'action' }
      }],
      searchValue: ''
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.optionMode = this.config.mode
      this.dataList = []
      this.selectList = []
      if (config.dataType === 'optionCustom') {
        this.selectList = config.optionCustom || []
      } else {
        const id = config.optionType === 'department' ? 'departmentId' : 'roleId'
        if (config.optionCustom.length !== 0 && config.defaultValue && config.defaultValue.length > 0) {
          this.selectList = config.defaultValue.filter(item => config.optionCustom.some(opItem => opItem[id] === item[id]))
        } else {
          this.selectList = config.defaultValue || []
        }
      }
      this.axios({
        url: config.url,
        data: {
          parentDepartmentId: config.optionType === 'department' ? null : undefined
        }
      }).then((res) => {
        this.loading = false
        if (config.optionType === 'department') {
          res.result.forEach(item => {
            if (item.childCount && item.childCount !== 0) {
              item.children = [{}]
            } else {
              item.isLeaf = true
            }
            if (config.dataType !== 'optionCustom' && config.optionCustom.length !== 0) {
              item.disabled = config.optionCustom.every(opItem => opItem.departmentId !== item.value)
            }
          })
        }
        this.dataList = res.result
      })
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/role/list',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    getDepartment (e) {
      this.searchData = e
      this.page.pageNo = 1
      this.scrollStats = true
      if (e) {
        this.lastFetchId += 1
        const fetchId = this.lastFetchId
        this.fetching = true
        this.axios({
          url: '/admin/search/departmentSearch',
          data: Object.assign(this.page, { searchName: e })
        }).then(res => {
          if (fetchId !== this.lastFetchId) {
            return
          }
          this.departmentData = res.result.data
          this.fetching = false
        })
      } else {
        this.departmentData = []
      }
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onLoadData (treeNode) {
      const { value } = treeNode.dataRef
      return new Promise((resolve) => {
        this.axios({
          url: '/admin/department/getChildren',
          data: { parentDepartmentId: value }
        }).then(res => {
          res.result.forEach(item => {
            if (item.childCount && item.childCount !== 0) {
              item.children = []
              if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
                item.disabled = this.config.optionCustom.every(opItem => opItem.departmentId !== item.value)
              }
            } else {
              if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
                item.disabled = this.config.optionCustom.every(opItem => opItem.departmentId !== item.value)
              }
              item.isLeaf = true
            }
          })
          treeNode.dataRef.children = res.result
        })
        resolve()
      })
    },
    dataSelect (selectedKeys, e, dep, type) {
      let obj = {}
      if (dep) {
        if (type) {
          obj = {
            name: dep.roleName,
            roleId: dep.roleId
          }
        } else {
          obj = {
            name: dep.name,
            departmentId: dep.departmentId
          }
        }
      } else {
        obj = {
          name: e.node.dataRef.label,
          departmentId: e.node.dataRef.value
        }
      }
      if (this.optionMode === 'default' && this.selectList.length === 0) {
        if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
          if (this.config.optionCustom.some(item => obj.departmentId ? item.departmentId === obj.departmentId : item.roleId === obj.roleId)) {
            this.selectList.splice(0, 0, obj)
          } else {
            this.$message.error(this.$t('不在可选范围内'))
          }
        } else {
          this.selectList.splice(0, 0, obj)
        }
      } else if (this.optionMode === 'default') {
        if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
          if (this.config.optionCustom.some(item => obj.departmentId ? item.departmentId === obj.departmentId : item.roleId === obj.roleId)) {
            this.selectList.splice(0, 1, obj)
          } else {
            this.$message.error(this.$t('不在可选范围内'))
          }
        } else {
          this.selectList.splice(0, 1, obj)
        }
      } else {
        if (this.selectList.every(item => item.departmentId !== obj.departmentId) && !type) {
          if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
            if (this.config.optionCustom.some(item => item.departmentId === obj.departmentId)) {
              this.selectList.splice(this.selectList.length, 0, obj)
            } else {
              this.$message.error(this.$t('不在可选范围内'))
            }
          } else {
            this.selectList.splice(this.selectList.length, 0, obj)
          }
        } else if (this.selectList.every(item => item.roleId !== obj.roleId) && type) {
          if (this.config.dataType !== 'optionCustom' && this.config.optionCustom.length !== 0) {
            if (this.config.optionCustom.some(item => item.roleId === obj.roleId)) {
              this.selectList.splice(this.selectList.length, 0, obj)
            } else {
              this.$message.error(this.$t('不在可选范围内'))
            }
          } else {
            this.selectList.splice(this.selectList.length, 0, obj)
          }
        }
      }
    },
    deleteTag (record) {
      if (this.config.mode === 'default') {
        this.selectList = []
      } else if (this.config.mode === 'multiple') {
        this.selectList = this.config.optionType === 'role' ? this.selectList.filter(item => item.roleId !== record.roleId) : this.selectList.filter(item => item.departmentId !== record.departmentId)
      }
    },
    onChange (e) {
      this.queryParam.roleName = e
      this.$refs.table.refresh(true)
    },
    getDepartmentScroll () {
      this.axios({
        url: '/admin/search/departmentSearch',
        data: Object.assign(this.page, { searchName: this.searchData })
      }).then(res => {
        if (!res.result.data.length) {
          this.scrollStats = false
        }
        this.departmentData = [...this.departmentData, ...res.result.data]
      })
    },
    popupScroll (e) {
      const scrollTop = e.target.scrollTop
      const scrollHeight = e.target.scrollHeight
      const clientHeight = e.target.clientHeight
      const scrollBottom = scrollHeight - clientHeight - scrollTop
      if (scrollBottom < 1 && this.scrollStats && this.searchData) {
        this.page.pageNo++
        this.getDepartmentScroll()
      }
    },
    handleSubmit () {
      // 只保存id
      const initMode = this.config.optionType + '_' + this.config.mode
      this.$emit('ok', this.selectList, this.config.dataType, initMode, this.config.mode)
      this.$message.success(this.$t('操作成功'))
      this.visible = false
    }
  }
}
</script>
