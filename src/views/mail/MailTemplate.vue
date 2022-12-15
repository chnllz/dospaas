<template>
  <a-modal
    :destroyOnClose="true"
    :title="$t('邮件模板')"
    :width="1200"
    :visible="visible"
    :maskClosable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :closable="!buttonLoading"
    :bodyStyle="{
      padding: '12px'
    }"
    @cancel="visible = !visible"
  >
    <template slot="footer">
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </template>
    <a-spin :spinning="loading">
      <div class="page">
        <a-form :form="form" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
          <a-card size="small" :title="$t('搜索')" class="search">
            <a-space slot="extra" style="margin-left: 8px">
              <a-button
                htmlType="submit"
                type="primary"
                @click="
                  initDataForm.language = undefined
                  $refs.table.refresh(true)
                "
                @keydown.enter="
                  initDataForm.language = undefined
                  $refs.table.refresh(true)
                "
              >
                {{ $t('搜索') }}
              </a-button>
              <a-button
                @click="
                  () => {
                    queryParam.orderStatus = initDataForm.orderStatus
                    queryParam.language = initDataForm.language
                    queryParam.name = ''
                    queryParam.businessScene = []
                    $refs.table.refresh(true)
                  }
                "
              >
                {{ $t('重置') }}
              </a-button>
            </a-space>
            <a-row :gutter="16" class="form" :class="advanced ? 'advanced' : 'normal'">
              <a-col v-if="advanced" span="24">
                <div class="divider"></div>
              </a-col>
              <a-col v-bind="colLayout">
                <a-form-item :label="$t('适用订单状态')">
                  <a-select v-model="queryParam.orderStatus" mode="multiple" style="width: 100%" allowClear>
                    <a-select-option v-for="value in orderStatusList" :key="value.dictDataNumber">
                      {{ value.dictDataName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout">
                <a-form-item :label="$t('模板名称')">
                  <a-input v-model="queryParam.name" />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout">
                <a-form-item :label="$t('业务场景')">
                  <a-tree-select
                    v-model="queryParam.businessScene"
                    :multiple="true"
                    allowClear
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    treeNodeFilterProp="title"
                    showSearch
                    :replaceFields="{
                      value: 'dictDataNumber',
                      title: 'dictDataName'
                    }"
                    style="width: 100%"
                    :tree-data="treeData"
                  />
                </a-form-item>
              </a-col>
              <a-col v-bind="colLayout">
                <a-form-item :label="$t('语言')">
                  <a-select v-model="queryParam.language" allowClear>
                    <a-select-option v-for="item in languageData" :key="item.dictDataNumber">
                      {{ item.dictDataName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
        <s-table
          v-if="tableShow"
          ref="table"
          bordered
          :customRow="customRow"
          :columns="columns"
          :data="loadDataTable"
          rowKey="id"
          size="small"
          :sorter="{ field: 'id', order: 'descend' }"
          :scroll="{ y: 400 }"
        >
          <div slot="title" style="font-weight: bold">{{ $t('可用模板') }}</div>
          <div slot="action" slot-scope="text, record">
            <a @click="selectTemplate(record)">{{ $t('选择') }}</a>
          </div>
        </s-table>
      </div>
    </a-spin>
  </a-modal>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      buttonLoading: false,
      form: this.$form.createForm(this),
      config: {},
      eventData: [],
      treeData: [],
      orderStatusList: [],
      languageData: [],
      loading: false,
      queryParam: {},
      colLayout: {},
      advanced: '',
      templateData: [],
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('模板ID'),
        dataIndex: 'mbid',
        align: 'center',
        width: 200
      }, {
        title: this.$t('模板名称'),
        dataIndex: 'mbmc',
        align: 'center',
        width: 250
      }, {
        title: this.$t('邮件模板标题'),
        dataIndex: 'yjbtmb',
        align: 'center',
        width: 250
      }, {
        title: this.$t('业务场景'),
        dataIndex: 'ywcj',
        align: 'center'
      }, {
        title: this.$t('适用订单状态'),
        dataIndex: 'syddzt',
        align: 'center'
      }, {
        title: this.$t('使用次数'),
        dataIndex: 'sycs',
        align: 'center'
      }],
      initDataForm: {
        orderStatus: '',
        language: ''
      },
      tableShow: false
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.tableShow = false
      this.$nextTick(() => {
        this.initDataForm.language = config.formData.language === '默认' ? undefined : config.formData.language || undefined
        this.queryParam = {
          language: config.formData.language === '默认' ? undefined : config.formData.language || undefined,
          orderStatus: undefined
        }
        this.buttonLoading = false
        if (!this.treeData.length) {
          this.getInitTree('ywcj', 'treeData')
        }
        if (this.config.formData.orderStatus) {
          this.queryParam.orderStatus = this.config.formData.orderStatus || ''
        }
        if (!this.languageData.length) {
          this.getInitTree('language', 'languageData')
        }
        if (!this.orderStatusList.length) {
          this.getInitOrderStatus().then(() => {
            this.tableShow = true // 显示表格
          })
        } else {
          this.tableShow = true // 显示表格
        }
      })
    },
    getInitOrderStatus () {
      return new Promise((resolve, reject) => {
        this.axios({
          url: '/admin/dict/initData',
          data: {
            pageNo: 1,
            pageSize: 999,
            dictCategoryNumber: 'ddzt',
            sortField: 'listOrder',
            sortOrder: 'ascend'
          }
        }).then(res => {
          this.orderStatusList = res.result
          if (this.config.formData.orderStatus) {
            const str = this.config.formData.orderStatus
            let orderStatus = ''
            // 订单状态值 判断是否是中文格式
            if (/^[\u4e00-\u9fa5]+$/i.test(str)) {
              const statusObj = this.orderStatusList.find(item => item.name === this.config.formData.orderStatus)
              orderStatus = statusObj ? statusObj.number : undefined
            } else {
              orderStatus = this.config.formData.orderStatus
            }
            this.queryParam.orderStatus = orderStatus
            this.initDataForm.orderStatus = orderStatus
          }
          resolve(res)
        })
      })
    },
    getInitTree (key, arr) {
      this.axios({
        url: '/admin/dict/initData',
        data: {
          pageNo: 1,
          pageSize: 999,
          dictCategoryNumber: key,
          sortField: 'listOrder',
          sortOrder: 'ascend'
        }
      }).then(res => {
        this[arr] = res.result
        this[arr].forEach(item => {
          item.disabled = undefined
          if (item.children && item.children.length) {
            item.selectable = false
            item.children.forEach(childItem => {
              childItem.disabled = undefined
              if (childItem.children && childItem.children.length) {
                childItem.children.forEach(keyItem => { keyItem.disabled = undefined })
                childItem.selectable = false
              }
            })
          }
        })
      })
    },
    selectTemplate (record) {
      // 刷新使用次数
      this.axios({
        url: `/mail/template/updateUseTemplate/${record.id}`
      })
      // 判断是否需要调用接口解析模板
      if (this.config.formData.isOnlyMail || !this.config.formData.ddh) {
        // 无需解析模板变量内容
        const data = {
          yjnrmb: record.yjnrmb || '',
          // yjbtmb: record.yjbtmb || ''
          yjbtmb: this.config.formData.action === 'reply' ? (this.config.formData.data.title || '') : record.yjbtmb
        }
        this.$emit('ok', data)
        this.visible = !this.visible
      } else {
        // 调用接口 解析模板变量内容
        this.preview(record)
      }
    },
    preview (record) {
      this.loading = true
      this.axios({
        url: '/mail/data/previewTemplate',
        data: {
          // orderNo对应的 值来源             ||创建工单并发送邮件
          orderNo: this.config.formData.ddh || this.config.formData.formData.ddh,
          templateId: record.mbid,
          templateContent: record.yjnrmb,
          templateTitle: record.yjbtmb
        }
      }).then(res => {
        if (res) {
          this.loading = false
        }
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          const data = {
            yjnrmb: res.result.content || '',
            // yjbtmb: res.result.title || ''
            yjbtmb: this.config.formData.action === 'reply' ? (this.config.formData.data.title || '') : (res.result.title || '')
          }
          this.$emit('ok', data)
          this.visible = !this.visible
        }
      })
    },
    loadDataTable (parameter) {
      const status = this.queryParam.orderStatus
      return this.axios({
        url: '/crm/assist/mailTemplateOption',
        data: Object.assign(parameter, this.queryParam, {
          orderStatus: typeof status === 'string' ? [status] : status || undefined,
          templateType: '邮件模板',
          status: '启用'
        })
      }).then(res => {
        if (res.code) {
          this.$message.error(res.message)
          return
        }
        return res.result
      })
    },
    // 表格行 触发
    customRow (record, index) {
      return {
        on: {
          click: (event) => {
            event.currentTarget.parentNode.querySelectorAll('tr').forEach(item => {
              item.classList.remove('selected')
            })
            event.currentTarget.classList.add('selected')
          }
        }
      }
    },
    changeAdvanced (tag) {
      if (tag) {
        this.advanced = !this.advanced
      }
      if (this.advanced) {
        this.colLayout = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 }
      } else {
        this.colLayout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }
      }
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        // 绑定订单号跟添加备注 调用不同接口
        if (!errors) {
          this.buttonLoading = true
          const url = `${this.config.url}`
          const obj = {
            url: url
          }
          Object.assign(obj, {
            data: {
              orderNo: values.orderId,
              remark: values.remark,
              sid: this.$store.getters.userInfo.sid,
              id: this.config.record.id,
              updateFieldName: 'order_id',
              tableName: this.config.tableName,
              conditionFieldName: 'id',
              conditionFieldValue: this.config.record.id
            }
          })
          this.axios(obj).then(res => {
            this.buttonLoading = false
            if (res.code !== 0) {
              this.$message.error(res.message)
            } else {
              this.config.parent.refresh()
              this.visible = false
              this.$message.success(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
