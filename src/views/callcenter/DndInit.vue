<template>
  <div style="height: 100%; padding: 8px; background-color: #fff">
    <a-tabs v-model="currentKey" :animated="false" class="tabs-flex" @change="handleTabChange">
      <a-tab-pane v-for="parentItem in tabList" :key="parentItem.key" :tab="parentItem.title">
        <div class="page">
          <a-form :form="form" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
            <a-card size="small" :title="$t('搜索')">
              <a-space slot="extra">
                <a-button htmlType="submit" @click="$refs[`table${currentKey}`][0].refresh(true)">
                  {{ $t('搜索') }}
                </a-button>
                <a-button @click="reset">
                  {{ $t('重置') }}
                </a-button>
              </a-space>
              <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
                <a-col :span="6">
                  <a-form-item :label="$t('操作时间')">
                    <a-range-picker
                      v-if="parentItem.key == 'day'"
                      v-model="searchDate"
                      :ranges="{
                        [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                        [$t('昨天')]: [
                          moment().startOf('day').subtract('day', 1),
                          moment().endOf('day').subtract('day', 1)
                        ],
                        [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                      }"
                      showTime
                      :allowClear="false"
                      format="YYYY-MM-DD"
                      style="width: 100%"
                      @change="getSearchDate"
                    />
                    <a-range-picker
                      v-else
                      v-model="searchMonth"
                      style="width: 100%"
                      :allowClear="false"
                      format="YYYY-MM"
                      :ranges="{
                        [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                        [$t('上个月')]: [
                          moment().startOf('month').subtract('month', 1),
                          moment().endOf('month').subtract('month', 1)
                        ],
                        [$t('最近3个月')]: [moment().subtract(2, 'month'), moment()]
                      }"
                      :mode="modeMonth"
                      :open="openMonth"
                      @change="getInputMonth"
                      @openChange="openMonthChange"
                      @panelChange="handlePanelChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item :label="$t('部门')">
                    <data-picker
                      :ref="`treeDepartment${parentItem.key}`"
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
              </a-row>
            </a-card>
          </a-form>
          <a-space>
            <a-button v-action:export icon="download" @click="handleExport()">{{ $t('导出') }}</a-button>
          </a-space>
          <s-table
            :ref="`table${parentItem.key}`"
            class="table-fill"
            :scroll="{ x: true, y: true }"
            size="small"
            rowKey="id"
            :columns="columns"
            :data="loadDataTable"
          ></s-table>
        </div>
        <!-- :scroll="{ x: true, y: true }" -->
      </a-tab-pane>
    </a-tabs>
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
      // 时间组件
      searchDate: [this.moment().startOf('day'), this.moment().endOf('day')],
      searchMonth: [this.moment().startOf('month'), this.moment().endOf('month')],
      advanced: false,
      currentKey: 'day',
      tabList: [{
        title: this.$t('按天'),
        key: 'day'
      }, {
        title: this.$t('按月'),
        key: 'month'
      }],
      // 搜索参数
      queryParam: {
        startTime: this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      // 表头
      columns: [{
        title: this.$t('部门'),
        dataIndex: 'department',
        width: 180
      }, {
        title: this.$t('姓名'),
        dataIndex: 'agentRealName',
        width: 180
      }, {
        title: this.$t('工号'),
        dataIndex: 'agentNumber',
        width: 180
      }],
      modeMonth: ['month', 'month'],
      openMonth: false,
      disabledCurrent: null
    }
  },
  mounted () {
    this.axios({
      url: '/admin/dict/getChildren',
      data: {
        dictCategoryNumber: 'callcenter_dnd_type' // 所属字典编号
      }
    }).then(res => {
      const list = res.result
      list.forEach(childItem => {
        const data = [{
          title: this.$t('次数'),
          dataIndex: 'total-' + childItem.number,
          align: 'center',
          width: 150
        }, {
          title: this.$t('时长'),
          dataIndex: 'duration-' + childItem.number,
          align: 'center',
          width: 150
        }]
        this.columns.push({
          title: childItem.name,
          children: data
        })
      })
    })
  },
  methods: {
    handleTabChange (e) {
      this.currentObj = e
      if (this.$refs[`table${e}`]) {
        this.$refs[`table${e}`][0].refresh()
      }
      if (e === 'day') {
        this.queryParam.startTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        this.queryParam.endTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.queryParam.startTime = this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.queryParam.endTime = this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      }
    },
    loadDataTable (parameter) {
      return this.axios({
        url: '/callcenter/dnd/init',
        data: Object.assign(parameter, this.queryParam, { searchType: this.currentkey })
      }).then(res => {
        res.result.data.forEach((item, index) => {
          item.id = index
        })
        return res.result
      })
    },
    reset () {
      this.queryParam = {}
      if (this.currentKey === 'day') {
        this.queryParam.startTime = this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        this.queryParam.endTime = this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
        this.searchDate = [this.moment().startOf('day'), this.moment().endOf('day')]
      } else {
        this.queryParam.startTime = this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.queryParam.endTime = this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.searchMonth = [this.moment().startOf('month'), this.moment().endOf('day')]
      }
      this.$refs[`treeDepartment${this.currentKey}`][0].reset()
      this.$refs[`table${this.currentKey}`][0].refresh(true)
    },
    getSearchDate (date, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
    },
    // 控制月份中改变的设置
    openMonthChange (status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.openMonth = status
    },
    handlePanelChange (value, mode) {
      this.searchMonth[0] = this.moment(value[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.searchMonth[1] = this.moment(value[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.searchMonth[0]
      this.queryParam.endTime = this.searchMonth[1]
    },
    getInputMonth (date, dateString) {
      this.searchMonth[0] = this.moment(date[0]).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.searchMonth[1] = this.moment(date[1]).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.queryParam.startTime = this.searchMonth[0]
      this.queryParam.endTime = this.searchMonth[1]
    },
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportDndStatementTask',
        setMenuName: true,
        parameter: {
          condition: {
            req: this.queryParam,
            type: 'dndStats'
          }
        }
      })
    }
  }
}
</script>
