<template>
  <a-spin :spinning="loading">
    <a-card size="small">
      <a-tabs :activeKey="currentKey" @change="handleChange">
        <a-tab-pane key="home" :tab="$t('首页')">
          <SeatStat ref="home" @ok="getSearch" @getUsers="getUsers" @load="getLoading" />
        </a-tab-pane>
        <a-tab-pane key="callOut" :tab="$t('呼出')">
          <SeatCallout ref="callOut" :searchData="searchData" :currentKey="currentKey" :users="users" />
        </a-tab-pane>
        <a-tab-pane key="callIn" :tab="$t('呼入')">
          <SeatCallin ref="callIn" :searchData="searchData" :currentKey="currentKey" :users="users" />
        </a-tab-pane>
        <a-tab-pane key="distribute" :tab="$t('分布')">
          <SeatSpread ref="distribute" :users="users" :currentKey="currentKey" :searchData="searchData" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-spin>
</template>
<script>
import storage from '@/utils/storage'
export default {
  i18n: window.lang('callcenter'),
  components: {
    SeatStat: () => import('./SeatStat'),
    SeatCallout: () => import('./SeatCallout'),
    SeatSpread: () => import('./SeatSpread'),
    SeatCallin: () => import('./SeatCallin')
  },
  data () {
    return {
      loading: false,
      // 初始化表单
      form: this.$form.createForm(this),
      // 搜索数据
      searchData: {},
      // 父标签双向绑定key
      currentKey: 'home',
      users: []
    }
  },
  // 初始化显示穿梭框和报表的数据
  created () {
    this.searchData = storage.get('seatSearch') ? JSON.parse(storage.get('seatSearch')) : this.searchData
  },
  methods: {
    getLoading (val) {
      this.loading = val
    },
    getSearch (val) {
      this.searchData = val
      this.currentKey = 'callOut'
      this.$nextTick(() => {
        storage.set('seatSearch', JSON.stringify(this.searchData))
        this.$refs.callOut.init()
      })
    },
    getUsers (val) {
      this.users = val
    },
    // tab页变更
    handleChange (key) {
      if (key === 'home') {
        this.currentKey = key
      } else {
        this.searchData = this.$refs.home.searchData
        this.$refs.home.form.validateFields((errors, values) => {
          if (!errors) {
            if (this.searchData.seat && this.searchData.startTime) {
              this.currentKey = key
              this.$nextTick(() => {
                storage.set('seatSearch', JSON.stringify(this.searchData))
                this.$refs[key].init()
              })
            } else {
              this.$message.error('请先点击“显示报表”按钮获取相关信息')
            }
          } else {
            if (errors.time) {
              this.$message.error('请在“队列搜索”中选择时间')
            } else if (errors.info.agent) {
              this.$message.error('请在“队列搜索”中选择坐席')
            }
          }
        })
      }
    }
  }
}
</script>
