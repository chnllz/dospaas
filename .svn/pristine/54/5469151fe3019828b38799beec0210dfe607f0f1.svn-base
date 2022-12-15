<template>
  <div class="page">
    <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" class="search" :colon="false">
      <a-card :title="$t('搜索')" size="small">
        <a-space slot="extra">
          <a-button htmlType="submit" @click="$refs.table.refresh(true)" @keydown.enter="$refs.table.refresh(true)">
            {{ $t('搜索') }}
          </a-button>
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
          <a-button :icon="advanced ? 'up' : 'down'" style="font-size: 11px" @click="advanced = !advanced"></a-button>
        </a-space>
        <a-row class="form" :class="advanced ? 'advanced' : 'normal'">
          <a-col :span="6">
            <a-form-item :label="$t('创建人')">
              <a-select v-model.trim="queryParam.createUser" :allowClear="true" show-search>
                <a-select-option v-for="item in inputUser" :key="item.id" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="$t('模板名称')">
              <a-input v-model.trim="queryParam.templateName" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <a-space>
      <a-button v-action:add icon="plus" type="primary" @click="addTemplate">{{ $t('添加') }}</a-button>
    </a-space>
    <s-table
      ref="table"
      :scroll="{ y: true }"
      size="small"
      rowKey="id"
      :columns="columns"
      :data="loadDataTable"
      class="table-fill"
      :sorter="{ field: 'id', order: 'descend' }"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="editTemplate(record)">{{ $t('编辑') }}</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a>
            {{ $t('更多') }}
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="showTemplate(record)">{{ $t('预览') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="copyTemplate(record)">{{ $t('复制') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="deleteTemplate(record)">{{ $t('删除') }}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </s-table>
    <record-form ref="recordForm" />
    <template-form ref="templateForm" @ok="$refs.table.refresh(true)" />
  </div>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    RecordForm: () => import('./RecordForm'),
    TemplateForm: () => import('./TemplateForm')
  },
  data () {
    return {
      // 搜索参数
      queryParam: {
        inputUser: undefined
      },
      inputUser: [],
      colLayout: {},
      // 表头
      columns: [{
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: this.$t('ID'),
        dataIndex: 'id',
        width: 80,
        sorter: true
      }, {
        title: this.$t('模板名称'),
        dataIndex: 'templateName',
        sorter: true
      }, {
        title: this.$t('创建人'),
        dataIndex: 'inputUser',
        sorter: true
      }, {
        title: this.$t('总分'),
        dataIndex: 'qualifiedTotalScore',
        sorter: true
      }, {
        title: this.$t('创建时间'),
        dataIndex: 'inputTime',
        sorter: true
      }],
      advanced: false
    }
  },
  mounted () {
    this.getUserName()
  },
  methods: {
    // 页面数据渲染
    loadDataTable (parameter) {
      this.page = parameter
      return this.axios({
        url: '/quality/template/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.length = res.result.totalCount
        this.nowtime = res.timestamp
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
          this.inputUser.push({
            id: key,
            name: obj[key]
          })
        }
      })
    },
    // 添加
    addTemplate () {
      this.$refs.templateForm.show({
        title: this.$t('添加'),
        action: 'add',
        scoring: [{
          type: '0',
          name: '',
          score: '10',
          list: [{
            name: '',
            score: '10|5|0',
            remark: ''
          }]
        }],
        vetoinput: [{
          type: '0',
          name: '',
          score: '0',
          list: [{
            name: ''
          }]
        }],
        setting: {
          templateName: '',
          qualifiedTotal: 'gt',
          qualifiedSingle: 'ge',
          qualifiedTotalScore: 60,
          qualifiedSingleScore: 3
        }
      })
    },
    // 预览
    showTemplate (record) {
      const data = JSON.parse(JSON.stringify(record))
      const setting = JSON.parse(data.setting)
      const vetoCollList = []
      setting.vetoItemList.forEach((item, index) => {
        vetoCollList[index] = {}
        vetoCollList[index].vetoItem = {}
        vetoCollList[index].vetoItem = item
        vetoCollList[index].vetoScore = {
          selected: 0,
          vetoRemark: ''
        }
      })
      const scoreCollList = JSON.parse(JSON.stringify(setting.scoringMajorItemsList))
      scoreCollList.map(e => { delete e.scoringSubitemList })
      setting.scoringMajorItemsList.forEach((items, indexs) => {
        scoreCollList[indexs].majorCurrentScore = 0
        scoreCollList[indexs].subScoreCollList = []
        items.scoringSubitemList.forEach((item, index) => {
          scoreCollList[indexs].subScoreCollList[index] = {}
          scoreCollList[indexs].subScoreCollList[index].scoringSubitem = {}
          scoreCollList[indexs].subScoreCollList[index].scoringSubitem = items.scoringSubitemList[index]
          scoreCollList[indexs].subScoreCollList[index].subScoreItem = {
            detailRemarks: '',
            subScore: parseInt(items.scoringSubitemList[index].scoreSettings[0])
          }
        })
      })
      data.setting = JSON.stringify({
        isSelectedVetoOne: 0,
        vetoCollList: vetoCollList,
        scoreCollList: scoreCollList
      })
      this.$refs.recordForm.show({
        data: data,
        title: this.$t('查看明细'),
        action: 'query'
      })
    },
    // 编辑
    editTemplate (record) {
      this.getTemplate(record, this.$t(`编辑`), 'edit')
    },
    // 复制
    copyTemplate (record) {
      this.getTemplate(record, this.$t(`复制`), 'add')
    },
    getTemplate (record, title, action) {
      const { id, templateName, qualifiedTotal, qualifiedSingle, qualifiedTotalScore, qualifiedSingleScore, setting } = JSON.parse(JSON.stringify(record))
      const vetoinput = [{
        type: '0',
        name: '',
        score: '0',
        list: []
      }]
      const { vetoItemList, scoringMajorItemsList } = JSON.parse(setting)
      vetoItemList.forEach((item, index) => {
        vetoinput[0].list.push({
          name: item.veto
        })
      })
      const scoring = []
      scoringMajorItemsList.map((items, indexs) => {
        scoring.push({
          type: indexs,
          name: items.majorDesc,
          score: items.majorTotalScore,
          list: items.scoringSubitemList.map(item => {
            return {
              name: item.scoringItem,
              score: item.scoreSettings.join('|'),
              remark: item.detailedRemarks
            }
          })
        })
      })
      this.$refs.templateForm.show({
        id: id || '',
        title: title,
        action: action,
        scoring: scoring,
        vetoinput: vetoinput,
        setting: {
          templateName: templateName,
          qualifiedTotal: qualifiedTotal,
          qualifiedSingle: qualifiedSingle,
          qualifiedTotalScore: qualifiedTotalScore,
          qualifiedSingleScore: qualifiedSingleScore
        }
      })
    },
    // 删除
    deleteTemplate (record) {
      const table = this.$refs.table
      const id = record && record.id || this.selectedRowKeys
      const self = this
      this.$confirm({
        title: record ? self.$t('您确认要删除该记录吗？') : self.$t('您确认要删除选中的记录吗？'),
        onOk: () => {
          this.axios({
            url: '/quality/template/delete',
            params: { id: id }
          }).then(res => {
            this.$message.success(this.$t('删除成功'))
            table.refresh()
          })
        }
      })
    },
    refresh () {
      this.$refs.table.refresh()
    }
  }
}
</script>
<style scoped>
.active {
  color: #d1d1d1;
}
.tagIcon {
  font-size: 15px;
}
.title {
  margin-top: 5px;
}
.input {
  background-color: #f5f5f5;
}
</style>
