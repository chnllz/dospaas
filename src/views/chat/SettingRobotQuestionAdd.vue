<template>
  <a-drawer :destroyOnClose="true" :title="$t('添加')" :width="1000" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="false">
      <a-card size="small">
        <a-form layout="inline" style="display: flex; margin-bottom: 8px">
          <a-form-item :label="$t('标准问法')">
            <a-input v-model="queryParamAdd.title"></a-input>
          </a-form-item>
          <a-space>
            <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
            <a-button
              @click="
                queryParamAdd.title = ''
                $refs.table.refresh(true)
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
          :columns="columnsListAdd"
          :data="loadDataTableAdd"
          :rowSelection="rowSelection"
          :sorter="{ field: 'id', order: 'descend' }"
        ></s-table>
      </a-card>
      <div class="bbar">
        <a-button type="primary" html-type="submit" @click="handleSubmitAdd">{{ $t('确定') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('chat'),
  props: {
    robotId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      queryParamAdd: {
        title: '',
        robotId: this.robotId,
        commonProblem: 0
      },
      columnsListAdd: [{
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
      }],
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
        }
      },
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = !this.visible
    },
    handleSubmitAdd () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning(this.$t('请至少选择一条记录'))
        return
      }
      this.axios({
        url: '/chat/robotQuestion/edit',
        data: {
          commonProblem: 1,
          id: this.selectedRowKeys
        }
      }).then(res => {
        if (res.code === 0) {
          this.visible = !this.visible
          this.$message.success(res.message)
          this.$emit('ok', '')
        }
      })
    },
    loadDataTableAdd (parameter) {
      return this.axios({
        url: '/chat/robotQuestion/init',
        data: Object.assign(parameter, this.queryParamAdd)
      }).then(res => {
        return res.result
      })
    }
  }
}
</script>
