<template>
  <a-modal
    :destroyOnClose="true"
    :bodyStyle="{
      height: 'calc(100vh - 400px)',
      overflow: 'auto'
    }"
    centered
    :title="$t('商品SPU')"
    :width="900"
    :visible="visible"
    :maskClosable="!buttonLoading"
    :confirmLoading="buttonLoading"
    :closable="!buttonLoading"
    @cancel="visible = !visible"
    @ok="handleSubmit"
  >
    <a-spin :spinning="buttonLoading">
      <a-table
        size="small"
        rowKey="id"
        :columns="spuColumns"
        :dataSource="goodsSpu"
        :pagination="false"
        style="margin-bottom: 8px"
      >
        <div slot="customTitle">
          <span v-if="showYy" style="color: red; font-size: 16px">*</span>
          {{ $t('客诉原因') }}
        </div>
        <div slot="ksyy" slot-scope="text, record">
          <a-tree-select
            v-model="record.ksyy"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            treeNodeFilterProp="label"
            showSearch
            allowClear
            style="width: 100%"
            :tree-data="treeData"
            :treeExpandedKeys="record.treeExpandedKeys"
            @search="
              (value) => {
                treeSearch(value, record)
              }
            "
            @treeExpand="
              (expandedKeys) => {
                record.treeExpandedKeys = expandedKeys
                $forceUpdate()
              }
            "
          >
            <div slot="treeTitle" slot-scope="treeObj" @click="treeSelectEvent(treeObj, record)">
              {{ treeObj.label }}
            </div>
          </a-tree-select>
        </div>
      </a-table>
    </a-spin>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      visible: false,
      buttonLoading: false,
      form: this.$form.createForm(this),
      config: {},
      // 商品SPU内容
      goodsSpu: [],
      treeData: [],
      treeExpandedKeys: [],
      spuColumns: [{
        title: this.$t('产品图片'),
        customRender: (text, record) => {
          if (record.cptp) {
            text = record.cptp.split(',')
          }
          if (text && text.length) {
            return (<div v-viewer>
              {
                text.map(item => {
                  return <div><img src={item} alt="" style="width: 64px; height: auto; cursor: pointer; margin-right: 2px;" /></div>
                })
              }
            </div>)
          } else {
            return '--'
          }
        },
        width: 100
      }, {
        title: this.$t('产品id'),
        dataIndex: 'cpid',
        width: 100
      }, {
        title: 'SPU/SKU',
        dataIndex: 'spu',
        customRender: (text, record) => {
          return (<div><div>{record.spu}</div><div>{record.sku}</div></div>)
        },
        width: 150
      }, {
        title: this.$t('产品名称/规格/物品码'),
        dataIndex: 'cpmc',
        customRender: (text, record) => {
          return (<div><div>{record.cpmc}</div><div>{record.gg}</div><div>{record.wpm}</div></div>)
        },
        width: 200
      }, {
        dataIndex: 'ksyy',
        scopedSlots: {
          customRender: 'ksyy',
          title: 'customTitle'
        }
      }, {
        title: this.$t('买家上传图片'),
        customRender: (text, record) => {
          if (record.sctp) {
            text = record.sctp.split(',')
          }
          if (text && text.length) {
            return (<div v-viewer>
              {
                text.map(item => {
                  return <div><img src={item} alt="" style="width: 64px; height: auto; cursor: pointer; margin-right: 2px;" /></div>
                })
              }
            </div>)
          } else {
            return '--'
          }
        },
        width: 100
      }],
      showYy: false
    }
  },
  methods: {
    show (config) {
      if (config && config.formData.gdlx === 'thh') {
        this.showYy = true
      } else {
        this.showYy = false
      }
      this.visible = true
      this.config = config
      this.treeData = config.parent.treeData
      this.treeData.forEach(item => {
        item.disabled = undefined
        item.value = item.dictDataNumber
        item.label = item.dictDataName
        if (item.children && item.children.length) {
          item.selectable = false
          item.scopedSlots = { title: 'treeTitle' }
          item.children.forEach(childItem => {
            childItem.disabled = undefined
            childItem.value = childItem.dictDataNumber
            childItem.label = childItem.dictDataName
            if (childItem.children && childItem.children.length) {
              childItem.children.forEach(keyItem => { keyItem.disabled = undefined })
              childItem.selectable = false
              childItem.scopedSlots = { title: 'treeTitle' }
            }
          })
        }
      })
      if (!this.goodsSpu.length) {
        this.buttonLoading = true
        this.axios({
          url: 'crm/spu/orderSPU',
          data: {
            orderNo: config.formData.ddh || '',
            workOrderNumber: config.formData.caseNumber || ''
          }
        }).then(res => {
          this.buttonLoading = false
          this.goodsSpu = res.code === 0 ? res.result : []
          this.config.parent.goodsSpu = this.goodsSpu
          this.goodsSpu.forEach(item => { item.treeExpandedKeys = [] })
        })
      }
    },
    treeSelectEvent (treeObj, record) {
      if (treeObj.children && treeObj.children.length) {
        if (record.treeExpandedKeys.includes(treeObj.value)) {
          record.treeExpandedKeys = record.treeExpandedKeys.filter(item => item !== treeObj.value)
        } else {
          record.treeExpandedKeys.push(treeObj.value)
        }
      }
      this.$forceUpdate()
    },
    treeSearch (string, record) {
      record.treeExpandedKeys = []
      if (string) {
        const reg = new RegExp(string, 'i')
        const getExpanded = (array) => {
          array.forEach(item => {
            if (item.children && item.children.length) {
              getExpanded(item.children)
            }
            if (item.children && item.children.some(childItem => childItem.dictDataName.match(reg))) {
              record.treeExpandedKeys.splice(0, 0, item.value)
              this.$forceUpdate()
            }
          })
        }
        getExpanded(this.treeData)
      }
      this.$forceUpdate()
    },
    handleSubmit () {
      this.config.parent.goodsSpu = this.goodsSpu
      this.visible = !this.visible
    }
  }
}
</script>
