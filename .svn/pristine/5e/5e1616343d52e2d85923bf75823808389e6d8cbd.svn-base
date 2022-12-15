<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div v-show="getInit.status" class="container" :style="{ background: `#f0f2f5 url(${url}) no-repeat 50%` }">
      <div class="top">
        <div class="header">
          {{ setting.title }}
        </div>
        <div class="english">{{ setting.loginTitleEnglish }}</div>
      </div>
      <route-view></route-view>
      <div class="footer">
        <div class="links" style="display: none">
          <a href="/">帮助</a>
          <a href="/">隐私</a>
          <a href="/">条款</a>
        </div>
        <div class="copyright">Copyright &copy; {{ setting.copyright }}</div>
      </div>
    </div>
    <a-spin :spinning="getInit.loading" class="userLayoutLoading" />
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import storage from '@/utils/storage'
export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {
      url: '',
      getInit: {
        loading: false,
        status: false
      }
    }
  },
  computed: {
    ...mapGetters(['setting'])
  },
  watch: {
    setting (newVal, oldVal) {
      this.getInit = storage.get('getInit')
      if (this.getInit.status) {
        this.url = `${this.$store.state.env.VUE_APP_API_BASE_URL}admin/api/download/?filePath=${newVal.adminLoginBackground.filePath}`
      }
    }
  },
  mounted () {
    this.getInit = storage.get('getInit')
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
  overflow-y: auto;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }
  .userLayoutLoading {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .container {
    width: 100%;
    min-height: 100%;
    background-size: cover;
    padding: 7% 0 10%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    a {
      text-decoration: none;
    }

    .top {
      text-align: left;
      .header {
        color: white;
        font-size: 56px;
        font-weight: bold;
        line-height: 80px;
      }
      .english {
        color: #fff;
        font-size: 24px;
      }
    }

    .main {
      min-width: 260px;
      width: 440px;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: white;
        font-size: 14px;
      }
    }
  }
}
</style>
