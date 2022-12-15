<template>
  <a-modal v-model="visible" title="选择地址" class="workOrderBox" :footer="null" :width="1200">
    <a-row type="flex" :gutter="16">
      <a-col flex="1">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col>
            <a-space>
              <tag-icon class="tagIcon" />
              <h3 style="margin-top: 10px">{{ $t('客户地址信息') }}</h3>
            </a-space>
          </a-col>
          <a-col>
            <a-button @click="changeAction('add')">添加</a-button>
          </a-col>
        </a-row>
        <a-spin :spinning="loading">
          <div v-if="addressList.length > 0">
            <div class="workOrderCard">
              <a-card
                v-for="(item, index) in addressList"
                :key="index"
                :headStyle="headStyle"
                :bodyStyle="bodyStyle"
                size="small"
                class="workOrderCardItem"
                :class="activeIndex === index ? 'workOrderCardActive' : ''"
                @click="activeIndex = index"
              >
                <a-row slot="title" type="flex" justify="space-between" align="middle">
                  <a-col style="font-weight: bold">{{ item.lianXiRen }} {{ item.lianXiDianHua }}</a-col>
                  <a-col>
                    <a-radio :checked="item.shiFouMoRen === 1" @change="changeDefault($event, index)">
                      {{ item.shiFouMoRen === 1 ? '已设默认' : '默认' }}
                    </a-radio>
                  </a-col>
                </a-row>
                <div class="wordOrderCardContent">{{ item.address }} {{ item.diZhixiangXi }}</div>
                <a-row type="flex" justify="space-between" align="middle" class="wordOrderCardBottom">
                  <a-col>
                    <a-button @click="changeAction('choice', item)">选择</a-button>
                  </a-col>
                  <a-col>
                    <a-space>
                      <a-button @click="changeAction('delete', item)">删除</a-button>
                      <a-button @click="changeAction('edit', item)">编辑</a-button>
                      <a-button @click="changeAction('copy', item)">复制</a-button>
                    </a-space>
                  </a-col>
                </a-row>
              </a-card>
            </div>
            <div class="wordOrderPage">
              <a-pagination
                v-model="current"
                size="small"
                :page-size-options="pageSizeOptions"
                :total="totalCount"
                show-size-changer
                :page-size="pageSize"
                :show-total="(total, range) => `显示第${range[0]}条到${range[1]}条记录，一共${total}条`"
                @change="pageChange"
                @showSizeChange="onShowSizeChange"
              ></a-pagination>
            </div>
          </div>
          <a-empty v-else class="workOrderEmpty" title="暂无数据"></a-empty>
        </a-spin>
      </a-col>
      <a-col flex="1" class="worderOrderForm">
        <a-space style="border-bottom: 1px solid #eaeaea; width: 100%">
          <tag-icon class="tagIcon" />
          <h3 style="margin-top: 10px">{{ action === 'edit' ? $t('编辑') : $t('添加') }}</h3>
        </a-space>
        <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" style="margin-top: 4%">
          <a-form-item :label="$t('联系人')" required class="worderOrderFormItem">
            <a-input
              v-decorator="[
                'info[lianXiRen]',
                { initialValue: data.lianXiRen, rules: [{ required: true, message: $t('请输入联系人') }] }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('联系电话')" required class="worderOrderFormItem">
            <a-input
              v-decorator="[
                'info[lianXiDianHua]',
                { initialValue: data.lianXiDianHua, rules: [{ required: true, message: $t('请输入联系电话') }] }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('地址')" required class="worderOrderFormItem">
            <address-select
              ref="record[address]"
              alias="address"
              :series="'4'"
              :value="data.option"
              fieldRule="allow"
              style="flex: 1"
              @send="getAddress"
            />
            <a-input
              v-show="false"
              v-decorator="[
                'info[diZhi]',
                { initialValue: data.diZhi, rules: [{ required: true, message: $t('请选择地址') }] }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('详细地址')" required class="worderOrderFormItem">
            <a-textarea
              v-decorator="[
                'info[diZhixiangXi]',
                { initialValue: data.diZhixiangXi, rules: [{ required: true, message: $t('请输入详细地址') }] }
              ]"
              :autoSize="{ minRows: 3 }"
            />
          </a-form-item>
          <a-form-item :label="$t('是否默认')" required class="worderOrderFormItem">
            <a-radio-group
              v-decorator="[
                'info[shiFouMoRen]',
                { initialValue: data.shiFouMoRen, rules: [{ required: true, message: $t('请选择是否默认') }] }
              ]"
            >
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
        <div class="worderOrderFormButton" style="display: flex; justify-content: flex-end">
          <a-space>
            <a-button @click="saveData('open')">{{ action === 'edit' ? '保存修改' : '添加' }}</a-button>
            <a-button type="primary" @click="saveData('close')">
              {{ action === 'edit' ? '保存修改并选择' : '添加并选择' }}
            </a-button>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  components: {
    AddressSelect: () => import('@/views/admin/Field/AddressSelect')
  },
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      config: {},
      data: {
        option: []
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      addressList: [],
      headStyle: {
        backgroundColor: 'unset',
        fontSize: '14px',
        borderBottom: '0'
      },
      bodyStyle: {
        paddingTop: '6px',
        color: '#595959'
      },
      totalCount: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 20,
      addressInfo: {},
      action: 'add',
      loading: false,
      activeIndex: -1
    }
  },
  methods: {
    show (config) {
      if (!config.record.guanLianKeHuBianHao) {
        this.$message.warning('该客户为新客户，无联系信息')
        return
      }
      this.activeIndex = -1
      this.config = config
      this.visible = true
      this.current = 1
      this.pageSize = 20
      this.$nextTick(() => {
        this.form.setFieldsValue({ 'info[shiFouMoRen]': 0 })
        const arr = ['keHuMingCheng', 'keHuDianHua']
        const arrField = ['lianXiRen', 'lianXiDianHua']
        arr.forEach((item, index) => {
          this.data[arrField[index]] = config.record[item]
        })
      })
      this.getList()
    },
    getList () {
      this.loading = true
      this.axios({
        url: this.config.initUrl,
        data: {
          keHuBianHao: this.config.record.guanLianKeHuBianHao,
          pageNo: this.current,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          res.result.data.forEach(item => {
            item.address = item.option[0].fullName.replace(new RegExp('/', 'gm'), '')
          })
          this.addressList = res.result.data
          this.totalCount = res.result.totalCount
        }
      })
    },
    changeDefault (e, i) {
      const item = this.addressList[i]
      if (item.shiFouMoRen !== 1) {
        this.axios({
          url: this.config.checkUrl,
          params: {
            id: item.id,
            key: 1
          }
        }).then(res => {
          if (res.code === 0) {
            this.addressList.forEach((item, index) => {
              item.shiFouMoRen = i === index ? 1 : 0
            })
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    pageChange (page, pageSize) {
      this.activeIndex = -1
      this.current = page
      this.pageSize = pageSize
      this.getList()
    },
    onShowSizeChange (current, pageSize) {
      this.activeIndex = -1
      this.current = current
      this.pageSize = pageSize
      this.getList()
    },
    changeAction (action, val) {
      this.action = action
      if (action === 'choice') {
        val.addressName = val.option[0].fullName
        this.saveAddressData(val)
        this.visible = false
      } else if (action === 'delete') {
        const that = this
        this.$confirm({
          title: this.$t('是否删除该地址信息'),
          okText: '确认',
          cancelText: '取消',
          onOk () {
            that.axios({
              url: that.config.deleteUrl,
              params: {
                id: val.id
              }
            }).then(res => {
              if (res.code === 0) {
                that.activeIndex = -1
                that.$message.success('删除成功')
                that.current = 1
                that.getList()
              } else {
                that.$message.error(res.message)
              }
            })
          }
        })
      } else if (['edit', 'copy'].includes(action)) {
        this.addressInfo = Object.assign({ name: val.option[0].fullName }, val)
        this.data = val
        this.form.setFieldsValue({ 'info[diZhi]': val.diZhi })
        this.form.setFieldsValue({ 'info[shiFouMoRen]': val.shiFouMoRen })
      } else {
        this.closeData()
      }
    },
    saveAddressData (val) {
      const { setFieldsValue } = this.config.parent.form
      const obj = {}
      obj['record[gongDanLianXiRen]'] = val.lianXiRen
      obj['record[gongDanLianXiDianHua]'] = val.lianXiDianHua
      obj['record[keHuDiZhi]'] = val.addressName
      obj['record[keHuDiZhiXiangXi]'] = val.diZhixiangXi
      setFieldsValue(obj)
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
            if (temItem.field && ['keHuDiZhi'].includes(temItem.field.alias)) {
              this.config.parent.$set(temItem.field, 'option', val.option)
              this.config.parent.addressValue['record[keHuDiZhi]'] = val.diZhi
              this.config.parent.$forceUpdate()
            }
          }
        })
      }
      getTemplate(this.config.parent.viewThis.template)
    },
    getAddress (name, number, alias, allValue, details, coordinate) {
      this.$nextTick(() => {
        this.form.setFieldsValue({ 'info[diZhi]': number })
        const addressName = name ? name.split('/') : ''
        const allNumber = allValue ? allValue.split('/') : ''
        this.addressInfo = {
          name,
          number,
          alias,
          allValue,
          details,
          coordinate,
          option: [{
            fullName: name,
            fullNumber: allValue,
            name: addressName[addressName.length - 1],
            number: allNumber[allNumber.length - 1],
            parentNumber: allNumber[allNumber.length - 1]
          }]
        }
      })
    },
    closeData () {
      this.form.resetFields()
      this.form.setFieldsValue({ 'info[shiFouMoRen]': 0 })
      this.data = { option: [] }
    },
    saveData (type) {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          const record = Object.assign(values.info, { id: this.action === 'edit' ? this.data.id : null, guanLianKeHuBianHao: this.config.record.guanLianKeHuBianHao })
          this.axios({
            tips: false,
            url: this.config.saveUrl,
            data: {
              record
            }
          }).then(res => {
            if (res.code === 0) {
              this.$message.success(this.action === 'add' ? '添加成功' : '修改成功')
              this.getList()
              this.closeData()
              if (type === 'close') {
                record.addressName = this.addressInfo.name
                record.option = this.addressInfo.option
                this.saveAddressData(record)
                this.$nextTick(() => {
                  this.visible = false
                })
              }
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.workOrderBox /deep/.ant-modal-body {
  padding: 16px;
}

.workOrderCard,
.workOrderEmpty {
  height: 580px;
  overflow-y: auto;
}

.workOrderEmpty {
  padding-top: 40px;
}

.workOrderCardItem {
  margin: 0 12px 12px 0;
}
.workOrderCardItem:hover {
  background-color: @primary-1;
}

/deep/.workOrderCardActive {
  background-color: @primary-1;
  z-index: 10;
}

.wordOrderCardBottom {
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid #eaeaee;
}
.wordOrderPage {
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
}
.worderOrderForm {
  position: relative;
}
.worderOrderFormItem {
  margin-bottom: 1%;
}
.worderOrderFormButton {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
