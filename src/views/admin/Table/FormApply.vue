<template>
  <div>
    <div class="table-operator">
      <a-button v-action:add icon="plus" @click="handleAdd">{{ $t('添加') }}</a-button>
      <a-button v-action:sort icon="sort-ascending" @click="handleSort">{{ $t('排序') }}</a-button>
    </div>
    <a-table ref="table" rowKey="id" :columns="columns" :dataSource="bindingFormViews" size="small" :pagination="false">
      <span slot="templateId" slot-scope="text, record" style="cursor: pointer; user-select: none">
        <template v-if="!record.nameFlag">
          <span v-for="(item, index) in formViewMappings" :key="index">
            {{ item.value === text ? item.text : '' }}
          </span>
        </template>
        <template v-else>
          <a-select
            :placeholder="$t('请选择视图')"
            size="small"
            :show-search="true"
            option-filter-prop="children"
            @change="
              (val) => {
                handleTpl(record, val)
              }
            "
          >
            <a-select-option v-for="(item, index) in formViewMappings" :key="index" :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </template>
      </span>
      <span slot="enableCondition" slot-scope="text, record, index">
        <a @click="handlePriv(record, index)">
          <a-badge :status="record.condiFlag ? 'success' : 'default'" />
          {{ $t('设置') }}
        </a>
      </span>
      <span slot="fieldPermissions" slot-scope="text, record, index">
        <a @click="handleFieldPriv(record, index)">
          <a-badge :status="record.privFlag ? 'success' : 'default'" />
          {{ $t('设置') }}
        </a>
      </span>
      <div slot="action" slot-scope="text, record, index">
        <a @click="handleEdit(record)">
          <span v-if="!record.nameFlag">{{ $t('编辑') }}</span>
          <span v-else>{{ $t('保存') }}</span>
        </a>
        <a-divider type="vertical" />
        <a-popconfirm :title="$t('您确认要删除该记录吗？')" @confirm="handleDelete(index)">
          <a>{{ $t('删除') }}</a>
        </a-popconfirm>
      </div>
    </a-table>
    <!-- 启用条件 -->
    <FormApplyRule ref="formApplyRule" @ok="getFormCondition" />
    <!-- 操作权限 -->
    <priv-action-form ref="privActionForm" @func="getFormview" />
    <!-- 排序 -->
    <drag-sort ref="dragSort" @ok="getList" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    PrivActionForm: () => import('./PrivActionForm'),
    DragSort: () => import('@/views/admin/Common/DragSort'),
    FormApplyRule: () => import('./FormApplyRule')
  },
  props: {
    params: {
      type: Object,
      default () {
        return []
      },
      required: true
    },
    formViewData: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    page: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      advanced: false,
      // 搜索参数
      queryParam: {},
      // 表头
      columns: [{
        title: this.$t('名称'),
        dataIndex: 'templateId',
        width: 260,
        scopedSlots: { customRender: 'templateId' }
      }, {
        title: this.$t('启用条件'),
        dataIndex: 'enableCondition',
        scopedSlots: { customRender: 'enableCondition' }
      }, {
        title: this.$t('操作权限'),
        dataIndex: 'fieldPermissions',
        scopedSlots: { customRender: 'fieldPermissions' }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 240,
        scopedSlots: { customRender: 'action' }
      }],
      bindingFormViews: [],
      formViewMappings: [],
      tplviewObj: {},
      tableId: ''
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.formViewMappings = newValue.formViewMappings
        this.tableId = this.params.tableId
        this.formViewMappings.forEach(item => {
          this.tplviewObj[item.value] = item
        })
      },
      immediate: true
    },
    formViewData: {
      handler (newValue) {
        this.bindingFormViews = JSON.parse(JSON.stringify(newValue)).filter(item => item.templateId)
      },
      immediate: true
    },
    bindingFormViews: {
      handler (newValue) {
        newValue.forEach(item => {
          if (!item.templateName && item.templateId) {
            item.templateName = this.tplviewObj[item.templateId].text
          }
          if (item.enableCondition && item.enableCondition.conditionVisual && item.enableCondition.conditionVisual.length > 0) {
            if (item.enableCondition.conditionVisual.length === 1) {
              item.condiFlag = item.enableCondition.conditionVisual[0].type !== 'notSet'
            } else {
              item.condiFlag = item.enableCondition.conditionVisual.length !== 0
            }
          } else {
            item.condiFlag = false
          }
          if (item.fieldPermissions) {
            const priv = item.fieldPermissions || []
            item.privFlag = priv.some(privItem => {
              const flag1 = privItem.usePermissions && privItem.usePermissions.length > 0
              const flag2 = privItem.rule !== 'readonly'
              if (flag1 || flag2) {
                return true
              } else {
                return false
              }
            })
          } else {
            item.privFlag = false
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    handleAdd () {
      const obj = {
        nameFlag: true,
        fieldPermissions: '',
        id: (new Date()).valueOf(),
        listOrder: this.bindingFormViews.length * 10 + 10,
        templateId: '',
        templateName: ''
      }
      if (this.page === 'workflowForm') {
        const tableId = this.tableId && this.tableId[1] ? this.tableId[1] : ''
        this.axios({
          url: `/admin/field/getAliasFieldMapping?tableId=${tableId}`
        }).then((res) => {
          const fieldPermissions = []
          for (var k in res.result) {
            fieldPermissions.push({
              id: (new Date()).valueOf() + Math.random() * 1000,
              alias: res.result[k].alias,
              name: res.result[k].name,
              usePermissions: [],
              rule: 'readonly'
            })
          }
          obj.fieldPermissions = fieldPermissions
          this.bindingFormViews.push(obj)
        })
      } else {
        this.bindingFormViews.push(obj)
      }
    },
    // 排序
    handleSort () {
      const data = this.bindingFormViews.map(item => {
        item.name = item.templateName
        return item
      })
      this.$refs.dragSort.show({
        action: 'sort',
        title: this.$t('排序'),
        sortData: data
      })
    },
    // 获取重新排序列表
    getList (data) {
      data.forEach((item, index) => {
        item.listOrder = String((index + 1) * 10)
      })
      this.bindingFormViews = data.map(item => {
        delete item.name
        return item
      })
    },
    handleTpl (record, val) {
      record.templateName = this.tplviewObj[val].text
      record.templateId = val
      record.nameFlag = false
      this.bindingFormViews = JSON.parse(JSON.stringify(this.bindingFormViews))
    },
    handleEdit (record) {
      record.nameFlag = !record.nameFlag
      if (!record.templateId) {
        record.nameFlag = true
        this.$message.error(this.$t('请选择视图'))
      }
      this.bindingFormViews = JSON.parse(JSON.stringify(this.bindingFormViews))
    },
    getFormview (data, index) {
      this.bindingFormViews.splice(index, 1, data)
    },
    handleDelete (index) {
      this.bindingFormViews.splice(index, 1)
    },
    handlePriv (record, index) {
      this.formViewMappings.some(item => {
        if (item.value === record.templateId) {
          record.templateName = item.text
          return true
        }
      })
      this.$refs.formApplyRule.show({
        title: `${this.$t('启用条件')}: ${record.templateName}`,
        record: record,
        index: index,
        tableId: this.params.tableId,
        bindingFormViews: this.bindingFormViews,
        page: 'dataForm',
        privArr: {
          visit: this.$t('可访问')
        },
        defaultpriv: 'visit'
      })
    },
    getFormCondition (index, data) {
      this.bindingFormViews[index].enableCondition = data
      this.bindingFormViews = JSON.parse(JSON.stringify(this.bindingFormViews))
    },
    handleFieldPriv (record, index) {
      this.formViewMappings.some(item => {
        if (item.value === record.templateId) {
          record.templateName = item.text
          return true
        }
      })
      this.$refs.privActionForm.show({
        action: 'add',
        title: `${this.$t('操作权限')}': ${record.templateName}`,
        page: this.page,
        tableId: this.tableId,
        record: record,
        index: index
      })
    }
  }
}
</script>
