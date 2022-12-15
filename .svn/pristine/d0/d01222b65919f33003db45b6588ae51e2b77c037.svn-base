<template>
  <div>
    <a-card size="small" class="table-search" :bordered="false">
      <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'">
        <div class="head">
          <a-space style="margin-left: 8px">
            <a-button icon="search" type="primary" @click="search">{{ $t('搜索') }}</a-button>
            <a-button
              icon="sync"
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
        </div>
        <a-row :gutter="16">
          <a-col v-if="advanced" span="24">
            <div class="divider"></div>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('请求时间')">
              <a-range-picker
                v-model="startTime"
                :ranges="{
                  [$t('今天')]: [moment().startOf('day'), moment().endOf('day')],
                  [$t('昨天')]: [moment().startOf('day').subtract('day', 1), moment().endOf('day').subtract('day', 1)],
                  [$t('本周')]: [moment().startOf('week'), moment().endOf('week')],
                  [$t('本月')]: [moment().startOf('month'), moment().endOf('month')]
                }"
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
                @change="getInputTime"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('请求来源')">
              <a-input v-model.trim="queryParam.source" :placeholder="$t('精确搜索')" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('请求参数')">
              <a-input v-model.trim="queryParam.request" :placeholder="$t('模糊搜索')" />
            </a-form-item>
          </a-col>
          <a-col v-bind="colLayout">
            <a-form-item :label="$t('响应结果')">
              <a-input v-model.trim="queryParam.response" :placeholder="$t('模糊搜索')" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card size="small" :bordered="false">
      <s-table
        ref="table"
        size="small"
        rowKey="id"
        :columns="columns"
        :data="loadDataTable"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="request" slot-scope="text">
          {{ text }}
        </div>
        <div slot="response" slot-scope="text">
          {{ text }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a
            @click="
              () => {
                infoItem = record
                visible = !visible
              }
            "
          >
            {{ $t('查看') }}
          </a>
        </div>
      </s-table>
    </a-card>
    <a-drawer :title="$t('查看')" :width="600" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-form-item label="ID">
            <div>{{ infoItem.id }}</div>
          </a-form-item>
          <a-form-item :label="$t('请求时间')">
            <div>{{ infoItem.startTime }}</div>
          </a-form-item>
          <a-form-item :label="$t('请求时长')">
            <div>{{ infoItem.duration }}</div>
          </a-form-item>
          <a-form-item :label="$t('请求来源')">
            <div>{{ infoItem.source }}</div>
          </a-form-item>
          <a-form-item :label="$t('请求地址')">
            <div>{{ infoItem.url }}</div>
          </a-form-item>
          <a-form-item :label="$t('请求参数')" style="margin-bottom: 8px">
            <json-viewer :value="infoItem.request" :expand-depth="2" boxed sort copyable></json-viewer>
          </a-form-item>
          <a-form-item :label="$t('响应结果')">
            <json-viewer :value="infoItem.response" :expand-depth="6" boxed sort copyable></json-viewer>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-drawer>
  </div>
</template>
<script>
import JsonViewer from 'vue-json-viewer'
export default {
  i18n: window.lang('admin'),
  components: {
    JsonViewer
  },
  data () {
    return {
      advanced: false,
      visible: false,
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      // 搜索参数
      queryParam: {},
      startTime: null,
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'action' }
      }, {
        title: 'ID',
        dataIndex: 'id',
        width: 40,
        sorter: true
      }, {
        title: this.$t('请求时间'),
        dataIndex: 'startTime',
        width: 250
      }, {
        title: this.$t('请求时长'),
        dataIndex: 'duration'
      }, {
        title: this.$t('请求来源'),
        dataIndex: 'source'
      }, {
        title: this.$t('请求地址'),
        dataIndex: 'url'
      }, {
        title: this.$t('请求参数'),
        dataIndex: 'request',
        scopedSlots: { customRender: 'request' }
      }, {
        title: this.$t('响应结果'),
        dataIndex: 'response',
        scopedSlots: { customRender: 'response' }
      }],
      colLayout: {},
      infoItem: {}
    }
  },
  created () {
    this.startTime = [this.moment().startOf('day'), this.moment().endOf('day')]
    this.queryParam.startTime = [this.moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), this.moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
    this.changeAdvanced(false)
  },
  methods: {
    // 页面渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/admin/apiLog/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    getInputTime (date, dateString) {
      this.queryParam.startTime = dateString
    },
    // 搜索
    search () {
      const table = this.$refs.table
      table.refresh()
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
    }
  }
}
</script>
