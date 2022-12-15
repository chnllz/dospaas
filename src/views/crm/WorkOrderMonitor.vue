<template>
  <a-spin :spinning="loading">
    <div class="title" style="margin: 2px 10px 10px 10px">
      <div>{{ $t('今日数据') }}</div>
      <a-popover placement="left" class="popover_class">
        <template slot="content">
          <div v-dompurify-html="content" style="width: 300px"></div>
        </template>
        <a-icon type="question-circle" style="font-size: 16px" />
      </a-popover>
    </div>
    <a-card size="small" class="card_class">
      <a-row :gutter="16" style="margin-top: 8px">
        <a-col :span="4">
          <a-card size="small" :title="$t('当前已分配')" class="card_text">
            <a href="#" class="h1">{{ data.unfinishedWorkOrder ? data.unfinishedWorkOrder.backlogWorkOrder : '0' }}</a>
            <div>
              {{ $t('未分配：') }}{{ data.unfinishedWorkOrder ? data.unfinishedWorkOrder.undistributedWorkOrder : '0' }}
            </div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card size="small" :title="$t('今日新增邮件')" class="card_text">
            <a class="h1" href="#">{{ data.mail ? data.mail.newMailNumber : '0' }}</a>
            <div>{{ $t('今日已发送：') }}{{ data.mail ? data.mail.sentToNumber : '0' }}</div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card size="small" :title="$t('今日新增工单')" class="card_text">
            <a class="h1" href="#">
              {{ data.additionalWorkOrder ? data.additionalWorkOrder.additionalWorkOrder : '0' }}
            </a>
            <div>{{ $t('普通工单：') }}{{ data.additionalWorkOrder ? data.additionalWorkOrder.workOrder : '0' }}</div>
            <div>
              {{ $t('支付工单：') }}{{ data.additionalWorkOrder ? data.additionalWorkOrder.payWorkOrder : '0' }}
            </div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card size="small" :title="$t('当前在线客服')" class="card_text">
            <a class="h1" href="#">{{ data.onlineService ? data.onlineService.onlineService : '0' }}</a>
            <div style="display: flex; justify-content: center">
              <div>{{ $t('就绪：') }}{{ data.onlineService ? data.onlineService.ready : '0' }} /</div>
              <div style="margin: 0 5px">示忙：{{ data.onlineService ? data.onlineService.busy : '0' }} /</div>
              <div>{{ $t('离开：') }}{{ data.onlineService ? data.onlineService.departure : '0' }}</div>
            </div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card size="small" :title="$t('超时未响应工单')" class="card_text">
            <a class="h1" href="#">{{ data.timeoutWarning ? data.timeoutWarning.failToRespond : '0' }}</a>
            <div>{{ $t('超时未完结工单：') }}{{ data.timeoutWarning ? data.timeoutWarning.timeoutWarning : '0' }}</div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card size="small" :title="$t('今日平均完单时长')" class="card_text">
            <a class="h1" href="#">{{ data.unfinishedWorkOrder ? data.unfinishedWorkOrder.avgEndWorkOrder : '0' }}</a>
            <div>
              {{ $t('今日平均首响时长：')
              }}{{ data.unfinishedWorkOrder ? data.unfinishedWorkOrder.avgFirstReply : '0' }}
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <div class="title" style="margin: 10px">{{ $t('新增工单分布') }}</div>
    <a-card size="small">
      <vueEcharts ref="main" :options="options" :auto-resize="true" style="width: 100%"></vueEcharts>
    </a-card>
  </a-spin>
