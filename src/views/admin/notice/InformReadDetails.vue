<template>
  <a-modal
    :title="$t('成员阅读情况')"
    :visible="visible"
    :bodyStyle="{ padding: '0px' }"
    :destroyOnClose="true"
    centered
    @cancel="visible = !visible"
  >
    <a-tabs v-model="activeKey" :tabBarStyle="{ margin: '0px' }">
      <a-tab-pane
        key="read"
        :tab="$t('已读·{0}', { 0: receiverReadAll.length })"
        style="height: 500px; overflow: auto"
        @scroll.native="handleScroll"
      >
        <a-row v-if="receiverRead.length" type="flex" align="middle">
          <a-col
            v-for="(nameItem, nameIndex) in receiverRead"
            :key="nameIndex"
            :span="24"
            style="border: 1px solid #e8e8e8; line-height: 30px; padding-left: 10px"
          >
            {{ nameItem }}
          </a-col>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane
        key="unread"
        :tab="$t('未读·{0}', { 0: unreadAll.length })"
        style="height: 500px; overflow: auto"
        @scroll.native="handleScroll"
      >
        <a-row v-if="unread.length" type="flex" align="middle">
          <a-col
            v-for="(nameItem, nameKey) in unread"
            :key="nameKey"
            :span="24"
            style="border: 1px solid #e8e8e8; line-height: 30px; padding-left: 10px"
          >
            {{ nameItem }}
          </a-col>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
    </a-tabs>
    <div slot="footer">
      <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      visible: false,
      activeKey: 'read',
      config: {},
      data: {},
      receiverRead: [],
      receiverReadAll: [],
      receiverAll: [],
      receiver: [],
      unread: [],
      unreadAll: [],
      page: 1,
      readPage: 1
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.activeKey = config.type
      this.data = config.record || {}
      this.unreadAll = this.data.unread ? this.data.unread : []
      this.receiverReadAll = this.data.receiverRead ? this.data.receiverRead.split(',') : []
      this.unread = this.unreadAll.filter((item, index) => index < 50)
      this.receiverRead = this.data.receiverRead ? this.data.receiverRead.split(',').filter((item, index) => index < 50) : []
    },

    handleScroll (e) {
      const scrollTop = e.target.scrollTop
      const scrollHeight = e.target.scrollHeight
      const clientHeight = e.target.clientHeight
      const scrollBottom = scrollHeight - clientHeight - scrollTop
      if (scrollBottom < 1) {
        if (this.activeKey === 'read') {
          this.readPage++
          this.receiverRead = this.receiverReadAll.filter((item, index) => index < (this.readPage * 50))
        } else if (this.activeKey === 'unread') {
          this.page++
          this.unread = this.unreadAll.filter((item, index) => index < (this.page * 50))
        }
      }
    }
  }
}
</script>
