<template>
  <a-drawer
    :width="900"
    :visible="visible"
    :title="config.title"
    :destroyOnClose="true"
    :afterVisibleChange="afterVisibleChange"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <div>
        <a-alert
          :message="$t('目前仅限于一个栅格放置一个组件的批量配置，复杂栅格配置需谨慎修改')"
          style="margin-bottom: 8px"
        />
        <a-row type="flex">
          <a-col flex="420px">
            <a-table
              ref="table"
              size="small"
              rowKey="value"
              :columns="columns"
              :dataSource="data"
              :pagination="false"
              :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onChange }"
              :sorter="{ field: 'id', order: 'descend' }"
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
                <span v-else-if="text === 'divider'">{{ $t('分割线') }}</span>
                <span v-else>--</span>
              </div>
            </a-table>
          </a-col>
          <a-col flex="8px"></a-col>
          <a-col flex="420px">
            <a-card size="small" :title="$t('配置信息')">
              <div style="margin-bottom: 10px">
                <a @click="refresh">{{ $t('按排序值刷新') }}</a>
              </div>
              <a-row :gutter="8" style="margin-bottom: 8px">
                <a-col :span="2"></a-col>
                <a-col :span="5">{{ $t('排序值') }}</a-col>
                <a-col :span="10">{{ $t('名称') }}</a-col>
                <a-col :span="4">{{ $t('栅格宽度') }}</a-col>
              </a-row>
              <draggable
                v-model="checkedList"
                animation="200"
                handle=".handle"
                @start="drag = true"
                @end="drag = false"
              >
                <a-row
                  v-for="(element, key) in checkedList"
                  :key="element.id"
                  class="list-item"
                  :gutter="8"
                  style="margin-bottom: 5px"
                >
                  <a-col :span="2" class="handle">
                    <a-icon type="drag" />
                  </a-col>
                  <a-col :span="5">
                    <a-input size="small" :value="(key + 1) * 10" @blur="changesort($event, key)" />
                  </a-col>
                  <a-col :span="10" class="text">
                    <a-tooltip
                      placement="topLeft"
                      :title="element.list.map((item) => item.name || item.label || item.dividerText).toString()"
                    >
                      <span>
                        {{ element.list.map((item) => item.name || item.label || item.dividerText).toString() }}
                      </span>
                    </a-tooltip>
                  </a-col>
                  <a-col :span="4">
                    <a-input-number v-model="element.span" :min="1" :max="24" size="small" />
                  </a-col>
                </a-row>
              </draggable>
            </a-card>
          </a-col>
        </a-row>
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
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      checkedList: [],
      data: [],
      selectedRowKeys: [],
      columns: [{
        title: '#',
        width: 40,
        align: 'center',
        dataIndex: 'idSort',
        scopedSlots: { customRender: 'idSort' }
      }, {
        title: this.$t('字段名称'),
        dataIndex: 'name'
      }, {
        title: this.$t('UI组件'),
        dataIndex: 'formType',
        scopedSlots: { customRender: 'formType' },
        width: 80
      }, {
        title: this.$t('分组'),
        dataIndex: 'category',
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
      this.loading = true
      this.selectedRowKeys = []
      this.data = []
      this.checkedList = []
      this.config = config
    },
    getList () {
      this.checkedList = JSON.parse(JSON.stringify(this.config.checkedList)).filter(item => item.list.length > 0)
      this.data = JSON.parse(JSON.stringify(this.config.nowArray))
      const getTemplate = (array) => {
        array.forEach((temItem, index) => {
          if (temItem.columns) {
            getTemplate(temItem.columns)
          } else if (temItem.trs) {
            getTemplate(temItem.trs)
          } else if (temItem.tds) {
            getTemplate(temItem.tds)
          } else if (temItem.list) {
            getTemplate(temItem.list)
          } else {
            if (temItem.dividerText) {
              temItem.name = temItem.dividerText
              temItem.formType = 'divider'
            }
            if (temItem.value) {
              this.data.splice(0, 0, temItem)
            }
            this.selectedRowKeys.push(temItem.value)
          }
        })
      }
      getTemplate(this.checkedList)
      this.loading = false
      this.getSortId()
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      const checkKey = []
      const getTemplate = (array, alias) => {
        array.forEach((temItem, index) => {
          if (temItem.columns) {
            getTemplate(temItem.columns)
          } else if (temItem.trs) {
            getTemplate(temItem.trs)
          } else if (temItem.tds) {
            getTemplate(temItem.tds)
          } else if (temItem.list) {
            getTemplate(temItem.list)
          } else {
            checkKey.push(temItem.value)
          }
        })
      }
      getTemplate(this.checkedList)
      const getArrDifference = (arr1, arr2) => {
        return arr1.concat(arr2).filter((v, i, arr) => {
          return arr.indexOf(v) === arr.lastIndexOf(v)
        })
      }
      const notKey = getArrDifference(this.selectedRowKeys, checkKey)
      notKey.forEach((notItem, notIndex) => {
        if (this.selectedRowKeys.some(item => item === notItem)) {
          const obj = {
            sortId: (this.checkedList.length + 1) * 10,
            list: [],
            span: 6
          }
          const data = this.data.find(dataItem => dataItem.value === notItem)
          if (data) {
            data.key = data.formType + '_' + new Date().valueOf() + notIndex
            obj.list.push(data)
            this.checkedList.push(obj)
          }
        } else if (checkKey.some(item => item === notItem)) {
          this.checkedList = this.checkedList.filter(checkItem => { return checkItem.list.every(item => item.value !== notItem) })
        }
      })
    },
    // 改变排序值
    changesort (e, key) {
      this.checkedList[key].sortId = Number(e.target.value)
    },
    afterVisibleChange (e) {
      if (e) this.getList()
    },
    // 比较大小
    compare (key) {
      return function (a, b) {
        var value1 = a[key]
        var value2 = b[key]
        return value1 - value2
      }
    },
    // 刷新
    refresh () {
      // 排序方法
      this.checkedList = this.checkedList.sort(this.compare('sortId'))
      this.getSortId()
    },
    getSortId () {
      for (let i = 0; i < this.checkedList.length; i++) {
        this.checkedList[i]['sortId'] = (i + 1) * 10
      }
    },
    handleSubmit () {
      this.loading = true
      this.checkedList.forEach(item => {
        item.sortId = undefined
      })
      this.$emit('ok', this.checkedList)
      this.visible = false
      this.$message.success(this.$t('操作成功'))
    }
  }
}
</script>
