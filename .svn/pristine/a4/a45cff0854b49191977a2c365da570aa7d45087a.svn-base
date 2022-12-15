<template>
  <a-form :form="form">
    <!-- 报表 -->
    <a-table rowKey="id" :columns="columns" :data-source="dataSource" size="small" :pagination="false">
      <template slot="title">
        <div style="font-weight: bold; font-size: 16px">{{ $t('今日统计') }}</div>
      </template>
    </a-table>
    <a-row>
      <!-- 穿梭框 -->
      <a-form-item :label="$t('选择坐席')">
        <!-- 树组件 -->
        <a-tree
          v-decorator="[
            'seat',
            {
              initialValue: checkedKeys,
              valuePropName: 'checkedKeys',
              rules: [{ required: true, message: $t('请选择坐席') }]
            }
          ]"
          checkable
          :replaceFields="{ title: 'text', key: 'nodedata' }"
          :tree-data="treeData"
          @check="treeCheck"
        />
      </a-form-item>
      <!-- 时间选择 -->
      <a-form-item :label="$t('选择时间')">
        <a-range-picker
          v-decorator="[
            'time',
            {
              initialValue: [moment(searchData.startTime), moment(searchData.endTime)],
              rules: [{ required: true, message: $t('请选择时间') }]
            }
          ]"
          :ranges="{
            [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
            [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
            [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
            [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
          }"
          :allowClear="false"
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          @change="getTime"
        />
      </a-form-item>
      <!-- <a-form-item :label="$t('内部通话')">
        <a-checkbox
          v-decorator="[
            'filtration',
            {
              initialValue: searchData.filtration,
              valuePropName: 'checked',
              rules: [{ required: false, message: $t('请选择是否过滤') }]
            }
          ]"
          @change="getFiltration"
        >
          {{ $t('过滤内部通话') }}
        </a-checkbox>
      </a-form-item> -->
      <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('显示报表') }}</a-button>
    </a-row>
  </a-form>
</template>
<script>
import storage from '@/utils/storage'

export default {
  i18n: window.lang('callcenter'),
  data () {
    return {
      form: this.$form.createForm(this),
      columns: [
        { title: this.$t('总通话数'), dataIndex: 'totalCall' },
        { title: this.$t('总通话时长'), dataIndex: 'totalTime' },
        { title: this.$t('总呼入数'), dataIndex: 'inbound' },
        { title: this.$t('总呼入时长'), dataIndex: 'totalInBoundTime' },
        { title: this.$t('总呼出数'), dataIndex: 'outbound' },
        { title: this.$t('总呼出时长'), dataIndex: 'totalOutBoundTime' },
        // { title: this.$t('内部通话总数'), dataIndex: 'internal' },
        // { title: this.$t('内部通话总时长'), dataIndex: 'totalOutInternalTime' },
        { title: this.$t('平均呼入通话时长'), dataIndex: 'avgTimeIn' },
        { title: this.$t('平均呼出通话时长'), dataIndex: 'avgTimeOut' }
        // { title: this.$t('平均内部通话时长'), dataIndex: 'avgTimeInternal' }
      ],
      dataSource: [],
      searchData: {},
      transferDataSource: [],
      treeDataInit: [],
      targetKeys: [],
      checkedKeys: [],
      checked: [],
      treeData: []
    }
  },
  created () {
    this.searchData = storage.get('seatSearch') ? JSON.parse(storage.get('seatSearch')) : this.searchData
    this.searchData.startTime = this.searchData.startTime ? this.searchData.startTime : this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.searchData.endTime = this.searchData.endTime ? this.searchData.endTime : this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.$emit('load', true)
    this.axios({
      url: '/callcenter/callCenterCallRecord/init'
    }).then(res => {
      this.$emit('load', false)
      res.result.info.id = 0
      this.dataSource = [res.result.info]
      const users = []
      this.treeData = this.getTreeData(res.result.users, users)
      this.$emit('getUsers', users)
      this.checkedKeys = this.searchData.seat
    })
  },
  methods: {
    getTreeData (data, users) {
      const treeData = []
      data.forEach(item => {
        if (item.type === 'user' && item.extension) {
          item.text = item.extension + '(' + item.realName + ')'
          treeData.push(item)
          users.push(item)
        }
        if (item.type === 'dep' && item.children) {
          const obj = JSON.parse(JSON.stringify(item))
          obj.text = obj.departmentName
          delete obj.children
          obj.children = this.getTreeData(item.children, users)
          const flag = this.getFlag(item)
          if (flag) {
            treeData.push(obj)
          }
        }
      })
      return treeData
    },
    // 获取部门下面是否拥有有分机号的用户
    getFlag (item) {
      if (item.children) {
        const flag = item.children.some(child => {
          if (child.type === 'dep') {
            return this.getFlag(child)
          } else if (child.type === 'user') {
            child = child || {}
            return child.extension
          }
        })
        return flag
      } else {
        return false
      }
    },
    getData (data, users) {
      data.forEach(item => {
        item.key = item.nodedata
        item.title = item.text
        if (item.children) {
          this.getData(item.children, users)
        }
        if (item.nodetype === 'user') {
          if (item.node.extension) {
            item.text = item.node.extension + '(' + item.text + ')'
          } else {
            item = null
          }
          users.push(item)
        }
      })
    },
    treeCheck (checkedKeys, e) {
      const keyArr = []
      e.checkedNodes.forEach(item => {
        if (item.data.props.type === 'user') {
          keyArr.push(item.data.props.dataRef.extension)
        }
      })
      this.searchData.seat = keyArr
      this.form.setFieldsValue({ 'seat': checkedKeys })
    },
    // 选择时间
    getTime (moment, str) {
      this.searchData.startTime = str[0]
      this.searchData.endTime = str[1]
    },
    getFiltration (e) {
      this.searchData.filtration = e.target.checked
    },
    // 处理提交
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.searchData.filtration = values.filtration
          this.$emit('ok', this.searchData)
        }
      })
    }
  }
}
</script>
