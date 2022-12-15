<template>
  <a-card size="small" style="height: 100%">
    <a-space>
      <a-button @click="handleEvent">{{ $t('停止服务') }}</a-button>
      <a-button @click="handleShowDrawer('updateFieldSort')">{{ $t('更新字段排序') }}</a-button>
      <a-button @click="handleShowDrawer('syncTable')">{{ $t('批量数据模型同步到物理表') }}</a-button>
      <a-button @click="handleDownloadDB">{{ $t('下载数据表结构') }}</a-button>
      <a-button @click="handleDBContrast">{{ $t('数据表结构比对') }}</a-button>
    </a-space>
    <!-- 停止服务 -->
    <a-modal
      :title="$t(title)"
      :visible="visible"
      :confirmLoading="loading"
      :destroyOnClose="true"
      :footer="false"
      @cancel="visible = !visible"
    >
      <a-spin :spinning="loading">
        <a-space style="width: 100%" direction="vertical">
          <a-alert :message="$t('您正在进行危险操作，请谨慎执行！')" type="warning" />
          <a-form :form="form">
            <a-form-item>
              <span style="user-select: none">{{ message }}</span>
              <a-input
                v-decorator="['code', { rules: [{ required: true, message: $t('请输入验证码') }] }]"
                :placeholder="code"
              />
            </a-form-item>
          </a-form>
          <a-button style="width: 100%" htmlType="submit" type="danger" @click="handleSubmit">
            {{ $t('确认停止服务') }}
          </a-button>
        </a-space>
      </a-spin>
    </a-modal>
    <!-- 数据表结构比对 -->
    <a-modal
      :title="$t('数据表结构比对')"
      :visible="databaseContrastVisible"
      :destroyOnClose="true"
      @cancel="
        () => {
          databaseContrastVisible = !databaseContrastVisible
          filePath = ''
          uploadMessage = ''
        }
      "
    >
      <a-form>
        <a-form-item :label="$t('导入文件')" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-upload
            name="upload"
            :showUploadList="false"
            :action="uploadUrl"
            :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="upload" />
              {{ $t('选择文件') }}
            </a-button>
            {{ $t('请选择要导入比对的数据表结构文件') }}
          </a-upload>
          <div style="width: 360px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
            <span :title="uploadMessage">{{ uploadMessage }}</span>
          </div>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button v-show="filePath" key="submit" type="primary" :loading="loading" @click="handleOkDBContrast">
          {{ $t('比对') }}
        </a-button>
        <a-button
          key="back"
          @click="
            () => {
              databaseContrastVisible = !databaseContrastVisible
              filePath = ''
              uploadMessage = ''
            }
          "
        >
          {{ $t('关闭') }}
        </a-button>
      </template>
    </a-modal>
    <!-- 更新字段排序 -->
    <a-drawer
      :visible="drawerVisible"
      :destroyOnClose="true"
      :width="600"
      :title="drawerTitle"
      :maskClosable="!loading"
      @close="closeUpdateFieldDrawer"
    >
      <a-spin :spinning="loading">
        <template v-if="!updating">
          <a-tree v-model="checkedKeys" :tree-data="treeData" checkable :selectable="false"></a-tree>
        </template>
        <template v-else>
          <div style="display: flex; flex-direction: column">
            <div style="margin-bottom: 10px">
              <a-alert
                :message="`程序运行过程中请勿关闭浏览器或执行其他阻止程序运行的操作，更新进度：${updatedNum}/${updateTableList.length}`"
                type="info"
              />
              <a-progress
                :percent="Math.floor((updatedNum / updateTableList.length) * 100)"
                :status="updatedNum === updateTableList.length ? 'success' : 'active'"
              />
            </div>
            <div ref="list" class="updateBox">
              <a-list ref="list" :data-source="updateTableList" size="small">
                <a-list-item v-show="item.updatingStatus !== '0'" slot="renderItem" slot-scope="item, index">
                  {{ `${index + 1}.` }}
                  {{ `${item.title}` }}
                  <span style="margin-left: 10px">
                    <a-icon v-if="item.updatingStatus === '1'" type="loading" style="color: green" />
                    <a-icon v-else-if="item.updatingStatus === '2'" type="check-circle" style="color: green" />
                    <a-icon v-else-if="item.updatingStatus === '3'" type="close-circle" style="color: red" />
                  </span>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </template>
        <div class="bbar">
          <a-button v-show="!updating" type="primary" @click="updateSort">{{ $t('提交') }}</a-button>
          <a-button @click="closeUpdateFieldDrawer">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
    </a-drawer>
  </a-card>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      loading: false,
      visible: false,
      form: this.$form.createForm(this),
      code: '',
      message: '',
      title: '停止服务',
      // 对比数据表结构
      uploadUrl: `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload`,
      databaseContrastVisible: false,
      filePath: '', // 对比的数据表文件路径
      uploadMessage: '',
      // 更新字段排序/批量数据模型同步到物理表
      treeData: [],
      checkedKeys: [],
      drawerVisible: false,
      updateTableList: [],
      updating: false,
      updatedNum: 0,
      drawerParamsMap: {
        updateFieldSort: {
          title: '更新字段排序',
          url: '/admin/field/syncListOrder'
        },
        syncTable: {
          title: '批量数据模型同步到物理表',
          url: 'admin/dashboard/syncFromModeling'
        }
      },
      drawerUrl: '', // 抽屉提交url
      drawerTitle: '',
      scrollBottomUpdate: false
    }
  },
  updated () {
    if (this.scrollBottomUpdate) {
      this.scrollBottomUpdate = false
      this.scrollToBottom()
    }
  },
  methods: {
    // 获取聊天窗口的最低高度
    scrollToBottom () {
      this.newsTipsShow = false
      this.$nextTick(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
      })
    },
    randomString (e) {
      e = e || 32
      const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const a = t.length
      let n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    handleEvent () {
      this.visible = true
      this.code = this.randomString(6)
      this.message = this.$t('请在下方输入框中输入"{0}"以确认操作', { 0: this.code })
      this.title = '停止服务'
    },
    handleDownloadDB () {
      const that = this
      this.$confirm({
        content: that.$t('您确认要下载数据表结构吗？'),
        okText: that.$t('确定'),
        cancelText: that.$t('取消'),
        onOk () {
          that.axios({
            url: '/admin/dashboard/downloadStructs',
            params: {
              domainName: location.hostname
            },
            responseType: 'blob',
            loading: true
          })
        },
        onCancel () { }
      })
    },
    handleDBContrast () {
      this.databaseContrastVisible = true
    },
    handleShowDrawer (key) {
      this.drawerUrl = this.drawerParamsMap[key].url
      this.drawerTitle = this.$t(`${this.drawerParamsMap[key].title}`)
      this.drawerVisible = true
      this.loading = true
      this.axios({
        url: '/admin/table/getModuleTableOptions'
      }).then(res => {
        this.loading = false
        if (!res.code) {
          const result = res.result
          const loopSetTreeItem = function (sourceData, type) {
            return sourceData.map((item, index) => {
              const treeDataItem = {
                title: item.label,
                key: type ? `${type}-${index}` : item.value
              }
              if (item.children && item.children.length > 0) {
                treeDataItem.children = loopSetTreeItem(item.children)
              }
              return treeDataItem
            })
          }
          this.treeData = loopSetTreeItem(result, 'parent-node')
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.code === this.code) {
            this.axios({
              url: '/admin/dashboard/stopService',
              data: {
                publicKey: null,
                encryptPassword: null,
                sign: null,
                timestamp: null
              }
            }).then(res => {
              if (res.code) {
                this.$message.warning(res.message)
              } else {
                this.$message.success(res.message)
                this.visible = false
              }
            })
          } else {
            this.$message.warning(this.$t('请输入正确的验证码'))
          }
        }
      })
    },
    handleOkDBContrast () {
      this.databaseContrastVisible = false
      const filePath = this.filePath
      this.filePath = ''
      this.uploadMessage = ''
      this.axios({
        url: '/admin/dashboard/compareStructs',
        params: {
          domainName: location.hostname,
          filePath
        },
        responseType: 'blob',
        loading: true
      })
    },
    updateSort () {
      // 过滤父节点
      const checkedKeys = this.checkedKeys.filter(item => !item.includes('parent-node'))
      const checkedNode = []
      const loopSetCheckedNode = function (treeData) {
        treeData.forEach(item => {
          if (checkedKeys.includes(item.key)) {
            checkedNode.push({
              tableId: item.key,
              title: item.title,
              updatingStatus: '0'
            })
          }
          if (item.children && item.children.length > 0) {
            loopSetCheckedNode(item.children)
          }
        })
      }
      loopSetCheckedNode(this.treeData)
      this.updateTableList = checkedNode
      if (!this.updateTableList.length) {
        this.$message.info(this.$t('请选择您要操作的数据'))
        return
      }
      this.updating = true
      let n = 0
      const loopSyncListOrder = () => {
        this.scrollBottomUpdate = true
        if (this.updateTableList.length <= n) {
          return
        }
        this.updateTableList[n].updatingStatus = '1'
        this.axios({
          url: this.drawerUrl,
          params: {
            tableId: this.updateTableList[n].tableId
          },
          timeout: 30 * 60 * 1000
        }).then(res => {
          if (!res.code) {
            this.updateTableList[n].updatingStatus = '2'
          } else {
            this.updateTableList[n].updatingStatus = '3'
          }
          n++
          this.updatedNum = n
          loopSyncListOrder()
        })
      }
      loopSyncListOrder()
    },
    closeUpdateFieldDrawer () {
      this.updateTableList = []
      this.updating = false
      this.updatedNum = 0
      this.checkedKeys = []
      this.drawerVisible = false
    },
    handleChange (info) {
      this.$setLoading({ spinning: true, tip: this.$t('上传中,请稍后……') })
      if (info.file.status === 'uploading') {
        this.uploadMessage = this.$t('文件【{0}】上传中...', { 0: info.file.name })
      } else if (info.file.status === 'error' || info.file.response.code) {
        this.$setLoading({ spinning: false, tip: null })
        this.uploadMessage = this.$t('文件【{0}】上传失败', { 0: info.file.name })
        this.filePath = ''
      } else if (info.file.status === 'done') {
        this.$setLoading({ spinning: false, tip: null })
        this.uploadMessage = this.$t('上传完成【{0}】', { 0: info.file.name })
        this.filePath = info.file.response.result.filePath
      }
    }
  }
}
</script>

<style lang="less" scoped>
.updateBox {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
}
</style>
