<template>
  <a-spin :spinning="loading">
    <div style="padding: 10px">
      <h2 style="padding: 8px">{{ detail.article.title }}</h2>
      <div style="padding: 8px">{{ detail.article.inputTime }}</div>
      <div ref="iframeArticleContent" class="article"></div>
    </div>
  </a-spin>
</template>
<script>
export default {
  data () {
    return {
      detail: {
        article: {}
      },
      src: [],
      loading: false
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      this.loading = true
      this.axios({
        url: '/knowledge/index/api/verificationSign',
        data: { id: this.$route.query.id, sign: this.$route.query.sign, timestamp: this.$route.query.timestamp },
        tips: false
      }).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.detail = res.result
          this.createIframe()
        } else {
          this.loading = false
          this.$refs.iframeArticleContent.innerHTML = '<h3 align="center" style="color: gray">您访问的链接已失效</h3>'
        }
      })
    },
    createIframe () {
      const content = this.detail.article.content.replace(/<link.*\.js.*>/g, '').replace(/<iframe.*<\/iframe>/g, '').replace(/<script(?:(?:\s|.)+?)src=["'](.+?)["'](?!<)(?:(?:\s|.)*?)(?:(?:\/>)|(?:>\s*?<\/script>))/g, '').replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;cursor:pointer"')
      const ifr = document.createElement('iframe')
      ifr.setAttribute('frameborder', '0')
      ifr.setAttribute('id', 'iframeArticleContent')
      ifr.setAttribute('width', '100%')
      ifr.setAttribute('height', '100%')
      ifr.addEventListener('load', () => {
        const iframe = document.getElementById('iframeArticleContent')
        iframe.height = iframe.contentWindow.document.body.scrollHeight + 30
        iframe.scrolling = 'no'
      })
      this.$refs.iframeArticleContent.innerHTML = ''
      this.$refs.iframeArticleContent.appendChild(ifr)
      const ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument
      ifrw.document.open()
      ifrw.document.write(content)
      ifrw.document.close()
      // 点击iframe里的图能放大显示
      ifrw.addEventListener('click', (e) => {
        this.src = []
        if (e.target.src) {
          for (let i = 0; i < e.path[4].images.length; i++) {
            this.src.push(e.path[4].images[i].currentSrc)
          }
          const idx = this.src.findIndex(item => item === e.target.src)
          const newSrcBegin = this.src.slice(idx)
          const newSrcEnd = this.src.slice(0, idx)
          this.src = [...newSrcBegin, ...newSrcEnd]
          const viewer = this.$el.querySelector('.images').$viewer
          viewer.show()
        }
      })
    }
  }
}
</script>
