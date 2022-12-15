<template>
  <div class="page">
    <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button
            @click="
              () => {
                queryParam = {}
                queryParam.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
                queryParam.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
                searchDate = [moment().startOf('day'), moment().endOf('day')]
                $refs.treeDepartment.reset()
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('操作时间')">
              <a-range-picker
                v-model="searchDate"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                showTime
                format="YYYY-MM-DD"
                style="width: 100%"
                @change="getSearchDate"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('部门')">
              <data-picker
                ref="treeDepartment"
                :placeholder="$t('请选择部门')"
                name="department"
                :multiple="true"
                parentId="parentDepartmentId"
                displayType="tree"
                url="/admin/department/init"
                searchUrl="/admin/search/departmentSearch"
                :scope="scope"
                :optionsConversion="
                  (list, displayType, searchType) => {
                    if (searchType) {
                      return list.map((item) => {
                        const obj = item
                        obj.key = item.departmentId
                        obj.label = item.fullDepartmentName
                        return obj
                      })
                    } else {
                      return list.map((item) => {
                        const obj = item
                        obj.key = item.departmentId
                        obj.label = item.departmentName
                        return obj
                      })
                    }
                  }
                "
                @select="(e) => (queryParam.department = e)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('工号')">
              <a-input v-model="queryParam.agentNumber" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('操作类型')">
              <a-select v-model="queryParam.dnd" :allowClear="true" mode="multiple">
                <a-select-option v-for="item in StatusList" :key="item.value" :value="item.value">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:export icon="download" @click="handleExport()">{{ $t('导出') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :sorter="{ field: 'id', order: 'descend' }"
      :columns="columns"
      :data="loadDataTable"
    ></s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('callcenter'),
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      form: this.$form.createForm(this),
      scope: this,
      advanced: false,
      // 时间组件
      searchDate: [this.moment().startOf('day'), this.moment().endOf('day')],
      // 搜索参数
      parameter: { sortField: 'id', sortOrder: 'descend' },
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      StatusList: [],
      // 表头
      columns: [{
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('部门'),
        dataIndex: 'department',
        sorter: true
      }, {
        title: this.$t('姓名'),
        dataIndex: 'agentRealName',
        sorter: true
      }, {
        title: this.$t('工号'),
        dataIndex: 'agentNumber',
        sorter: true
      }, {
        title: this.$t('操作类型'),
        dataIndex: 'dnd',
        sorter: true
      }, {
        title: this.$t('开始时间'),
        dataIndex: 'startTime',
        sorter: true
      }, {
        title: this.$t('结束时间'),
        dataIndex: 'endTime',
        sorter: true
      }, {
        title: this.$t('持续时长'),
        dataIndex: 'duration',
        sorter: true
      }]
    }
  },
  created () {
    this.getStatus()
  },
  methods: {
    loadDataTable (parameter) {
      this.parameter.sortField = parameter.sortField
      this.parameter.sortOrder = parameter.sortOrder
      return this.axios({
        url: '/callcenter/dnd/log',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    getStatus () {
      this.axios({
        url: 'admin/dict/initData',
        data: {
          dictCategoryNumber: 'callcenter_dnd_type'
        }
      }).then(res => {
        if (res.code === 0) {
          const dnd = res.result
          dnd.forEach(item => {
            this.StatusList.push({
              value: item.dictDataNumber,
              name: item.dictDataName
            })
          })
        }
      })
    },
    getSearchDate (date, dateString) {
      this.queryParam.startTime = dateString[0] + ' 00:00:00'
      this.queryParam.endTime = dateString[1] + ' 23:59:59'
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportDndStatementTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: Object.assign(this.parameter, this.queryParam),
            type: 'dndRecord'
          }
        }
      })
    }
  }
}
</script>
