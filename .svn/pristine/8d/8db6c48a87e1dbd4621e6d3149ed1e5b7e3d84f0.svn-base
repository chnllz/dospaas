<template >
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" type="primary" @click="$refs.table.refresh(true)">
            {{ $t('搜索') }}
          </a-button>
          <a-button
            @click="
              () => {
                searchTime = [moment().startOf('month'), moment().endOf('month')]
                queryParam = {
                  qualityBeginTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
                  qualityEndTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
                }
                $refs.table.refresh(true)
              }
            "
          >
            {{ $t('重置') }}
          </a-button>
        </a-space>
        <a-row class="form normal">
          <a-col :span="6">
            <a-form-item :label="$t('部门')">
              <a-select
                v-model.trim="queryParam.departmentId"
                :allowClear="true"
                showSearch
                :filter-option="filterOption"
              >
                <a-select-option v-for="(item, index) in departmentList" :key="index" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('质检员')">
              <a-select v-model.trim="queryParam.qualityUser" :allowClear="true" show-search>
                <a-select-option v-for="item in qualityUserList" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item :label="$t('评分时间')">
              <a-range-picker
                v-model="searchTime"
                :allowClear="false"
                :ranges="{
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('本周')]: [moment().startOf('day').startOf('week'), moment().endOf('week')],
                  [$t('最近七天')]: [moment().startOf('day').subtract(7, 'days'), moment().endOf('day')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')],
                  [$t('最近31天')]: [moment().startOf('day').subtract(31, 'days'), moment().endOf('day')]
                }"
                format="YYYY-MM-DD HH:mm:ss"
                :showTime="{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                style="width: 100%"
                @change="getInputTime"
              />
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
      border="true"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="pass" slot-scope="text, record">
        <span>{{ text }}/{{ record.passPercent }}</span>
      </div>
      <div slot="nopass" slot-scope="text, record">
        <span>{{ text }}/{{ record.nopassPercent }}</span>
      </div>
      <div slot="good" slot-scope="text, record">
        <span>{{ text }}/{{ record.excellentPercent }}</span>
      </div>
    </s-table>
    <general-export ref="generalExport" />
  </div>
</template>
<script>
export default {
  components: {
    GeneralExport: () => import('@/views/admin/Table/GeneralExport')
  },
  data () {
    return {
      // 搜索参数
      parameter: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      queryParam: {
        departmentId: undefined,
        qualityUser: undefined,
        qualityBeginTime: this.moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        qualityEndTime: this.moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      },
      searchTime: [this.moment().startOf('month'), this.moment().endOf('month')],
      departmentList: [],
      qualityUserList: [],
      // 表头
      columns: [{
        title: this.$t('部门'),
        dataIndex: 'departmentName',
        sorter: true
      }, {
        title: this.$t('质检员'),
        dataIndex: 'qualityUser',
        sorter: true
      }, {
        title: this.$t('已质检总数'),
        dataIndex: 'qualityTotal',
        sorter: true
      }, {
        title: this.$t('合格数/合格率'),
        dataIndex: 'passNumber',
        sorter: true,
        scopedSlots: { customRender: 'pass' }
      }, {
        title: this.$t('不合格数/不合格率'),
        dataIndex: 'nopassNumber',
        sorter: true,
        scopedSlots: { customRender: 'nopass' }
      }, {
        title: this.$t('优秀数/优秀率'),
        dataIndex: 'excellentNumber',
        sorter: true,
        scopedSlots: { customRender: 'good' }
      }, {
        title: this.$t('申诉数'),
        dataIndex: 'complaintNumber',
        sorter: true
      }, {
        title: this.$t('复检数'),
        dataIndex: 'reinspectionNumber',
        sorter: true
      }
      ]
    }
  },
  mounted () {
    this.getDepartment()
    this.getUserName()
  },
  methods: {
    // 数据渲染
    loadDataTable (parameter) {
      this.parameter = parameter
      return this.axios({
        url: '/quality/QcStatistics/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        for (const i in res.result.data) {
          res.result.data[i]['id'] = i
        }
        return res.result
      })
    },
    // 获取用户信息
    getUserName () {
      return this.axios({
        url: '/quality/data/getUserArr'
      }).then(res => {
        const obj = res.result
        for (const key in obj) {
          this.qualityUserList.push({
            id: key,
            name: obj[key]
          })
        }
      })
    },
    // 获取部门
    getDepartment () {
      return this.axios({
        url: '/quality/data/getDeptArr'
      }).then(res => {
        const obj = res.result
        const departmentList = []
        for (const key in obj) {
          departmentList.push({
            id: key,
            name: obj[key]
          })
        }
        this.departmentList = departmentList
      })
    },
    // 搜索部门
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    // 选择时间
    getInputTime (date, dateString) {
      this.queryParam.qualityBeginTime = dateString[0]
      this.queryParam.qualityEndTime = dateString[1]
    },
    // 导出
    handleExport () {
      this.$refs.generalExport.show({
        title: this.$t('导出'),
        className: 'ExportQcStatistics',
        setMenuName: true,
        parameter: {
          condition: Object.assign(this.parameter, this.queryParam)
        }
      })
    }
  }
}
</script>
