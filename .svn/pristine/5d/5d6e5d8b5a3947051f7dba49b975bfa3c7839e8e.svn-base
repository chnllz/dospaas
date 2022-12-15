<template>
  <a-spin :spinning="loading">
    <a-form :form="form">
      <a-table
        ref="tableDepartment"
        size="small"
        rowKey="value"
        :columns="columnsDepartment"
        :dataSource="selectData"
        :pagination="false"
        :sorter="{ field: 'listOrder', order: 'ascend' }"
        @expand="getDepartment"
      >
        <div slot="title">
          <department-search
            :data="{ mode: 'multiple' }"
            @ok="
              (e, dep) => {
                depSelect(dep)
              }
            "
          />
        </div>
        <span slot="label" slot-scope="text, record">
          <a-icon v-if="record.icon" :type="record.icon" />
          {{ text }}
        </span>
        <div slot="action" slot-scope="text, record">
          <a @click="dataSelect(record, 'department')">{{ $t('选择') }}</a>
        </div>
      </a-table>
    </a-form>
  </a-spin>
</template>
<script>
export default {
  components: {
    DepartmentSearch: () => import('@/views/admin/Department/DepartmentSearch')
  },
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      departmentSearch: [],

      columnsDepartment: [{
        title: this.$t('名称'),
        dataIndex: 'label',
        scopedSlots: { customRender: 'label' }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 50,
        scopedSlots: { customRender: 'action' }
      }],
      selectData: [] // 部门选择，角色选择
    }
  },
  created () {
    this.axios({
      url: '/admin/department/getChildren',
      data: {
        parentDepartmentId: null
      }
    }).then((res) => {
      this.loading = false
      res.result.forEach(item => {
        item.icon = 'home'
        if (item.childCount) {
          item.title = item.label + '(' + item.childCount + ')'
          item.children = [{
            value: parseInt(Math.random() * (100000 - 100 + 1) + 100, 10)
          }]
        } else {
          item.title = item.label
          item.isLeaf = true
        }
      })
      this.selectData = res.result
      // 初始化值
    })
  },
  methods: {
    getDepartment (expanded, record) {
      this.axios({
        url: '/admin/department/getChildren',
        data: { parentDepartmentId: record.value }
      }).then(res => {
        res.result.forEach(item => {
          item.icon = 'apartment'
          if (!item.childCount) {
            item.isLeaf = true
            item.title = item.label
          } else {
            item.children = [{
              value: parseInt(Math.random() * (100000 - 100 + 1) + 100, 10)
            }]
            item.title = item.label + '(' + item.childCount + ')'
          }
        })
        const array = res.result.filter(item => item.type !== 'user')
        this.$set(record, 'children', array)
      })
    },
    getDepartmentData (e) {
      const page = {
        pageNo: 1,
        pageSize: 999,
        sortField: 'id',
        sortOrder: 'descend'
      }
      if (e) {
        this.axios({
          url: '/admin/search/departmentSearch',
          data: Object.assign(page, { searchName: e })
        }).then(res => {
          this.departmentSearch = res.result.data
        })
      } else {
        this.departmentSearch = []
      }
    },
    depSelect (data) {
      const obj = {
        type: 'depart',
        name: data.name,
        id: data.departmentId
      }
      this.$emit('ok', obj)
    },
    // 选择用户
    dataSelect (record) {
      const obj = {
        id: record.value,
        name: record.label,
        type: 'depart'
      }
      this.$emit('ok', obj)
    }
  }
}
</script>
