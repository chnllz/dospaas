<template>
  <div>
    <a-modal :visible="visible" :title="$t('底部导航设置')" :width="1300" @cancel="visible = !visible">
      <a-spin :spinning="spinning">
        <div style="position: relative">
          <a-row>
            <a-col :span="2">
              <div style="height: 28px; line-height: 28px; text-align: right">{{ $t('导航栏') }}</div>
            </a-col>
            <a-col :span="4">
              <a-button type="link" @click="addTabbar">
                {{ $t('添加') }}
              </a-button>
            </a-col>
          </a-row>
          <draggable
            v-model="tabbarList"
            animation="200"
            handle=".handle"
            :style="{
              'flex-grow': 1,
              display: 'flex',
              'flex-flow': 'column wrap',
              'align-content': 'flex-start'
            }"
          >
            <a-row
              v-for="(tarbarItem, index) in tabbarList"
              :key="index"
              style="height: 90px; line-height: 90px"
              class="handle tabbar-item"
              :gutter="6"
            >
              <a-col span="1">
                <a-icon type="drag" class="handle" style="cursor: pointer" />
              </a-col>
              <a-col span="3">
                <a-input v-model="tarbarItem.appId" :placeholder="$t('APP名称')"></a-input>
              </a-col>
              <a-col span="3">
                <a-input v-model="tarbarItem.navigationName" :placeholder="$t('导航名称')"></a-input>
              </a-col>
              <a-col span="2">
                <!-- <set-icon
                  :currentIconProp="tarbarItem.navigationIcon"
                  @setUViewIcon="
                    (val) => {
                      tarbarItem.navigationIcon = val
                    }
                  "
                /> -->
                <div class="tabbar-uploader">
                  <a-upload
                    :fileList="tarbarItem.iconPath"
                    :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                    name="upload"
                    listType="picture-card"
                    :accept="'.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon'"
                    :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                    :before-upload="
                      (file, fileList) => {
                        return beforeUpload(file, fileList, '.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon')
                      }
                    "
                    @change="
                      (info) => {
                        fileChange(info, tarbarItem, 'iconPath')
                      }
                    "
                  >
                    <div
                      v-if="
                        tarbarItem.iconPath === null ||
                        (Array.isArray(tarbarItem.iconPath) && tarbarItem.iconPath.length === 0)
                      "
                      class="tabbar-icon"
                    >
                      <a-icon type="plus" />
                      <div style="font-size: 12px">{{ $t('导航图标') }}</div>
                    </div>
                  </a-upload>
                </div>
              </a-col>
              <a-col span="2">
                <div class="tabbar-uploader">
                  <a-upload
                    :action="`${$store.state.env.VUE_APP_API_BASE_URL}admin/attachment/upload/?uploadName=upload`"
                    name="upload"
                    :fileList="tarbarItem.selectedIconPath"
                    listType="picture-card"
                    :accept="'.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon'"
                    :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
                    :before-upload="
                      (file, fileList) => {
                        return beforeUpload(file, fileList, '.png,.jpg,.jpeg,.gif,.bmp,.svg,.icon')
                      }
                    "
                    @change="
                      (info) => {
                        fileChange(info, tarbarItem, 'selectedIconPath')
                      }
                    "
                  >
                    <div
                      v-if="
                        tarbarItem.selectedIconPath === null ||
                        (Array.isArray(tarbarItem.selectedIconPath) && tarbarItem.selectedIconPath.length === 0)
                      "
                      class="tabbar-icon"
                    >
                      <a-icon type="plus" />
                      <div style="font-size: 12px">{{ $t('选中时图标') }}</div>
                    </div>
                  </a-upload>
                </div>
              </a-col>
              <a-col span="3">
                <a-select
                  v-model="tarbarItem.navigationType"
                  style="width: 100%"
                  :placeholder="$t('导航页面类型')"
                  @change="(val) => handleChange(val, tarbarItem)"
                >
                  <a-select-option key="appBasicPage" value="appBasicPage">{{ $t('页面') }}</a-select-option>
                  <a-select-option key="appDataWindow" value="appDataWindow">{{ $t('数据窗口') }}</a-select-option>
                  <a-select-option key="custom" value="custom">{{ $t('自定义') }}</a-select-option>
                </a-select>
              </a-col>
              <a-col span="3">
                <a-cascader
                  v-if="['appBasicPage', 'appDataWindow'].includes(tarbarItem.navigationType)"
                  v-model="tarbarItem.cascaderNavPath"
                  style="width: 100%"
                  :placeholder="
                    tarbarItem.navigationType === 'appDataWindow' ? $t('请选择数据窗口') : $t('请选择自定义页面')
                  "
                  :show-search="true"
                  option-filter-prop="children"
                  :options="tarbarItem.navigationType === 'appDataWindow' ? appDataWindow : appBasicPage"
                  :fieldNames="{
                    label: 'text',
                    value: 'value',
                    children: 'children'
                  }"
                />
                <a-input v-else v-model="tarbarItem.inputNavPath"></a-input>
              </a-col>
              <a-col span="2">
                <a @click="handleSearchPriv(tarbarItem, index)">
                  <a-badge v-if="tarbarItem.usePermissions && tarbarItem.usePermissions.length > 0" status="success" />
                  <a-badge v-else status="default" />
                  {{ $t('权限设置') }}
                </a>
              </a-col>
              <!-- 权限复制 -->
              <a-col span="2">
                <a
                  @click="
                    () => {
                      copyPermissionsVisible = true
                      copySourceTabbar = tarbarItem
                    }
                  "
                >
                  {{ $t('权限复制') }}
                </a>
              </a-col>
              <a-col span="2">
                状态:
                <a-switch v-model="tarbarItem.status"></a-switch>
              </a-col>
              <a-col span="1">
                <a-icon
                  v-show="tabbarList.length > 2"
                  type="delete"
                  class="handle"
                  style="cursor: pointer; color: red; margin-left: 4px"
                  @click="
                    () => {
                      if (tabbarList.length > 2) {
                        tabbarList.splice(index, 1)
                      }
                    }
                  "
                />
              </a-col>
            </a-row>
          </draggable>
        </div>
      </a-spin>
      <template slot="footer">
        <a-button type="primary" @click="saveTababr">{{ $t('保存') }}</a-button>
        <a-button @click="visible = false">{{ $t('关闭') }}</a-button>
      </template>
      <priv-visit-form ref="privVisitForm" @func="getPrivs" />
    </a-modal>
    <a-modal
      :visible="copyPermissionsVisible"
      :title="$t('权限复制')"
      :width="500"
      @cancel="cancelCopy"
      @ok="handleCopy"
    >
      <div style="margin-bottom: 10px">
        将{{ $t(copySourceTabbar.navigationName ? copySourceTabbar.navigationName : '') }}权限复制给：
      </div>
      <a-table
        v-if="copyPermissionsVisible"
        :columns="columns"
        :data-source="tabbarList"
        :row-selection="rowSelection"
        rowKey="id"
      />
    </a-modal>
  </div>
