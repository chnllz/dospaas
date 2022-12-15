<template>
  <a-drawer :destroyOnClose="true" :title="config.title" :width="800" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <div>
        <a-form :form="form" :label-col="{ span: 4 }" @submit="handleSubmit">
          <a-divider orientation="left">
            {{ $t('基本信息') }}
          </a-divider>
          <a-form-item :wrapper-col="{ span: 20 }">
            <span slot="label">
              {{ $t('选择试卷') }}
              <a-tooltip placement="top">
                <template slot="title">
                  <span>{{ $t('一经保存则无法修改') }}</span>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-input v-if="config.action === 'edit'" v-model="formdata.papername" :read-only="true" class="input" />
            <a-select
              v-else
              v-decorator="['info[examId]', { rules: [{ required: true, message: $t('请选择试卷') }] }]"
              :allowClear="true"
              option-filter-prop="children"
              show-search
            >
              <a-select-option
                v-for="(item, key) in testpaper"
                :key="key"
                :value="item.id"
                @click="maxPass = Number(item.score)"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('考试名称')" :wrapper-col="{ span: 20 }">
            <a-input
              v-decorator="[
                'info[title]',
                {
                  initialValue: formdata.title,
                  rules: [
                    { required: true, message: $t('请输入考试名称') },
                    { max: 20, message: $t('考试名称不得大于20个字符') },
                    {
                      validator: (rule, value, callback) => {
                        const reg = /^\s*$/
                        if (reg.test(value)) {
                          callback('内容不能仅为空格')
                        } else {
                          callback()
                        }
                      }
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('考试说明')" :wrapper-col="{ span: 20 }">
            <a-textarea
              v-decorator="['info[remarks]', { initialValue: formdata.remarks }]"
              :auto-size="{ minRows: 5, maxRows: 8 }"
            />
          </a-form-item>
          <a-divider orientation="left">
            {{ $t('考试基础设置') }}
          </a-divider>
          <a-form-item :label="$t('考试时间')" :wrapper-col="{ span: 20 }">
            <a-range-picker
              v-decorator="[
                'info[testtime]',
                { initialValue: examtime, rules: [{ required: true, message: $t('请选择考试时间') }] }
              ]"
              :disabled-date="disabledDate"
              :show-time="{ format: 'HH:mm:ss' }"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
              @change="getExamTime"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 20 }">
            <span slot="label">
              {{ $t('允许考试次数') }}
              <a-tooltip placement="top">
                <template slot="title">
                  <span>{{ $t('最多可设10次，取最高成绩为最终成绩') }}</span>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <a-input-number
              v-decorator="[
                'setting[examNum]',
                {
                  initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.examNum : '',
                  rules: [{ required: true, message: $t('请输入允许考试次数') }]
                }
              ]"
              :min="1"
              :max="10"
            />
          </a-form-item>
          <a-form-item :label="$t('考试限时')" :wrapper-col="{ span: 20 }">
            <a-input-number
              v-decorator="['info[time]', { initialValue: formdata.time }]"
              :min="0"
              style="margin-right: 10px"
            />
            {{ $t('分钟') }}
          </a-form-item>
          <a-form-item :label="$t('合格分数')" :wrapper-col="{ span: 20 }">
            <a-input-number
              v-decorator="[
                'setting[qualified]',
                { initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.qualified : '' }
              ]"
              :min="0"
              :max="maxPass"
              style="margin-right: 10px"
            />
            {{ $t('分') }}
          </a-form-item>
          <a-form-item :label="$t('考生范围')" :wrapper-col="{ span: 20 }" :required="true">
            <a-button @click="handleSelect">{{ $t('选择部门或成员') }}</a-button>
            <a-input
              v-show="username"
              v-decorator="[
                'username',
                { initialValue: username, rules: [{ required: true, message: $t('请选择考生范围') }] }
              ]"
              :read-only="true"
            />
          </a-form-item>
          <a-form-item :label="$t('考试管理员')" :wrapper-col="{ span: 20 }">
            <a-button @click="handleSelectReview">{{ $t('选择部门或成员') }}</a-button>
          </a-form-item>
          <a-divider orientation="left">
            {{ $t('考试基础设置') }}
          </a-divider>
          <a-form-item :label="$t('防作弊设置')" :wrapper-col="{ span: 20 }">
            <a-col :span="11">
              <a-checkbox-group
                v-decorator="[
                  'setting[preventCheat]',
                  { initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.preventCheat : [] }
                ]"
              >
                <a-checkbox value="option_random">
                  {{ $t('选项乱序') }}
                </a-checkbox>
                <a-checkbox value="restrict_screen" @click="cutting">
                  {{ $t('限制切屏次数') }}
                </a-checkbox>
              </a-checkbox-group>
            </a-col>
            <a-col v-if="cutstatus" :span="10">
              <a-input-number v-model="restrictScreen" :min="1" style="margin-right: 10px" />
              {{ $t('次切屏后强制交卷') }}
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('考生交卷后')" :wrapper-col="{ span: 20 }">
            <a-select
              v-decorator="[
                'setting[paperAfter]',
                { initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.paperAfter : '' }
              ]"
              :allowClear="true"
            >
              <a-select-option v-for="item in afterHanded" :key="item.value" :value="item.value">
                {{ item.type }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('考试结束后')" :wrapper-col="{ span: 20 }">
            <a-select
              v-decorator="[
                'setting[examAfter]',
                { initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.examAfter : '' }
              ]"
              :allowClear="true"
            >
              <a-select-option v-for="item in afterHanded" :key="item.value" :value="item.value">
                {{ item.type }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('考生提醒')" :wrapper-col="{ span: 20 }">
            <a-checkbox-group
              v-decorator="[
                'setting[userRemind]',
                { initialValue: config.action === 'edit' && formdata.setting ? formdata.setting.userRemind : [] }
              ]"
            >
              <a-row type="flex" align="middle">
                <a-col :span="24">
                  <a-checkbox value="begin">
                    {{ $t('开考时提醒') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="24" style="margin-top: 25px">
                  <a-row type="flex" align="middle">
                    <a-col :span="7">
                      <a-checkbox value="begin_before" @click="beforeBegin">
                        {{ $t('开考前提醒') }}
                      </a-checkbox>
                    </a-col>
                    <a-col v-if="remind" :span="17">
                      <span>
                        {{ $t('开考前') }}
                        <a-input-number
                          v-model="beginBefore"
                          :min="1"
                          :max="beginMax"
                          style="margin-left: 10px; margin-right: 10px"
                        />
                        {{ $t('分钟自动提醒') }}
                      </span>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="24" style="margin-top: 25px">
                  <a-row type="flex" align="middle">
                    <a-col :span="7">
                      <a-checkbox value="end_before" style="width: 160px" @click="beforeEnd">
                        {{ $t('截止前提醒未考考生') }}
                      </a-checkbox>
                    </a-col>
                    <a-col v-if="remindEnd" :span="17">
                      <span>
                        {{ $t('截止前') }}
                        <a-input-number
                          v-model="endBefore"
                          :min="1"
                          :max="endMax"
                          style="margin-left: 10px; margin-right: 10px"
                        />
                        {{ $t('分钟自动提醒') }}
                      </span>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
        </a-form>
        <select-user-form ref="ExamSelectUser" @ok="getUser" />
        <select-user-form ref="ExamSelectReviewUser" @ok="getReviewUser" />
      </div>
      <div class="bbar">
        <a-button type="primary" html-type="submit" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('exam'),
  components: {
    SelectUserForm: () => import('@/views/admin/General/SelectUserForm')
  },
  data () {
    return {
      visible: false,
      loading: false,
      config: {},
      formdata: {},
      remind: false,
      remindEnd: false,
      cutstatus: false,
      timeType: false,
      testpaper: [],
      maxPass: null,
      examtime: null,
      username: '',
      reviewUser: '',
      afterHanded: [{
        type: this.$t('得分可见'),
        value: '0'
      }, {
        type: this.$t('得分可见&对错可见'),
        value: '1'
      }, {
        type: this.$t('得分可见&对错可见&正确答案可见'),
        value: '2'
      }],
      restrictScreen: '',
      userRemind: [],
      preventCheat: [],
      beginBefore: '',
      endBefore: '',
      form: this.$form.createForm(this, { name: 'ExamAdd' })
    }
  },
  computed: {
    beginMax () {
      const begin = new Date(this.examtime[0].format('YYYY-MM-DD HH:mm:ss')).getTime()
      let max = parseInt((begin - Date.now()) / (1000 * 60))
      if (max < 0) {
        max = Math.abs(max)
      }
      console.log(max)
      return max
    },
    endMax () {
      const end = new Date(this.examtime[1].format('YYYY-MM-DD HH:mm:ss')).getTime()
      const max = parseInt((end - Date.now()) / (1000 * 60))
      return max
    }
  },

  methods: {
    // 接收传参
    async show (config) {
      this.visible = true
      if (config.action === 'add') {
        this.timeType = false
        this.examtime = null
      }
      this.config = config
      this.cutstatus = false
      this.remind = false
      this.remindEnd = false
      this.restrictScreen = ''
      this.beginBefore = ''
      this.endBefore = ''
      this.username = ''
      this.reviewUser = ''
      this.formdata = JSON.parse(JSON.stringify(config.data))
      if (config.action === 'edit') {
        const testpaper = await this.getTestpaper()
        testpaper.forEach(item => {
          if (item.id === parseInt(config.data.examId)) {
            this.formdata.papername = item.title + '(' + item.total + this.$t('题') + '/' + item.score + this.$t('分')
            this.maxPass = Number(item.score)
          }
        })
        this.examtime = [this.moment(config.data.startTime, 'YYYY-MM-DD HH:mm:ss'), this.moment(config.data.endTime, 'YYYY-MM-DD HH:mm:ss')]
        if (Date.parse(config.data.startTime) < Date.parse(new Date())) {
          this.timeType = true
        } else {
          this.timeType = false
        }
        this.formdata.setting = JSON.parse(config.data.setting)
        if (this.formdata.setting.preventCheat && this.formdata.setting.preventCheat.indexOf('restrict_screen') !== -1) {
          this.cutstatus = true
          this.restrictScreen = this.formdata.setting.restrictScreen
        }
        if (this.formdata.setting.userRemind && this.formdata.setting.userRemind.indexOf('begin_before') !== -1) {
          this.remind = true
          this.beginBefore = this.formdata.setting.beginBefore
        }
        if (this.formdata.setting.userRemind && this.formdata.setting.userRemind.indexOf('end_before') !== -1) {
          this.remindEnd = true
          this.endBefore = this.formdata.setting.endBefore
        }
        this.username = config.data.username
        this.reviewUser = config.data.reviewUser
      } else if (config.action === 'add') {
        const testpaper = await this.getTestpaper()
        this.testpaper = testpaper
      }
    },
    getTestpaper () {
      return new Promise((resolve, reject) => {
        const parameter = {
          pageNo: 1,
          pageSize: 1000,
          sortField: 'id',
          sortOrder: 'descend'
        }
        this.axios({
          url: '/exam/examination/init',
          data: parameter
        }).then(res => {
          resolve(res.result.data)
        })
      })
    },
    disabledDate (current) {
      return current && current < this.moment().startOf('day')
    },
    // 数据提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        values.info['startTime'] = this.examtime[0].format('YYYY-MM-DD HH:mm:ss')
        values.info['endTime'] = this.examtime[1].format('YYYY-MM-DD HH:mm:ss')
        values.info['username'] = this.username
        values.info.reviewUser = this.reviewUser
        values.setting.beginBefore = this.beginBefore
        values.setting.endBefore = this.endBefore
        values.setting.restrictScreen = this.restrictScreen
        delete values.info.testtime
        const begin = new Date(this.examtime[0].format('YYYY-MM-DD HH:mm:ss')).getTime()
        const end = new Date(this.examtime[1].format('YYYY-MM-DD HH:mm:ss')).getTime()
        if (begin === end) {
          const datetime = new Date(begin + 1000 * 60)

          const year = datetime.getFullYear()

          const month = datetime.getMonth()

          const date = datetime.getDate()

          const hour = datetime.getHours()

          const minute = datetime.getMinutes()

          const second = datetime.getSeconds()
          const result1 = year + '-' + ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + '-' + ((date + 1) < 10 ? '0' + date : date) + ' ' + ((hour + 1) < 10 ? '0' + hour : hour) + ':' + ((minute + 1) < 10 ? '0' + minute : minute) + ':' + ((second + 1) < 10 ? '0' + second : second)
          values.info['endTime'] = result1
        }
        if (!err) {
          if (this.config.action === 'edit') {
            values['id'] = this.config.data.id
            values.action = 'edit'
            this.axios({
              url: '/exam/achievement/action',
              data: values
            }).then((res) => {
              this.visible = false
              this.$emit('on-show', '')
              this.$message.success(res.message)
              return res.result
            })
          } else {
            values.action = 'add'
            this.axios({
              url: '/exam/achievement/action',
              data: values
            }).then((res) => {
              this.visible = false
              this.$emit('on-show', '')
              this.$message.success(res.message)
              return res.result
            })
          }
        }
      })
    },
    // 获取选择用户数据
    getUser (val) {
      this.username = val.toString()
      this.form.setFieldsValue({
        username: this.username
      })
    },
    getReviewUser (val) {
      this.reviewUser = val.toString()
    },
    // 打开选择用户页面
    handleSelect () {
      this.$refs.ExamSelectUser.show({
        mode: 'multiple',
        selectValue: this.username ? this.username.split(',') : ''
      })
    },
    handleSelectReview () {
      this.$refs.ExamSelectReviewUser.show({
        mode: 'multiple',
        selectValue: this.reviewUser ? this.reviewUser.split(',') : ''
      })
    },
    // 考试时间
    getExamTime (date, dateString) {
      this.examtime = date
    },
    // 切屏次数
    cutting () {
      this.cutstatus = !this.cutstatus
    },
    beforeBegin () {
      this.remind = !this.remind
    },
    beforeEnd () {
      this.remindEnd = !this.remindEnd
    }
  }
}
</script>
<style scoped>
.input {
  background-color: #f5f5f5;
}
</style>
