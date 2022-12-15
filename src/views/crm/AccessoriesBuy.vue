<template>
  <div>
    <div style="background-color: #f5f5f5; min-height: 100vh; padding-bottom: 80px">
      <a-card size="small" :bordered="false" :bodyStyle="{ padding: '0px', 'margin-bottom': '8px' }">
        <div style="background-color: #ffffff">
          <!-- isFinishNum 0-待支付 1-已支付 2-交易关闭（超时） 3-已取消 -->
          <div
            :style="{
              'background-color':
                isFinishNum === 3
                  ? '#FA8C16'
                  : isFinishNum === 2
                  ? '#FA8C16'
                  : isFinishNum === 1
                  ? '#2FC25B'
                  : isFinishNum === 0
                  ? '#FF4D4F'
                  : '',
              padding: '20px',
              color: '#FFFFFF'
            }"
          >
            <!-- style="background-color: #FF4D4F; padding: 20px; color: #FFFFFF" -->
            <!-- 待支付 -->
            <template v-if="isFinishNum === 0">
              <div style="font-size: 16px">{{ $t('等待付款') }}</div>
              <div style="display: flex; align-items: center" class="time">
                <span>{{ $t('剩余') }}</span>
                <a-statistic-countdown
                  style="margin: 0 10px"
                  :value="deadline"
                  :format="$t('H 小时 m 分 s 秒')"
                  @finish="onFinish"
                />
                <span>{{ $t('自动关闭订单') }}</span>
              </div>
            </template>
            <!-- 已支付 -->
            <template v-else-if="isFinishNum === 1">
              <div>{{ $t('支付成功') }}</div>
              <div>{{ $t('支付时间：') }}{{ info.paymentInfo.payment_time }}</div>
            </template>
            <!-- 交易关闭 -->
            <template v-else-if="isFinishNum === 2">
              <div>{{ $t('交易已关闭') }}</div>
            </template>
            <!-- 取消订单 -->
            <template v-else-if="isFinishNum === 3">
              <div>{{ $t('订单已取消') }}</div>
              <!-- <div>取消时间：{{ info.paymentInfo.payment_time }}</div> -->
            </template>
          </div>
          <div style="padding: 20px">
            <div style="margin-bottom: 4px; font-size: 16px">{{ info.orderInfo.khmc }} {{ info.orderInfo.khdh1 }}</div>
            <div>{{ $t('地址：') }}{{ info.orderInfo.ssq }}{{ info.orderInfo.xxdz }}</div>
          </div>
        </div>
      </a-card>
      <!-- 商品信息列表 -->
      <a-card size="small" :bordered="false" :bodyStyle="{ padding: '0px', 'margin-bottom': '8px' }">
        <a-list item-layout="vertical" :dataSource="info.partsList">
          <div slot="footer" style="text-align: right; margin-right: 20px; font-size: 16px; color: #ff4d4f">
            <span>{{ $t('总计：') }}</span>
            <span>￥ {{ info.orderInfo.sqgmzje }}</span>
          </div>
          <a-list-item slot="renderItem" slot-scope="item" style="padding: 20px">
            <a-list-item-meta>
              <a-avatar
                v-if="item.pjtp.length > 0"
                slot="avatar"
                style="width: 68px; height: 68px"
                :src="setting.rootUrl + item.pjtp[0].filePath"
              />
              <div slot="title">
                {{ item.pjmc }}
              </div>
              <div slot="description" style="margin-bottom: -20px">
                <a-row type="flex" justify="space-between">
                  <a-col style="margin-bottom: 10px">{{ item.pjxh }}</a-col>
                  <a-col>x{{ item.sqgmsl }}</a-col>
                </a-row>
                <div>￥ {{ item.sqgmxj }}</div>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
      <a-card size="small" :bordered="false" :bodyStyle="{ padding: '20px', 'margin-bottom': '8px' }">
        <div>
          <span>{{ $t('订单编号：') }}</span>
          <span style="margin-left: 16px">{{ info.orderInfo.gdbh }}</span>
        </div>
        <div style="margin-top: 8px">
          <span>{{ $t('下单时间：') }}</span>
          <span style="margin-left: 16px">{{ info.orderInfo.zfxdsj }}</span>
        </div>
      </a-card>
      <div style="padding: 4px 8px 4px 8px; color: #ff4d4f">
        {{ $t('温馨提醒：若您需要使用微信支付，请点击“下载支付二维码”，然后再打开微信（扫一扫）识别此二维码进行支付') }}
      </div>
    </div>
    <div
      v-if="isFinishNum === 0"
      style="position: fixed; bottom: 0; width: 100%; background-color: #ffffff; padding: 10px"
    >
      <a-space>
        <a-button size="large" @click="cancel_Order">{{ $t('取消订单') }}</a-button>
        <template v-if="scanType">
          <!-- 扫码支付 -->
          <a-button size="large" type="danger" @click="confirm_pay(scanType)">{{ $t('确认支付') }}</a-button>
        </template>
        <template v-else>
          <!-- 点击链接 -->
          <a-button size="large" type="danger" @click="downLoadHref">{{ $t('下载支付二维码') }}</a-button>
          <a-button size="large" type="danger" @click="confirm_pay('alipay_qr')">{{ $t('支付宝支付') }}</a-button>
        </template>
      </a-space>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AdaPay from './common/adaPay.min'
