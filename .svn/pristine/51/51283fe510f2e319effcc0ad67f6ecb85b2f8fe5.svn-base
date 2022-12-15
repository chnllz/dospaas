<template>
  <div>
    <div id="wxReg"></div>
  </div>
</template>
<script>
import WwLogin from './wwLogin-1.2.4.js'
export default {
  data () {
    return {
      wwLogin: null,
      appId: 'wwc476d9d42a9fd1a9',
      agentid: '1000014',
      redirectUri: '',
      iframeWin: null
    }
  },
  mounted () {
    this.redirectUri = `${location.origin + process.env.VUE_APP_BASE_URL}CustomPage/?view=wechat/QRCodeCreate`
    this.axios({
      url: '/wechat/enterpriseWeChat/getCorpIdAndAgentId'
    }).then(res => {
      if (res.code) {
        this.$message.error(res.message)
      } else {
        this.wwLogin = new WwLogin({
          'id': 'wxReg',
          'appId': res.result.appId,
          'agentid': res.result.agentId,
          'redirect_uri': encodeURIComponent(this.redirectUri),
          'state': '',
          'href': '',
          'lang': 'zh'
        })
      }
    })
    window.addEventListener('message', (eve) => {
      if (eve.data && eve.data.includes('code=')) {
        window.parent.postMessage({
          cmd: 'getCode', // cmd 用来判断触发的是什么事件
          params: {
            url: eve.data
          }
        }, '*')
      }
    })
  }
}
</script>
