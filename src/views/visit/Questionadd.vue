<template>
  <div style="padding-bottom: 100px">
    <a-form :form="form" :label-col="{ span: 4 }" v-bind="formItemLayoutWithOutLabel" @submit="handleSubmit">
      <a-form-item :label="$t('题型')" :wrapper-col="{ span: 18 }">
        <a-radio-group
          v-decorator="[
            'questionType',
            { initialValue: questionstype, rules: [{ required: true, message: $t('请选择题型') }] }
          ]"
          button-style="solid"
          @change="handleChange"
        >
          <a-radio value="单选题">{{ $t('单选题') }}</a-radio>
          <a-radio value="多选题">{{ $t('多选题') }}</a-radio>
          <a-radio value="填空题">{{ $t('填空题') }}</a-radio>
          <a-radio value="评分题">{{ $t('评分题') }}</a-radio>
          <a-radio value="简答题">{{ $t('简答题') }}</a-radio>
          <a-radio value="文字描述">{{ $t('文字描述') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 测试用id -->
      <a-form-item v-show="false">
        <a-input v-decorator="['id', { initialValue: formdata.id }]" />
      </a-form-item>
      <a-form-item v-if="allshow" :label="$t('标题')" :wrapper-col="{ span: 18 }">
        <a-textarea
          v-decorator="[
            'title',
            { initialValue: formdata.title, rules: [{ required: allshow, message: $t('请输入标题') }] }
          ]"
          :auto-size="{ minRows: 5, maxRows: 8 }"
        />
      </a-form-item>
      <a-form-item v-if="fill" :label="$t('标题')" :wrapper-col="{ span: 18 }">
        <a-textarea v-model="fillstitle" :auto-size="{ minRows: 5, maxRows: 8 }" />
      </a-form-item>
      <a-col v-if="fill" :span="4"></a-col>
      <p v-if="fill">
        <a @click="pushfills">{{ $t('插入填空项') }}</a>
      </p>
      <a-form-item :label="$t('备注')" :wrapper-col="{ span: 18 }">
        <a-input v-decorator="['remark', { initialValue: formdata.remark }]" />
      </a-form-item>
      <a-form-item v-if="must" :label="$t('是否必填')" :wrapper-col="{ span: 12 }">
        <a-switch
          v-decorator="['mustselect', { valuePropName: 'checked', initialValue: formdata.mustselect }]"
          :checked-children="$t('是')"
          :un-checked-children="$t('否')"
        />
      </a-form-item>
      <a-form-item v-if="showform" :label="$t('展现形式')" :wrapper-col="{ span: 12 }">
        <a-radio-group v-model="formdata.showform" name="showform">
          <a-radio value="1">{{ $t('单选按钮') }}</a-radio>
          <a-radio value="2">{{ $t('下拉框') }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="radioJump" :label="$t('无条件跳转至')" :wrapper-col="{ span: 12 }">
        <a-col :span="3">
          <a-switch
            :checked-children="$t('开')"
            :un-checked-children="$t('关')"
            :checked="checked"
            @change="jump(checked)"
          />
        </a-col>
        <a-col v-if="radioJumpstate" :span="16">
          <a-select :default-value="$t('按问卷试题顺序往下')">
            <a-select-option :value="$t('按问卷试题顺序往下')">{{ $t('按问卷试题顺序往下') }}</a-select-option>
          </a-select>
        </a-col>
      </a-form-item>
      <a-col v-if="batch" :span="4"></a-col>
      <p v-if="batch">
        <a :style="{ color: '#4DAAFF' }" @click="bulkEdit">{{ $t('批量编辑') }}</a>
      </p>
      <a-col v-if="batch" :span="4"></a-col>
      <a-form-item v-if="batch" :wrapper-col="{ span: 20 }">
        <drag-list
          style="margin-bottom: 16px"
          :data.sync="optionsListshow.list"
          :jumpTo="jumpTo"
          @funadd="addOptions"
          @fundel="delOptions"
        />
      </a-form-item>
      <a-col v-if="batch" :span="5"></a-col>
      <a-form-item v-if="batch" :wrapper-col="{ span: 18 }">
        <a-form-item :wrapper-col="{ span: 14 }">
          <a-row type="flex" align="middle">
            <a-col :span="20">
              <a-input v-model="othermessage" :read-only="true" :class="checkedother === 0 ? 'input' : ''" />
            </a-col>
            <a-col :span="1"></a-col>
            <a-checkbox
              v-decorator="['other', { valuePropName: 'checked', initialValue: formdata.other }]"
            ></a-checkbox>
          </a-row>
        </a-form-item>
      </a-form-item>
      <a-form-item v-if="shortAnswer" :label="$t('多行文本框行高')" :wrapper-col="{ span: 18 }">
        <a-input-number v-model="formdata.min" :min="1" :max="10" />
        ~
        <a-input-number v-model="formdata.max" :min="formdata.min" />
      </a-form-item>
      <a-form-item v-if="stars" :label="$t('是否允许半星')" :wrapper-col="{ span: 18 }">
        <a-switch
          v-decorator="['stars', { valuePropName: 'checked', initialValue: formdata.stars }]"
          :checked-children="$t('是')"
          :un-checked-children="$t('否')"
        />
      </a-form-item>
    </a-form>
    <div class="bbar" style="position: absolute; bottom: 0; right: 0; width: 100%; background-color: white">
      <a-button type="primary" html-type="submit" @click="handleSubmit">
        {{ config.action === 'edit' ? $t('修改') : $t('保存') }}
      </a-button>
      <a-button @click="cancelOff">{{ config.action === 'edit' ? $t('重置') : $t('关闭') }}</a-button>
    </div>
    <!-- 批量修改 -->
    <a-drawer :title="configEdit.title" :width="600" :visible="visiblebulk" @close="visiblebulk = !visiblebulk">
      <a-form>
        <a-form-item>
          <a-textarea v-model="bulkdata" :auto-size="{ minRows: 10, maxRows: 25 }" />
        </a-form-item>
      </a-form>
      <div class="bbar" style="position: absolute; bottom: 0; right: 0; width: 100%; background-color: white">
        <a-button type="primary" @click="bulksubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visiblebulk = !visiblebulk">{{ $t('关闭') }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  i18n: window.lang('visit'),
  components: {
    DragList: () => import('./QuestionaddDragList')
  },
  props: {
    actions: {
      type: String,
      required: true
    },
    questionstype: {
      type: String,
      required: true
    },
    optionsList: {
      type: Object,
      required: true
    },
    // optionsfill: {
    //   type: Array,
    //   required: true
    // },
    formdata: {
      type: Object,
      required: true
    },
    length: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      visiblebulk: false,
      allshow: true,
      // 必填
      must: true,
      // 展现形式
      showform: false,
      // 多行文本框行高
      shortAnswer: false,
      // 批量编辑
      batch: false,
      // 简答题文本框最小行数
      min: 2,
      max: '',
      stars: false,
      // 填空
      fill: false,
      radioJump: false,
      radioJumpstate: false,
      answer: '',
      fillstitle: '',
      filltitle: this.formdata.title,
      dataEdit: {
        title1: ''
      },
      othermessage: '其他______',
      // optionsfill2: [],
      checked: false,
      jumpTo: false,
      config: {
        action: this.actions,
        data: {}
      },
      configEdit: {
        action: 'bulkEdit',
        title: this.$t('批量编辑'),
        url: '',
        data: {}
      },
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      color: '#777',
      colorfill: '#777',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      optionsListshow: this.optionsList,
      optionsList2: {
        list: ['']
      },
      submitStatus: 0,
      options: [],
      bulkdata: '',
      checkedother: false,
      underline: []
    }
  },
  watch: {
    filltitle () {
    }
  },
  mounted () {
    this.allState()
  },
  methods: {
    // 选项添加
    addOptions (key) {
      this.optionsListshow.list.splice(key + 1, 0, '')
      this.color = 'red'
    },
    // 选项删除
    delOptions (key) {
      if (this.optionsListshow.list.length === 1) {
        return false
      } else {
        this.optionsListshow.list.splice(key, 1)
      }
      this.iconcolor()
    },
    // 是否显示选项指定跳转
    jump (checked) {
      this.checked = !this.checked
      if (checked === false) {
        this.radioJumpstate = true
      } else {
        this.radioJumpstate = false
      }
      if (checked === true) {
        this.jumpTo = true
      } else {
        this.jumpTo = false
      }
    },
    // 选项加减样式
    iconcolor () {
      if (this.optionsListshow.list.length === 1) {
        this.color = '#777'
      } else {
        this.color = 'red'
      }
    },
    // 打开批量编辑
    bulkEdit () {
      this.visiblebulk = true
      this.bulkdata = this.optionsListshow.list.join('\n')
    },
    // 批量编辑提交
    bulksubmit () {
      this.visiblebulk = false
      this.optionsListshow.list = this.bulkdata.split('\n')
    },
    // 插入填空选项
    pushfills () {
      this.fillstitle += '___'
      const fillsdata = /[^_]/
      this.underline = this.fillstitle.split(fillsdata)
    },
    // 数据提交
    handleSubmit (e) {
      e.preventDefault()
      const self = this
      this.form.validateFields((err, values) => {
        const submitData = {
          list: []
        }
        for (const i in this.formdata) {
          submitData[i] = this.formdata[i]
        }
        submitData.list = this.optionsListshow.list
        for (const i in values) {
          submitData[i] = values[i]
        }
        if (submitData.questionType === this.$t('填空题')) {
          submitData['title'] = this.fillstitle
        }
        if (submitData.mustselect === true) {
          submitData.mustselect = 1
        } else {
          submitData.mustselect = 0
        }
        if (submitData.stars === true) {
          submitData.stars = 1
        } else {
          submitData.stars = 0
        }
        if (submitData.other === true) {
          submitData.other = 1
        } else {
          submitData.other = 0
        }
        if (!err) {
          if (this.actions === 'edit') {
            self.axios({
              url: '/visit/questionbank/edit',
              data: { data: submitData }
            }).then(res => {
              this.submitStatus = 2
              this.$emit('on-show', this.submitStatus)
            })
          } else if (this.actions === 'testsadd') {
            self.axios({
              url: '/visit/questionnaire/testsadd',
              data: { data: submitData }
            }).then(res => {
              this.submitStatus = 1
              this.$emit('on-show', this.submitStatus)
            })
          } else {
            self.axios({
              url: '/visit/questionbank/add',
              data: { data: submitData }
            }).then(res => {
              this.submitStatus = 1
              this.$emit('on-show', this.submitStatus)
            })
          }
        }
      })
    },
    // 关闭或重置
    cancelOff () {
      if (this.config.action === 'edit') {
        this.visiblebulk = false
        this.optionsListshow = this.optionsList2
        this.submitStatus = 3
        this.$emit('on-show', this.submitStatus)
      }
      if (this.config.action === 'add' || this.actions === 'testsadd') {
        this.visiblebulk = false
        this.submitStatus = 0
        this.$emit('on-show', this.submitStatus)
      }
    },
    // 修改时页面加载对应题目组件
    allState () {
      if (this.actions === 'add' || this.actions === 'testsadd') {
        this.optionsListshow = this.optionsList2
      }
      if (this.questionstype === '单选题') {
        this.showform = true
        this.batch = true
        if (this.config.action === 'testsadd') {
          this.radioJump = true
          this.jumpTo = true
        }
      }
      if (this.questionstype === this.$t('多选题')) {
        this.batch = true
      }
      if (this.questionstype === this.$t('填空题')) {
        this.fillstitle = this.formdata.title
        this.fill = true
        this.allshow = false
      }
      if (this.questionstype === this.$t('简答题')) {
        this.shortAnswer = true
      }
      if (this.questionstype === this.$t('评分题')) {
        this.stars = true
      }
      if (this.questionstype === this.$t('文字描述')) {
        this.must = false
      }
    },
    // 题目类型变化加载不同组件
    handleChange (e) {
      if (`${e.target.value}` === this.$t('单选题')) {
        this.showform = true
        this.batch = true
        this.shortAnswer = false
        this.stars = false
        this.must = true
        this.allshow = true
        this.fill = false
        if (this.config.action === 'testsadd') {
          this.radioJump = true
          this.jumpTo = true
        }
      }
      if (`${e.target.value}` === this.$t('多选题')) {
        this.showform = false
        this.batch = true
        this.shortAnswer = false
        this.stars = false
        this.must = true
        this.fill = false
        this.allshow = true
        this.radioJump = false
        this.jumpTo = false
      }
      if (`${e.target.value}` === this.$t('简答题')) {
        this.showform = false
        this.batch = false
        this.shortAnswer = true
        this.stars = false
        this.must = true
        this.fill = false
        this.allshow = true
        this.radioJump = false
        this.jumpTo = false
      }
      if (`${e.target.value}` === this.$t('填空题')) {
        this.showform = false
        this.batch = false
        this.allshow = false
        this.shortAnswer = false
        this.stars = false
        this.must = true
        this.fill = true
        this.radioJump = false
      }
      if (`${e.target.value}` === this.$t('评分题')) {
        this.showform = false
        this.batch = false
        this.shortAnswer = false
        this.stars = true
        this.must = true
        this.allshow = true
        this.fill = false
        this.radioJump = false
      }
      if (`${e.target.value}` === this.$t('文字描述')) {
        this.showform = false
        this.batch = false
        this.shortAnswer = false
        this.stars = false
        this.must = false
        this.allshow = true
        this.fill = false
        this.radioJump = false
      }
    }
  }
}
</script>
<style scoped>
.margin {
  margin-left: 15px;
}
</style>
