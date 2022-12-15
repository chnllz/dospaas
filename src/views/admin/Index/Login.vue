<template>
  <div ref="loginMain" class="main" :style="{ minHeight: `${mainHeight}px` }">
    <div class="loginTitle">{{ isPassword ? '账号' : '二维码' }}登录</div>
    <div v-if="platform !== 'jinYong'" class="loginMethod">
      <a-popover placement="left">
        <template slot="content">
          <div>{{ isPassword ? '二维码' : '账号' }}登录</div>
        </template>
        <img
          :src="require(`../assets/image/login${isPassword ? 'QrCode' : 'Computer'}.png`)"
          @click="changeLoginMethod"
        />
      </a-popover>
    </div>
    <div ref="loginMainCenter" class="loginMainCenter" :style="{ height: `${formHeight}px` }">
      <a-form v-if="showForm" ref="formLogin" :form="form">
        <div v-show="isPassword" ref="loginPassword" class="loginPassword">
          <a-form-item>
            <a-input
              v-decorator="[
                `${loginChoiceValue === 'code' ? 'username' : 'phone'}`,
                {
                  rules: [{ required: true, message: $t(`请输入${loginChoiceValue === 'code' ? '账号' : '手机号码'}`) }]
                }
              ]"
              size="large"
              :placeholder="$t(`请输入${loginChoiceValue === 'code' ? '账号' : '手机号码'}`)"
            >
              <img
                slot="prefix"
                :src="require(`../assets/image/login${loginChoiceValue === 'code' ? 'User' : 'Phone'}.png`)"
                class="loginPreIcon"
              />
            </a-input>
          </a-form-item>
          <div v-if="loginChoiceValue === 'code'">
            <a-form-item>
              <a-input-password
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: $t('请输入密码') }], validateTrigger: 'blur' }
                ]"
                size="large"
                autocomplete="false"
                :placeholder="$t('请输入密码')"
              >
                <img slot="prefix" :src="require('../assets/image/loginPassword.png')" class="loginPreIcon" />
              </a-input-password>
            </a-form-item>
            <a-form-item v-if="setting['serviceStatusEnable']">
              <div class="loginCodeClass">
                <img :src="require('../assets/image/loginPassword.png')" alt="" class="loginPreIcon" />
                <a-tree-select
                  v-if="treeShow"
                  v-decorator="[
                    'status',
                    { initialValue: 1, rules: [{ required: true, message: $t('请选择在线客服的状态') }] }
                  ]"
                  :placeholder="$t('请选择在线客服的状态')"
                  size="large"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="chatFurtherStates"
                >
                  <img slot="prefix" :src="require('../assets/image/loginPassword.png')" class="loginPreIcon" />
                </a-tree-select>
                <a-select
                  v-else
                  v-decorator="[
                    'status',
                    { initialValue: 1, rules: [{ required: true, message: $t('请选择在线客服的状态') }] }
                  ]"
                  size="large"
                  :placeholder="$t('请选择在线客服的状态')"
                >
                  <a-select-option v-for="status in chatFurtherStates" :key="status.value">
                    {{ status.label }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item v-if="setting.enableCaptcha === '1'">
              <a-input
                v-decorator="['code', { rules: [{ required: true, message: $t('请输入验证码') }] }]"
                size="large"
                :placeholder="$t('请输入验证码')"
              >
                <img slot="prefix" :src="require('../assets/image/loginCode.png')" class="loginPreIcon" />
                <img
                  slot="suffix"
                  :title="$t('换一张')"
                  style="width: 80px; height: auto; cursor: pointer"
                  :src="`${$store.state.env.VUE_APP_API_BASE_URL}admin/index/api/captchaImage?uuid=${uuid}&key=${nowTime}`"
                  @click="getCodeImg"
                />
              </a-input>
            </a-form-item>
          </div>
          <div v-else>
            <a-row type="flex" justify="space-between">
              <a-col flex="auto">
                <a-form-item style="margin-right: 10px">
                  <a-input
                    v-decorator="[
                      'code',
                      {
                        rules: [{ required: true, message: $t('请输入验证码') }],
                        validateTrigger: 'change'
                      }
                    ]"
                    size="large"
                    style="width: 100%"
                    :placeholder="$t('请输入验证码')"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col flex="140px">
                <a-button
                  size="large"
                  style="width: 100%"
                  type="primary"
                  :disabled="!!countDownTimer"
                  @click="getValidateCode"
                >
                  {{ $t('获取验证码') }}
                  <span v-if="countDownTimer">({{ countDown }})</span>
                </a-button>
              </a-col>
            </a-row>
          </div>
          <a-form-item>
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-checkbox
                  v-if="setting['rememberPassword']"
                  v-decorator="['rememberMe', { initialValue: rememberMe, valuePropName: 'checked' }]"
                  @change="rememberMeChange"
                >
                  {{ $t('记住密码') }}
                </a-checkbox>
              </a-col>
              <a-col>
                <a v-if="setting['forgetPassword'] === '1'">忘记密码？</a>
              </a-col>
            </a-row>
          </a-form-item>
          <div>
            <div class="loginPasswordButton">
              <a-button
                size="large"
                :style="{ background: buttonColor, border: 'none', color: '#ffffff' }"
                htmlType="submit"
                class="login-button"
                :loading="loginBtn"
                :disabled="loginBtn"
                @click="handleSubmit"
              >
                {{ $t('登录') }}
              </a-button>
            </div>
            <a-form-item
              v-if="setting['loginByMobile'] === '1'"
              class="loginChoiceForm"
              :label="$t('其他登录方式')"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 18 }"
            >
              <a-select v-model="loginChoiceValue" class="loginChoiceClass">
                <a-select-option v-for="item in loginChoiceList" :key="item.key">
                  <a-row type="flex" align="middle">
                    <a-col>
                      <img
                        :src="require(`../assets/image/${item.key}Login.png`)"
                        alt=""
                        style="margin: 0 6px 5px 0"
                        @click="changeLoginMethod"
                      />
                    </a-col>
                    <a-col>
                      {{ item.label }}
                    </a-col>
                  </a-row>
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </div>
        <div v-show="!isPassword" class="loginQrClass" :style="{ height: `${formHeight}px` }">
          <div id="qrCode" ref="qrCodeRef"></div>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import { mapActions, mapGetters } from 'vuex'