export default {
  i18n: window.lang('crm'),
  data () {
    return {
      isFinishNum: 0, // 订单状态
      scanType: '',
      deadline: 0,
      listData: [{
        title: this.$t('配件名称')
      }],
      info: {
        orderInfo: {}
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'setting'])
  },
  mounted () {
    // 如果路径url存在qrcode 表示二维码扫码进入页面 qrcode=1
    if (this.$route.query.qrcode) {
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        const orderNumber = this.$route.query.orderNumber
        // 扫码在微信内打开
        this.scanType = 'wx_pub'
        const openid = this.$route.query.openid
        if (!openid) {
          window.location.href = `${this.$store.state.env.VUE_APP_API_BASE_URL}crm/PartsPay/getOpenid?orderNumber=${orderNumber}`
        }
      } else {
        // 扫码支付宝打开
        this.scanType = 'alipay_qr'
      }
    }
    setTimeout(() => {
      this.getInfo()
    }, 100)
  },
  methods: {
    // 倒计时结束触发事件
    onFinish () {
      this.isFinishNum = 2
    },
    // 取消订单
    cancel_Order () {
      const that = this
      this.$confirm({
        title: this.$t('确认取消订单吗？'),
        onOk () {
          that.axios({
            url: '/crm/partsPay/cancelOrder',
            data: {
              orderNumber: that.$route.query.orderNumber
            }
          }).then(res => {
            that.$message.success(that.$t('订单取消成功'))
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          })
        }

      })
    },
    // 转换金额为保留2位小数 强制保留2位小数的金额
    changeTwoDecimal (amt) {
      var num1 = parseFloat(amt)
      if (isNaN(num1)) {
        return '0.00'
      }
      var num = Math.round(num1 * 100) / 100
      var resultNum = num.toString()
      var posDecimal = resultNum.indexOf('.')
      if (posDecimal < 0) {
        posDecimal = resultNum.length
        resultNum += '.'
      }
      while (resultNum.length <= posDecimal + 2) {
        resultNum += '0'
      }
      return resultNum
    },
    // 支付
    confirm_pay (type) {
      if (type === 'alipay_qr') {
        // 支付宝支付
        this.payment('alipay_qr')
      } else {
        // 微信支付
        const openid = this.$route.query.openid
        if (openid) {
          this.payment('wx_pub', openid)
        } else {
          this.$message.error()
        }
      }
    },
    // 支付
    payment (payType, openId) {
      const result = this.info
      var money = result.orderInfo.sqgmzje // '0.10'
      if (!(parseFloat(money) > 0)) {
        this.$message.warning()
        return
      }
      var dataParam = {
        orderNumber: this.$route.query.orderNumber,
        payAmt: this.changeTwoDecimal(money),
        payChannel: payType,
        expend: {}
      }
      if (payType === 'wx_pub') {
        dataParam.expend = {
          is_raw: '1',
          open_id: openId
        }
      }
      this.axios({
        url: '/crm/partsPay/create',
        data: JSON.stringify(dataParam)
      }).then(res => {
        const paymentRes = res
        if (paymentRes.status === 'succeeded') {
          if (payType === 'alipay_qr') {
            // 支付宝
            // window.location.href = 'alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/bax01145yfufhqcskrhe208e'
            window.location.href = 'alipays://platformapi/startapp?appId=10000007&qrcode=' + paymentRes.expend.qrcode_url
          } else if (payType === 'wx_pub') {
            // 微信
            AdaPay.doPay(paymentRes, function (res) {
              window.WeixinJSBridge.call('closeWindow')
            })
          }
        } else if (paymentRes.status === 'payrepeat') {
          this.$message.error()
        } else if (paymentRes.status === 'paysuccess') {
          this.$message.error()
        } else {
          this.$message.error()
        }
      })
    },
    // 下载二维码跳转页面
    downLoadHref () {
      const orderNumber = this.$route.query.orderNumber
      window.open(`${this.$store.state.env.VUE_APP_API_BASE_URL}crm/PartsPay/qrcode/?orderNumber=${orderNumber}`)
    },
    // 获取订单信息
    getInfo () {
      const orderNumber = this.$route.query.orderNumber
      this.axios({
        url: '/crm/partsPay/pageInfo',
        data: {
          orderNumber: orderNumber // 'PJGM202103021620566882'
        }
      }).then(res => {
        this.info = res.result
        // 手机号脱敏处理
        const str = res.result.orderInfo.khdh1
        const pat = /(\d{3})\d*(\d{4})/
        const phone = str.replace(pat, '$1****$2')
        this.info.orderInfo.khdh1 = phone

        // 订单支付剩余时间 1615542383
        var nowtime = new Date().getTime()
        var lefttime = res.result.endTime * 1000 - nowtime // 测试数据 1616842383
        this.deadline = Date.now() + lefttime

        // 订单状态 isFinishNum 0-待支付 1-已支付 2-交易关闭（超时）3-已取消
        const dataRes = res.result
        if (dataRes.orderInfo.pjgmzt && dataRes.orderInfo.pjgmzt === '待客户付款') {
          this.isFinishNum = 0
        } else if (dataRes.paymentInfo && dataRes.paymentInfo.payment_status === '已支付') {
          this.isFinishNum = 1
        } else if (dataRes.orderInfo.pjgmzt && dataRes.orderInfo.pjgmzt === '已取消') {
          this.isFinishNum = 3
        } else {
          this.isFinishNum = 2 // 交易关闭 2
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-statistic-content {
  font-size: 14px;
  color: #ffffff;
}
</style>
