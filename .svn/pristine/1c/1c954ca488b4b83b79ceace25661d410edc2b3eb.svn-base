<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="Search" @keyup.enter="Search">{{ $t('搜索') }}</a-button>
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
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('考试状态')">
              <a-select v-model.trim="queryParam.status" :allowClear="true" show-search>
                <a-select-option v-for="(item, key) in paperstatus" :key="key" :value="key">
                  {{ item.type }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('考试名称')">
              <a-input v-model.trim="queryParam.title" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item label="参考状态">
              <a-select :allowClear="true" show-search v-model.trim="queryParam.status">
                <a-select-option v-for="(item, key) in paperstatus" :key="key" :value="key">{{ item.type }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
          <a-col :span="6">
            <a-form-item :label="$t('开始时间')">
              <a-range-picker
                v-model="queryParam.showstarttime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getSearchDate"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('结束时间')">
              <a-range-picker
                v-model="queryParam.showendtime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getSearchDateEnd"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <s-table
      ref="table"
      class="table-fill"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="status" slot-scope="text">
        <span v-for="value in paperstatus" v-show="text === value.value" :key="value.value">{{ value.type }}</span>
      </div>
      <div slot="action" slot-scope="text, record">
        <a @click="checkPage(record)">{{ $t('查看') }}</a>
      </div>
    </s-table>
    <myexam-look ref="MyexamLook" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('exam'),
  components: {
    MyexamLook: () => import('./MyexamLook')
  },
  data () {
    return {
      advanced: false,
      visible: false,
      loading: false,
      // 搜索参数
      queryParam: {},
      paperstatus: [{
        type: this.$t('未开始'),
        value: '0'
      }, {
        type: this.$t('进行中'),
        value: '1'
      }, {
        type: this.$t('已结束'),
        value: '2'
      }],
      config: {
        data: {}
      },
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        sorter: true
      }, {
        title: this.$t('考试名称'),
        dataIndex: 'title',
        width: 300
      }, {
        title: this.$t('考试状态'),
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
        width: 120
      }, {
        title: this.$t('参考状态'),
        dataIndex: 'examStatus',
        width: 120
      }, {
        title: this.$t('开始时间'),
        dataIndex: 'startTime',
        width: 140
      }, {
        title: this.$t('结束时间'),
        dataIndex: 'endTime',
        width: 140
      }],
      colLayout: {}
    }
  },
  created () {
    this.changeAdvanced(false)
  },
  methods: {
    // 页面渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/exam/achievement/myExam',
        data: Object.assign(parameter, this.queryParam)
      }).then((res) => {
        return res.result
      })
    },
    // 打开查看页面
    checkPage (record) {
      this.$refs.MyexamLook.show({
        data: record,
        action: 'check',
        title: this.$t('查看'),
        url: '',
        type: record.mystatus
      })
    },
    // 搜索
    Search () {
      const table = this.$refs.table
      table.refresh()
    },
    // 删除
    examDelete (record) {
      const table = this.$refs.table
      const id = record.id
      const self = this
      this.$confirm({
        title: record ? this.$t('您确认要删除该记录吗？') : this.$t('您确认要删除选中的记录吗？'),
        onOk () {
          self
            .axios({
              url: '/visit/questionbank/delete',
              data: { id: id }
            })
            .then((res) => {
              self.$message.success(res.result)
              table.refresh()
            })
        }
      })
    },
    changeAdvanced (tag) {
      if (tag) {
        this.advanced = !this.advanced
      }
      if (this.advanced) {
        this.colLayout = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 }
      } else {
        this.colLayout = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }
      }
    },
    getSearchDate (date, dateString) {
      this.queryParam.startTime = dateString[0] ? dateString : null
      this.queryParam.showstarttime = date
    },
    getSearchDateEnd (date, dateString) {
      this.queryParam.endTime = dateString[0] ? dateString : null
      this.queryParam.showendtime = date
    }

  }
}
</script>
