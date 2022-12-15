<template>
  <a-drawer :destroyOnClose="true" :title="$t('转办')" :width="900" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }" :label="$t('备注')" style="margin-top: 10px">
          <a-textarea
            v-decorator="['remark', { rules: [{ required: true, message: $t('备注不能为空') }] }]"
            :rows="3"
          />
        </a-form-item>
        <a-form-item :label="$t('转办给')" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }" :required="true">
          <a-card
            v-if="userListData.length > 0"
            size="small"
            style="border: 1px dashed #e8e8e8"
            @mouseenter="delShow = true"
            @mouseleave="delShow = false"
          >
            <a-tooltip :title="$t('清空')">
              <a-icon
                v-if="delShow"
                type="delete"
                style="position: absolute; top: 3px; right: 3px; color: #f5222d"
                @click="userListData = []"
              />
            </a-tooltip>
            <a-row :gutter="[0, 5]" type="flex">
              <a-col v-for="tag in userListData" :key="tag.username">
                <a-tag closable @close="deleteTag(tag)">{{ tag.username }}</a-tag>
              </a-col>
            </a-row>
          </a-card>
          <a-card v-else size="small" style="text-align: center; border: 1px dashed #e8e8e8; color: #7f7f7f">
            {{ $t('暂无数据') }}
          </a-card>
        </a-form-item>
        <a-row type="flex" style="margin: 10px 0">
          <a-col flex="180px" style="padding-right: 10px">
            <a-form-item>
              <a-select v-model="userParamType" @change="queryParam = {}">
                <a-select-option value="username">{{ $t('账号') }}</a-select-option>
                <a-select-option value="department">{{ $t('部门') }}</a-select-option>
                <a-select-option value="role">{{ $t('角色') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col flex="auto">
            <a-form-item v-if="userParamType === 'username'">
              <a-input-search
                :placeholder="$t('请输入账号搜索')"
                @search="
                  (e) => {
                    queryParam.username = e
                    $refs.table.refresh(true)
                  }
                "
              />
            </a-form-item>
            <a-form-item v-else-if="userParamType === 'department'">
              <a-input-search
                :placeholder="$t('请输入部门名称搜索')"
                @search="
                  (e) => {
                    queryParam.departmentName = e
                    $refs.table.refresh(true)
                  }
                "
              />
            </a-form-item>
            <a-form-item v-else>
              <a-input-search
                :placeholder="$t('请输入角色名称搜索')"
                @search="
                  (e) => {
                    queryParam.roleName = e
                    $refs.table.refresh(true)
                  }
                "
              />
            </a-form-item>
          </a-col>
        </a-row>
        <s-table
          ref="table"
          size="small"
          rowKey="username"
          :columns="columns"
          :data="loadDataTable"
          :sorter="{ field: 'id', order: 'descend' }"
        >
          <span slot="action" slot-scope="index, record">
            <a href="javascript:;" @click="dataSelect(record)">{{ $t('选择') }}</a>
          </span>
        </s-table>
      </a-form>
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
  data () {
    return {
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      config: {},
      userListData: [],
      scrollStats: true,
      delShow: false,
      parameter: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      queryParam: {}, // 搜索参数
      columns: [{
        title: this.$t('操作'),
        align: 'center',
        dataIndex: 'id',
        width: 50,
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('账号'),
        dataIndex: 'username',
        sorter: true
      }, {
        title: this.$t('真实姓名'),
        dataIndex: 'realName',
        sorter: true
      }, {
        title: this.$t('所属部门'),
        dataIndex: 'departmentName',
        sorter: true
      }, {
        title: this.$t('所属角色'),
        dataIndex: 'roleName',
        sorter: true
      }],
      columnsDepartment: [{
        title: this.$t('部门'),
        dataIndex: 'text'
      }],
      userParamType: 'username'
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/centerflow/transferUsers',
        data: Object.assign(parameter, this.queryParam, { caseId: this.config.caseId })
      }).then(res => {
        this.config.mode = res.result.selectMode || 'multiple'
        return res.result
      })
    },
    dataSelect (record) {
      if (this.userListData.length === 0 && this.config.mode === 'default') {
        this.userListData.push(record)
      } else if (this.config.mode === 'default') {
        this.userListData.splice(0, 1, record)
      } else if (this.config.mode === 'multiple') {
        this.userListData.splice(this.userListData.length, 0, record)
        this.userListData = [...new Set(this.userListData)]
      }
    },
    deleteTag (record) {
      if (this.config.mode === 'default') {
        this.userListData = []
      } else if (this.config.mode === 'multiple') {
        this.userListData = this.userListData.filter(item => item.username !== record.username)
      }
    },
    handleSubmit () {
      if (this.userListData.length) {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            this.loading = true
            const user = this.userListData.map(item => item.username).toString()
            const data = {
              caseId: this.config.caseId,
              handleRemarks: values.remark,
              handleWay: '转办',
              transferUsers: user
            }
            this.axios({
              url: '/admin/processEngine/transfer',
              data
            }).then(res => {
              if (res.code > 0) {
                this.$message.error(res.message)
              } else {
                this.visible = false
                this.loading = false
                this.$message.success(res.message)
                this.$emit('ok')
              }
            })
          }
        })
      } else {
        this.$message.error(this.$t('请选择被转办人'))
      }
    }
  }
}
</script>
