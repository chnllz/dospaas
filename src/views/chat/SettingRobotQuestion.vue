<template>
  <div>
    <a-card size="small" :bordered="true" style="margin-bottom: 8px">
      <a-form layout="inline" style="display: flex">
        <a-form-item :label="$t('标准问法')">
          <a-input v-model="queryParam.title"></a-input>
        </a-form-item>
        <a-space>
          <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam.title = ''
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
          <a-button type="primary" icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length == 0" @click="deleteQuestion">
            {{ $t('批量删除') }}
          </a-button>
        </a-space>
      </a-form>
    </a-card>
    <s-table
      ref="table"
      size="small"
      rowKey="id"
      :columns="columnsList"
      :data="loadDataTable"
      :rowSelection="rowSelection"
      :sorter="{ field: 'id', order: 'descend' }"
    ></s-table>
    <setting-robot-question-add ref="SettingRobotQuestionAdd" :robotId="robotId" @ok="$refs.table.refresh(true)" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  components: {
    SettingRobotQuestionAdd: () => import('./SettingRobotQuestionAdd')
  },
  props: {
    robotId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      // 搜索参数
      queryParam: {
        robotId: this.robotId,
        commonProblem: 1
      },
      columnsList: [{
        title: this.$t('标准问法'),
        dataIndex: 'title'
      }, {
        title: this.$t('标准答案'),
        dataIndex: 'content'
      }, {
        title: this.$t('相似问法'),
        dataIndex: 'similar'
      }, {
        title: this.$t('更新时间'),
        dataIndex: 'updateTime',
        width: 200
      }]
    }
  },
  methods: {
    loadDataTable (parameter) {
      return this.axios({
        url: '/chat/robotQuestion/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    handleAdd () {
      this.$refs.SettingRobotQuestionAdd.show()
    },
    deleteQuestion () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning(this.$t('请选择'))
        return
      }
      const that = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          that.axios({
            url: '/chat/robotQuestion/edit',
            data: {
              commonProblem: 0,
              id: that.selectedRowKeys
            }
          }).then(res => {
            if (res.code === 0) {
              that.$message.success(res.message)
              that.$refs.table.refresh(true)
            }
          })
        }
      })
    }
  }
}
</script>
