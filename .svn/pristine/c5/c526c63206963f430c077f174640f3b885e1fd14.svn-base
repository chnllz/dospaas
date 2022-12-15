<template>
  <a-spin :spinning="loadingOrder" style="height: calc(100vh - 169px); overflow-y: auto; overflow-x: hidden">
    <div v-if="dataInfo && dataInfo.sysLog">
      <div style="padding: 16px">
        <div style="font-size: 14px; margin-bottom: 4px">订单号：{{ dataInfo.data.orderId }}</div>
        <div style="display: flex">
          <div style="widht: 200px; font-size: 20px; font-weight: bold; margin-right: 16px">
            {{ orderStatusText }}
          </div>
          <a-space>
            <a-button>{{ dataInfo.data.deliveryTypeName }}</a-button>
            <a-button>{{ dataInfo.data.pickupType }}</a-button>
            <a-button v-if="dataInfo.data.isInsure === 1">{{ $t('保价单') }}</a-button>
            <a-button>{{ dataInfo.data.businessType }}</a-button>
            <a-button v-if="dataInfo.data.isNecessar === 2">{{ $t('不兜底') }}</a-button>
          </a-space>
        </div>
        <div style="margin-top: 8px">
          <a-space>
            <div style="widht: 200px; margin-right: 16px">
              <span style="margin-right: 8px">{{ $t('期望时间') }}</span>
              <span>{{ dataInfo.data.expectTime ? dataInfo.data.expectTime.substring(5, 16) : '--' }}</span>
            </div>
            <div style="widht: 200px; margin-right: 16px">
              <span style="margin-right: 8px">{{ $t('考核上门') }}</span>
              <span>
                {{
                  dataInfo.data.assessmentHomeTimeDesc ? dataInfo.data.assessmentHomeTimeDesc.substring(5, 16) : '--'
                }}
              </span>
            </div>
            <div style="widht: 200px; margin-right: 16px">
              <span style="margin-right: 8px">{{ $t('考核送达') }}</span>
              <span>
                {{ dataInfo.data.locAssessmentTimeDesc ? dataInfo.data.locAssessmentTimeDesc.substring(5, 16) : '--' }}
              </span>
            </div>
          </a-space>
        </div>
      </div>
      <div
        style="
          padding: 16px 0;
          display: flex;
          overflow: auto;
          background: #f0f0f0;
          border-radius: 4px;
          margin-right: 12px;
        "
      >
        <div v-for="(item, index) in sysLogTimeList" :key="index" class="item" style="position: relative">
          <div class="textIconDiv" style="text-align: center; width: 140px">
            <div style="white-space: nowrap">
              {{
                item.actionType === 0
                  ? '创建物流订单'
                  : item.actionType === 1
                  ? '订单指派'
                  : item.actionType === 2
                  ? '骑士接单'
                  : item.actionType === 3
                  ? '骑士拿单'
                  : item.actionType === 4
                  ? '到达取货点'
                  : item.actionType === 5
                  ? '取货'
                  : item.actionType === 6
                  ? '妥投'
                  : item.actionType === 7
                  ? '撤回'
                  : item.actionType === 8
                  ? '取消订单'
                  : item.actionType === 14
                  ? '用户取消订单'
                  : item.actionType === 18
                  ? '骑士抢单'
                  : item.actionType === 20
                  ? '扫码收件'
                  : item.actionType === 21
                  ? '收件完成'
                  : item.actionType === 22
                  ? '扫码派件'
                  : item.actionType === 23
                  ? '派件完成'
                  : item.actionType === 29
                  ? '创建并开始hold单'
                  : item.actionType === 30
                  ? '取消hold单'
                  : ''
              }}
            </div>
            <div style="margin: 8px 0">
              <a-icon type="check-circle" style="font-size: 32px; color: #616367" />
            </div>
            <div>
              {{ item.actionTime.split(' ')[1].split(':')[0] + ':' + item.actionTime.split(' ')[1].split(':')[1] }}
            </div>
          </div>
          <div
            v-if="index !== sysLogTimeList.length - 1"
            class="timeLineContent"
            style="position: absolute; top: 50%; left: 50%; transform: translate(16%, -50%)"
          >
            <div style="display: flex; align-items: center; width: 105px">
              <div style="width: 40px; border: 1px dashed #616367"></div>
              <div style="white-space: nowrap; font-size: 14px; margin: 0 2px">{{ item.timeLong }}</div>
              <div style="width: 40px; border: 1px dashed #616367"></div>
            </div>
          </div>
        </div>
      </div>
      <a-divider />
      <a-form :labelCol="{ span: 10 }" :wrapperCol="{ span: 14 }">
        <a-row :gutter="32" style="margin-top: 8px">
          <a-col :span="14">
            <h3>
              <tag-icon />
              {{ $t('店铺/寄方信息') }}
            </h3>
            <a-card size="small" :bordered="false">
              <a-row>
                <a-col :span="12">
                  <a-form-item :label="$t('名称')">{{ dataInfo.data.shopName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('电话')">{{ dataInfo.data.shopPhone }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('商家名称')">{{ dataInfo.data.shopSupplierName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('注册电话')">{{ dataInfo.data.buyerPhone }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('发单位置所在商圈')">{{ dataInfo.data.shopRealAoiId }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('隐私号')">{{ dataInfo.data.riderVphone4sender }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('商圈')">{{ dataInfo.data.aoiName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('商家小票序号')">{{ dataInfo.data.orderIndex }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('地址')">{{ dataInfo.data.originalShopAddress }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('商家行业')">{{ dataInfo.data.industryId }}</a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="4" style="padding-top: 48px">
            <img src="./img/swapRight.png" style="margin-left: 8px" />
            <div style="margin-left: 8px">
              <div style="white-space: nowrap; margin: 8px 0">
                <span>{{ $t('计价') }}</span>
                {{ dataInfo.data.deliveryDistance }}{{ $t('公里') }}
              </div>
              <div style="white-space: nowrap">
                <span>{{ $t('计提') }}</span>
                {{ dataInfo.data.ridingDistance }}{{ $t('公里') }}
              </div>
            </div>
          </a-col>
          <a-col :span="6">
            <h3>
              <tag-icon />
              {{ $t('用户/收方信息') }}
            </h3>
            <a-card size="small" :bordered="false">
              <a-form-item :label="$t('名称')">{{ dataInfo.data.userName }}</a-form-item>
              <a-form-item :label="$t('电话')">{{ dataInfo.data.userPhone }}</a-form-item>
              <a-form-item :label="$t('隐私号')">{{ dataInfo.data.riderVphone }}</a-form-item>
              <a-form-item :label="$t('地址')">{{ dataInfo.data.userAddress }}</a-form-item>
            </a-card>
          </a-col>
        </a-row>
        <a-divider />
        <a-row :gutter="32">
          <a-col :span="12">
            <h3>
              <tag-icon />
              {{ $t('下单信息') }}
            </h3>
            <a-card size="small" :bordered="false">
              <a-row>
                <a-col :span="12">
                  <a-form-item :label="$t('下单方式')">{{ dataInfo.data.orderChannel }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('服务模式')">{{ dataInfo.data.dispatchTypeName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('订单来源')">{{ dataInfo.data.orderFrom }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('物流产品')">{{ dataInfo.data.logisticTypeName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('发单平台')">{{ dataInfo.data.sourceName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('订单重量')">{{ dataInfo.data.weightGram }}{{ $t('千克') }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('配送中心')">{{ dataInfo.data.lcName }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('声明价值(元)')">{{ dataInfo.data.declaredValue }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('商品类型')">{{ dataInfo.data.productType }}</a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :label="$t('物品价值(元)')">{{ dataInfo.data.claimRange }}</a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
            <h3>
              <tag-icon />
              {{ $t('支付信息') }}
            </h3>
            <a-card size="small" :bordered="false">
              <a-col :span="12">
                <a-form-item :label="$t('取件码')">{{ dataInfo.data.pickupCode }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('支付方式')">{{ dataInfo.data.paymentMethod }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('签收码')">{{ dataInfo.data.completeCode }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('应收配送费')">{{ dataInfo.data.totalPayMoney }}{{ $t('元') }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('是否专人直送')">{{ dataInfo.data.isPersonDirect }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('实收配送费')">{{ dataInfo.data.realPayMoney }}{{ $t('元') }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('结算方式')">{{ dataInfo.data.settlementType }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('大网月结卡号')">{{ dataInfo.data.customerCode }}</a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :colon="false">
                  <a slot="label" @click="modalVisible = !modalVisible">{{ $t('货品详情') }}</a>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item :label="$t('订单备注')">{{ dataInfo.data.remark }}</a-form-item>
              </a-col>
            </a-card>
          </a-col>
        </a-row>
        <a-divider />
        <div>
          <h3>
            <tag-icon />
            {{ $t('骑士信息') }}
          </h3>
          <a-card size="small" :bordered="false">
            <a-row>
              <a-col :span="6">
                <a-form-item :label="$t('骑士姓名')">{{ dataInfo.data.riderName }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('寄方隐私号')">{{ dataInfo.data.riderVphone4sender }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('骑士类型')">
                  {{
                    dataInfo.data.workType === 100
                      ? '全日制专职'
                      : dataInfo.data.workType === 101
                      ? '非全日制专职'
                      : dataInfo.data.workType === 200
                      ? '同城兼职骑士'
                      : dataInfo.data.workType === 110
                      ? '供应商骑士'
                      : dataInfo.data.workType === 201
                      ? '供应商骑士'
                      : dataInfo.data.workType === 202
                      ? '兼职供应商骑士'
                      : ''
                  }}
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('签收人')">{{ dataInfo.data.signTag }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('骑士电话')">{{ dataInfo.data.riderPhone }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('收方隐私号')">{{ dataInfo.data.riderVphone }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('同城ID')">{{ dataInfo.data.ucode }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('取货拍照')">
                  <div v-if="dataInfo.data.picpickUrls && dataInfo.data.picpickUrls.length > 0" v-viewer>
                    <img
                      v-for="(item, index) in dataInfo.data.picpickUrls"
                      :key="index"
                      :src="item"
                      style="width: 60px; height: 40px; margin: 4px"
                    />
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('是否先锋骑士')">{{ dataInfo.data.isPioneer }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('注册人隐私号')">{{ dataInfo.data.riderVphone4account }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('骑士ID')">{{ dataInfo.data.riderId }}</a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item :label="$t('到店拍照')">
                  <div v-if="dataInfo.data.arriveshopUrls && dataInfo.data.arriveshopUrls.length > 0" v-viewer>
                    <img
                      v-for="(item, index) in dataInfo.data.arriveshopUrls"
                      :key="index"
                      :src="item"
                      style="width: 60px; height: 40px; margin: 4px"
                    />
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="6" style="text-align: left">
                <a-form-item :label="$t('骑士站点')">{{ dataInfo.data.riderStation }}</a-form-item>
              </a-col>
              <a-col :span="6"></a-col>
              <a-col :span="6"></a-col>
              <a-col :span="6">
                <a-form-item :label="$t('妥投拍照')">
                  <div v-if="dataInfo.data.finishUrls && dataInfo.data.finishUrls.length > 0" v-viewer>
                    <img
                      v-for="(item, index) in dataInfo.data.finishUrls"
                      :key="index"
                      :src="item"
                      style="width: 60px; height: 40px; margin: 4px"
                    />
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </div>
        <a-divider />
        <div>
          <h3>
            <tag-icon />
            {{ $t('系统日志') }}
          </h3>
          <a-table
            ref="table"
            size="small"
            rowKey="id"
            :columns="columnsLog"
            :dataSource="sysLogList"
            :pagination="false"
            :sorter="{ field: 'id', order: 'descend' }"
          ></a-table>
        </div>
      </a-form>
    </div>
    <a-empty v-else />
    <a-modal
      :title="$t('货品详情')"
      :visible="modalVisible"
      :destroyOnClose="true"
      :closable="!modalLoading"
      :maskClosable="!modalLoading"
      :confirmLoading="modalLoading"
      @cancel="modalVisible = !modalVisible"
    >
      <a-table
        ref="tablePic"
        size="small"
        rowKey="id"
        :columns="columnsPic"
        :dataSource="picList"
        :pagination="false"
        :sorter="{ field: 'id', order: 'descend' }"
      >
        <div slot="title">
          <a-form :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
            <a-row>
              <a-col :span="8">
                <a-form-item :label="$t('货品价格')">{{ dataInfo.data.totalPrice }}{{ $t('元') }}</a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="$t('货品种类')">{{ dataInfo.data.productType }}</a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="$t('货品数量')">{{ dataInfo.data.dishNum }}</a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-table>
      <a-table
        ref="tableProduct"
        style="margin-top: -1px"
        size="small"
        rowKey="productId"
        :columns="columnsProductDetail"
        :dataSource="productDetailList"
        :pagination="false"
        :sorter="{ field: 'id', order: 'descend' }"
      ></a-table>
      <div slot="footer">
        <a-button @click="modalVisible = !modalVisible">{{ $t('关闭') }}</a-button>
      </div>
    </a-modal>
  </a-spin>
</template>

<script>
export default {
  props: {
    orderId: {
      type: String,
      default: () => 0
    }
  },
  data () {
    return {
      orderStatusText: '',
      modalVisible: false,
      modalLoading: false,
      loadingOrder: false,
      productDetailList: [],
      columnsProductDetail: [{
        title: this.$t('商品名称'),
        dataIndex: 'productName'
      }, {
        title: this.$t('数量'),
        dataIndex: 'productNum'
      }],
      picList: [],
      columnsPic: [{
        title: this.$t('商品图片'),
        dataIndex: 'url',
        customRender: (text, record) => {
          if (text) {
            return (<div slot="url" slot-scope="text, record" v-viewer>
              <img src={text} alt="" style="width: 160px; height: 64px; cursor: pointer;" />
            </div>)
          } else {
            return '--'
          }
        }
      }, {
        title: this.$t('图片来源'),
        dataIndex: 'from'
      }],
      sysLogList: [],
      sysLogTimeList: [],
      columnsLog: [{
        title: '操作人',
        dataIndex: 'operatorName'
      }, {
        title: this.$t('操作内容'),
        dataIndex: 'actionDesc'
      }, {
        title: this.$t('操作时间'),
        dataIndex: 'actionTime'
      }],
      dataInfo: {
        data: {}
      }
    }
  },
  watch: {
    orderId (newVal) {
      this.getDetail()
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.loadingOrder = true
      this.axios({
        url: '/express/sfExpress/getOrderDetail',
        data: {
          orderId: this.orderId
        }
      }).then(res => {
        this.loadingOrder = false
        if (res.code !== 0) {
          return
        }
        this.dataInfo = res.result || {}
        const status = res.result.data.orderStatus
        this.orderStatusText = status === 5010 ? this.$t('订单待支付') : status === 6000 ? this.$t('订单待分配') : status === 6021 ? this.$t('订单待拿单') : status === 6022 ? this.$t('订单待抢单') : status === 7010 ? this.$t('订单待接单') : status === 7020 ? this.$t('骑士已接单') : status === 7030 ? this.$t('到达取货点') : status === 8010 ? this.$t('订单配送中') : status === 8020 ? this.$t('已到用户处') : status === 9100 ? this.$t('订单已完成') : status === 9020 ? this.$t('订单取消中') : status === 10000 ? this.$t('订单已取消') : ''
        this.sysLogList = res.result.sysLog
        this.sysLogTimeList = res.result.sysLog.filter(item => [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 18, 20, 21, 22, 23, 29, 30].includes(item.actionType))
        this.picList = res.result.detail.picInfo
        this.productDetailList = res.result.detail.productDetail
        this.sysLogTimeList.forEach((item, index) => {
          this.getTimeLong(item, index)
        })
      })
    },
    getTimeLong (item, index) {
      if (index + 1 < this.sysLogTimeList.length) {
        const second1 = parseInt(new Date(this.sysLogTimeList[index].actionTime).getTime() / 1000)
        const second2 = parseInt(new Date(this.sysLogTimeList[index + 1].actionTime).getTime() / 1000)
        const secondDiff = second2 - second1 // 相减得出 差值 秒数值
        let secondLong = secondDiff + this.$t('秒')
        if (secondDiff > 59) {
          secondLong = parseInt(secondDiff / 60) + this.$t('分')
        }
        this.$set(this.sysLogTimeList[index], 'timeLong', secondLong)
      }
    }
  }
}
</script>