</template>
<script>
import echarts from 'echarts'
import vueEcharts from 'vue-echarts'
export default {
  i18n: window.lang('crm'),
  components: {
    echarts,
    vueEcharts
  },
  data () {
    return {
      loading: false,
      queryParam: {},
      data: {},
      options: {},
      Interval: null,
      content: `${this.$t('当前已分配：{工单状态}=“待客服处理”的工单数之和')}<br />
                ${this.$t('- 未分配：{工单状态}=“待分配客服”的工单数之和')}<br />
                ${this.$t('今日新增邮件：今日新收到邮件数')}<br />
                ${this.$t('- 今日已发送：今日所有已发送邮件数')}<br />
                ${this.$t('今日新增工单：创建时间为今天的工单数')}<br />
                ${this.$t('- 普通工单：非支付渠道来源的所有工单')}<br />
                ${this.$t('- 支付渠道工单：支付渠道及三方预警平台推送工单数')}<br />
                ${this.$t('当前在线客服：当前已登录系统客服数')}<br />
                ${this.$t('- 就绪：工单状态为就绪的客服数')}<br />
                ${this.$t('- 示忙：工单状态为示忙的客服数')}<br />
                ${this.$t('- 离开：工单状态为离开的客服数')}<br />
                ${this.$t('超时未响应工单：超过8小时无客服响应的工单数')}<br />
                ${this.$t('超时未完结工单：工单创建至今，超过15天未完结的工单总数')}<br />
                ${this.$t('今日平均完单时长：所有今日已完结工单完单时长之和/所有今日已完结工单总数')}<br />
                ${this.$t('今日平均首响时长：所有今日首响工单首响时长之和/所有今日首响工单总数')}`
    }
  },
  activated () {
    this.runtime()
  },
  mounted () {
    this.getData()
    this.myEcharts()
  },
  // 销毁定时器
  deactivated () {
    clearInterval(this.Interval)
  },
  methods: {
    runtime () {
      this.Interval = setInterval(() => {
        this.getData()
        this.myEcharts()
      }, 120000)
    },
    getData () {
      this.loading = true
      this.axios({
        url: '/crm/report/getWorkOrderMonitoring'
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.data = res.result
          if (this.data.unfinishedWorkOrder) {
            for (const i in this.data.unfinishedWorkOrder) {
              const sec = parseInt(this.data.unfinishedWorkOrder[i])// 秒
              if (['avgFirstReply', 'avgEndWorkOrder'].includes(i)) {
                this.data.unfinishedWorkOrder[i] = this.format(sec)
              }
            }
          }
        }
      })
    },
    format (seconds) {
      const hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600)
      seconds -= 3600 * hour
      const minutes = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60)
      seconds -= 60 * minutes
      const sec = seconds >= 10 ? seconds : '0' + seconds
      return hour + ':' + minutes + ':' + sec
    },
    myEcharts () {
      this.axios({
        url: '/crm/report/getWorkOrderDistribution'
      }).then(res => {
        if (res.code === 0) {
          const data = res.result.data
          this.options = {
            grid: {
              left: 20,
              right: 20,
              top: 60,
              bottom: 10,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              top: 20,
              data: [this.$t('新增工单数总计'), this.$t('邮件工单'), 'contact us', this.$t('个人订单中心'), this.$t('在线会话'), this.$t('协作部门建单')]
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: this.$t('新增工单数总计'),
              data: data.additionalWorkOrderRows,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#71ae46',
                  lineStyle: {
                    color: '#71ae46'
                  }
                }
              }
            }, {
              name: this.$t('邮件工单'),
              data: data.mailWorkOrders,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#96b744',
                  lineStyle: {
                    color: '#96b744'
                  }
                }
              }
            }, {
              name: 'contact us',
              data: data.contactusWorkOrders,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#c4cc38',
                  lineStyle: { color: '#c4cc38' }
                }
              }
            }, {
              name: this.$t('个人订单中心'),
              data: data.orderCenterWorkOrders,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#ebe12a',
                  lineStyle: { color: '#ebe12a' }
                }
              }
            }, {
              name: this.$t('在线会话'),
              data: data.onlineSessionWorkOrders,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#eab026',
                  lineStyle: { color: '#eab026' }
                }
              }
            }, {
              name: this.$t('协作部门建单'),
              data: data.departmentWorkOrders,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#e3852b',
                  lineStyle: { color: '#e3852b' }
                }
              }
            }]
          }
        }
      })

      window.onresize = () => {
        setTimeout(() => {
          this.$refs.main.resize()
        }, 500)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.popover_class {
  margin-left: 8px;
}
.card_class {
  padding: 16px;
  position: relative;
}
.title {
  font-size: 18px;
  display: flex;
  align-items: center;
}
.h1 {
  height: 80px;
  font-size: 50px;
  cursor: inherit;
}
.card_text {
  text-align: center;
  height: 170px;
}
/deep/.ant-card-body {
  padding: 6px 0;
}
/deep/.ant-table-small {
  border: 0;
}
</style>
