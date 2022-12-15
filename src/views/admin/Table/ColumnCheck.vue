<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="600" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <div>
        <a-form class="normal">
          <a-row :gutter="5">
            <a-col :span="6">
              <a-form-item>
                <a-select
                  v-model="queryParam.group"
                  :allowClear="true"
                  :placeholder="$t('请选择分类')"
                  @change="groupChange"
                >
                  <a-select-option v-for="value in fieldCategory" :key="value.value" :value="value.value">
                    {{ value.display }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="18">
              <a-form-item>
                <a-input
                  v-model="queryParam.name"
                  :placeholder="$t('请输入字段名称或系统名搜索')"
                  @change="nameSearch"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-table
          ref="table"
          size="small"
          rowKey="value"
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :rowSelection="rowSelection"
        >
          <div slot="idSort" slot-scope="text, record, index">{{ index + 1 }}</div>
          <div slot="formType" slot-scope="text">
            <span v-if="text === 'text'">{{ $t('单行文本') }}</span>
            <span v-else-if="text === 'combobox'">{{ $t('下拉框') }}</span>
            <span v-else-if="text === 'associated'">{{ $t('关联数据') }}</span>
            <span v-else-if="text === 'datetime'">{{ $t('日期时间') }}</span>
            <span v-else-if="text === 'textarea'">{{ $t('多行文本') }}</span>
            <span v-else-if="text === 'radio'">{{ $t('单选框') }}</span>
            <span v-else-if="text === 'checkbox'">{{ $t('复选框') }}</span>
            <span v-else-if="text === 'editor'">{{ $t('编辑器') }}</span>
            <span v-else-if="text === 'image'">{{ $t('图片') }}</span>
            <span v-else-if="text === 'file'">{{ $t('附件') }}</span>
            <span v-else-if="text === 'cascader'">{{ $t('级联选择') }}</span>
            <span v-else-if="text === 'switch'">{{ $t('开关') }}</span>
            <span v-else-if="text === 'score'">{{ $t('评分') }}</span>
            <span v-else-if="text === 'serialnumber'">{{ $t('流水号') }}</span>
            <span v-else-if="text === 'organization'">{{ $t('组织结构') }}</span>
            <span v-else-if="text === 'web_sub_data_window'">{{ $t('子表') }}</span>
            <span v-else-if="text === 'autocomplete'">{{ $t('自动完成') }}</span>
            <span v-else-if="text === 'number'">{{ $t('数字') }}</span>
            <span v-else-if="text === 'address'">{{ $t('地址') }}</span>
            <span v-else-if="text === 'treeselect'">{{ $t('树选择') }}</span>
            <span v-else-if="text === 'tag'">{{ $t('标签') }}</span>
            <span v-else-if="text === 'location'">{{ $t('地图选点') }}</span>
            <span v-else>--</span>
          </div>
        </a-table>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    draggable: () => import('vuedraggable')
  },
  props: {
    dataList: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    fieldCategory: {
      type: Array,
      default () {
        return []
      },
      required: false
    }
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      queryParam: {},
      data: [],
      group: [],
      alldata: [],
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: {
        selectedRowKeys: this.selectedRowKeys || [],
        onChange: this.onChange
      },
      showData: [],
      columns: [{
        title: '#',
        width: 40,
        align: 'center',
        dataIndex: 'idSort',
        scopedSlots: { customRender: 'idSort' }
      }, {
        title: this.$t('字段名称'),
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length
      }, {
        title: this.$t('UI组件'),
        dataIndex: 'formType',
        scopedSlots: { customRender: 'formType' },
        sorter: (a, b) => a.formType.length - b.formType.length,
        width: 80
      }, {
        title: this.$t('分类名称'),
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
        customRender: (text) => {
          return text || '--'
        },
        width: 120
      }]
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      config.data.forEach(item => {
        if (item && !item.value) {
          item.value = item.alias
        }
      })
      this.alldata = JSON.parse(JSON.stringify(config.data))
      this.data = JSON.parse(JSON.stringify(config.data))
      this.queryParam = {}
      this.selectedRowKeys = []
      this.selectedRows = []
      this.showData = this.dataList
      this.showData.forEach((item, index) => {
        item.index = index + 1
      })
      if (config.action === 'edit') {
        this.selectedRows = this.showData.filter(item => item.display !== 'd')
        this.selectedRowKeys = this.selectedRows.map(item => item.value || item.alias)
        this.rowSelection = {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onChange,
          getCheckboxProps: record => {
            return {
              props: {
                defaultChecked: this.selectedRowKeys.includes(record.value || record.alias)
              }
            }
          }
        }
      }
    },
    nameSearch () {
      if (!this.queryParam.name) {
        this.data = this.alldata
      } else {
        this.data = this.alldata.filter(item => item.name.includes(this.queryParam.name))
      }
    },
    groupChange (e) {
      if (!e) {
        this.data = this.alldata
      } else if (e === '未分组') {
        this.data = this.alldata.filter(item => !item.category)
      } else {
        this.data = this.alldata.filter(item => item.category === e)
      }
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = Array.from(new Set(selectedRowKeys))
      this.rowSelection = {
        selectedRowKeys: Array.from(new Set(selectedRowKeys)),
        onChange: this.onChange
      }
      this.selectedRows = selectedRows
      this.selectedRows.forEach(item => {
        this.showData.forEach(items => {
          if (items.value === (item.value || item.alias)) {
            item.index = items.index
          }
        })
      })
      this.selectedRows.forEach(item => {
        if (!item.index) {
          item.index = selectedRows.length
        }
      })
    },
    handleSubmit () {
      this.visible = false
      const data = []
      this.selectedRowKeys.forEach(item => {
        if (this.alldata.filter(allItem => (allItem.value || allItem.alias) === item)[0]) {
          data.push(this.alldata.filter(allItem => (allItem.value || allItem.alias) === item)[0])
        }
      })
      data.forEach(item => { item.display = item.display === 'd' ? 'v' : item.display })
      this.$emit('ok', data)
    }
  }
}
</script>
