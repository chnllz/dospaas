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
        <div class="tableBox" style="flex-direction: row">
          <!-- 左部分 -->
          <subTable class="flex-2" style="margin-right: 20px">
            <div slot="body" class="seTableBox tableBoxBody">
              <a-table
                ref="onetable"
                size="small"
                rowKey="id"
                :pagination="paginationOpt"
                :columns="Columns"
                :data-source="tableData.data"
              >
                <template slot="status" slot-scope="text">
                  <img
                    :src="
                      require(`./assets/image/${
                        text == '签出'
                          ? 'offLine'
                          : text == '空闲'
                          ? 'free'
                          : text == '通话'
                          ? 'onThePhone'
                          : text == '示忙'
                          ? 'showBusy'
                          : text == '振铃'
                          ? 'ringing'
                          : text == '在线'
                          ? 'ringing'
                          : ''
                      }.png`)
                    "
                    alt=""
                  />
                  <span
                    :style="{
                      color:
                        text == '签出'
                          ? '#FFFFFF'
                          : text == '空闲'
                          ? '#75E2EC'
                          : text == '通话'
                          ? '#26DD7E'
                          : text == '示忙'
                          ? '#FE1757'
                          : text == '振铃'
                          ? '#FFCF23'
                          : text == '在线'
                          ? '#10b1e9'
                          : '#75E2EC'
                    }"
                  >
                    {{ text || '--' }}
                  </span>
                </template>
              </a-table>
            </div>
          </subTable>
          <!-- 右部分 -->
          <div class="flex-1 naTableBox">
            <div class="naTableHead font-14">
              <div>{{ $t('ID') }}</div>
              <div>{{ $t('来电号码') }}</div>
              <div>{{ $t('来电时间') }}</div>
              <div>{{ $t('等候时长') }}</div>
              <div>{{ $t('状态') }}</div>
            </div>
            <subTable class="flex-1 fullHeight">
              <div slot="body" ref="rightBoxRef" class="seTableBox tableBoxBody">
                <a-table
                  ref="rightTable"
                  class="rightTableClass"
                  size="small"
                  rowKey="id"
                  :pagination="false"
                  :columns="rightColumns"
                  :data-source="rightTableData"
                >
                  <template slot="zt" slot-scope="text">
                    <span :style="{ color: text === '未处理' ? '#FE1757' : '#26DD7E' }">{{ $t(text) }}</span>
                  </template>
                </a-table>
              </div>
            </subTable>
          </div>
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
import { serverState } from './mock/monitordata.js'
export default {
  components: {
    subTable: () => import('./components/subTable')
  },
  data () {
    return {
      heardImg: '',
      Columns: [{
        title: this.$t('ID'),
        dataIndex: 'id',
        align: 'center'
      }, {
        title: this.$t('姓名'),
        dataIndex: 'user',
        align: 'center'
      }, {
        title: this.$t('分机'),
        dataIndex: 'extension',
        align: 'center'
      }, {
        title: this.$t('持续时间'),
        dataIndex: 'time',
        align: 'center'
      }, {
        title: this.$t('接听量'),
        dataIndex: 'answerVolume',
        align: 'center'

      }, {
        title: this.$t('接听总时长'),
        dataIndex: 'totalAnswerTime',
        align: 'center'

      }, {
        title: this.$t('呼出量'),
        dataIndex: 'callOutVolume',
        align: 'center'

      }, {
        title: this.$t('呼出总时长'),
        dataIndex: 'totalCallOutTime',
        align: 'center'
      }, {
        title: this.$t('状态'),
        dataIndex: 'status',
        align: 'center',
        scopedSlots: { customRender: 'status' }
      }],
      sorter: { field: 'id', order: 'descend' },
      tableData: {},
      tabledata2: [],
      settimeout: 5,
      openExplain: false,
      monitor: {},
      nowTime: null,
      // 时间定时器
      timeid: null,
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
          this.loadTabledata()
          this.changePageCurrent()
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current
          this.paginationOpt.defaultPageSize = size
        }
      },
      rightColumns: [{
        title: this.$t('ID'),
        dataIndex: 'id',
        align: 'center'
      }, {
        title: this.$t('来电号码'),
        dataIndex: 'ldhm',
        align: 'center'
      }, {
        title: this.$t('来电时间'),
        dataIndex: 'ldsj',
        align: 'center'
      }, {
        title: this.$t('等候时长'),
        dataIndex: 'waittime',
        align: 'center'
      }, {
        title: this.$t('状态'),
        dataIndex: 'zt',
        align: 'center',
        scopedSlots: { customRender: 'zt' }
      }],
      rightTableData: [],
      initNum: 1
    }
  },
  mounted () {
    this.changeTime()
    this.getInit()
  },
  activated () {
    if (this.initNum > 1) {
      this.changeTime()
      this.changePageCurrent()
      this.getInit()
    }
  },
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
            const data = serverState({
              url: '/callcenter/monitor/agentStatus',
              rightTotal: 50,
              pageNo: 1,
              pageSize: 20,
              field: 'id',
              order: 'descend'
            }).result.data
            this.tableData = data.agent_data
            this.paginationOpt.total = data.agent_data.totalCount
            this.rightTableData = data.call_data.data
            this.changePageCurrent()
          } else {
            this.loadTabledata()
          }
        }
      })
    },
    setBottom () {
      this.$refs.rightBoxRef.scrollTop = this.$refs.rightBoxRef.scrollHeight
    },
    changePageCurrent () {
      this.timeOutCurrent = setInterval(() => {
        this.paginationOpt.current = this.tableData.data.length < this.paginationOpt.defaultPageSize ? 1 : this.paginationOpt.current += 1
        if (!this.monitor.enable) {
          this.loadTabledata()
        } else {
          this.rightTableData.push({
            id: this.rightTableData.length + 1,
            ldhm: '13898888888',
            ldsj: '22/03/09 09:00:00',
            waittime: '5分钟',
            zt: '未处理'
          })
        }
        if (this.rightTableData.length > 0) {
          this.setBottom()
        }
      }, (this.monitor.refresh || 5) * 1000)
    },
    changeTime () {
      this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      this.timeid = setInterval(() => {
        this.nowTime = this.moment().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    loadTabledata () {
      const parameter = Object.assign({
        pageNo: this.paginationOpt.current,
        pageSize: this.paginationOpt.defaultPageSize,
        field: 'id',
        order: 'descend'
      }, this.queryParam)
      this.axios({
        url: '/callcenter/monitor/agentStatus',
        data: parameter
      }).then(res => {
        this.initNum++
        this.tableData = res.result.data
        this.paginationOpt.total = this.tableData.totalCount
        clearInterval(this.timeOutCurrent)
        this.changePageCurrent()
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-pagination-total-text {
  color: #fff;
}
/deep/.ant-table-column-title {
  font-size: 0.07rem;
}

/deep/.ant-table-tbody {
  font-size: 0.04rem;
}

.explainClass {
  position: absolute;
  top: 35px;
  right: 33px;
  color: #fff;
  font-size: 18px;
}
.topLogo {
  text-align: center;
  padding-top: 0.03rem;
}
.logo {
  width: 0.8rem;
}
.naTableBox {
  position: relative;
}
.naTableHead {
  position: absolute;
  z-index: 30;
  list-style: none;
  display: flex;
  width: 91%;
  justify-content: space-between;
  top: 0.135rem;
  left: 0.1rem;
  color: #fff;
  background-color: #0d44b5;
}
.naTableHead div {
  padding: 9px;
}
.seTableBox {
  height: 77vh;
}

/* 页脚样式 */
.ant-table-pagination.ant-pagination {
  padding-top: 0.2rem;
}

.ant-pagination.mini .ant-pagination-item {
  margin: 0 0.015rem;
}

.ant-pagination.mini .ant-pagination-item:not(.ant-pagination-item-active) {
  background-color: #101e89;
}

/deep/.ant-pagination.mini .ant-pagination-prev .ant-pagination-item-link,
/deep/.ant-pagination-item:not(.ant-pagination-item-active) a,
/deep/.ant-pagination-disabled .ant-pagination-item-link,
/deep/.ant-pagination-next a {
  color: #fff;
}
</style>
