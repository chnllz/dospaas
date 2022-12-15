<template>
  <div>
    <a-tabs v-if="isExist" v-model="tabValue" @change="tabChange">
      <a-tab-pane key="1" tab="客户信息">
        <user-table-form-view
          ref="userTableFormView"
          :params="{
            tableName,
            template,
            fieldRule,
            remarksRule,
            handleFormRules,
            parentParams: params,
            handleWayData,
            remarksMaxRows,
            remarksMinRows,
            templateOther: template,
            action: 'edit',
            page: 'over'
          }"
          :formThis="data_"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="工单信息" class="tabScroll">
        <a-spin :spinning="loading" class="spinning" />
        <div v-if="!loading">
          <div v-if="orderList.length > 0">
            <a-card v-for="(item, index) in orderList" :key="index" class="orderBox">
              <div slot="title" style="font-size: 14px">
                {{ item.keHuMingCheng || '--' }} {{ item.keHuDianHua || '--' }}
                <a-tag v-if="item.keHuJiBie" color="green" class="orderLevel">{{ item.keHuJiBie }}</a-tag>
              </div>
              <div class="orderBody">
                <div v-for="(itemInfo, indexInfo) in orderInfo" :key="indexInfo" class="orderBodyBox">
                  <div class="orderBodyText">
                    {{ itemInfo.name }}
                  </div>
                  <div>
                    {{ item[itemInfo.alias] || '--' }}
                  </div>
                </div>
              </div>
            </a-card>
          </div>
          <div v-else-if="orderList.length === 0" style="margin-top: 20px">
            <a-empty description="该用户暂无工单"></a-empty>
          </div>
          <div v-if="totalCount >= 5" class="pageClass">
            <a-pagination
              v-model="current"
              size="small"
              :page-size-options="pageSizeOptions"
              :total="totalCount"
              show-size-changer
              :page-size="pageSize"
              :show-total="(total, range) => `显示第${range[0]}条到${range[1]}条记录，一共${total}条`"
              @change="onChange"
              @showSizeChange="onShowSizeChange"
            ></a-pagination>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div v-else style="margin-top: 20px">
      <a-empty description="没有找到客户资料"></a-empty>
    </div>
  </div>
</template>
<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script>
<script>
export default {
  components: {
    UserTableFormView: () => import('@/views/admin/General/UserTableFormView')
  },
  data () {
    return {
      data_: this,
      params: {},
      visible: false,
      template: [],
      templateOther: [],
      fieldRule: [],
      data: {},
      handleWayData: [],
      handleFormRules: [],
      remarksRule: '',
      tableName: '',
      remarksMinRows: 2,
      remarksMaxRows: 4,
      templateId: '',
      isExist: true,
      tabValue: '1',
      totalCount: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      loading: false,
      orderList: [],
      keHuBianHao: '',
      orderInfo: [{
        name: '工单类型',
        alias: 'gongDanLeiXing'
      }, {
        name: '工单编号',
        alias: 'caseNumber'
      }, {
        name: '流程状态',
        alias: 'processStatus'
      }, {
        name: '工单来源',
        alias: 'gongDanLaiYuan'
      }, {
        name: '创建时间',
        alias: 'inputTime'
      }, {
        name: '品牌',
        alias: 'pinPai'
      }]
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      this.template = []
      const that = this
      this.axios({
        url: '/customer/wechat/api/init',
        params: {
          url: window.location.href
        }
      }).then(res => {
        if (res.code === 0) {
          res.result.result.timestamp = parseInt(res.result.result.timestamp)
          let obj = res.result.result
          wx.agentConfig({
            corpid: obj.corpid,
            agentid: obj.agentid,
            timestamp: obj.timestamp,
            nonceStr: obj.nonceStr,
            signature: obj.signature,
            jsApiList: ['getCurExternalContact'], //必填，传入需要使用的接口名称
            success: function (ageRes) {
              // 回调
              wx.invoke('getCurExternalContact', {}, function (wxRes) {
                if (wxRes.err_msg == 'getCurExternalContact:ok') {
                  that.getUserInfo(wxRes.userId)
                } else {
                  //错误处理
                  document.write('出现错误了', JSON.stringify(wxRes))
                }
              })
            },
            fail: function (ageRes) {
              document.write('Error', JSON.stringify(ageRes))
              if (res.errMsg.indexOf('function not exist') > -1) {
                alert('版本过低请升级')
              }
            },
          })
        }
      })
    },
    tabChange (e) {
      if (e === '2') {
        this.current = 1
        this.getOrderList()
      }
    },
    getOrderList () {
      this.loading = true
      this.axios({
        url: '/customer/wechat/api/getOrder',
        tips: false,
        data: {
          keHuBianHao: this.keHuBianHao,
          pageNo: this.current,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.orderList = res.result.data
          this.totalCount = res.result.totalCount
        }
      })
    },
    onShowSizeChange (current, pageSize) {
      this.current = 1
      this.pageSize = pageSize
      this.getOrderList()
    },
    onChange (page, pageSize) {
      this.current = page
      this.getOrderList()
    },
    getUserInfo (userId) {
      this.axios({
        url: '/customer/wechat/api/getCustomerId',
        tips: false,
        params: {
          externalUserid: userId
        }
      }).then(resCustomer => {
        this.isExist = resCustomer.code === 0
        if (resCustomer.code === 0) {
          this.axios({
            url: '/admin/general/api/render',
            tips: false,
            data: {
              action: 'edit',
              flowStatus: 'proceed',
              id: resCustomer.result.id,
              listTemplateId: '1957450f45b9460e92f1d7e384efab83',
              templateId: '8d53a6648e1d4a14a4eefb90e9271ffc'
            }
          }).then(res => {
            if (res.code === 0) {
              this.keHuBianHao = res.result.data.keHuBianHao
              this.tableName = res.result.tableName
              this.template = JSON.parse(JSON.stringify(res.result.template)) || []
              this.templateOther = JSON.parse(JSON.stringify(res.result.template)) || []
              // 表单初始化loader
              if (res.result.templateScript && res.result.templateScript.afterInit) {
                var initAttribute = res.result.templateScript.afterInit
                var initTemplate = {
                  type: 'component',
                  attribute: initAttribute
                }
                this.template.push(initTemplate)
              }
              this.fieldRule = res.result.fieldRule
              const getComponent = (array) => {
                array.forEach((item, index) => {
                  if (item.columns) {
                    getComponent(item.columns)
                  } else if (item.trs) {
                    getComponent(item.trs)
                  } else if (item.list) {
                    getComponent(item.list)
                  } else {
                    if (item.type === 'component') {
                      item.component = {
                        template: `<span>${item.attribute}</span>`,
                        data: () => {
                          return {
                            parent: this
                          }
                        }
                      }
                    }
                  }
                })
              }
              getComponent(this.template)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tabScroll {
  overflow-y: scroll;
  height: 94vh;
  padding-bottom: 20px;
}
.pageClass {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
.orderBox {
  margin: 10px;
  font-size: 14px;
}
.orderLevel {
  margin-left: 10px;
}
.orderBody {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.orderBodyBox {
  width: 100%;
  padding-bottom: 10px;
  display: flex;
}
.orderBodyBox div {
  flex: 1;
}
.orderBodyText {
  color: #7f7f7f;
  padding-bottom: 10px;
}
.spinning {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
