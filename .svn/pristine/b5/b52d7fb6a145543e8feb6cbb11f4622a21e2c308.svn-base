<template>
  <div class="icon-box">
    <div class="property-icon" @click="showIcon">
      <i :class="['uicon-iconfont', 'u-iconfont', currentIcon]"></i>
    </div>
    <a-drawer :visible="visible" :width="1400" :title="$t('图标编辑')" @close="visible = !visible">
      <div
        style="
          height: calc(100% - 49px);
          overflow-y: auto;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          padding: 8px;
          align-content: flex-start;
        "
      >
        <div v-for="(item, index) in uviewIconList" :key="index">
          <div
            class="myIcon"
            @click="
              () => {
                $emit('setUViewIcon', item)
                visible = !visible
              }
            "
          >
            <i :class="['uicon-iconfont', 'u-iconfont', item]"></i>
          </div>
        </div>
      </div>
      <div class="bbar">
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import iconList from '../config/uviewIcon.js'
export default {
  props: {
    currentIconProp: {
      type: String,
      default: 'uicon-home'
    }
  },
  data () {
    return {
      visible: false,
      uviewIconList: []
    }
  },
  computed: {
    currentIcon () {
      if (this.currentIconProp) {
        return this.currentIconProp
      }
      return 'uicon-home'
    }
  },
  mounted () {
    this.uviewIconList = iconList
  },
  methods: {
    showIcon () {
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
.icon-box {
  height: 100%;
  position: relative;
}
.property-icon {
  display: inline-block;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.myIcon {
  display: inline-block;
  width: 68px;
  height: 68px;
  padding: 9px 19px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  :first-child {
    font-size: 30px;
    line-height: 50px;
  }

  &:hover {
    background: rgb(24, 144, 255);
    color: #fff;
  }
}
</style>
