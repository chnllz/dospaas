<template>
  <a-spin :spinning="loading">
    <a-card size="small" :bordered="false">
      <a-form layout="inline" style="display: flex">
        <a-form-item :label="$t('技能组')">
          <a-select
            v-model="queryParam.groupId"
            :allowClear="true"
            showSearch
            option-filter-prop="children"
            mode="multiple"
            style="width: 260px"
          >
            <a-select-option v-for="group in groupData" :key="group.id" :value="group.id">
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-space>
          <a-button htmlType="submit" type="primary" @click="getData">{{ $t('搜索') }}</a-button>
          <a-button @click="reset()">{{ $t('重置') }}</a-button>
        </a-space>
      </a-form>
    </a-card>
    <div class="title">{{ $t('今日会话总览') }}</div>
    <a-card size="small">
      <div style="display: flex; justify-content: space-around; height: 100%">
        <a-card size="small" :title="$t('当前会话数')" style="text-align: center; flex: 1; margin: 8px">
          <a href="#" class="h1">{{ data.totalCount || 0 }}</a>
          <a-row style="padding-top: 8px">
            <a-col :span="14" style="text-align: right">{{ $t('当前登录客服数：') }}</a-col>
            <a-col :span="10" style="text-align: left">{{ data.serviceCount || 0 }}</a-col>
          </a-row>
        </a-card>
        <a-card size="small" :title="$t('当前排队数')" style="text-align: center; flex: 1; margin: 8px">
          <a class="h1" href="#">{{ data.queueCount || 0 }}</a>
          <a-row type="flex" justify="center">
            <a-col :span="14" style="text-align: right">{{ $t('排队总数：') }}</a-col>
            <a-col :span="10" style="text-align: left">{{ data.waitNumber || 0 }}</a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="14" style="text-align: right">{{ $t('排队平均时长：') }}</a-col>
            <a-col :span="10" style="text-align: left">{{ data.averageWaitTime || 0 }}</a-col>
          </a-row>
        </a-card>
        <a-card size="small" :title="$t('会话总数')" style="text-align: center; flex: 1; margin: 8px">
          <a class="h1" href="#">{{ data.conversation || 0 }}</a>
          <a-row type="flex" justify="center">
            <a-col :span="14" style="text-align: right">{{ $t('接通率：') }}</a-col>
            <a-col :span="10" style="text-align: left">
              {{ data.answerPercent === 0 ? '0.00' : data.answerPercent }}%
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="14" style="text-align: right">{{ $t('人工接通量：') }}</a-col>
            <a-col :span="10" style="text-align: left">{{ data.connecteNumber || 0 }}</a-col>
          </a-row>
        </a-card>
        <a-card size="small" :title="$t('平均会话时长')" style="text-align: center; flex: 1; margin: 8px">
          <a class="h1" href="#">{{ data.averagecConversationTime || 0 }}</a>
          <a-row type="flex" justify="center" style="padding-top: 8px">
            <a-col :span="14" style="text-align: right">{{ $t('平均首响时长：') }}</a-col>
            <a-col :span="10" style="text-align: left">{{ data.averageFirstAnswerTime || 0 }}</a-col>
          </a-row>
        </a-card>
        <a-card size="small" :title="$t('满意度')" style="text-align: center; flex: 1; margin: 8px">
          <a class="h1" href="#">{{ data.commentSatisfiedPercent === 0 ? '0.00' : data.commentSatisfiedPercent }}%</a>
          <a-row type="flex" justify="center" style="padding-top: 8px">
            <a-col :span="13" style="text-align: right">{{ $t('参评率：') }}</a-col>
            <a-col :span="11" style="text-align: left">
              {{ data.commentPercent === 0 ? '0.00' : data.commentPercent }}%
            </a-col>
          </a-row>
        </a-card>
      </div>
    </a-card>
    <div class="title">{{ $t('今日会话分布') }}</div>
    <a-card size="small">
      <vueEcharts ref="main" :options="options" :auto-resize="true" style="width: 100%"></vueEcharts>
    </a-card>
  </a-spin>
</template>
<script>
import echarts from 'echarts'
import vueEcharts from 'vue-echarts'
export default {
  i18n: window.lang('chat'),
  components: {
    echarts,
    vueEcharts
  },
  data () {
    return {
      loading: false,
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      groupData: [],
      myChart: '',
      data: {},
      conversations: [],
      connecteNumbers: [],
      unConnecteNumbers: [],
      waitNumbers: [],
      options: {},
      Interval: null
    }
  },
  mounted () {
    this.getGroupList()
    this.getData()
  },
  activated () {
    this.runtime()
  },
  // 销毁定时器
  deactivated () {
    clearInterval(this.Interval)
  },
  methods: {
    runtime () {
      this.Interval = setTimeout(() => {
        this.getData()
      }, 30 * 1000)
    },
    getData () {
      this.loading = true
      this.axios({
        url: '/chat/report/init',
        data: Object.assign(this.queryParam)
      }).then(res => {
        this.data = res.result.data
        this.conversations = res.result.conversations
        this.connecteNumbers = res.result.connecteNumbers
        this.unConnecteNumbers = res.result.unConnecteNumbers
        this.waitNumbers = res.result.waitNumbers
        this.myEcharts()
        this.loading = false
        const strArr = ['averageWaitTime', 'averagecConversationTime', 'averageFirstAnswerTime']
        strArr.forEach(element => {
          let sec = parseInt(this.data[element])
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
          this.data[element] = `${parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour)}:${parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min)}:${parseInt(sec) < 10 ? '0' + parseInt(sec) : parseInt(sec)}`
        })

        clearInterval(this.Interval)
        this.runtime()
      })
    },
    // 获取技能组
    getGroupList () {
      return this.axios({
        url: '/chat/group/groupList'
      }).then(res => {
        this.groupData = res.result
      })
    },
    reset () {
      this.queryParam = {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
      this.getData()
    },
    myEcharts () {
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
          data: [this.$t('会话总数'), this.$t('已接入会话数'), this.$t('未接入会话数'), this.$t('排队数')]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.$t('0时'), this.$t('1时'), this.$t('2时'), this.$t('3时'), this.$t('4时'), this.$t('5时'), this.$t('6时'), this.$t('7时'), this.$t('8时'), this.$t('9时'), this.$t('10时'), this.$t('11时'), this.$t('12时'), this.$t('13时'), this.$t('14时'), this.$t('15时'), this.$t('16时'), this.$t('17时'), this.$t('18时'), this.$t('19时'), this.$t('20时'), this.$t('21时'), this.$t('22时'), this.$t('23时')]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: this.$t('会话总数'),
          data: this.conversations,
          type: 'line'
        }, {
          name: this.$t('已接入会话数'),
          data: this.connecteNumbers,
          type: 'line'
        }, {
          name: this.$t('未接入会话数'),
          data: this.unConnecteNumbers,
          type: 'line'
        }, {
          name: this.$t('排队数'),
          data: this.waitNumbers,
          type: 'line'
        }]
      }
      window.onresize = () => {
        setTimeout(() => {
          this.$refs.main.resize()
        }, 500)
      }
    }
  }
}
</script>
<style scoped>
.title {
  margin: 10px;
  font-size: 18px;
}
.h1 {
  height: 80px;
  font-size: 50px;
  cursor: inherit;
}
</style>
