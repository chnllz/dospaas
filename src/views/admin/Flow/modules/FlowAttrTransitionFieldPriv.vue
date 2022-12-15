<template>
  <a-spin :spinning="false">
    <a-table ref="table" size="small" rowKey="id" :columns="columns" :dataSource="fieldPrivData" :pagination="false">
      <span slot="priv" slot-scope="text">
        <a-badge v-if="text == ''" status="success" text="-" />
        <a-badge v-else status="success" text="√" />
      </span>
      <span slot="rule" slot-scope="text, record">
        <a-select style="width: 100px" :defaultValue="text" @change="(value) => handleChange(value, record, 'rule')">
          <a-select-option value="inherit">{{ $t('继承') }}</a-select-option>
          <a-select-option value="allow">{{ $t('允许') }}</a-select-option>
          <a-select-option value="readonly">{{ $t('只读') }}</a-select-option>
          <a-select-option value="hidden">{{ $t('隐藏') }}</a-select-option>
        </a-select>
      </span>
      <div slot="priv" slot-scope="text, record, index">
        <a @click="handleEdit(record, index)">
          <a-badge v-if="record.fieldPermissions !== ''" status="success" :text="$t('设置')" />
          <a-badge v-else status="default" :text="$t('设置')" />
        </a>
      </div>
    </a-table>
    <priv-visit-form ref="privVisitForm" :params="{ fieldPrivData: fieldPrivData }" />
  </a-spin>
  <!-- 授权 -->
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    PrivVisitForm: () => import('@/views/admin/Table/PrivVisitForm')
  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      // 表头
      columns: [{
        title: this.$t('系统名称'),
        dataIndex: 'alias',
        width: 250
      }, {
        title: this.$t('显示名称'),
        dataIndex: 'name',
        width: 250
      }, {
        title: this.$t('字段规则'),
        dataIndex: 'rule',
        scopedSlots: { customRender: 'rule' },
        width: 250
      }, {
        title: this.$t('权限'),
        dataIndex: 'fieldPermissions',
        scopedSlots: { customRender: 'priv' }
      }],
      fieldPrivData: [],
      flowData: {}
    }
  },
  created () {
    this.show()
  },
  methods: {
    show () {
      this.axios({
        url: `/admin/field/getAliasFieldMapping?tableId=${this.params.flowData.params.tableId}`
      }).then((res) => {
        this.loading = false
        const newFieldData = []
        for (var kk in this.params.fieldPrivData) {
          newFieldData[this.params.fieldPrivData[kk].alias] = this.params.fieldPrivData[kk]
        }
        const fieldPermissions = []
        for (var k in res.result) {
          fieldPermissions.push({
            id: newFieldData[res.result[k].alias] ? newFieldData[res.result[k].alias].id : (new Date()).valueOf() + Math.random() * 1000,
            alias: res.result[k].alias,
            name: res.result[k].name,
            fieldPermissions: newFieldData[res.result[k].alias] ? newFieldData[res.result[k].alias].fieldPermissions : '',
            rule: newFieldData[res.result[k].alias] ? newFieldData[res.result[k].alias].rule : 'inherit'
          })
        }
        this.fieldPrivData = fieldPermissions
      })
    },
    handleChange (value, record, column) {
      const newData = [...this.fieldPrivData]
      const target = newData.filter(item => record.id === item.id)[0]
      if (target) {
        target[column] = value
        this.fieldPrivData = newData
        target.editable = false
      }
    },
    editTableCell (record, editable) {
      const newData = [...this.fieldPrivData]
      const target = newData.filter(item => record.id === item.id)[0]
      if (target) {
        target.editable = editable
        this.fieldPrivData = newData
      }
    },
    handleEdit (record, index) {
      this.$refs.privVisitForm.show({
        action: 'edit',
        title: `${this.$t('授权')}：${record.name}`,
        defaultpriv: 'inherit',
        selectType: 'radio',
        privArr: {
          inherit: this.$t('继承'),
          allow: this.$t('允许'),
          readonly: this.$t('只读'),
          hidden: this.$t('隐藏')
        },
        key: 'fieldPermissions',
        record: record,
        index: index
      })
    },
    handleSubmit () {
      this.$emit('change', this.fieldPrivData)
      this.visible = false
      this.$emit('ok')
    }
  }
}
</script>
<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
