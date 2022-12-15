<template>
  <a-spin :spinning="loading">
    <a-form :form="form">
      <a-input-search
        v-model="queryParam.roleName"
        style="margin-bottom: 8px"
        :placeholder="$t('请输入角色名称')"
        @search="$refs.tableRole.refresh(true)"
      />
      <s-table
        ref="tableRole"
        size="small"
        rowKey="roleId"
        :columns="columnsRole"
        :data="loadDataTable"
        :sorter="{ field: 'listOrder', order: 'ascend' }"
      >
        <div slot="action" slot-scope="text, record">
          <a @click="dataSelect(record, 'role')">{{ $t('选择') }}</a>
        </div>
      </s-table>
    </a-form>
  </a-spin>
</template>
<script>
export default {
  data () {
    return {
      queryParam: {},
      loading: false,
      form: this.$form.createForm(this),
      columnsRole: [{
        title: this.$t('角色'),
        dataIndex: 'roleName'
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 50,
        scopedSlots: { customRender: 'action' }
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/role/list',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 选择角色
    dataSelect (record) {
      const obj = {
        id: record.roleId,
        name: record.roleName,
        type: 'role'
      }
      this.$emit('ok', obj)
    }
  }
}
</script>
