<template>
  <div style="padding: 30px; line-height: 40px; font-size: 16px; height: 100%; overflow: auto">
    <a-row>
      <a-col :span="24" style="text-align: center; font-size: 35px; font-weight: bold; line-height: 60px">
        STOMP消息测试
      </a-col>
      <a-col class="label" :span="2">WS地址:</a-col>
      <a-col :span="22"><a-input v-model="url" /></a-col>

      <a-col class="label" :span="2">在线状态:</a-col>
      <a-col :span="22">{{ status }}</a-col>

      <a-col class="label" :span="2"></a-col>
      <a-col :span="22">
        <a-button :disabled="status === '在线'" @click="connect">点击连接</a-button>
      </a-col>

      <a-col class="label" :span="2">发送内容:</a-col>
      <a-col :span="22"><a-input v-model="content" /></a-col>

      <a-col class="label" :span="2">接收人员:</a-col>
      <a-col :span="22"><a-input v-model="user" placeholder="留空表示给自己发送" /></a-col>

      <a-col class="label" :span="2"></a-col>
      <a-col :span="22">
        <a-button :disabled="status !== '在线'" @click="send">点击发送</a-button>
      </a-col>

      <a-col class="label" :span="2">接收消息:</a-col>
      <a-col :span="22"><a-textarea v-model="message" :autoSize="{ minRows: 20, maxRows: 100 }" /></a-col>
    </a-row>
  </div>
</template>
<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
export default {
  data () {
    return {
      url: process.env.VUE_APP_API_BASE_URL + 'admin/websocket?role=user&token=d237c18a8e29464fae25846f56408680',
      status: '连接中...',
      content: 'something',
      user: '',
      message: '',
      topic: '/user/topic/message',
      stompClient: null
    }
  },
  created () {

  },
  methods: {
    connect () {
      const socket = new SockJS(this.url)
      this.stompClient = Stomp.over(socket)
      this.stompClient.heartbeat.outgoing = 0 // 100s，默认10s
      this.stompClient.heartbeat.incoming = 0 // 100s
      this.stompClient.connect({}, suce => {
        this.status = '在线'
        console.log('连接成功', this.stompClient)
        console.log()
        this.stompClient.subscribe(this.topic, (msg) => {
          const obj = JSON.parse(msg.body)
          this.message += new Date() + ': ' + obj.content + '\n'
          console.log('ws收到消息: ', msg)
        })
      }, err => {
        this.status = '离线'
        console.log('连接失败', err)
      })
    },
    send () {
      const msg = {
        msgType: 1,
        content: this.content,
        user: this.user
      }
      console.log(msg)
      console.log(JSON.stringify(msg))
      this.stompClient.send('/app/sendToUser', JSON.stringify(msg))
    }
  }
}
</script>
<style lang="less" scoped>
.label {
  text-align: right;
  padding-right: 10px;
}
</style>
