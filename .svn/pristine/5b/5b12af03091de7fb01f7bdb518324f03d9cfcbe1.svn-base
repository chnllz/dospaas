<template>
  <div>
    <a-card size="small" class="table-search" :bordered="false" :bodyStyle="headBodyStyle">
      <a-form :layout="advanced ? 'vertical' : 'inline'" :class="advanced ? 'advanced' : 'normal'" :form="form">
        <div class="head">
          <div class="title">{{ $t('过滤') }}</div>
        </div>
        <a-row :gutter="16">
          <a-col :span="4">
            <a-form-item :label="this.$t('姓名')">
              <a-input v-model="queryParam.username" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="this.$t('分机')">
              <a-input v-model="queryParam.extension" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="this.$t('部门')">
              <data-picker
                ref="dataPicker"
                :parentId="'parentDepartmentId'"
                :placeholder="$t('作为一级部门')"
                name="queryParam[department]"
                displayType="tree"
                :multiple="true"
                url="/admin/department/init"
                searchUrl="/admin/search/departmentSearch"
                :value="departmentData"
                :scope="scope"
                :optionsConversion="optionsConversion"
                @select="selectDep"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-space style="margin-left: 8px">
              <a-button
                htmlType="submit"
                type="primary"
                class="headButton"
                @click="
                  () => {
                    timeout = 0
                    window.clearTimeout(timeId)
                    getData()
                  }
                "
              >
                {{ $t('搜索') }}
              </a-button>
              <a-button
                class="headButton"
                @click="
                  () => {
                    form.resetFields()
                    departmentData = []
                    queryParam = {
                      username: '',
                      extension: '',
                      department: []
                    }
                    timeout = 0
                    window.clearTimeout(timeId)
                    getData()
                  }
                "
              >
                {{ $t('重置') }}
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-row justify="space-between" type="flex">
      <a-col
        v-for="(item, index) in cardData"
        :key="index"
        :class="activeCardIndex === index ? 'activeCard' : ''"
        class="headCardBox"
      >
        <a-card size="small" :bordered="false" :bodyStyle="numberBodyStyle" @click="agentOnShow(item, index)">
          <a-row type="flex">
            <a-col>
              <img :src="require(`../monitor/assets/image/${item.alias}.png`)" alt="" class="headCardBoxImg" />
            </a-col>
            <a-col>
              <div class="numberCardNum">{{ item.num }}</div>
              <div class="text">{{ item.text }}</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-card size="small" :bordered="false" class="bottomCard">
      <div class="buttonCard">
        <div
          v-for="(item, index) in buttonList"
          :key="index"
          v-action:[item.alias]
          class="buttonList"
          :class="activeButtonIndex === index ? 'activeButton' : ''"
          @click="handlerControl(index, item.type, item.childrenType)"
        >
          <img :src="require(`../monitor/assets/image/${item.alias}.png`)" alt="" />
          <div>{{ item.name }}</div>
        </div>
      </div>
      <div class="cardBox">
        <a-card
          v-for="(item, index) in usersData"
          v-show="agentShow.includes(item.type)"
          :key="index"
          size="small"
          :bodyStyle="{ padding: '0' }"
          :bordered="false"
          :style="{ display: 'inline-block', cursor: 'point' }"
          class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-8 ant-col-xl-6 ant-col-xxl-4"
          @click="SetBorder(item, index)"
        >
          <div
            :class="activeClass == index ? 'active' : 'static'"
            :style="{
              border: activeClass === index ? `1px solid ${item.active}` : `1px solid ${item.bg}`,
              background: activeClass === index ? '#fff' : item.bg
            }"
          >
            <a-card-meta>
              <a-avatar slot="avatar" :src="item.url" class="avatarClass" />
            </a-card-meta>
            <div>
              <div class="cardBoxItem">
                <div>{{ $t('状态') }}：</div>
                <div :style="{ color: item.color }">{{ $t(item.status) }}</div>
              </div>
              <a-tooltip placement="topLeft" :title="'分机: ' + item.extension">
                <div class="cardBoxItem">
                  <div>{{ $t('分机') }}：</div>
                  <div>{{ $t(item.extension) }}</div>
                </div>
              </a-tooltip>
              <a-tooltip placement="topLeft" :title="'姓名: ' + item.user">
                <div class="cardBoxItem">
                  <div>{{ $t('姓名') }}：</div>
                  <div>{{ $t(item.user) }}</div>
                </div>
              </a-tooltip>
              <div class="cardBoxItem">
                <div>{{ $t('持续时间') }}：</div>
                <div>{{ $t(item.time) }}</div>
              </div>
              <a-tooltip v-if="item.type === 'call'" placement="topLeft" :title="'通话号码: ' + item.callNumber">
                <div class="cardBoxItem">
                  <div>{{ $t('通话号码') }}：</div>
                  <div>{{ item.callNumber }}</div>
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  components: {
    DepartmentSearch: () => import('@/views/admin/Department/DepartmentSearch')
  },
  data () {
    this.getData = debounce(this.getData, 200)
    return {
      cardData: [{
        num: 0,
        type: 'total',
        alias: 'toatlSeats',
        text: this.$t('坐席总数')
      }, {
        num: 0,
        type: 'login',
        alias: 'checkInQuantity',
        text: this.$t('签入数量')
      }, {
        num: 0,
        type: 'call',
        alias: 'numberOfCalls',
        text: this.$t('通话数量')
      }, {
        num: 0,
        type: 'ringing',
        alias: 'numberOfRings',
        text: this.$t('振铃数量')
      }, {
        num: 0,
        type: 'idle',
        alias: 'checkInQuantity',
        text: this.$t('空闲数量')
      }, {
        num: 0,
        type: 'busy',
        alias: 'busyQuantity',
        text: this.$t('示忙数量')
      }, {
        num: 0,
        type: 'offline',
        alias: 'checkedOutQuantity',
        text: this.$t('签出数量')
      }],
      buttonList: [{
        name: this.$t('示忙'),
        alias: 'stopBtn',
        type: 'setDnd'
      }, {
        name: this.$t('示闲'),
        alias: 'checkBtn',
        type: 'setIdle'
      }, {
        name: this.$t('呼叫'),
        alias: 'phoneBtn',
        type: 'call'
      }, {
        name: this.$t('转接'),
        alias: 'retweetBtn',
        type: 'changeoverOrIntrusion',
        childrenType: 'zj'
      }, {
        name: this.$t('强插'),
        alias: 'swapBtn',
        type: 'changeoverOrIntrusion',
        childrenType: 'qc'
      }, {
        name: this.$t('签出'),
        alias: 'disconnectBtn',
        type: 'checkOut'
      }, {
        name: this.$t('监听'),
        alias: 'loginBtn',
        type: 'monitor'
      }, {
        name: this.$t('密语'),
        alias: 'logoutBtn',
        type: 'cryptolaliaOrHelp',
        childrenType: 'my'
      }, {
        name: this.$t('求助'),
        alias: 'infoBtn',
        type: 'cryptolaliaOrHelp',
        childrenType: 'qz'
      }],
      usersData: [],
      allData: [],
      activeClass: '-1',
      advanced: false,
      form: this.$form.createForm(this),
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
        xxl: 6
      },
      timeOut: null,
      agentShow: [
        'total',
        'login',
        'call',
        'ringing',
        'idle',
        'busy',
        'offline'
      ],
      queryParam: {
        username: '',
        extension: '',
        department: []
      },
      loop: true,
      timeId: null,
      departmentData: [],
      scope: this,
      timeout: 0, // 初次请求不延时
      clickType: '',
      canClick: true,
      headBodyStyle: {
        padding: '3px 19px'
      },
      numberBodyStyle: {
        padding: '24px 16px 33px 16px'
      },
      cardStyleArr: [{
        bg: '#E6F2FF',
        type: 'login',
        color: '#1890FB',
        active: '#136FFB'
      }, {
        bg: '#E1FED8',
        type: 'call',
        color: '#019534',
        active: '#006021'
      }, {
        bg: '#FFEFEF',
        type: 'ringing',
        color: '#FF0000',
        active: '#c70000'
      }, {
        bg: '#D8F3FE',
        type: 'idle',
        color: '#34C0FC',
        active: '#178ec1'
      }, {
        bg: '#FFF8E6',
        type: 'busy',
        color: '#FF7F00',
        active: '#db6e03'
      }, {
        bg: '#EDEDED',
        type: 'offline',
        color: '#333333',
        active: '#080808'
      }],
      activeCardIndex: -1,
      activeButtonIndex: -1
    }
  },
  computed: {
    ...mapGetters(['setting', 'userInfo'])
  },
  mounted () {
    this.getData()
    const arr = ['setDnd', 'setIdle', 'call', 'changeoverOrIntrusionzj', 'changeoverOrIntrusionqc', 'checkOut', 'monitor', 'cryptolaliaOrHelpmy', 'cryptolaliaOrHelpqz']
    arr.forEach((item, index) => {
      this[item] = true
    })
  },
  activated () {
    this.loop = true
    this.timeout = 0
    this.getData()
  },
  deactivated () {
    this.loop = false
    clearTimeout(this.timeId)
  },
  beforeDestroy () {
    this.timeId && clearTimeout(this.timeId)
  },
  methods: {
    getData () {
      if (!this.loop) {
        return false
      }
      this.timeId = setTimeout(() => {
        this.axios({
          url: '/callcenter/monitor/agent',
          data: Object.assign(this.queryParam),
          timeout: 5 * 60 * 1000
        }).then(res => {
          this.cardData.forEach(item => {
            item.num = res.result.data.cardData[item.type]
          })
          if ([0, -1].includes(this.activeCardIndex)) {
            res.result.data.usersData.forEach(item => {
              const obj = this.cardStyleArr.find(itemArr => itemArr.type === item.type)
              item = Object.assign(item, obj)
            })
            this.allData = res.result.data.usersData
            this.usersData = res.result.data.usersData
          } else {
            this.allData = res.result.data.usersData
            this.agentOnShow(this.cardData[this.activeCardIndex], this.activeCardIndex)
          }
          this.timeout = res.result.timeout || 3000
          this.timeId && this.getData()
        })
      }, this.timeout)
    },
    // 组织结构options转换
    optionsConversion (list, displayType, searchType) {
      if (searchType) {
        return list.map(item => {
          const obj = item
          obj.key = item.departmentId
          obj.label = item.fullDepartmentName
          return obj
        })
      } else {
        return list.map(item => {
          const obj = item
          obj.key = item.departmentId
          obj.label = item.departmentName
          return obj
        })
      }
    },
    selectDep (content, node) {
      this.queryParam.department = content
    },
    SetBorder (item, index) {
      this.activeClass = index
    },
    handlerControl (index, type, select) {
      this.activeButtonIndex = index
      const selects = select === undefined ? '' : select
      const clickType = `${type}${selects}`
      if (this[clickType]) {
        this.handlerControlFn(type, select)
        this[clickType] = false
        const timer = setTimeout(() => {
          clearTimeout(timer)
          this[clickType] = true
        }, 5000)
      }
    },
    handlerControlFn (type, select) {
      const that = this
      const userExtension = this.userInfo.extension
      if (type && this.activeClass > -1) {
        const selectExtension = this.usersData[this.activeClass].extension
        let params = {}
        if (['setDnd', 'setIdle', 'tollBreakdown'].includes(type)) {
          // 示忙 || 示闲 || 强拆
          params = {
            // 选中的分机
            extension: selectExtension
          }
        } else if (['call', 'monitor'].includes(type)) {
          // 呼叫 || 监听
          params = {
            // 当前登录用户的分机
            extension: userExtension,
            // 选中的分机
            extensionDst: selectExtension
          }
        } else {
          // 转接/强插 || 密语/求助
          params = {
            // 转接为：当前登录用户的分机  ，强插为：选中的分机
            // 密语为：当前登录用户的分机  ，求助为：选中的分机
            extension: ['zj', 'my'].includes(select) ? userExtension : selectExtension,
            // 转接为：选中的分机  ，强插为：当前登录用户的分机
            // 密语为：选中的分机  ，求助为：当前登录用户的分机
            extensionDst: ['zj', 'my'].includes(select) ? selectExtension : userExtension
          }
        }
        const data = { ...this.queryParam, ...params }
        this.axios({
          url: `callcenter/api/${type}`,
          data: data
        }).then(res => {
          that.timeout = 0
          clearTimeout(that.timeId)
          that.getData()
          this.$message.success(res.message)
        })
      } else {
        this.$message.info('请选择您要操作的坐席')
      }
    },
    agentOnShow (item, index) {
      this.activeCardIndex = index
      let alldata = []
      if (item.type === 'total') {
        this.agentShow = [
          'total',
          'login',
          'call',
          'ringing',
          'idle',
          'busy',
          'offline'
        ]
        alldata = this.allData
      } else if (item.type === 'login') {
        this.agentShow = [
          'login',
          'call',
          'ringing',
          'idle',
          'busy'
        ]
        alldata = this.allData.filter(itemData => this.agentShow.includes(itemData.type))
      } else {
        this.agentShow = [
          item.type
        ]
        alldata = this.allData.filter(itemData => this.agentShow.includes(itemData.type))
      }

      if (item.type !== 'total') {
        const obj = this.cardStyleArr[index - 1]
        alldata.forEach(item => {
          item.bg = obj.bg
          item.color = obj.color
        })
      }
      this.usersData = alldata
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.table-search {
  border-bottom: 17px solid #f0f2f5;
}
.active,
.static {
  display: flex;
  padding: 20px;
  margin: 7px;
  border-radius: 6px;
  cursor: pointer;
}
.active {
  min-height: 150px;
}
.static {
  min-height: 150px;
  border: 2px solid #ffffff00;
}
.active > div:nth-last-child(1),
.static > div:nth-last-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.text {
  margin-top: 2px;
}
.numberCardNum {
  font-size: 34px;
  font-weight: bold;
}
.headCardBox {
  width: 13.5%;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
}
.activeCard {
  border: 1px solid @primary-color;
}
.headButton {
  border-radius: 4px;
}
.headCardBoxImg {
  margin-right: 11px;
}
.bottomCard {
  margin-top: 16px;
}
.buttonCard {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 12px 0;
}
.buttonList {
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 18px;
  padding: 7px 26px 7px 19px;
  margin-left: 14px;
  font-size: 12px;
}
.buttonList div {
  padding-left: 8px;
}
.buttonList:hover,
.activeButton {
  border: 1px solid @primary-color;
  color: @primary-color;
  cursor: pointer;
}
.cardBox {
  margin: 3px;
}
.cardBoxItem {
  display: flex;
  font-size: 12px;
}
.cardBoxItem:not(:last-child) {
  margin-bottom: 12px;
}
.cardBoxItem div:first-child {
  width: 60px;
  color: #6c6c6c;
  text-align: right;
}
.cardBoxItem div:last-child {
  color: #333333;
  font-weight: bold;
}
.toolClass {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 160px;
  margin: 5px 0 0 0;
}
.avatarClass {
  width: 60px;
  height: 60px;
  margin-right: 17px;
}
</style>
