<template>
  <a-modal
    :visible="visible"
    :title="$t('悬浮按钮设置')"
    :width="700"
    @cancel="visible = !visible"
    @ok="handleFloatBtn"
  >
    <a-row class="form-row">
      <a-col span="4" class="label-col">{{ $t('悬浮按钮') }}</a-col>
      <a-col span="10" class="wrapper-col">
        <a-switch
          v-model="options.enable"
          @change="
            (val) => {
              if (!val) {
                list = [
                  {
                    text: '按钮名称',
                    active: false,
                    icon: 'uicon-home',
                    buttonEvent: 'system', // system  specific selfDef
                    systemFunc: '0',
                    specificFunc: 0, // 1复制  2地址位置  3电话
                    selfDefFunc: ''
                  }
                ]
              }
            }
          "
        ></a-switch>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col span="4" class="label-col">{{ $t('按钮图标') }}</a-col>
      <a-col span="1" class="wrapper-col">
        <set-icon
          v-if="options.icon"
          :currentIconProp="options.icon"
          @setUViewIcon="
            (val) => {
              options.icon = val
            }
          "
        />
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col span="4" class="label-col">{{ $t('是否组合按钮') }}</a-col>
      <a-col span="10" class="wrapper-col">
        <a-switch v-model="options.popMenu"></a-switch>
      </a-col>
    </a-row>
    <a-row v-if="options.popMenu" class="form-row">
      <a-col span="4" class="label-col">{{ $t('组合按钮') }}</a-col>
      <a-col span="4" class="wrapper-col">
        <a-button
          type="link"
          @click="
            () => {
              list.push({
                title: '按钮名称',
                active: false,
                icon: 'uicon-home',
                buttonEvent: 'system',
                systemFunc: 0,
                specificFunc: 0,
                selfDefFunc: 0
              })
            }
          "
        >
          {{ $t('添加') }}
        </a-button>
      </a-col>
    </a-row>
    <template v-if="options.popMenu">
      <div v-for="(listItem, index) in list" :key="index" class="groupButton">
        <a-card style="margin-bottom: 6px">
          <a-button
            type="danger"
            size="small"
            style="position: absolute; top: 1px; right: 1px"
            @click="
              () => {
                list.splice(index, 1)
              }
            "
          >
            {{ $t('删除') }}
          </a-button>
          <a-row class="form-row">
            <a-col :span="20" class="wrapper-col"><a-input v-model="listItem.text"></a-input></a-col>
            <a-col :span="2" class="wrapper-col">
              <set-icon
                v-if="listItem.icon"
                :currentIconProp="listItem.icon"
                @setUViewIcon="
                  (val) => {
                    listItem.icon = val
                  }
                "
              />
            </a-col>
          </a-row>
          <a-row class="form-row">{{ $t('按钮事件') }}</a-row>
          <a-row class="form-row">
            <a-radio-group
              v-model="listItem.buttonEvent"
              buttonStyle="solid"
              @change="
                () => {
                  listItem.systemFunc = 0
                  listItem.specificFunc = 0
                  listItem.selfDefFunc = 0
                }
              "
            >
              <a-radio-button value="system">{{ $t('系统内置') }}</a-radio-button>
              <a-radio-button value="specific">{{ $t('特定功能') }}</a-radio-button>
              <a-radio-button value="selfDef">{{ $t('自定义') }}</a-radio-button>
            </a-radio-group>
          </a-row>
          <a-row v-if="listItem.buttonEvent === 'system'">
            <a-select v-model="listItem.systemFunc" allowClear style="width: 200px">
              <a-select-option
                v-for="item in dataWindowButtons.filter((item) => item.position === 'bar')"
                :key="item.usage"
                :value="item.usage"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-row>
          <a-row v-if="listItem.buttonEvent === 'specific'">
            <a-select
              style="width: 200px"
              allowClear
              :value="listItem.specificFunc ? listItem.specificFunc : undefined"
              @change="
                (val) => {
                  listItem.specificFunc = val
                }
              "
            >
              <a-select-option key="1" value="1">{{ $t('复制') }}</a-select-option>
              <a-select-option key="2" value="2">{{ $t('地理位置') }}</a-select-option>
              <a-select-option key="3" value="3">{{ $t('电话') }}</a-select-option>
            </a-select>
          </a-row>
          <a-row v-if="listItem.buttonEvent === 'selfDef'">
            <a-button @click="buttoCodeEditor">
              {{ $t('附加属性') }}
            </a-button>
          </a-row>
        </a-card>
      </div>
    </template>
    <a-row v-else class="form-row">
      <a-col span="12" offset="4">
        <a-select v-model="options.buttonType" style="width: 100%">
          <a-select-option
            v-for="(item, index) in dataWindowButtons.filter((item) => item.position === 'bar')"
            :key="index"
            :value="item.usage"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col span="4" class="label-col">{{ $t('展开方向') }}</a-col>
      <a-col span="4" class="wrapper-col">
        <a-select v-model="options.direction">
          <a-select-option key="horizontal" value="horizontal">{{ $t('水平显示') }}</a-select-option>
          <a-select-option key="vertical" value="vertical">{{ $t('垂直显示') }}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row v-if="options.horizontal && options.vertical" class="form-row">
      <a-col span="4" class="label-col">{{ $t('按钮位置') }}</a-col>
      <a-col span="10">
        <a-radio-group
          style="width: 100%"
          :value="`${options.horizontal[0] + options.vertical[0]}`"
          @change="changefloatBtnPos"
        >
          <a-row style="margin-bottom: 6px">
            <a-col span="8"><a-radio-button value="lt">左上</a-radio-button></a-col>
            <a-col span="8" offset="8"><a-radio-button value="rt">右上</a-radio-button></a-col>
          </a-row>
          <a-row>
            <a-col span="8"><a-radio-button value="lb">左下</a-radio-button></a-col>
            <a-col span="8" offset="8"><a-radio-button value="rb">右下</a-radio-button></a-col>
          </a-row>
        </a-radio-group>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  components: {
    setIcon: () => import('./setIcon')
  },
  props: {
    dataWindowButtons: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      list: [],
      options: {}
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.list = config.list
      this.options = config.options
    },
    changefloatBtnPos (e) {
      const val = e.target.value
      if (val === 'lt') {
        this.options.horizontal = 'left'
        this.options.vertical = 'top'
      } else if (val === 'rt') {
        this.options.horizontal = 'right'
        this.options.vertical = 'top'
      } else if (val === 'lb') {
        this.options.horizontal = 'left'
        this.options.vertical = 'bottom'
      } else if (val === 'rb') {
        this.options.horizontal = 'right'
        this.options.vertical = 'bottom'
      }
    },
    handleFloatBtn () {
      this.visible = false
      this.$emit('handleFloatBtn', {
        options: this.options,
        list: this.list
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-row {
  margin-bottom: 6px;
}
.label-col {
  text-align: right;
  height: 28px;
  line-height: 28px;
  padding-right: 10px;
}
.wrapper-col {
  height: 28px;
  line-height: 28px;
}
</style>
