<template>
  <a-drawer :title="config.title" width="60%" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-table
        size="small"
        rowKey="menuId"
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :rowSelection="rowSelection"
      >
        <span slot="permission" slot-scope="text, record">
          <a-checkbox-group
            v-model="record.permission.selected"
            class="mycheckbox"
            :options="record.permission.actionsOptions"
            @change="onChangeCheck(record)"
          />
        </span>
      </a-table>
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
      config: {},
      visible: false,
      loading: false,
      // 表头
      columns: [{
        title: this.$t('菜单权限'),
        dataIndex: 'menuName',
        width: 300
      }, {
        title: this.$t('功能权限'),
        dataIndex: 'permission',
        scopedSlots: { customRender: 'permission' }
      }],
      data: [],
      selectedRowKeys: []
    }
  },
  computed: {
    rowSelection () {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onSelect: (record, selected, selectedRows) => {
          this.onChangeCheck(record)
          this.setChildrenSelected(record, selected)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.data.forEach((item) => {
            this.setChildrenSelected(item, selected)
          })
        }
      }
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.axios({
        url: this.config.url,
        data: { action: 'get', roleId: this.config.record.roleId }
      }).then(res => {
        this.loading = false
        this.data = res.result.data
        this.selectedRowKeys = res.result.selectedRowKeys
      })
    },
    // 选择功能权限
    onChangeCheck (record) {
      const selected = this.getParentPath(this.data, record.menuId)
      selected.forEach((item) => {
        if (!this.selectedRowKeys.includes(item)) {
          this.selectedRowKeys.push(item)
        }
      })
      this.setParentSelected(this.data, selected)
    },
    // 递归选中或取消选中行及子行数据
    setChildrenSelected (record, selected) {
      const selectedArr = []
      if (selected) {
        // 要勾选的功能权限
        selectedArr.push(`m${record.id}`)
        record.permission.actionsOptions.forEach((item) => {
          selectedArr.push(item.value)
        })
        // 要勾选的行
        this.selectedRowKeys.push(record.menuId)
      } else {
        // 取消勾选行
        this.selectedRowKeys = this.selectedRowKeys.filter((item) => {
          return item !== record.menuId
        })
      }
      // 设置功能权限选中状态
      record.permission.selected = selectedArr
      // 递归处理子行
      if (record.children) {
        record.children.forEach((item) => {
          this.setChildrenSelected(item, selected)
        })
      }
    },
    // 递归设置行菜单权限
    setParentSelected (data, selected) {
      data.forEach((item) => {
        for (const i in selected) {
          if (item.menuId === selected[i] && !item.permission.selected.includes(`m${item.id}`)) {
            item.permission.selected.push(`m${item.id}`)
          }
          if (item.children) {
            this.setParentSelected(item.children, selected)
          }
        }
      })
    },
    // 获取菜单节点路径
    getParentPath (record, menuid, path) {
      path = path || []
      // 方法1
      for (const i in record) {
        let newPath = path.concat(record[i].menuId)
        if (record[i].menuId === menuid) {
          return newPath
        } else {
          if (record[i].children) {
            newPath = this.getParentPath(record[i].children, menuid, newPath)
            if (newPath.length > 0) {
              return newPath
            }
          }
        }
      }
      return []
      // 方法2
      // let output = []
      // record.forEach((item) => {
      //   let newPath = path.concat(item.menuId)
      //   if (item.menuId === menuid) {
      //     output = newPath
      //   } else {
      //     if (item.children) {
      //       newPath = this.getParentPath(item.children, menuid, newPath)
      //       if (newPath.length > 0) {
      //         output = newPath
      //       }
      //     }
      //   }
      // })
      // return output
    },
    // 保存
    handleSubmit () {
      this.loading = true
      this.axios({
        url: this.config.url,
        data: { action: 'submit', data: this.data, roleId: this.config.record.roleId }
      }).then((res) => {
        this.visible = false
        this.loading = false
        this.$emit('ok')
        if (res.code) {
          this.$message.warning(res.message)
        } else {
          this.$message.success(res.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.mycheckbox >>> .ant-checkbox-group-item {
  min-width: 120px;
}
</style>
