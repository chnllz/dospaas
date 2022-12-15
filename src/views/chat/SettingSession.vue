<template>
  <a-spin :spinning="loading">
    <a-tabs tabPosition="left" :activeKey="activeKey" @change="(e) => (activeKey = e)">
      <a-tab-pane key="beforeSession" :tab="$t('会话前')">
        <setting-session-before :baseAll="baseAll" :groupList="groupList" @ok="setLoading" />
      </a-tab-pane>
      <a-tab-pane key="inSession" :tab="$t('会话中')">
        <setting-session-in :baseAll="baseAll" :groupList="groupList" @ok="setLoading" />
      </a-tab-pane>
      <a-tab-pane key="satisfaction" :tab="$t('满意度评价')">
        <setting-satisfaction :parent="baseAll" :groupList="groupList" @ok="setLoading" />
      </a-tab-pane>
      <a-tab-pane key="endSession" :tab="$t('会话结束')">
        <setting-session-end :baseAll="baseAll" :groupList="groupList" @ok="setLoading" />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    SettingSessionBefore: () => import('./SettingSessionBefore'),
    SettingSessionIn: () => import('./SettingSessionIn'),
    SettingSessionEnd: () => import('./SettingSessionEnd'),
    SettingSatisfaction: () => import('./SettingSatisfaction')
  },
  props: {
    baseAll: {
      type: Object,
      default () {
        return {}
      }
    },
    groupList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      activeKey: 'beforeSession',
      parent: {},
      loading: false
    }
  },
  methods: {
    setLoading (bool) {
      this.loading = bool
    }
  }
}
</script>