</template>

<script>
export default {
  components: {
    draggable: () => import('vuedraggable'),
    setIcon: () => import('./setIcon'),
    PrivVisitForm: () => import('@/views/admin/Table/PrivVisitForm')
  },
  data () {
    return {
      visible: false,
      copyPermissionsVisible: false,
      copySourceTabbar: {},
      selectTabbarIdList: [],
      showTabbar: false,
      tarbarConfig: {
        appId: '', // APP名称
        navigationName: '', // 导航名称
        // navigationIcon: 'uicon-home', // 导航图标
        navigationType: undefined, // 导航页面类型
        navigationPath: '', // 导航页面配置
        status: true, // 状态
        inputNavPath: '',
        cascaderNavPath: [],
        iconPath: [], // 未选中时导航图标
        selectedIconPath: [] // 选中时导航图标
      },
      columns: [{
        title: '#',
        customRender: (text, record, index) => index + 1,
        key: 'index'
      }, {
        title: '导航名称',
        dataIndex: 'navigationName',
        key: 'navigationName'
      }],
      rowSelection: {},
      tabbarList: [
        {
          appId: '',
          navigationName: '',
          // navigationIcon: 'uicon-home',
          navigationType: undefined,
          navigationPath: '',
          status: true,
          inputNavPath: '',
          cascaderNavPath: [],
          selectedIconPath: [],
          iconPath: []
        },
        {
          appId: '',
          navigationName: '',
          // navigationIcon: 'uicon-home',
          navigationType: undefined,
          navigationPath: '',
          status: true,
          inputNavPath: '',
          cascaderNavPath: [],
          selectedIconPath: [],
          iconPath: []
        }
      ],
      appDataWindow: [],
      appBasicPage: [],
      spinning: true
    }
  },
  async mounted () {
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectTabbarIdList = selectedRows.map(item => item.id)
      }
    }
    this.spinning = true
    await this.axios({
      url: '/admin/modeling/initAppBasePageTrees'
    }).then(res => {
      const loop = (list) => {
        list.forEach(item => {
          item.text = item.name
          item.value = item.templateId
          if (item.children && item.children.lenght > 0) {
            loop(item.children)
          } else {
            delete item.children
          }
        })
      }
      const list = res.result || []
      loop(list)
      this.appBasicPage = list
    })
    await this.axios({
      url: '/admin/modeling/getAppDataWindowCascadeOptions'
    }).then(res => {
      if (!res.code) {
        this.appDataWindow = res.result
      }
    })
    this.spinning = false
  },
  methods: {
    show () {
      this.visible = true
      this.axios({
        url: '/admin/modeling/getNavigationBars',
        params: {
          appId: '__UNI__60CC441',
          filter: false
        }
      }).then(res => {
        if (!res.code && res.result.length > 0) {
          this.tabbarList = res.result.map(item => {
            if (['appBasicPage', 'appDataWindow'].includes(item.navigationType)) {
              item.cascaderNavPath = item.navigationPath.split('/')
              item.inputNavPath = ''
              item.status = item.status === 1
            } else {
              item.cascaderNavPath = []
              item.inputNavPath = item.navigationPath
              item.status = item.status === 1
            }
            // 对图片进行处理
            const iconPath = item.iconPath ? item.iconPath : []
            const selectedIconPath = item.selectedIconPath ? item.selectedIconPath : []
            if (iconPath.length > 0) {
              item.iconPath = [{
                name: item.iconPath[0].fileName,
                response: {
                  code: 0,
                  message: '',
                  result: item.iconPath[0],
                  timestamp: new Date().valueOf()
                },
                status: 'done',
                uid: 0,
                url: `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${item.iconPath[0].filePath}`
              }]
            }
            if (selectedIconPath.length > 0) {
              item.selectedIconPath = [{
                name: item.selectedIconPath[0].fileName,
                response: {
                  code: 0,
                  message: '',
                  result: item.selectedIconPath[0],
                  timestamp: new Date().valueOf()
                },
                status: 'done',
                uid: 0,
                url: `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${item.selectedIconPath[0].filePath}`
              }]
            }
            return item
          })
        }
      })
    },
    addTabbar () {
      const tarbarItem = JSON.parse(JSON.stringify(this.tarbarConfig))
      this.tabbarList.push(tarbarItem)
    },
    handleChange (val, tarbarItem) {
      tarbarItem.inputNavPath = ''
      tarbarItem.cascaderNavPath = []
      if (val === 'appBasicPage') {
        tarbarItem.list = this.appBasicPage
      } else if (val === 'appDataWindow') {
        tarbarItem.list = this.appDataWindow
      }
    },
    saveTababr () {
      const tabbarList = this.tabbarList.map(item => {
        if (['appBasicPage', 'appDataWindow'].includes(item.navigationType)) {
          const length = item.cascaderNavPath.length > 0
          item.navigationPath = length === 0 ? '' : item.cascaderNavPath.join('/')
        } else if (item.navigationType === 'custom') {
          item.navigationPath = item.inputNavPath
        }
        return {
          appId: item.appId,
          navigationName: item.navigationName,
          navigationType: item.navigationType,
          navigationPath: item.navigationPath,
          status: item.status ? 1 : 0,
          usePermissions: item.usePermissions ? item.usePermissions : [],
          iconPath: item.iconPath && item.iconPath.length > 0 ? [item.iconPath[0].response.result] : [],
          selectedIconPath: item.selectedIconPath && item.selectedIconPath.length > 0 ? [item.selectedIconPath[0].response.result] : []
        }
      })
      this.axios({
        url: '/admin/modeling/saveNavigationBars',
        data: {
          appId: '__UNI__60CC441',
          navigationBars: tabbarList
        }
      }).then(res => {
        if (!res.code) {
          this.visible = false
          this.$message.success(res.message)
        }
      })
    },
    handleSearchPriv (record, index) {
      this.$refs.privVisitForm.show({
        action: 'edit',
        title: this.$t('权限设置'),
        record: record,
        index: index,
        key: 'usePermissions',
        selectType: 'radio',
        privArr: {
          visit: this.$t('可访问')
        },
        defaultpriv: 'visit'
      })
    },
    getPrivs (usePermissions, index) {
      this.tabbarList[index].usePermissions = usePermissions
      this.$forceUpdate()
    },
    handleCopy () {
      this.tabbarList.forEach((item, index) => {
        if (this.selectTabbarIdList.includes(item.id)) {
          this.getPrivs(this.copySourceTabbar.usePermissions, index)
        }
      })
      this.copyPermissionsVisible = false
    },
    cancelCopy () {
      this.copyPermissionsVisible = !this.copyPermissionsVisible
      this.copySourceTabbar = {}
      this.selectTabbarIdList = []
    },
    beforeUpload (file, fileList, type) {
      return new Promise((resolve, reject) => {
        const fileType = type
        const suffix = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
        if (!fileType.includes(suffix)) {
          this.$message.error(this.$t('上传文件格式错误'))
          return reject(file)
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          const message = this.$t('上传文件大小超过{0}', { 0: '10M' })
          this.$message.error(message)
          return reject(file)
        }
        return resolve(file)
      })
    },
    // 图片附件赋值
    fileChange (info, obj, key) {
      info.fileList = info.fileList.map(item => {
        if (item.response && item.response.code !== 0) {
          this.debounceToast(item)
        }
        const obj = {
          name: item.name,
          response: item.response,
          status: item.status,
          uid: item.uid,
          url: item.response && item.response.result ? (this.$store.state.env.VUE_APP_API_BASE_URL + 'admin/api/download/?filePath=' + item.response.result.filePath) : ''
        }
        return obj
      })
      // if (info.file.status === 'done' || info.file.status === 'removed') {
      // this.$set(this.record.field, 'initValue', info.fileList)
      obj[key] = info.fileList
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar-card {
  width: 100%;
}
.tabbar-item {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 10px;
  // padding: 4px 10px;
  line-height: 38px;
}

.tabbar-uploader {
  // height: 80px;
  // width: 80px;
  // position: relative;
  // top: 2px;
  // display: inline-block;
  /deep/ .ant-upload {
    width: 80px;
    height: 80px;
    background: #fafafa;
    // border: 1px dashed #d9d9d9;
    cursor: pointer;
  }

  /deep/ .ant-upload-list-picture-card-container .ant-upload-list-item {
    width: 80px;
    height: 80px;
  }

  .tabbar-icon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
