<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card :title="$t('搜索')" size="small">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)" @keydown.enter="$refs.table.refresh(true)">
            {{ $t('搜索') }}
          </a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('账号')">
              <a-input v-model="queryParam.username" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('真实姓名')">
              <a-input v-model="queryParam.realName" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('分机号码')">
              <a-input v-model="queryParam.extension" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      class="table-fill"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">{{ $t('权限设置') }}</a>
      </div>
    </s-table>
    <priv-range ref="privRange" :key="privKey" :setting="priv" @ok="getPriv" />
  </div>
</template>
<script>

export default {
  components: { PrivRange: () => import('../admin/PrivRange/PrivRange') },
  i18n: window.lang('admin'),
  data () {
    return {
      advanced: false,
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 60,
        sorter: true
      }, {
        title: this.$t('账号'),
        dataIndex: 'username',
        sorter: true
      }, {
        title: this.$t('真实姓名'),
        dataIndex: 'realName',
        sorter: true
      }, {
        title: this.$t('分机号码'),
        dataIndex: 'extension',
        sorter: true
      }],
      privKey: 'privKey',
      priv: {}
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/quality/priv/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleEdit (record) {
      this.privKey = this.privKey === 'privKey' ? 'privKey_1' : 'privKey'
      const setting = JSON.parse(record.setting)
      this.priv = {
        list: setting && setting.appendPermissionsList || [],
        departUser: setting && setting.departUser || ['own']
      }
      this.$nextTick(() => {
        this.$refs.privRange.show({
          page: 'quality',
          username: record.username
        })
      })
    },
    // 获取访问范围
    getPriv (val) {
      this.priv = val
      const data = Object.assign({
        username: val.username,
        setting: JSON.stringify(Object.assign({
          appendPermissionsList: val.list,
          departUser: val.departUser
        }))
      })
      this.axios({
        url: '/quality/priv/savePriv',
        data: data
      }).then(res => {
        if (res.code === 0) {
          this.$refs.table.refresh(true)
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>
