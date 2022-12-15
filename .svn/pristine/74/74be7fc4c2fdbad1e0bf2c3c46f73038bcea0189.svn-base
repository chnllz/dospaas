<template>
  <div>
    <a-card size="small" class="table-search" :bordered="false">
      <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'">
        <div class="head">
          <div class="title">过滤</div>
          <a-space style="margin-left: 8px">
            <a-button htmlType="submit" type="primary" @click="getData">搜索</a-button>
            <a-button
              @click="
                () => {
                  queryParam = {}
                  getData()
                }
              "
            >
              重置
            </a-button>
          </a-space>
        </div>
        <a-row :gutter="16">
          <a-col v-if="advanced" span="24">
            <div class="divider"></div>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.username" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="分机">
              <a-input v-model="queryParam.extension" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item label="部门">
              <department-search
                @ok="
                  (e) => {
                    queryParam.departmentId = e
                  }
                "
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-row justify="space-between" type="flex">
      <a-col v-for="(item, index) in cardData" :key="index" style="width: 13.5%">
        <a-card size="small" :bordered="true" :class="'cardStyle ' + item.type" @click="agentOnShow(item)">
          <div class="num">
            <a slot="extra" href="#" class="color">{{ item.num }}</a>
          </div>
          <div class="line"></div>
          <p class="text">{{ item.text }}</p>
        </a-card>
      </a-col>
    </a-row>
    <div style="margin: 8px 0">
      <a-card size="small">
        <a-button icon="stop" class="btn" @click="handlerControl('dndon')">示忙</a-button>
        <a-button icon="check-circle" class="btn" @click="handlerControl('dndoff')">示闲</a-button>
        <a-button icon="phone" class="btn" @click="handlerControl('dial')">呼叫</a-button>
        <a-button icon="retweet" class="btn" @click="handlerControl('transout')">转接</a-button>
        <a-button icon="swap" class="btn" @click="handlerControl('transin')">强插</a-button>
        <a-button icon="disconnect" class="btn" @click="handlerControl('hangup')">强拆</a-button>
        <a-button icon="login" class="btn" @click="handlerControl('chanspyb')">监听</a-button>
        <a-button icon="logout" class="btn" @click="handlerControl('chanspyw')">密语</a-button>
        <a-button icon="info-circle" style="width: 100px" @click="handlerControl('chanspyw2')">求助</a-button>
      </a-card>
    </div>
    <a-card size="small">
      <a-card
        v-for="(item, index) in usersData"
        v-show="agentShow.includes(item.type)"
        :key="index"
        size="small"
        hoverable
        :bodyStyle="{ padding: '2px' }"
        :bordered="false"
        :style="{ display: 'inline-block' }"
        class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-8 ant-col-xl-6 ant-col-xxl-4"
        @click="SetBorder(item, index)"
      >
        <div
          :class="activeClass == index ? 'active' : 'static'"
          :style="{ background: item.bg, display: 'flex', padding: '10px', margin: '2px' }"
        >
          <a-card-meta>
            <a-avatar slot="avatar" :src="item.url" style="width: 80px; height: 80px; margin-top: 12px" />
          </a-card-meta>
          <div>
            <div style="width: 120px; margin: 0">状态: {{ item.status }}</div>
            <a-tooltip placement="topLeft" :title="'分机: ' + item.num">
              <div
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 120px; margin: 5px 0 0 0"
              >
                分机: {{ item.num }}
              </div>
            </a-tooltip>
            <a-tooltip placement="topLeft" :title="'姓名: ' + item.user">
              <div
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 120px; margin: 5px 0 0 0"
              >
                姓名: {{ item.user }}
              </div>
            </a-tooltip>
            <div style="width: 120px; margin: 5px 0 0 0">持续时间: {{ item.time }}</div>
          </div>
        </div>
      </a-card>
    </a-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    DepartmentSearch: () => import('@/views/admin/Department/DepartmentSearch')
  },
  data () {
    return {
      cardData: [{
        num: 0,
        type: 'all',
        text: '坐席总数'
      }, {
        num: 0,
        type: 'zaixian',
        text: '签入数量'
      }, {
        num: 0,
        type: 'tonghua',
        text: '通话数量'
      }, {
        num: 0,
        type: 'zhenling',
        text: '振铃数量'
      }, {
        num: 0,
        type: 'kongxian',
        text: '空闲数量'
      }, {
        num: 0,
        type: 'shimang',
        text: '示忙数量'
      }, {
        num: 0,
        type: 'lixian',
        text: '签出数量'
      }],
      usersData: [],
      activeClass: '-1',
      advanced: false,
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6
      },
      timeOut: null,
      agentShow: [
        'all',
        'zaixian',
        'tonghua',
        'zhenling',
        'kongxian',
        'shimang',
        'lixian'
      ],
      queryParam: {},
      timeId: null
    }
  },
  computed: {
    ...mapGetters(['setting', 'userInfo'])
  },
  mounted () {
    this.getData()
  },
  activated () {
    this.upData()
  },
  deactivated () {
    clearInterval(this.timeId)
  },
  methods: {
    getData () {
      this.axios({
        url: '/monitor/agent/init',
        data: Object.assign(this.queryParam, this.$route.query),
        timeout: 5 * 60 * 1000
      }).then(res => {
        for (const index in this.cardData) {
          this.cardData[index].num = res.result.cardData[this.cardData[index].type]
        }
        this.usersData = res.result.usersData
      })
    },
    upData (timeout = 100000) {
      const that = this
      this.timeId = setInterval(() => {
        that.getData()
      }, timeout)
    },
    SetBorder (item, index) {
      this.activeClass = index
    },
    handlerControl (type) {
      var that = this
      var extension = this.userInfo.extension
      var httpurl = ''
      if (type && this.activeClass > -1) {
        var currentExten = this.usersData[this.activeClass].num
        if (type === 'dndon') {
          // 示忙
          httpurl = 'admin/api/setdnd?extension=' + currentExten + '&dnd=1&system_parameter='
        } else if (type === 'dndoff') {
          // 示闲
          httpurl = 'admin/api/setdnd?extension=' + currentExten + '&dnd=-1&system_parameter='
        } else if (type === 'dial') {
          // 呼叫
          httpurl = 'admin/api/dial?extension=' + extension + '&extensionDst=' + currentExten
        } else if (type === 'transout') {
          // 转接
          httpurl = 'admin/api/transfer?extension=' + extension + '&extensionDst=' + currentExten
        } else if (type === 'transin') {
          // 强插
          httpurl = 'admin/api/transfer?extension=' + currentExten + '&extensionDst=' + extension
        } else if (type === 'hangup') {
          // 强拆
          httpurl = 'admin/api/hangup?extension=' + currentExten
        } else if (type === 'chanspyb') {
          // 监听
          httpurl = 'admin/api/chanspy?extension=' + extension + '&extensionDst=' + currentExten + '&option=b'
        } else if (type === 'chanspyw') {
          // 密语
          httpurl = 'admin/api/chanspy?extension=' + extension + '&extensionDst=' + currentExten + '&option=w'
        } else if (type === 'chanspyw2') {
          // 求助
          httpurl = 'admin/api/chanspy?extension=' + currentExten + '&extensionDst=' + extension + '&option=w'
        }
        this.axios({
          url: httpurl,
          data: this.queryParam
        }).then(res => {
          that.getData()
          this.$message.success(res.message)
        })
      } else {
        this.$message.info('请选择您要操作的坐席')
      }
    },
    agentOnShow (item) {
      if (item.type === 'all') {
        this.agentShow = [
          'all',
          'zaixian',
          'tonghua',
          'zhenling',
          'kongxian',
          'shimang',
          'lixian'
        ]
      } else if (item.type === 'zaixian') {
        this.agentShow = [
          'zaixian',
          'tonghua',
          'zhenling',
          'kongxian',
          'shimang'
        ]
      } else {
        this.agentShow = [
          item.type
        ]
      }
    }
  }
}
</script>
<style scoped>
.active {
  border: 2px solid #722ed1;
}

.static {
  border: 2px solid #ffffff00;
}

.btn {
  margin-right: 10px;
  width: 100px;
}

.cardStyle {
  flex: 1;
  text-align: left;
  font-weight: bold;
}

.num {
  height: 50px;
  font-size: 30px;
  margin: 10px 0;
  color: #fff;
}

.line {
  height: 2px;
  background: #fff;
}

.text {
  color: #fff;
  margin-top: 10px;
}

.color {
  color: #fff;
}

.all {
  background: #2ec7c9;
}
.zaixian {
  background: #b6a2de;
}
.tonghua {
  background: #5ab1ef;
}
.zhenling {
  background: #ffb980;
}
.kongxian {
  background: #d87a80;
}
.shimang {
  background: #e5cf0d;
}
.lixian {
  background: #cccccc;
}
</style>
