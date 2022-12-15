<template>
  <div>
    <a-drawer :title="config.title" :width="800" :visible="importVisible" @close="importVisible = !importVisible">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="data" @click="dataShow">导入数据</a-menu-item>
        <a-menu-item key="task" @click="taskShow">导入任务</a-menu-item>
      </a-menu>
      <a-form v-if="showchange" :form="form" :label-col="{ span: 4 }" style="margin-top: 20px" @submit="handleSubmit">
        <a-form-item label="文件上传" :wrapper-col="{ span: 12 }">
          <a-col :span="8">
            <a-upload name="file" :multiple="true" action="" @change="handleChange">
              <a-button>
                <a-icon type="upload" />
                点击上传
              </a-button>
            </a-upload>
          </a-col>
          <a-col :span="4"><a>下载模板</a></a-col>
        </a-form-item>
      </a-form>
      <a-card v-if="showchange" size="small" :bordered="false">
        <s-table
          ref="table"
          size="small"
          rowKey="id"
          :columns="columns"
          :data="loadDataTable"
          :sorter="{ field: 'id', order: 'descend' }"
        ></s-table>
      </a-card>
      <a-card v-if="!showchange" size="small" :bordered="false">
        <s-table
          ref="table"
          size="small"
          rowKey="id"
          :columns="columns2"
          :data="loadDataTable"
          :sorter="{ field: 'id', order: 'descend' }"
        >
          <div slot="action" slot-scope="text, record">
            <a @click="showDetails(record)">查看</a>
            <a-divider type="vertical" />
            <a>下载导入详情</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </div>
        </s-table>
      </a-card>
      <div class="bbar" style="position: absolute; bottom: 0; right: 0; width: 100%; background-color: white">
        <a-button v-if="showchange" type="primary" @click="dataimport">导入</a-button>
        <a-button @click="importVisible = !importVisible">关闭</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      importVisible: false,
      current: ['data'],
      loading: false,
      config: {},
      form: this.$form.createForm(this, { name: 'imprort' }),
      showchange: true,
      columns: [{
        title: '#',
        dataIndex: 'id',
        width: 40
      }, {
        title: '模板字段',
        dataIndex: 'title',
        width: 260
      }, {
        title: '唯一',
        dataIndex: 'only',
        width: 80
      }, {
        title: '必填',
        dataIndex: 'must',
        width: 80
      }, {
        title: '导入字段',
        dataIndex: 'importString'
      }, {
        title: '校验结果',
        dataIndex: 'result',
        align: 'center'
      }],
      columns2: [{
        title: '操作',
        dataIndex: 'action',
        width: 170,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }, {
        title: '#',
        dataIndex: 'id',
        width: 40
      }, {
        title: '文件名称',
        dataIndex: 'title',
        width: 200
      }, {
        title: '创建时间',
        dataIndex: 'only',
        width: 150
      }, {
        title: '任务状态',
        dataIndex: 'must',
        width: 80
      }]
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    // 导入数据渲染
    loadDataTable (parameter) {
      return this.axios({
        url: '/visit/questionbank/init',
        data: Object.assign(parameter, this.queryParam)
      }).then(res => {
        this.length = res.result.totalCount
        return res.result
      })
    },
    // 接收数据传参
    show (config) {
      this.importVisible = true
      this.loading = true
      this.config = config
    },
    // 导入数据页面
    dataShow () {
      this.showchange = true
    },
    // 导入任务页面
    taskShow () {
      this.showchange = false
    },
    // 数据提交
    handleSubmit () {

    },
    // 导入数据
    dataimport () {
      this.showchange = false
      this.current = ['task']
    },
    // 查看
    showDetails () {

    },
    // 上传
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
