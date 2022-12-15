<template>
  <div>
    <a-form layout="inline" style="display: flex; align-item: center">
      <a-form-item :label="$t('变迁名称')">
        <a-input v-model="queryParam.transitionName" />
      </a-form-item>
      <a-space>
        <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
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
      </a-space>
    </a-form>
    <s-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <span slot="transitionName" slot-scope="text">
        {{ text.transitionName }}
      </span>
    </s-table>
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  props: {
    item: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('变迁编号'),
        dataIndex: 'transitionId'
      }, {
        title: this.$t('变迁名称'),
        dataIndex: 'transitionName'
      }, {
        title: this.$t('用户设置'),
        dataIndex: 'triggerUser'
      }, {
        title: this.$t('更新时间'),
        dataIndex: 'updateTime',
        width: 140,
        sorter: true
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/transition/init',
        data: Object.assign(parameter, this.queryParam, { workflowId: this.item.workflowId })
      }).then(res => {
        return res.result
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
