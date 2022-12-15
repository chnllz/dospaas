<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="1000" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div>
        <a-row :gutter="10">
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
            <a-popconfirm
              :title="$t('您确定要清空所有记录吗？')"
              :ok-text="$t('确认')"
              :cancel-text="$t('取消')"
              @confirm="deleteAll"
            >
              <a-button style="margin-bottom: 10px">{{ $t('清空') }}</a-button>
            </a-popconfirm>
            <a-table size="small" rowKey="id" :columns="columns" :dataSource="list" :pagination="{ pageSize: 20 }">
              <div slot="action" slot-scope="text, record">
                <a @click="handleDelete(record)">{{ $t('删除') }}</a>
              </div>
            </a-table>
          </a-col>
        </a-row>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
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
  props: {
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      replaceFields: {
        title: 'title',
        key: 'value'
      },
      activeKey: 'user',
      userParamType: 'username',
      config: {},
      defaultFlag: false,
      visible: false,
      loading: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      form: this.$form.createForm(this),
      data: [],
      userListData: [],
      columns: [{
        title: this.$t('名称'),
        dataIndex: 'name',
        width: 200
      }, {
        title: this.$t('类型'),
        dataIndex: 'type',
        customRender: (text) => {
          if (text === 'user') {
            return '用户'
          } else if (text === 'role') {
            return '角色'
          } else {
            return '部门'
          }
        }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        scopedSlots: { customRender: 'action' }
      }],
      autoExpandParent: false,
      departmentArr: [],
      userParam: {},
      departLead: [],
      departUser: [],
      list: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      this.userParam = {}
      this.data = config.record
      this.activeKey = 'user'
      this.userListData = config.record || []
      if (config.record) {
        this.list = this.userListData
      }
    },
    getDepartLead (val) {
      this.departLead = val
    },
    getDepartUser (val) {
      this.departUser = val
    },
    getCover (val) {
      this.cover = val ? '1' : '0'
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
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.$message.success(this.$t('操作成功'))
          this.$emit('func', this.list)
        }
      })
    }
  }
}
</script>
