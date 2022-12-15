<template>
  <a-card size="small" :bordered="false" style="height: 100%; overflow: hidden">
    <a-tabs size="small">
      <a-tab-pane key="1" :tab="$t('公共知识库')">
        <IndexInitCommon type="public" page="init" />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('热门知识')">
        <IndexInitCommon type="Hot" page="init" />
      </a-tab-pane>
      <a-tab-pane key="3" :tab="$t('最新知识')">
        <IndexInitCommon type="Newest" page="init" />
      </a-tab-pane>
      <a-tab-pane key="4" :tab="$t('已过期知识')">
        <IndexInitCommon type="pastDue" page="init" />
      </a-tab-pane>
      <a-tab-pane v-if="$auth('all')" key="5">
        <span slot="tab">
          <a-badge :count="total">
            {{ $t('未读消息') }}
          </a-badge>
        </span>
        <IndexInitCommon type="waitRead" page="init" @read="handleRead" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
    IndexInitCommon: () => import('./IndexInitCommon')
  },
  data () {
    return {
      total: 0
    }
  },
  created () {
    this.axios({
      url: '/knowledge/index/unreadKnowledge'
    }).then(res => {
      this.total = res.result.count
    })
  },
  methods: {
    handleRead () {
      this.total--
    }
  }
}
</script>
