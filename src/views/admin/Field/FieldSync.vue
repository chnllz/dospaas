<template>
  <a-drawer :visible="visible" :width="1200" :title="$t('字段同步')" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div>
        <a-table
          rowKey="index"
          :columns="columns"
          :dataSource="dataSource"
          size="small"
          :pagination="false"
          :row-selection="{ selectedRowKeys: selectedRows, onChange: onSelectChange }"
        >
          <div slot="mode" slot-scope="text, record">
            <a-select
              :value="record.mode"
              @change="
                (val) => {
                  record.mode = val
                }
              "
            >
              <a-select-option v-if="record.modeling" key="modeling_to_physical" value="modeling_to_physical">
                {{ $t('数据模型 ➜ 物理模型') }}
              </a-select-option>
              <a-select-option v-if="record.physical" key="physical_to_modeling" value="physical_to_modeling">
                {{ $t('物理模型 ➜ 数据模型') }}
              </a-select-option>
            </a-select>
          </div>
        </a-table>
      </div>
      <div class="bbar">
        <a-button type="primary" @click="submit">{{ $t('保存') }}</a-button>
        <a-button @click="visible != visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      loading: false,
      columns: [{
        title: '#',
        dataIndex: 'index',
        width: 50,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('同步方式'),
        dataIndex: 'mode',
        width: 200,
        scopedSlots: { customRender: 'mode' }
      }, {
        title: this.$t('数据模型'),
        width: 400,
        dataIndex: 'modeling',
        customRender: (text, record, index) => text || '--'
      }, {
        title: this.$t('物理模型'),
        dataIndex: 'physical',
        customRender: (text, record, index) => text || '--'
      }],
      dataSource: [],
      selectedRows: [],
      config: null
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = config
      this.axios({
        url: 'admin/field/prepareSyncTableFields',
        params: {
          tableId: config.tableId
        }
      }).then(res => {
        this.loading = false
        this.dataSource = res.result.map((item, index) => {
          let mode = 'modeling_to_physical'
          let modeling = ''
          let physical = ''
          const modelingField = item.modelingField
          const physicalField = item.physicalField
          let alias = ''
          if (!item.modelingField && item.physicalField) {
            mode = 'physical_to_modeling'
          }
          if (physicalField) {
            physical = `${physicalField.columnComment}(${physicalField.columnName})--${physicalField.columnType.toUpperCase()}`
            alias = physicalField.columnName
          }
          if (modelingField) {
            modeling = `${modelingField.name}(${modelingField.underlineAlias})--${modelingField.fieldType}`
            if (modelingField.fieldType === 'DECIMAL') {
              modeling += `(${modelingField.fieldLength},${modelingField.fieldDecimal})`
            } else if (modelingField.fieldLength) {
              modeling += `(${modelingField.fieldLength})`
            }
            alias = modelingField.underlineAlias
          }
          this.selectedRows.push(index)
          return {
            mode, modeling, physical, alias, index
          }
        })
        this.$forceUpdate()
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRowKeys
    },
    submit () {
      const selectedSyncFields = []
      this.dataSource.forEach(item => {
        if (this.selectedRows.includes(item.index)) {
          selectedSyncFields.push({
            mode: item.mode,
            column: item.alias
          })
        }
      })
      if (selectedSyncFields.length === 0) {
        this.$message.info(this.$t('请选择您要操作的数据'))
        return
      }
      this.loading = true
      this.axios({
        url: 'admin/field/executeSyncTableFields',
        data: {
          tableId: this.config.tableId,
          selectedSyncFields: selectedSyncFields
        }
      }).then(res => {
        this.loading = false
        if (!res.code) {
          this.visible = false
          this.$message.success(this.$t('操作成功'))
          this.$emit('ok')
        }
      })
    }
  }
}
</script>
