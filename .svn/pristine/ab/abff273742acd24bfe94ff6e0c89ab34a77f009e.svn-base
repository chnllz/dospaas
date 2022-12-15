<template>
  <div style="height: 100%">
    <a-tabs v-model="currentTab" :animated="false" class="tabs-flex" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <div class="page">
          <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false" :form="form">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="$refs['table' + parentItem.key][0].refresh(true)">
                  {{ $t('搜索') }}
                </a-button>
                <a-button @click="reset">
                  {{ $t('重置') }}
                </a-button>
              </a-space>
              <a-row class="form">
                <a-col :span="6">
                  <a-form-item :label="$t('评价时间')">
                    <a-range-picker
                      v-model="showObj['startTime' + parentItem.key]"
                      :allowClear="false"
                      :ranges="{
                        [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                        [$t('昨天')]: [
                          moment().startOf('day').subtract('day', 1),
                          moment().endOf('day').subtract('day', 1)
                        ],
                        [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                      }"
                      @change="getDate"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item :label="$t('部门')">
                    <data-picker
                      :ref="'treeDepartment' + parentItem.key"
                      :placeholder="$t('请选择部门')"
                      :value="showObj['department' + parentItem.key]"
                      :name="'department' + parentItem.key"
                      :multiple="true"
                      parentId="parentDepartmentId"
                      displayType="tree"
                      url="/admin/department/init"
                      searchUrl="/admin/search/departmentSearch"
                      :scope="scope"
                      :optionsConversion="
                        (list, displayType, searchType) => {
                          if (searchType) {
                            return list.map((item) => {
                              const obj = item
                              obj.key = item.departmentId
                              obj.label = item.fullDepartmentName
                              return obj
                            })
                          } else {
                            return list.map((item) => {
                              const obj = item
                              obj.key = item.departmentId
                              obj.label = item.departmentName
                              return obj
                            })
                          }
                        }
                      "
                      @select="selectDepartment"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item :label="$t('工号')">
                    <a-input v-model="showObj['agentNumber' + parentItem.key]" placeholder="" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-form>
          <a-space>
            <a-button v-show="false" @click="handleSelect">{{ $t('选择用户') }}</a-button>
            <a-button v-action:export icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
          </a-space>
          <s-table
            :ref="'table' + parentItem.key"
            :scroll="{ x: true, y: true }"
            class="table-fill"
            size="small"
            bordered
            :rowKey="
              (record, index) => {
                return index
              }
            "
            :columns="columns['columns' + parentItem.key]"
            :data="loadDataTable"
            :showPagination="false"
          ></s-table>
          <select-user-form :ref="'selectUserForm' + parentItem.key" @ok="getUser" />
          <general-export :ref="'generalExport' + parentItem.key" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    SelectUserForm: () => import('../admin/General/SelectUserForm'),
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      form: this.$form.createForm(this),
      scope: this,
      windowHeight: document.documentElement.clientHeight,
      currentTab: 'in',
      tabList: [{
        title: this.$t('呼入评价统计'),
        key: 'in'
      }, {
        title: this.$t('呼出评价统计'),
        key: 'out'
      }],
      // 搜索栏显示参数
      showObj: {
        startTimein: [this.moment().startOf('day'), this.moment().endOf('day')],
        startTimeout: [this.moment().startOf('day'), this.moment().endOf('day')],
        departmentin: undefined,
        departmentout: undefined,
        agentNumberin: undefined,
        agentNumberout: undefined,
        usernameListin: undefined
      },
      // 搜索参数
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        callType: 'in'
      },
      // 表头
      column: [{
        title: this.$t('部门'),
        dataIndex: 'department',
        align: 'center',
        width: 200
      }, {
        title: this.$t('姓名'),
        dataIndex: 'agentRealName',
        width: 200,
        align: 'center',
        sorter: false
      }, {
        title: this.$t('工号'),
        dataIndex: 'agentNumber',
        width: 200,
        align: 'center',
        sorter: false
      }, {
        title: this.$t('总接听数'),
        dataIndex: 'totalCall',
        align: 'center',
        width: 200
      }, {
        title: this.$t('未转满意度'),
        dataIndex: 'noTransferComment',
        width: 200,
        align: 'center',
        sorter: false
      }, {
        title: this.$t('满意率'),
        dataIndex: 'satisfactionRate',
        width: 200,
        align: 'center',
        sorter: false
      }],
      columns: {
        columnsin: [],
        columnsout: []
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'setting'])
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        this.windowHeight = window.fullHeight
      })()
    }
    this.columns['columnsin'] = this.column.slice()
    this.columns['columnsout'] = this.column.slice()
    const tab = ['in', 'out']
    tab.forEach(item => {
      const dictCategoryNumber = item === 'in' ? 'callcenter_comment_type' : 'callcenter_comment_out_type'
      this.axios({
        url: '/admin/dict/getChildren',
        data: {
          dictCategoryNumber: dictCategoryNumber
        }
      }).then(res => {
        const list = res.result
        list.forEach(childItem => {
          const data = [{
            title: this.$t('数量'),
            dataIndex: 'appraise' + childItem.number,
            align: 'center',
            width: 150
          }, {
            title: this.$t('占比'),
            dataIndex: 'appraise' + childItem.number + 'Rate',
            align: 'center',
            width: 150
          }]
          this.columns['columns' + item].push({
            title: childItem.name,
            children: data
          })
        })
      })
    })
  },
  methods: {
    loadDataTable (parameter) {
      this.queryParam = {
        startTime: this.showObj['startTime' + this.currentTab][0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.showObj['startTime' + this.currentTab][1].format('YYYY-MM-DD HH:mm:ss'),
        department: this.showObj['department' + this.currentTab] && this.showObj['department' + this.currentTab].map(item => item.value),
        callType: this.currentTab,
        agentNumber: this.showObj['agentNumber' + this.currentTab],
        usernameList: this.showObj['usernameList' + this.currentTab] || undefined
      }
      return this.axios({
        url: '/callcenter/comment/evaluate',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    selectDepartment (content, node) {
      this.showObj['department' + this.currentTab] = node.filter(item => content.includes(item.value))
      this.queryParam.department = content
    },
    reset () {
      this.queryParam = {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        department: undefined,
        callType: 'in'
      }
      this.showObj['startTime' + this.currentTab] = [this.moment().startOf('day'), this.moment().endOf('day')]
      this.showObj['department' + this.currentTab] = undefined
      this.showObj['agentNumber' + this.currentTab] = undefined
      this.showObj['usernameList' + this.currentTab] = undefined
      this.form.resetFields()
      this.$refs['treeDepartment' + this.currentTab][0].reset()
      this.$refs['table' + this.currentTab][0].refresh(true)
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
      this.queryParam.callType = activeKey
      this.advanced = false
      this.$nextTick(() => {
        this.$refs['table' + this.currentTab][0].refresh(true)
      })
    },
    handleExport () {
      this.queryParam = {
        startTime: this.showObj['startTime' + this.currentTab][0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.showObj['startTime' + this.currentTab][1].format('YYYY-MM-DD HH:mm:ss'),
        department: this.showObj['department' + this.currentTab] && this.showObj['department' + this.currentTab].map(item => item.value),
        callType: this.currentTab,
        agentNumber: this.showObj['agentNumber' + this.currentTab]
      }
      this.$refs['generalExport' + this.currentTab][0].show({
        title: this.$t('导出'),
        className: 'ExportEvaluateStatementTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'satisfactionStatement'
          }
        }
      })
    },
    getDate (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    // 打开选择用户
    handleSelect () {
      this.$refs['selectUserForm' + this.currentTab][0].show({
        page: 'statistic',
        mode: 'multiple',
        selectValue: this.showObj['usernameList' + this.currentTab]
      })
    },
    // 获取用户
    getUser (val) {
      this.showObj['usernameList' + this.currentTab] = val
      this.queryParam.usernameList = this.username
    }
  }
}
</script>
