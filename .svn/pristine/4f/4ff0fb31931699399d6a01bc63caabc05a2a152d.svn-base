<template>
  <div>
    <a-form layout="inline" style="display: flex; align-item: center">
      <a-form-item :label="$t('向弧名称')">
        <a-input v-model="queryParam.arcName" />
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
    ></s-table>
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
        width: 60,
        sorter: true
      }, {
        title: this.$t('向弧编号'),
        width: 240,
        dataIndex: 'arcId'
      }, {
        title: this.$t('向弧名称'),
        dataIndex: 'arcName',
        sorter: true
      }, {
        title: this.$t('向弧类型'),
        width: 100,
        dataIndex: 'arcType'
      }, {
        title: this.$t('库所编号'),
        width: 260,
        dataIndex: 'placeNumber',
        customRender: (text, record, index) => {
          const data = text.split('(')
          data.splice(0, 1)
          if (data.length) {
            return (<div>{data.map(item => { return <div>{'(' + item}</div> })}</div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('库所'),
        dataIndex: 'place',
        width: 100,
        customRender: (text, record, index) => {
          const data = text.split('(')
          data.splice(0, 1)
          if (data.length) {
            return (<div>{data.map(item => { return <div>{'(' + item}</div> })}</div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('方向'),
        width: 100,
        dataIndex: 'direction'
      }, {
        title: this.$t('变迁编号'),
        width: 260,
        dataIndex: 'transitionNumber',
        customRender: (text, record, index) => {
          const data = text.split('(')
          data.splice(0, 1)
          if (data.length) {
            return (<div>{data.map(item => { return <div>{'(' + item}</div> })}</div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('变迁'),
        dataIndex: 'transition',
        customRender: (text, record, index) => {
          const data = text.split('(')
          data.splice(0, 1)
          if (data.length) {
            return (<div>{data.map(item => { return <div>{'(' + item}</div> })}</div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('业务方法'),
        width: 80,
        dataIndex: 'callbackName'
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
        url: '/admin/arc/init',
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