import storage from '@/utils/storage'
import { throttle } from 'echarts/lib/export'
export default {
  i18n: window.lang('admin'),
  data () {
    this.getCodeImg = throttle(this.getCodeImg, 1000)
    this.handleSubmit = throttle(this.handleSubmit, 1000)
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      buttonColor: '',
      treeShow: false,
      chatFurtherStates: [{
        value: 0,
        label: this.$t('就绪')
      }, {
        value: 2,
        label: this.$t('示忙')
      }, {
        value: 1,
        label: this.$t('离开')
      }],
      uuid: '',
      codeImgSrc: '',
      nowTime: '',
      rememberMe: '',
      countDown: 0,
      countDownTimer: null,
      showForm: false,
      isPassword: true,
      wxCode: '',
      redirect_uri: '',
      loginChoiceList: [{
        label: '密码登录',
        key: 'password'
      }, {
        label: '验证码登录',
        key: 'code'
      }],
      loginChoiceValue: 'code',
      mainHeight: 428,
      formHeight: 405,
      codeInfo: {},
      platform: ''
    }
  },
  computed: {
    ...mapGetters(['setting'])
  },
  mounted () {
    if (this.$refs.loginMain.offsetHeight > 511) {
      this.mainHeight = this.$refs.loginMain.offsetHeight
    }
  },
  created () {
    this.buttonColor = storage.get('DEFAULT_COLOR') || '#28beca'
    this.rememberMe = storage.get('rememberMe')
    storage.set('getInit', {
      loading: true,
      status: false
    })
    this.axios({
      url: '/admin/index/init',
      data: {
        language: storage.get('lang')
      }
    }).then(res => {
      storage.set('getInit', {
        loading: false,
        status: res.code === 0
      })
      this.checkCenterNode()
      this.showForm = res.code === 0
      if (res.code === 0) {
        this.isPassword = res.result.setting['defaultLoginMode'] === 'account'
        this.getQrCode().then(resQr => {
          if (resQr.code === 0) {
            this.platform = resQr.result['platform']
            if (!this.isPassword) {
              this.checkNode()
            }
          }
        })
        this.SetSetting(res.result.setting)
        if (res.result.setting.chatFurtherStates) {
          const list = JSON.parse(res.result.setting.chatFurtherStates)
          this.treeShow = true
          this.chatFurtherStates.forEach(item => {
            if (item.value === 2) {
              item.selectable = false
              item.children = list.filter(filterItem => filterItem.check)
            }
          })
        }
      }
    })
    this.uuid = storage.get('UUID') || this.getUuid()
    this.getCodeImg()
  },
  methods: {
    ...mapActions(['Login', 'SetSetting']),
    // 切换二维码则渲染构建方法
    changeLoginMethod () {
      this.isPassword = !this.isPassword
      if (!this.isPassword) {
        this.checkNode()
      }
    },
    // 渲染二维码生成
    checkNode () {
      if (document.getElementById('qrCode') == null) {
        setTimeout(() => {
          this.checkNode()
        }, 100)
      } else {
        this.renderQrCode()
      }
    },
    checkCenterNode () {
      if (this.$refs.loginMainCenter.offsetHeight === 0) {
        setTimeout(() => {
          this.checkCenterNode()
        }, 100)
      } else {
        if (this.$refs.loginMainCenter.offsetHeight > 0) {
          this.formHeight = this.$refs.loginMainCenter.offsetHeight
        }
      }
    },
    // 获取二维码相关参数
    getQrCode () {
      return this.axios({
        url: '/admin/platform/api/getLoginData',
        params: {
          redirectUri: location.origin + process.env.VUE_APP_BASE_URL
        }
      }).then(res => {
        if (res.code === 0) {
          this.codeInfo = res.result
        }
        return res
      })
    },
    // 构建内嵌企业微信二维码
    renderQrCode () {
      // 调用企业微信二维码方法
      /* eslint-disable */
      new WwLogin({
        id: 'qrCode',
        appid: this.codeInfo.appId,
        agentid: this.codeInfo.agentid,
        redirect_uri: this.codeInfo.redirectUri
      })
      if (this.$refs.qrCodeRef.lastElementChild) {
        const childStyle = this.$refs.qrCodeRef.lastElementChild.style
        const height = 400
        if (this.formHeight > 400) {
          height = this.formHeight
        }
        childStyle.height = `${height - 70}px`
        childStyle.width = `${height - 170}px`
      }
    },
    // 自动登录
    rememberMeChange (e) {
      storage.set('rememberMe', e.target.checked)
    },
    // 登录提交方法
    handleSubmit () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.loginBtn = true
          let loginParams = { ...values }
          if (this.loginChoiceValue === 'code') {
            loginParams.password = md5(values.password)
          }
          loginParams.uuid = this.uuid
          if (loginParams.status) {
            delete loginParams.status
          }
          this.Login(loginParams)
            .then((res) => {
              this.loginSuccess(res, values.rememberMe, values.status)
              if (res.code) {
                this.loginBtn = false
                if (this.setting.enableCaptcha) {
                  this.form.resetFields(['code'])
                }
                this.getCodeImg()
              }
            })
            .catch(() => {
              this.loginBtn = false
              this.getCodeImg()
              if (this.setting.enableCaptcha) {
                this.form.resetFields(['code'])
              }
            })
        }
      })
    },
    // 获取图形验证码
    getCodeImg () {
      this.nowTime = new Date().valueOf()
    },
    // 生成唯一ID
    getUuid (n) {
      n = 1 // 生成一个唯一id，包含数字和字母
      var random = function () {
        // 生成10-12位不等的字符串
        return Number(
          Math.random()
            .toString()
            .substr(2)
        ).toString(36) // 转换成十六进制
      }
      var arr = []
      function createId () {
        var num = random()
        var _bool = false
        arr.forEach(v => {
          if (v === num) _bool = true
        })
        if (_bool) {
          createId()
        } else {
          arr.push(num)
        }
      }
      var i = 0
      while (i < n) {
        createId()
        i++
      }
      storage.set('UUID', arr[0])
      return arr[0] // 将生成的转为我们需要的字符串并赋值
    },
    // 登录成功之后操作
    loginSuccess (res, rememberMe, status) {
      if (res.code === 0) {
        if (status || status === 0) {
          sessionStorage.setItem('onlineStatus', status)
        }
        storage.set('rememberMe', rememberMe)
        this.$cookies.set('Login', 'true')
        this.$router.push({ path: '/' })
      }
    },
    // 企业微信扫码登录
    // getLoginPlatform () {
    //   this.axios({
    //     url: '/admin/platform/api/createUserLoginUrl',
    //     params: {
    //       redirectUri: location.origin + process.env.VUE_APP_BASE_URL
    //     }
    //   }).then(res => {
    //     if (!res.code) {
    //       location.href = res.result
    //     }
    //   })
    // },
    // 获取手机验证码
    getValidateCode () {
      this.form.validateFields(['phone'], valid => {
        if (!valid) {
          this.countDown = 60
          this.countDownTimer = setInterval(() => {
            if (this.countDownTimer && this.countDown > 0) {
              this.countDown--
            } else {
              clearInterval(this.countDownTimer)
              this.countDownTimer = null
              this.countDown = 0
            }
          }, 1000)
          const params = {
            phone: this.form.getFieldValue('phone'),
            uuid: this.uuid
          }
          this.axios({
            url: '/sms/send/api/sendCode',
            params
          }).then(res => {
            if (res.code) {
              clearInterval(this.countDownTimer)
              this.countDownTimer = null
              this.countDown = 0
            } else {
              this.$message.info(this.$t('发送成功'))
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  background-color: #fff;
  position: relative;
  padding: 57px 30px 29px 30px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  /deep/.ant-input-lg,
  /deep/.ant-btn-primary {
    height: 50px;
  }

  .loginTitle {
    color: #6d7687;
    font-size: 28px;
    font-weight: bold;
    padding-bottom: 20px;
  }

  .loginMethod {
    position: absolute;
    right: 0;
    top: 0;
  }

  .loginMethod img {
    cursor: pointer;
  }

  .loginMainCenter,
  .loginPasswordTop {
    flex: 1;
  }

  .loginPassword {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .loginCodeClass {
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
    padding-left: 12px;
  }

  /deep/.loginCodeClass .ant-select-selection__rendered {
    margin: 0 0 5px 6px;
  }

  /deep/.loginCodeClass .ant-select-selection {
    border: 0;
  }

  .loginPreIcon {
    width: 14px;
    height: 15px;
  }

  .loginChoiceForm {
    margin-top: 27px;
  }

  .loginChoiceClass {
    width: 130px;
    border-radius: 17px;
  }

  /deep/.loginChoiceClass .ant-select-selection {
    border-radius: 17px;
  }

  .loginPasswordButton {
    margin-top: 24px;
  }

  .loginQrClass {
    text-align: center;
  }

  /deep/ .ant-form-explain {
    margin-top: 0;
  }
  .ant-form-item {
    margin-bottom: 20px;
  }

  label {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 60px;
    width: 100%;
    border-radius: 8px;
  }
  .dark {
    /deep/.ant-form-item-label > label {
      color: #ffffff;
    }
  }
  .light {
    /deep/.ant-form-item-label > label {
      color: #595959;
    }
  }
}
</style>
