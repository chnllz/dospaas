<template>
  <a-drawer :destroyOnClose="true" title="进度查询" :visible="visible" :width="800" @close="handleCancel">
    <a-spin :spinning="loading">
      <div class="wrapper">
        <a-card style="background-color: #f9f9f9" :bordered="false">
          <a-form :form="form" layout="inline">
            <a-form-item label="物流公司" style="margin-left: 6px">
              <a-select v-model="queryParam.com" style="width: 200px" showSearch option-filter-prop="children">
                <a-select-option v-for="item in expressCompany" :key="item.value" :value="item.dictDataNumber">
                  {{ item.dictDataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="物流单号">
              <a-row type="flex" align="middle">
                <a-col><a-input v-model="queryParam.num" style="width: 200px"></a-input></a-col>
                <a-col><a-button type="primary" style="margin-left: 10px" @click="search">查询</a-button></a-col>
              </a-row>
            </a-form-item>
          </a-form>
        </a-card>
        <div class="logisticsInfo">物流信息与官网实时同步，已耗时{{ consumptionTime }}</div>
        <a-timeline
          v-if="logisticsList.length > 0"
          mode="alternate"
          style="font-size: 14px; padding-right: 40px; flex: 1; overflow-y: auto"
        >
          <a-timeline-item
            v-for="(item, index) in logisticsList"
            :key="index"
            :color="index == 0 ? 'red' : '#b1a9a9'"
            style="margin: 5px 0"
          >
            <div v-if="index == 0" class="newest">最新</div>
            <div :style="index == 0 ? 'color: red;' : 'color: #b1a9a9;'">{{ item.name }}</div>
            <div style="word-break: break-all" :style="index == 0 ? 'color: red;' : 'color: #b1a9a9;'">
              {{ item.value }}
            </div>
          </a-timeline-item>
        </a-timeline>
        <a-empty v-else style="flex: 1" :description="message.length > 0 ? message : '查询无结果，请隔段时间再查'" />
      </div>
      <div class="bbar">
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import { Timeline } from 'ant-design-vue'
import Vue from 'vue'
Vue.use(Timeline)
export default {
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      queryParam: {
        com: '',
        num: ''
      },
      expressCompany: [],
      logisticsList: [],
      mode: 'left',
      consumptionTime: '0天0时0分',
      message: ''
    }
  },
  methods: {
    show (config) {
      const { visible, com, num } = config
      this.visible = visible
      if (com && num) {
        this.queryParam.com = com
        this.queryParam.num = num
      }
      this.search()
      this.getExpressCompany()
    },
    getExpressCompany () {
      this.axios({
        url: '/admin/dict/initData',
        data: {
          dictCategoryNumber: 'wuLiuGongSi'
        }
      }).then(res => {
        if (res.code === 0) {
          this.expressCompany = res.result
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.queryParam = {
        com: '',
        num: ''
      }
      this.consumptionTime = '0天0时0分'
      this.form.resetFields()
      this.logisticsList = []
    },
    getTimes (d1, d2) {
      const d = this.moment(d1).diff(d2, 'days')
      const h = this.moment(d1).diff(d2, 'hours')
      const m = this.moment(d1).diff(d2, 'minutes')
      const h1 = h - d * 24
      const m1 = m - h * 60
      return `${d}天${h1}时${m1}分`
    },
    search () {
      const { com, num } = this.queryParam
      if (!com || !num) return
      this.loading = true
      this.axios({
        url: '/admin/express/query',
        data: this.queryParam,
        tips: false
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.logisticsList = res.result.data
          const length = this.logisticsList.length - 1
          const time1 = this.logisticsList[0].name
          const time2 = this.logisticsList[length].name
          this.consumptionTime = this.getTimes(time1, time2)
        } else {
          this.logisticsList = []
          this.message = res.message
          if (this.message.includes('不支持此快递公司')) {
            this.message = '不支持该快递公司查询进度'
          }
          this.consumptionTime = '0天0时0分'
        }
      })
    }
  }
}
</script>
<style  scoped>
.logisticsInfo {
  padding: 5px 0 5px 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
}
.newest {
  background-color: #ff0000;
  color: #fff;
  width: 50px;
  text-align: center;
  line-height: 25px;
  height: 25px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
