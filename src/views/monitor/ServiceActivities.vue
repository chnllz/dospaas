<template>
  <div class="useMonitor">
    <div class="box">
      <div class="content">
        <div class="color-fff gloTime font-12">
          <div>{{ nowTime }}</div>
          <div>{{ $t(monitor.technical) }}</div>
        </div>
        <!-- 头部 -->
        <div class="globalClass">
          <div class="topLogo topLogoImg">
            <img :src="heardImg" alt="" />
          </div>
          <div class="centerTitleHeight centerTitleImg">
            <div class="centerTitle">{{ $t(monitor.title) }}</div>
          </div>
        </div>
        <!-- 说明 -->
        <div
          v-if="monitor.help"
          class="gloExplainClass"
          @click="
            () => {
              openExplain = true
            }
          "
        >
          <img src="./assets/image/explain.png" class="explainImage" alt="" />
          <div class="color-ffc font-12">{{ $t('帮助说明') }}</div>
        </div>
        <!-- 中间 -->
        <div class="activeBox tableBox">
          <subTable style="height: 100%">
            <div slot="body" class="tableBoxBody">
              <a-table
                ref="table"
                size="small"
                rowKey="id"
                :pagination="paginationOpt"
                :columns="columns"
                :data-source="tableData.data"
              >
                <template slot="status" slot-scope="text">
                  <img
                    :src="
                      require(`./assets/image/${
                        text === '0' ? 'jx' : text === '3' ? 'dc' : text === '1' ? 'lk' : 'sm'
                      }.png`)
                    "
                    style="margin: 0 3px 3px 0"
                  />
                  <span>
                    {{ text === '0' ? $t('就绪') : text === '3' ? $t('登出') : text === '1' ? $t('离开') : $t('示忙') }}
                  </span>
                </template>
              </a-table>
            </div>
          </subTable>
        </div>
      </div>
      <a-modal
        :title="$t('说明')"
        :visible="openExplain"
        :bodyStyle="{ maxHeight: '500px', overflowY: 'height' > 500 ? 'scroll' : 'auto' }"
      >
        <div>{{ $t(monitor.help) }}</div>
        <div slot="footer">
          <a-button @click="() => (openExplain = false)">{{ $t('关闭') }}</a-button>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import './assets/css/chartframe.less'
