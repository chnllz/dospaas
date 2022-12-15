<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search">
      <a-card size="small" :title="$t('搜索')">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)">{{ $t('搜索') }}</a-button>
          <a-button @click="reset">{{ $t('重置') }}</a-button>
        </a-space>
        <a-row class="form normal">
          <a-col :span="6">
            <a-form-item :label="$t('客服名称')" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-tree-select
                v-model="queryParam.userName"
                :filterTreeNode="filterTreeOption"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allowClear
                treeCheckable
                multiple
                :replaceFields="{
                  value: 'serviceId',
                  title: 'nickName'
                }"
                style="width: 100%"
                :tree-data="treeData"
              />
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item :label="$t('状态')" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
              <a-tree-select
                v-if="settingControl.busyEnable"
                v-model="queryParam.status"
                multiple
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="busyList"
                placeholder=""
              />
              <a-select v-else v-model="queryParam.status" :allowClear="true" mode="multiple">
                <a-select-option v-for="busyItem in busyList" :key="busyItem.value">
                  {{ $t(busyItem.label) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <s-table
      v-if="tableShow"
      ref="table"
      class="table-fill"
      size="small"
      rowKey="userName"
      :scroll="{ x: true, y: true }"
      :columns="columns"
      :data="loadDataTable"
      :sorter="{ field: 'userName', order: 'ascend' }"
    >
      <span slot="status" slot-scope="text">
        <span v-if="text == 0">
          <a-icon type="check-circle" theme="twoTone" two-tone-color="#2FC25B" />
          {{ $t('就绪') }}
        </span>
        <span v-else-if="text == 1">
          <a-icon type="close-circle" theme="twoTone" two-tone-color="#F04864" />
          {{ $t('离开') }}
        </span>
        <span v-else-if="text == 2">
          <a-icon type="pause-circle" theme="twoTone" two-tone-color="#FACC14" />
          {{ $t('示忙') }}
        </span>
        <span v-else-if="text == 3">
          <a-icon type="logout" style="color: #8c8c8c" />
          {{ $t('登出') }}
        </span>
        <span v-else>
          <a-icon type="pause-circle" theme="twoTone" two-tone-color="#FACC14" />
          {{
            busyList.find((item) => item.value == 2) &&
            busyList.find((item) => item.value == 2).children &&
            busyList.find((item) => item.value == 2).children.find((item) => item.value == text)
              ? $t(busyList.find((item) => item.value == 2).children.find((item) => item.value == text).label)
              : $t('示忙')
          }}
        </span>
      </span>
    </s-table>
  </div>
</template>
<script>
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      filterTreeOption (input, treeNode) {
        return treeNode.data.props.title.includes(input)
      },
      treeData: [],
      colLayout: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 },
      queryParam: {
        status: []
      },
      columns: [{
        title: this.$t('客服名称'),
        dataIndex: 'nickName',
        width: 200,
        sorter: true,
        customRender: (text, record) => {
          return `${record.userName}(${text})`
        }
      }, {
        title: this.$t('状态'),
        dataIndex: 'status',
        width: 80,
        scopedSlots: { customRender: 'status' }
      }, {
        title: this.$t('状态持续时长'),
        dataIndex: 'statusDuration',
        width: 150,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('当前会话数'),
        dataIndex: 'chating',
        width: 150,
        sorter: true
      }, {
        title: this.$t('累计会话数'),
        dataIndex: 'conversation',
        width: 150,
        sorter: true
      }, {
        title: this.$t('累计消息数'),
        dataIndex: 'chats',
        width: 150,
        sorter: true
      }, {
        title: this.$t('平均会话时长'),
        dataIndex: 'averageConversationTime',
        width: 150,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('平均首次响应时长'),
        dataIndex: 'averageFirstAnswerTime',
        width: 180,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('平均响应时长'),
        dataIndex: 'averageAnswerTime',
        width: 150,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('满意度'),
        dataIndex: 'commentSatisfiedPercent',
        customRender: (text) => {
          return text + '%'
        },
        width: 150,
        sorter: true
      }, {
        title: this.$t('首次就绪时间'),
        dataIndex: 'readyTime',
        width: 150,
        sorter: true
      }, {
        title: this.$t('累计就绪时长'),
        dataIndex: 'readyCount',
        width: 150,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }, {
        title: this.$t('累计示忙时长'),
        dataIndex: 'busyCount',
        width: 150,
        sorter: true,
        customRender: (text) => {
          return this.changeTime(text)
        }
      }],
      settingControl: {},
      busyList: [{
        value: 0,
        label: this.$t('就绪')
      }, {
        value: 2,
        label: this.$t('示忙')
      }, {
        value: 1,
        label: this.$t('离开')
      }, {
        value: 3,
        label: this.$t('登出')
      }],
      Interval: null,
      tableShow: false
    }
  },
  mounted () {
    this.queryParam.status = [0, 1]
    this.getNickName()
    this.tableShow = false
    this.axios({
      url: '/chat/setting/base',
      data: { action: 'get' }
    }).then(res => {
      this.settingControl = res.result.info
      if (this.settingControl.busyEnable) {
        this.busyList.forEach(item => {
          if (item.value === 2) {
            item.selectable = false
            const arr = JSON.parse(this.settingControl.furtherStates)
            item.children = arr.filter(item => item.check)
            item.children.forEach(item => {
              item.label = this.$t(item.label)
              this.queryParam.status.push(item.value)
            })
          }
        })
      } else {
        this.queryParam.status.push(2)
      }
      this.tableShow = true
    })
  },
  activated () {
    this.runtime()
  },
  // 销毁定时器
  deactivated () {
    clearInterval(this.Interval)
  },
  methods: {
    getNickName () {
      this.axios({
        url: '/chat/group/getAllGroup'
      }).then(res => {
        const getTreeData = (array, parent) => {
          array.forEach(item => {
            if (item.children && item.children.length) {
              getTreeData(item.children, item)
            } else if (!item.distributionMode) {
              item.nickName = `${item.serviceId}(${item.nickName})`
              item.serviceId = `${item.serviceId}-${parent?.['serviceId'] || ''}`
            } else {
              item.disabled = true
            }
          })
        }
        getTreeData(res.result.data)
        this.treeData = res.result.data
      })
    },
    runtime () {
      this.Interval = setTimeout(() => {
        this.$refs.table.refresh()
      }, 30 * 1000)
    },
    loadDataTable (parameter) {
      const params = Object.assign(parameter, this.queryParam)
      if (params.userName) {
        params.userName = this.queryParam.userName.map(item => {
          return item.split('-')[0]
        })
      }
      return this.axios({
        url: '/chat/userActivity/init',
        data: params
      }).then(res => {
        clearInterval(this.Interval)
        this.runtime()
        return res.result
      })
    },
    reset () {
      const list = this.busyList[1]
      let arr = []
      if (list.children && list.children.length) {
        arr = list.children.map(item => item.value)
      }
      this.queryParam = {
        status: [...[0, 1], ...arr]
      }
      this.$refs.table.refresh(true)
    },
    changeTime (text) {
      let sec = parseInt(text)
      let min = 0
      let hour = 0
      if (sec > 59) {
        min = parseInt(sec / 60)
        sec = parseInt(sec % 60)
        if (min > 59) {
          hour = parseInt(min / 60)
          min = parseInt(min % 60)
        }
      }
      const result = `${parseInt(hour) < 10 ? '0' + parseInt(hour) : parseInt(hour)}:${parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min)}:${parseInt(sec) < 10 ? '0' + parseInt(sec) : parseInt(sec)}`
      return result
    }
  }
}
</script>
