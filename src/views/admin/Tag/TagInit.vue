<template>
  <a-layout class="mylayout">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      width="400"
      collapsible
      collapsedWidth="0"
      theme="light"
      :style="collapsed ? { padding: '4px' } : { padding: '8px' }"
    >
      <div style="display: flex; margin-bottom: 8px">
        <a-input-search
          v-model="queryParam.tagCategoryName"
          :placeholder="$t('请输入分类名称搜索')"
          allowClear
          @search="categoryRefresh"
        />
        <a-space style="margin-left: 8px">
          <a-button size="small" icon="plus" type="primary" @click="categoryAdd">{{ $t('添加') }}</a-button>
        </a-space>
      </div>
      <s-table
        ref="categoryTable"
        size="small"
        :columns="categoryColumns"
        :data="categoryData"
        rowKey="id"
        :scroll="{ y: true }"
        class="table-fill"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="actionCategory" slot-scope="text, record">
          <a @click="categoryEdit(record)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a @click="categoryDel(record)">{{ $t('删除') }}</a>
        </div>
        <a slot="category" slot-scope="text, record" @click="tagdataLoad(record)">{{ text }}</a>
      </s-table>
    </a-layout-sider>
    <a-layout style="position: relative; overflow-x: visible">
      <a-icon
        placement="bottom"
        class="trigger-tag"
        :type="collapsed ? 'double-right' : 'double-left'"
        :title="collapsed ? $t('展开左侧面板') : $t('折叠左侧面板')"
        @click="() => (collapsed = !collapsed)"
      />
    </a-layout>
    <a-layout style="background: white; margin-left: 16px; padding: 8px">
      <a-row>
        <a-col :span="20">
          <div style="display: flex; align-items: center; margin-bottom: 8px">
            <span v-if="checkName" style="margin-right: 8px">{{ checkName }}</span>
            <a-input-search
              v-model="queryParamTag.tagName"
              :placeholder="$t('请输入标签名称搜索')"
              allowClear
              style="width: 400px"
              @search="tagdataRefresh"
            />
            <a-space style="margin-left: 8px">
              <a-button size="small" icon="plus" type="primary" @click="tagdataAdd">{{ $t('添加') }}</a-button>
            </a-space>
          </div>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <HelpPanel
            :number="'22041616492516'"
            :styleStr="'font-size: 16px;margin-right: 8px;color: rgba(0, 0, 0, 0.65);'"
          />
        </a-col>
      </a-row>
      <s-table
        ref="tagdataTable"
        size="small"
        :columns="tagdataColumns"
        rowKey="id"
        :data="tagdataData"
        :scroll="{ y: true }"
        class="table-fill"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="actionTagdata" slot-scope="text, record">
          <a @click="tagdataEdit(record)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a @click="tagdataDel(record)">{{ $t('删除') }}</a>
        </div>

        <div slot="actionTagdata" slot-scope="text, record">
          <a @click="tagdataEdit(record)">{{ $t('编辑') }}</a>
          <a-divider type="vertical" />
          <a @click="tagdataDel(record)">{{ $t('删除') }}</a>
        </div>
      </s-table>
      <tag-category-form ref="tagCategoryForm" @ok="categoryRefresh" />
      <tag-data-form ref="tagDataForm" :tableId="tableId" @ok="tagdataRefresh" />
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    TagCategoryForm: () => import('./TagCategoryForm'),
    TagDataForm: () => import('./TagDataForm'),
    HelpPanel: () => import('@/views/admin/HelpPanel')
  },
  props: {
    tableId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collapsed: false,
      categoryTitle: this.$t('分类管理'),
      checkName: '',
      categoryColumns: [{
        title: '#',
        dataIndex: 'id',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('分类名称'),
        dataIndex: 'tagCategoryName',
        width: 120,
        scopedSlots: {
          customRender: 'category'
        }
      }, {
        title: this.$t('标签类型'),
        dataIndex: 'tagType',
        customRender: (text, record, index) => {
          let str = '--'
          if (text === 1) {
            str = this.$t('自动标签')
          } else if (text === 0) {
            str = this.$t('手动标签')
          }
          return str
        }
      }, {
        title: this.$t('选择类型'),
        dataIndex: 'selectType',
        customRender: (text, record, index) => {
          let str = '--'
          if (text === 1) {
            str = this.$t('多选')
          } else if (text === 0) {
            str = this.$t('单选')
          }
          return str
        }
      }, {
        title: this.$t('操作'),
        dataIndex: 'action',
        width: 100,
        align: 'center',
        scopedSlots: {
          customRender: 'actionCategory'
        }
      }],
      tagdataTitle: this.$t('标签管理'),
      tagdataColumns: [{
        title: '#',
        dataIndex: 'id',
        width: 40,
        customRender: (text, record, index) => {
          return index + 1
        }
      }, {
        title: this.$t('操作'),
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'actionTagdata' }
      }, {
        title: this.$t('标签编号'),
        width: 200,
        dataIndex: 'tagNumber'
      }, {
        title: this.$t('标签名称'),
        width: 200,
        dataIndex: 'tagName'
      }, {
        title: this.$t('所属分类'),
        width: 200,
        dataIndex: 'tagCategoryName'
      }, {
        title: this.$t('分值'),
        width: 100,
        dataIndex: 'score'
      }, {
        title: this.$t('状态'),
        width: 100,
        dataIndex: 'status',
        customRender: (text) => {
          if (text === 1) {
            return (<div><a-badge status="success" />{this.$t('启用')}</div>)
          } else if (text === 0) {
            return (<div><a-badge status="default" />{this.$t('禁用')}</div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('备注'),
        dataIndex: 'remarks'
      }],
      switchLoading: false, // 开关loading
      queryParam: {},
      queryParamTag: {},
      helpVisible: false,
      helpNotes: ''
    }
  },
  methods: {
    // 加载分类数据
    categoryData (parameter) {
      this.queryParam.tagCategoryNumber = undefined
      return this.axios({
        url: '/admin/tag/categoryInit',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        return res.result
      })
    },
    // 标签分类加载
    categoryRefresh () {
      this.$refs.categoryTable.refresh(true)
    },
    // 标签分类添加
    categoryAdd () {
      this.$refs.tagCategoryForm.show({
        action: 'add',
        title: this.$t('添加'),
        url: '/admin/tag/categoryAdd'
      })
    },
    // 标签分类编辑
    categoryEdit (record) {
      this.$refs.tagCategoryForm.show({
        action: 'edit',
        title: `${this.$t('编辑')}：${record.tagCategoryName}`,
        url: '/admin/tag/categoryEdit',
        record: record
      })
    },
    // 标签分类删除
    categoryDel (record) {
      const me = this
      const categoryTable = me.$refs.categoryTable
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          me.axios({
            url: '/admin/tag/categoryDel',
            data: { tagCategoryNumber: record.tagCategoryNumber }
          }).then((res) => {
            if (!res.code) {
              me.checkName = ''
              categoryTable.refresh()
              me.$message.success(res.message)
            } else {
              me.$message.warning(res.message)
            }
          })
        }
      })
    },
    // 加载标签数据
    tagdataData (parameter) {
      return this.axios({
        url: '/admin/tag/tagdataInit',
        data: Object.assign(parameter, this.queryParamTag, { tagCategoryNumber: this.queryParam.tagCategoryNumber || 1 })
      }).then(res => {
        return res.result
      })
    },
    // 标签数据加载
    tagdataRefresh () {
      this.$refs.tagdataTable.refresh(true)
    },
    // 标签数据加载
    tagdataLoad (record) {
      this.queryParam.tagCategoryNumber = record.tagCategoryNumber
      this.checkName = record.tagCategoryName
      this.tagdataTitle = record.category
      this.tagdataRefresh()
    },
    // 标签数据添加
    tagdataAdd () {
      if (!this.checkName) {
        this.$message.warning(this.$t('请选择标签分类'))
      } else {
        const option = [{ label: this.checkName, value: this.queryParam.tagCategoryNumber }]
        this.$refs.tagDataForm.show({
          action: 'add',
          title: this.$t('添加'),
          url: '/admin/tag/tagdataAdd',
          option: option,
          record: { tagCategoryNumber: this.queryParam.tagCategoryNumber }
        })
      }
    },
    // 标签数据编辑
    tagdataEdit (record) {
      const option = [{ label: this.checkName, value: this.queryParam.tagCategoryNumber }]
      this.$refs.tagDataForm.show({
        action: 'edit',
        title: `${this.$t('编辑')}：${record.tagName}`,
        url: '/admin/tag/tagdataEdit',
        option: option,
        record: record
      })
    },
    // 标签数据删除
    tagdataDel (record) {
      const me = this
      const tagdataTable = me.$refs.tagdataTable
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          me.axios({
            url: '/admin/tag/tagdataDel',
            data: { id: record.id }
          }).then((res) => {
            if (!res.code) {
              tagdataTable.refresh()
              me.$message.success(res.message)
            } else {
              me.$message.warning(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.mylayout {
  height: 100%;
  /deep/ .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .trigger-tag {
    cursor: pointer;
    transition: color 0.3s;
    position: absolute;
    left: 0;
    top: 50%;
    background: white;
    line-height: 50px;
    border-radius: 0 8px 8px 0;
  }
  .trigger-tag:hover {
    color: @primary-color;
  }
}
</style>
