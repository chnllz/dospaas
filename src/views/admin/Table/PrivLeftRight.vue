<template>
  <a-drawer :title="config.title" :destroyOnClose="true" :width="1200" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="14">
            <a-card size="small">
              <a-tabs default-active-key="user">
                <a-tab-pane key="user" :tab="$t('用户')">
                  <priv-user ref="privUser" @ok="listPush" />
                </a-tab-pane>
                <a-tab-pane key="depart" :tab="$t('部门')">
                  <priv-depart ref="privDepart" @ok="listPush" />
                </a-tab-pane>
                <a-tab-pane key="role" :tab="$t('角色')">
                  <priv-Role ref="privRole" @ok="listPush" />
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </a-col>
          <a-col :span="10">
            <a-button style="margin-bottom: 10px" @click="deleteAll">{{ $t('清空') }}</a-button>
            <a-table size="small" rowKey="id" :columns="columns" :dataSource="list">
              <div slot="action" slot-scope="text, record">
                <a @click="handleDelete(record)">{{ $t('删除') }}</a>
              </div>
            </a-table>
          </a-col>
        </a-row>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('确定') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    PrivUser: () => import('@/views/admin/PrivRange/PrivUser'),
    PrivDepart: () => import('@/views/admin/PrivRange/PrivDepart'),
    PrivRole: () => import('@/views/admin/PrivRange/PrivRole')
  },
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      config: {},
      list: [],
      columns: [{
        title: this.$t('名称'),
        dataIndex: 'name'
      }, {
        title: this.$t('类型'),
        dataIndex: 'type',
        customRender: (text) => {
          if (text === 'user') {
            return this.$t('用户')
          } else if (text === 'role') {
            return this.$t('角色')
          } else {
            return this.$t('部门')
          }
        }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        scopedSlots: { customRender: 'action' }
      }]
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.list = config.selectValue || []
    },
    listPush (data) {
      if (this.list.every(item => item.id !== data.id)) {
        this.list.splice(this.list.length, 0, data)
      }
    },
    // 删除单个数据
    handleDelete (record) {
      this.list = this.list.filter(item => item.id !== record.id)
    },
    // 清空
    deleteAll () {
      this.list = []
    },
    handleSubmit () {
      this.visible = false
      this.$emit('ok', this.list)
    }
  }
}
</script>