import { ServiceActivities } from './mock/monitordata.js'
export default {
  components: {
    subTable: () => import('./components/subTable')
  },
  data () {
    return {
      heardImg: '',
      nowTime: null,
      // 时间定时器
      timeid: null,
      monitor: {},
      openExplain: false,
      columns: [{
        title: this.$t('客服名称'),
        dataIndex: 'nickName',
        width: 150,
        customRender: (text, record) => {
          return `${record.userName}(${text})`
        }
      }, {
        title: this.$t('状态'),
        dataIndex: 'status',
        align: 'center',
        width: 90,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('状态持续时间'),
        dataIndex: 'statusDuration',
        align: 'center'
      }, {
        title: this.$t('当前会话数'),
        dataIndex: 'chating',
        align: 'center'
      }, {
        title: this.$t('累计会话数'),
        dataIndex: 'conversation',
        align: 'center'
      }, {
        title: this.$t('累计消息数'),
        dataIndex: 'chats',
        align: 'center'
      }, {
        title: this.$t('平均会话时长'),
        dataIndex: 'averageConversationTime',
        align: 'center',
        customRender: (text) => {
          return this.changeColumnTime(text)
        }
      }, {
        title: this.$t('平均首次响应时长'),
        dataIndex: 'averageFirstAnswerTime',
        align: 'center',
        customRender: (text) => {
          return this.changeColumnTime(text)
        }
      }, {
        title: this.$t('平均响应时长'),
        dataIndex: 'averageAnswerTime',
        align: 'center',
        customRender: (text) => {
          return this.changeColumnTime(text)
        }
      }, {
        title: this.$t('满意度'),
        dataIndex: 'commentSatisfiedPercent',
        align: 'center',
        customRender: (text) => {
          return text + '%'
        }
      }, {
        title: this.$t('首次就绪时间'),
        dataIndex: 'readyTime',
        align: 'center',
        customRender: (text) => {
          return (text || '--')
        }
      }],
      tableData: {},
      // 改变页数定时器
      timeOutCurrent: null,
      paginationOpt: {
        current: 1,
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 20, // 默认当前页显示数据的大小
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => `${this.$t('显示第')} ${range[0]} ${this.$t('条到')} ${range[1]}${this.$t('条记录, 共')} ${total} ${this.$t('条')}`,
        onShowSizeChange: (current, pageSize) => {
          clearInterval(this.timeOutCurrent)
          this.paginationOpt.current = 1
          this.paginationOpt.defaultCurrent = 1
          this.paginationOpt.defaultPageSize = pageSize
          this.getData()
          this.changePageCurrent()
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current
          this.paginationOpt.defaultPageSize = size
        }
      },
      queryParam: {
        status: []
      },
      settingControl: {},
      busyList: [{
        value: 0,
        label: this.$t('就绪')
      }, {
        value: 2,
        label: this.$t('示忙')
      }, {
        value: 1,
        label: this.$t('离开')
      }, {
        value: 3,
        label: this.$t('登出')
      }]
    }
  },

  activated () {
    this.changeTime()
    this.changePageCurrent()
    this.getInit()
  },
  mounted () {
    this.queryParam.status = [0, 1]
    this.axios({
      url: '/chat/setting/base',
      data: { action: 'get' }
    }).then(res => {
      this.settingControl = res.result.info
      if (this.settingControl.busyEnable) {
        this.busyList.forEach(item => {
          if (item.value === 2) {
            const arr = JSON.parse(this.settingControl.furtherStates)
            item.children = arr.filter(item => item.check)
            item.children.forEach(item => {
              item.label = this.$t(item.label)
              this.queryParam.status.push(item.value)
            })
          }
        })
      } else {
        this.queryParam.status.push(2)
      }
      this.getInit()
      this.changeTime()
      this.changePageCurrent()
    })
  },
  // 销毁循环
  deactivated () {
    clearInterval(this.timeid)
    clearInterval(this.timeOutCurrent)
  },
  methods: {
    getInit () {
      this.axios({
        url: '/monitor/base/getConfig'
      }).then(res => {
        if (res.code === 0) {
          const result = res.result
          if (result.monitorLogo) {
            this.heardImg = `${this.$store.state.env.VUE_APP_API_BASE_URL}/admin/api/download/?filePath=/${result.monitorLogo.filePath}`
          }
          this.monitor = {
            title: result.monitorAgentStatusTitle,
            enable: result.monitorAgentStatusEnable,
            help: result.monitorAgentStatusHelp,
            refresh: result.monitorAgentStatusRefresh,
            technical: result.monitorTechnicalSupport
          }
          if (res.result.monitorAgentStatusEnable) {
            const data = ServiceActivities().result.result
            this.tableData = data
            this.paginationOpt.total = data.totalCount
          } else {
            this.getData()
          }
        }
      })
    },
    changePageCurrent () {
      this.timeOutCurrent = setInterval(() => {
        this.paginationOpt.current = this.tableData.data.length < this.paginationOpt.defaultPageSize ? 1 : this.paginationOpt.current += 1
        if (!this.monitor.enable) {
          this.getData()
        }
      }, (this.monitor.refresh || 5) * 1000)
    },
    // 改变左上角时间定时器
    changeTime () {
      this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.timeid = setInterval(() => {
        this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    changeColumnTime (text) {
      let sec = parseInt(text)
      let min = 0
      let hour = 0
      if (sec > 59) {
        min = parseInt(sec / 60)
        sec = parseInt(sec % 60)
        if (min > 59) {
          hour = parseInt(min / 60)
          min = parseInt(min % 60)
        }
      }
      const result = `${parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour)}:${parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min)}:${parseInt(sec) < 10 ? '0' + parseInt(sec) : parseInt(sec)}`
      return result
    },
    // 获取数据
    getData () {
      const parameter = Object.assign({
        pageNo: this.paginationOpt.current,
        pageSize: this.paginationOpt.defaultPageSize,
        sortField: 'userName',
        sortOrder: 'ascend'
      }, this.queryParam)
      this.axios({ url: '/chat/userActivity/init', data: parameter }).then(res => {
        this.tableData = res.result
        this.paginationOpt.total = this.tableData.totalCount
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-pagination-total-text {
  color: #fff;
}
/deep/.ant-pagination.mini .ant-pagination-prev .ant-pagination-item-link,
/deep/.ant-pagination-item:not(.ant-pagination-item-active) a,
/deep/.ant-pagination-disabled .ant-pagination-item-link,
/deep/.ant-pagination-next a {
  color: #fff;
}
</style>
