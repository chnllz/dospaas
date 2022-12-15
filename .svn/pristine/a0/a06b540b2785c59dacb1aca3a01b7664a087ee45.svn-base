<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('类型')">
              <a-select v-model="queryParam.type">
                <a-select-option v-for="value in priceType" :key="value.value" :value="value.value">
                  {{ value.type }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('日期')">
              <a-range-picker
                v-model="showtime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                format="YYYY-MM-DD"
                style="width: 100%"
                @change="getDate"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-alert
      :message="
        $t('剩余数量: {0}条, 当前单价：{1} 元, 总计数：{2} 条, 总计费：{3} 元', {
          0: remainCount,
          1: unitPrice,
          2: sumCount,
          3: totalFee
        })
      "
      type="info"
      style="margin-bottom: 8px"
    />
    <a-space>
      <a-button v-action:export_stat icon="download" @click="handleExport">{{ $t('导出') }}</a-button>
      <a-button
        v-action:add
        @click="
          () => {
            visible = true
            addCost = ''
          }
        "
      >
        ￥ {{ $t('充值') }}
      </a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      size="small"
      rowKey="id"
      :scroll="{ y: true }"
      :columns="columns"
      :data="loadData"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="type" slot-scope="text">
        <span v-for="item in priceType" v-show="text === item.value" :key="item.value">{{ item.type }}</span>
      </div>
    </s-table>
    <a-modal
      :title="`￥ ${$t('充值')}`"
      :visible="visible"
      :confirmLoading="loading"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="visible = !visible"
    >
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item :label="$t('类型')">
          <a-radio-group
            v-decorator="[
              'info[type]',
              { initialValue: '1', rules: [{ required: true, message: $t('请选择充值类型') }] }
            ]"
          >
            <a-radio value="1" style="margin-right: 120px">{{ $t('充值') }}</a-radio>
            <a-radio value="2">{{ $t('回收') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="$t('数量')">
          <a-input-number
            v-decorator="['info[count]', { rules: [{ required: true, message: $t('请输入数量') }] }]"
            :min="1"
            style="width: 100%"
            @change="
              (e) => {
                addCost = form.getFieldValue('info[unitPrice]') * e
              }
            "
          />
        </a-form-item>
        <a-form-item :label="$t('单价')">
          <a-input-number
            v-decorator="[
              'info[unitPrice]',
              { initialValue: unitPrice, rules: [{ required: true, message: $t('请输入单价') }] }
            ]"
            :min="0"
            style="width: 100%"
            @change="
              (e) => {
                addCost = form.getFieldValue('info[count]') * e
              }
            "
          />
        </a-form-item>
        <a-form-item :label="$t('计费')">
          <a-input
            v-decorator="['info[cost]', { initialValue: addCost || '' }]"
            :read-only="true"
            style="background-color: #f5f5f5; width: 100%"
          />
        </a-form-item>
        <a-form-item :label="$t('备注')">
          <a-textarea v-decorator="['info[remarks]']" :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
      </a-form>
    </a-modal>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('sms'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      advanced: false,
      visible: false,
      loading: false,
      // 搜索参数
      monthDate: '',
      addCost: '',
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      // 剩余数量
      remainCount: 0,
      // 当前单价
      unitPrice: 0,
      showtime: null,
      queryParam: {
        type: 0
      },
      form: this.$form.createForm(this),
      // 表头
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        sorter: true
      }, {
        title: this.$t('日期'),
        dataIndex: 'date',
        sorter: true
      }, {
        title: this.$t('总计数'),
        dataIndex: 'count',
        sorter: true
      }, {
        title: this.$t('单价'),
        dataIndex: 'unitPrice',
        sorter: true
      }, {
        title: this.$t('总费用'),
        dataIndex: 'cost',
        sorter: true
      }, {
        title: this.$t('类型'),
        dataIndex: 'type',
        scopedSlots: { customRender: 'type' }
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }],
      priceType: [{
        value: 0,
        type: this.$t('发送')
      }, {
        value: 1,
        type: this.$t('充值')
      }, {
        value: 2,
        type: this.$t('回收')
      }],
      // 总计数
      sumCount: 0,
      // 总计费
      totalFee: 0
    }
  },
  methods: {
    loadData (parameter) {
      return this.axios({
        url: '/sms/send/stat',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.sumCount = res.result.sumCount || 0
        this.totalFee = res.result.totalFee || 0
        this.remainCount = res.result.remainCount || 0
        this.unitPrice = res.result.unitPrice || 0
        return res.result
      })
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportSmsStatTask',
        parameter: {
          condition: this.queryParam
        }
      })
    },
    getDate (date, dateString) {
      this.showtime = date
      this.queryParam.searchDate = date.length > 0 ? dateString : null
    },
    reset () {
      this.queryParam.type = 0
      this.queryParam.searchDate = null
      this.showtime = null
      this.$refs.table.refresh()
    },
    // 充值提交
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.axios({
            url: '/sms/send/statAdd',
            data: values
          }).then(res => {
            if (res.code) {
              this.$message.error(res.message)
            } else {
              this.$message.success(res.message)
            }
            this.loading = false
            this.visible = false
            this.$refs.table.refresh()
          })
        }
      })
    }
  }
}
</script>
