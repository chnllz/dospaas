
<template>
  <a-drawer
    :destroyOnClose="true"
    :title="config.title"
    :width="1000"
    :visible="visible"
    :maskClosable="config.user === 'personTest' ? false : true"
    :closable="config.user === 'personTest' ? false : true"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <div>
        <div
          v-if="config.user === 'personTest' && formdata.time !== '0'"
          style="z-index: 1; position: absolute; background-color: #ffffff; right: 50px"
        >
          <a-statistic-countdown
            :title="$t('考试剩余时间')"
            :value="Date.now() + formdata.time * 60 * 1000"
            format="HH:mm:ss"
            @finish="finish"
          />
        </div>
        <div style="text-align: center">
          <div>
            <h1>
              <b>{{ formdata.title }}</b>
            </h1>
          </div>
          <div v-if="config.title !== $t('试卷预览')">
            <div v-if="!formdata.time">
              {{ $t('本次考试不限时， 共 {0} 道题，满分 {1} 分', { 0: questionTotal, 1: scoreTotal }) }}
            </div>
            <div v-else>
              {{
                $t('本次考试限时 {0} 分钟， 共 {1} 道题，满分 {2} 分', {
                  0: formdata.time,
                  1: questionTotal,
                  2: scoreTotal
                })
              }}
            </div>
          </div>
          <div v-if="config.title === $t('试卷预览')">
            {{ $t('共 {0} 道题，满分 {1} 分', { 0: questionTotal, 1: scoreTotal }) }}
          </div>
        </div>
        <div v-if="config.action === 'check'">
          <span style="margin-left: 200px; padding-right: 10px">
            {{ $t('考生姓名') }}:
            <span style="padding-left: 10px; color: #4daaff">{{ formdata.username }}</span>
          </span>
          <span style="margin-left: 80px">
            {{ $t('得分') }}:
            <span style="padding-left: 10px; color: #4daaff">{{ formdata.grade }}</span>
          </span>
          <span style="margin-left: 80px">
            {{ $t('得分记录') }}:
            <a-select style="width: 200px; margin-left: 10px" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="(item, index) in formdata.reviewlog" :key="index" :value="index">
                {{ $t('{0} 批改分数 {1} 分', { 0: item.date, 1: item.grade }) }}
              </a-select-option>
            </a-select>
          </span>
        </div>
        <br />
        <a-alert v-if="formdata.remarks" :message="formdata.remarks" type="warning" />
        <a-form :form="form" style="margin-bottom: 80px" @submit="handleSubmit">
          <div v-for="(value, option) in titleData" :key="option">
            <a-divider v-if="option != 0" />
            <div v-if="value === $t('单选题') && formdata.single.length > 0">
              <!-- <a-col :span="7"><h2><b>{{ chinese[option] }}、{{ value }}( {{ formdata.single.length ? formdata.single.length : '' }} 题，共 {{ singleScore }} 分 )</b></h2></a-col> -->
              <a-col :span="7">
                <h2>
                  <b>
                    {{
                      $t('{0}、{1}({2}题，共{3}分)', {
                        0: chinese[option],
                        1: value,
                        2: formdata.single.length ? formdata.single.length : '',
                        3: singleScore
                      })
                    }}
                  </b>
                </h2>
              </a-col>
              <div v-for="(item, key) in formdata.single" :key="key">
                <a-form-item>
                  <a-col :span="24">
                    <span>{{ key + 1 }}. {{ item.title }} ( {{ item.score }} {{ $t('分') }} )</span>
                  </a-col>
                  <a-col :span="24">
                    <a-radio-group
                      v-if="config.action === 'check'"
                      v-decorator="['info[single][' + item.id + ']', { initialValue: item.answer }]"
                      :disabled="true"
                    >
                      <a-col :span="24">
                        <a-radio
                          v-for="(items, keys) in item.list"
                          :key="keys"
                          :style="radioStyle"
                          :value="String.fromCharCode(65 + keys)"
                        >
                          {{ String.fromCharCode(65 + keys) }}. {{ items }}
                        </a-radio>
                      </a-col>
                    </a-radio-group>
                    <a-radio-group v-else v-decorator="['info[single][' + item.id + ']']">
                      <a-col :span="24">
                        <a-radio
                          v-for="(items, keys) in item.list"
                          :key="keys"
                          :style="radioStyle"
                          :value="String.fromCharCode(65 + keys)"
                        >
                          {{ String.fromCharCode(65 + keys) }}. {{ items }}
                        </a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-col>
                </a-form-item>
                <div v-if="config.action === 'check'">
                  <div style="margin-bottom: 10px">
                    <span class="stuanswer">{{ config.user === 'person' ? $t('你的答案') : $t('考生答案') }}</span>
                    <span style="margin-right: 10px">{{ item.answer ? item.answer : $t('未填') }}</span>
                    <span v-if="item.correct === 1 && showcorrect"><a-icon style="color: #52c41a" type="check" /></span>
                    <span v-if="item.correct === 0 && showcorrect"><a-icon class="color" type="close" /></span>
                  </div>
                  <div v-if="showanswer" style="margin-bottom: 10px">
                    <span class="rightanswer">{{ $t('正确答案') }}</span>
                    <span>{{ item.setting.answer }}</span>
                  </div>
                  <div v-if="item.setting.analysis && showanswer">
                    <span class="analysis">{{ $t('答案解析') }}</span>
                    <span>{{ item.setting.analysis }}</span>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <div v-if="value === $t('多选题') && formdata.multiple.length > 0">
              <a-col :span="7">
                <h2>
                  <b>
                    {{
                      $t('{0}、{1}({2}题，共{3}分)', {
                        0: chinese[option],
                        1: value,
                        2: formdata.multiple.length,
                        3: multipleScore
                      })
                    }}
                  </b>
                </h2>
              </a-col>
              <div v-for="(item, key) in formdata.multiple" :key="key">
                <a-form-item>
                  <a-col :span="24">
                    <span>
                      {{ formdata.single.length + key + 1 }}. {{ item.title }} ( {{ item.score }} {{ $t('分') }} )
                    </span>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox-group
                      v-if="config.action === 'check'"
                      v-decorator="['info[multiple][' + item.id + ']', { initialValue: item.answer || [] }]"
                      :disabled="true"
                    >
                      <a-col :span="24">
                        <a-checkbox
                          v-for="(items, keys) in item.list"
                          :key="keys"
                          :style="radioStyle"
                          :value="String.fromCharCode(65 + keys)"
                        >
                          {{ String.fromCharCode(65 + keys) }}. {{ items }}
                        </a-checkbox>
                      </a-col>
                    </a-checkbox-group>
                    <a-checkbox-group v-else v-decorator="['info[multiple][' + item.id + ']']">
                      <a-col :span="24">
                        <a-checkbox
                          v-for="(items, keys) in item.list"
                          :key="keys"
                          :style="radioStyle"
                          :value="String.fromCharCode(65 + keys)"
                        >
                          {{ String.fromCharCode(65 + keys) }}. {{ items }}
                        </a-checkbox>
                      </a-col>
                    </a-checkbox-group>
                  </a-col>
                </a-form-item>
                <div v-if="config.action === 'check'">
                  <div style="margin-bottom: 10px">
                    <span class="stuanswer">{{ config.user === 'person' ? $t('你的答案') : $t('考生答案') }}</span>
                    <span style="margin-right: 10px">
                      {{ item.answer && item.answer[0] ? item.answer.toString() : '未填' }}
                    </span>
                    <span v-if="item.correct === 1 && showcorrect"><a-icon style="color: #52c41a" type="check" /></span>
                    <span v-if="item.correct === 0 && showcorrect"><a-icon class="color" type="close" /></span>
                  </div>
                  <div v-if="showanswer" style="margin-bottom: 10px">
                    <span class="rightanswer">{{ $t('正确答案') }}</span>
                    <span>{{ item.setting.answer.toString() }}</span>
                  </div>
                  <div v-if="item.setting.analysis && showanswer">
                    <span class="analysis">{{ $t('答案解析') }}</span>
                    <span>{{ item.setting.analysis }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="value === $t('判断题') && formdata.judge.length > 0">
              <!-- <a-col :span="7"><h2><b>{{ chinese[option] }}、{{ value }}( {{ formdata.judge.length }} 题，共 {{ judgeScore }} 分 )</b></h2></a-col> -->
              <a-col :span="7">
                <h2>
                  <b>
                    {{
                      $t('{0}、{1}({2}题，共{3}分)', {
                        0: chinese[option],
                        1: value,
                        2: formdata.judge.length,
                        3: judgeScore
                      })
                    }}
                  </b>
                </h2>
              </a-col>
              <div v-for="(item, key) in formdata.judge" :key="key">
                <a-form-item>
                  <a-col :span="24">
                    <span>
                      {{ formdata.single.length + formdata.multiple.length + key + 1 }}. {{ item.title }} (
                      {{ item.score }} {{ $t('分') }} )
                    </span>
                  </a-col>
                  <a-col :span="24">
                    <a-radio-group
                      v-if="config.action === 'check'"
                      v-decorator="['info[judge][' + item.id + ']', { initialValue: item.answer }]"
                      :disabled="true"
                    >
                      <a-col :span="24">
                        <a-radio :style="radioStyle" value="1">{{ $t('对') }}</a-radio>
                        <a-radio :style="radioStyle" value="0">{{ $t('错') }}</a-radio>
                      </a-col>
                    </a-radio-group>
                    <a-radio-group v-else v-decorator="['info[judge][' + item.id + ']']">
                      <a-col :span="24">
                        <a-radio :style="radioStyle" value="1">{{ $t('对') }}</a-radio>
                        <a-radio :style="radioStyle" value="0">{{ $t('错') }}</a-radio>
                      </a-col>
                    </a-radio-group>
                  </a-col>
                </a-form-item>
                <div v-if="config.action === 'check'">
                  <div style="margin-bottom: 10px">
                    <span class="stuanswer">{{ config.user === 'person' ? $t('你的答案') : $t('考生答案') }}</span>
                    <span v-if="item.answer" style="margin-right: 10px">
                      {{ item.answer === '1' ? $('对') : $t('错') }}
                    </span>
                    <span v-else style="margin-right: 10px">{{ $t('未填') }}</span>
                    <span v-if="item.correct === 1 && showcorrect"><a-icon style="color: #52c41a" type="check" /></span>
                    <span v-if="item.correct === 0 && showcorrect"><a-icon class="color" type="close" /></span>
                  </div>
                  <div v-if="showanswer" style="margin-bottom: 10px">
                    <span class="rightanswer">{{ $t('正确答案') }}</span>
                    <span>{{ item.setting.answer === '1' ? $('对') : $t('错') }}</span>
                  </div>
                  <div v-if="item.setting.analysis && showanswer">
                    <span class="analysis">{{ $t('答案解析') }}</span>
                    <span>{{ item.setting.analysis }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="value === $t('填空题') && formdata.fills.length > 0">
              <!-- <a-col :span="7"><h2><b>{{ chinese[option] }}、{{ value }}( {{ formdata.fills.length }} 题，共 {{ fillsScore }} 分 )</b></h2></a-col> -->
              <a-col :span="7">
                <h2>
                  <b>
                    {{
                      $t('{0}、{1}({2}题，共{3}分)', {
                        0: chinese[option],
                        1: value,
                        2: formdata.fills.length,
                        3: fillsScore
                      })
                    }}
                  </b>
                </h2>
              </a-col>
              <div v-for="(item, key) in formdata.fills" :key="key">
                <a-form-item>
                  <a-col :span="24">
                    <span>
                      {{ formdata.single.length + formdata.multiple.length + formdata.judge.length + key + 1 }}.
                      {{ item.title }} ( {{ item.score }} {{ $t('分') }} )
                    </span>
                  </a-col>
                  <a-col :span="24">
                    <a-col v-if="config.action === 'check'" :span="12">
                      <div v-for="(items, keys) in item.answer" :key="keys">
                        <div style="margin-bottom: 10px">
                          <span class="stuanswer">
                            {{ config.user === 'person' ? $t('你的答案') : $t('考生答案') }}
                          </span>
                          <span style="margin-right: 10px">{{ items || $t('未填') }}</span>
                          <span v-if="item.setting.answer[keys] === items && item.setting.allow === '0' && showcorrect">
                            <a-icon style="color: #52c41a" type="check" />
                          </span>
                          <span v-if="item.setting.answer[keys] !== items && item.setting.allow === '0' && showcorrect">
                            <a-icon class="color" type="close" />
                          </span>
                          <span v-if="item.setting.answer.includes(items) && item.setting.allow === '1' && showcorrect">
                            <a-icon style="color: #52c41a" type="check" />
                          </span>
                          <span
                            v-if="!item.setting.answer.includes(items) && item.setting.allow === '1' && showcorrect"
                          >
                            <a-icon class="color" type="close" />
                          </span>
                        </div>
                        <a-form-item
                          :label="$t('填空项') + (keys + 1)"
                          :label-col="{ span: 4 }"
                          :wrapper-col="{ span: 18 }"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="['info[fills][' + item.id + '][' + keys + ']', { initialValue: items }]"
                            :read-only="true"
                            :placeholder="$t('填空项') + (keys + 1)"
                            class="input"
                          />
                        </a-form-item>
                        <div v-if="showanswer" style="margin-bottom: 10px">
                          <span class="rightanswer">{{ $t('正确答案') }}</span>
                          <span>{{ item.setting.answer[keys] }}</span>
                        </div>
                      </div>
                      <div v-if="item.setting.analysis && showanswer">
                        <span class="analysis">{{ $t('答案解析') }}</span>
                        <span>{{ item.setting.analysis }}</span>
                      </div>
                      <div v-if="config.user !== 'person'" style="margin-top: 10px">
                        <a-form-item>
                          <span style="margin-right: 10px">{{ $t('打分') }}</span>
                          <a-input-number
                            v-decorator="['info[scoring][' + item.id + ']']"
                            :min="0"
                            :max="Number(item.score)"
                          />
                        </a-form-item>
                      </div>
                    </a-col>
                    <a-col v-else :span="12">
                      <div v-for="(items, keys) in item.setting.answer" :key="keys">
                        <a-form-item
                          :label="$t('填空项') + (keys + 1)"
                          :label-col="{ span: 4 }"
                          :wrapper-col="{ span: 18 }"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="['info[fills][' + item.id + '][' + keys + ']']"
                            :placeholder="$t('填空项') + (keys + 1)"
                          />
                        </a-form-item>
                      </div>
                    </a-col>
                  </a-col>
                </a-form-item>
              </div>
            </div>
            <div v-if="value === $t('简答题') && formdata.answer.length > 0">
              <!-- <a-col :span="7"><h2><b>{{ chinese[option] }}、{{ value }}( {{ formdata.answer.length }} 题，共 {{ answerScore }} 分 )</b></h2></a-col> -->
              <a-col :span="7">
                <h2>
                  <b>
                    {{
                      $t('{0}、{1}({2}题，共{3}分)', {
                        0: chinese[option],
                        1: value,
                        2: formdata.answer.length,
                        3: answerScore
                      })
                    }}
                  </b>
                </h2>
              </a-col>
              <div v-for="(item, key) in formdata.answer" :key="key">
                <a-form-item>
                  <a-col :span="24">
                    <span>
                      {{
                        formdata.single.length +
                        formdata.multiple.length +
                        formdata.judge.length +
                        formdata.fills.length +
                        key +
                        1
                      }}. {{ item.title }} ( {{ item.score }} {{ $t('分') }} )
                    </span>
                  </a-col>
                  <a-col v-if="config.action === 'check'" :span="24">
                    <div style="margin-bottom: 10px">
                      <span class="stuanswer">{{ config.user === 'person' ? '你的答案' : '考生答案' }}</span>
                      <span style="margin-right: 10px">{{ item.answer || $t('未填') }}</span>
                    </div>
                    <a-textarea
                      v-decorator="['info[answer][' + item.id + ']', { initialValue: item.answer }]"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                      :read-only="true"
                      class="input"
                    />
                    <div v-if="showanswer" style="margin-bottom: 10px">
                      <span class="rightanswer">{{ $t('得分关键词') }}</span>
                      <span>{{ item.setting.answer }}</span>
                    </div>
                    <div v-if="item.setting.analysis && showanswer">
                      <span class="analysis">{{ $t('答案解析') }}</span>
                      <span>{{ item.setting.analysis }}</span>
                    </div>
                    <div v-if="config.user !== 'person'" style="margin-top: 10px">
                      <a-form-item>
                        <span style="margin-right: 10px">{{ $t('打分') }}</span>
                        <a-input-number
                          v-decorator="['info[scoring][' + item.id + ']']"
                          :min="0"
                          :max="Number(item.score)"
                        />
                      </a-form-item>
                    </div>
                  </a-col>
                  <a-col v-else :span="24">
                    <a-textarea
                      v-decorator="['info[answer][' + item.id + ']']"
                      :auto-size="{ minRows: 3, maxRows: 5 }"
                    />
                  </a-col>
                </a-form-item>
              </div>
            </div>
          </div>
        </a-form>
      </div>
      <div v-if="config.user === 'personTest' || config.title === $t('审阅试卷')" class="bbar">
        <a-button type="primary" html-type="submit" @click="handleSubmit">
          {{ config.user !== 'personTest' ? $t('保存') : $t('交卷') }}
        </a-button>
        <a-button v-if="config.user !== 'personTest'" @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('exam'),
  data () {
    return {
      advanced: false,
      loading: false,
      visible: false,
      readonly: false,
      config: {},
      formdata: {},
      answer: {},
      single: [],
      showanswer: false,
      showcorrect: false,
      singleScore: 0,
      multiple: [],
      multipleScore: 0,
      judge: [],
      judgeScore: 0,
      fills: [],
      fillsScore: 0,
      briefAnswer: [],
      answerScore: 0,
      questionTotal: 0,
      scoreTotal: 0,
      titleData: [],
      allScore: [],
      timeout: false,
      time: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      mymultiple: {},
      chinese: [this.$t('一'), this.$t('二'), this.$t('三'), this.$t('四'), this.$t('五')],
      form: this.$form.createForm(this),
      timer: '',
      restrictScreen: 0
    }
  },

  destroyed () {
    clearInterval(this.timer)
    document.removeEventListener('visibilitychange', this.checkChangeTab)
    document.removeEventListener('mouseleave', this.checkMouseLeave)
  },
  methods: {
    // 传参接收
    show (config) {
      this.formdata = {}
      this.titleData = []
      this.singleScore = 0
      this.multipleScore = 0
      this.judgeScore = 0
      this.fillsScore = 0
      this.answerScore = 0
      this.visible = true
      this.loading = true
      this.timeout = false
      this.config = config
      if (this.config.action === 'check') {
        this.readonly = true
      }
      this.formdata = config.data
      this.questionTotal = config.data.total
      this.scoreTotal = config.data.score
      this.formdata.single = []
      this.formdata.multiple = []
      this.formdata.judge = []
      this.formdata.fills = []
      this.formdata.answer = []
      const data = JSON.parse(this.formdata.setting).data
      this.axios({
        url: '/exam/examination/view',
        data: { id: config.title === this.$t('考试预览') ? config.data.examId : config.data.id }
      }).then(res => {
        if (this.config.type === 'fixed') {
          if (res.result && res.result.question) {
            const details = res.result.question.filter(item => data.some(x => x.question === item.id))
            data.forEach(item => {
              details.forEach(it => {
                if (it.id === item.question) {
                  it.score = item.score
                  for (const i in it) {
                    item[i] = it[i]
                  }
                }
              })
            })
          }
          data.forEach(item => {
            if (item.type === 'single') {
              const data = []
              for (const i in item.setting.list) {
                data.push(item.setting.list[i])
              }
              item.list = data
              this.singleScore = this.singleScore + Number(item.score)
              this.formdata.single.push(item)
            } else if (item.type === 'multiple') {
              const data = []
              for (const i in item.setting.list) {
                data.push(item.setting.list[i])
              }
              item.list = data
              this.multipleScore = this.multipleScore + Number(item.score)
              this.formdata.multiple.push(item)
            } else if (item.type === 'judge') {
              this.judgeScore = this.judgeScore + Number(item.score)
              this.formdata.judge.push(item)
            } else if (item.type === 'fills') {
              const data = []
              for (const i in item.setting.answer) {
                data.push(item.setting.answer[i])
              }
              item.fills = data
              this.fillsScore = this.fillsScore + Number(item.score)
              this.formdata.fills.push(item)
            } else if (item.type === 'answer') {
              this.answerScore = this.answerScore + Number(item.score)
              this.formdata.answer.push(item)
            }
          })
          if (this.formdata.single.length !== 0) {
            this.titleData.unshift(this.$t('单选题'))
          }
          if (this.formdata.multiple.length !== 0) {
            this.titleData.push(this.$t('多选题'))
          }
          if (this.formdata.judge.length !== 0) {
            this.titleData.push(this.$t('判断题'))
          }
          if (this.formdata.fills.length !== 0) {
            this.titleData.push(this.$t('填空题'))
          }
          if (this.formdata.answer.length !== 0) {
            this.titleData.push(this.$t('简答题'))
          }
        } else {
          if (res.result && res.result.question) {
            res.result.question.forEach(item => {
              if (item.type === 'single') {
                const data = []
                for (const i in item.setting.list) {
                  data.push(item.setting.list[i])
                }
                item.list = data
                this.singleScore = this.singleScore + Number(item.score)
                this.formdata.single.push(item)
              } else if (item.type === 'multiple') {
                const data = []
                for (const i in item.setting.list) {
                  data.push(item.setting.list[i])
                }
                item.list = data
                this.multipleScore = this.multipleScore + Number(item.score)
                this.formdata.multiple.push(item)
              } else if (item.type === 'judge') {
                this.judgeScore = this.judgeScore + Number(item.score)
                this.formdata.judge.push(item)
              } else if (item.type === 'fills') {
                const data = []
                for (const i in item.setting.answer) {
                  data.push(item.setting.answer[i])
                }
                item.fills = data
                this.fillsScore = this.fillsScore + Number(item.score)
                this.formdata.fills.push(item)
              } else if (item.type === 'answer') {
                this.answerScore = this.answerScore + Number(item.score)
                this.formdata.answer.push(item)
              }
            })
          }
          if (this.formdata.single.length !== 0) {
            this.titleData.unshift(this.$t('单选题'))
          }
          if (this.formdata.multiple.length !== 0) {
            this.titleData.push(this.$t('多选题'))
          }
          if (this.formdata.judge.length !== 0) {
            this.titleData.push(this.$t('判断题'))
          }
          if (this.formdata.fills.length !== 0) {
            this.titleData.push(this.$t('填空题'))
          }
          if (this.formdata.answer.length !== 0) {
            this.titleData.push(this.$t('简答题'))
          }
        }
        this.questionTotal = this.formdata.single.length + this.formdata.multiple.length + this.formdata.judge.length + this.formdata.fills.length + this.formdata.answer.length
        this.scoreTotal = this.singleScore + this.multipleScore + this.judgeScore + this.fillsScore + this.answerScore
        this.loading = false
        if (this.config.data.settings.restrictScreen) {
          this.restrictScreen = this.config.data.settings.restrictScreen
          document.addEventListener('mouseleave', this.checkMouseLeave)
        }
      })
    },
    checktime () {
      const time = new Date()
      if (Date.parse(time) === Date.parse(this.formdata.endTime)) {
        this.timeout = true
        this.finish()
      }
    },
    finish () {
      this.timeout = true
      this.$message.info(this.$t('考试时间到，试卷已提交'))
      this.handleSubmit()
    },
    personShow (config) {
      this.formdata = {}
      this.titleData = []
      this.formdata = config.data
      this.config = config
      this.questionTotal = 0
      this.scoreTotal = 0
      this.singleScore = 0
      this.multipleScore = 0
      this.judgeScore = 0
      this.fillsScore = 0
      this.answerScore = 0
      if (config.user === 'personTest') {
        this.timer = setInterval(this.checktime, 1000)
      }
      this.visible = true
      this.loading = true
      this.axios({
        url: '/exam/achievement/exam',
        data: { action: 'start', paperId: config.data.id, examId: config.data.examId }
      }).then(res => {
        this.formdata.gradeId = res.result.gradeId
        this.formdata.single = []
        this.formdata.multiple = []
        this.formdata.judge = []
        this.formdata.fills = []
        this.formdata.answer = []
        res.result.question.forEach((item, index) => {
          item.sort = index + 1
          item.scoring = ''
          if (item.type === 'single') {
            const data = []
            for (const i in item.setting.list) {
              data.push(item.setting.list[i])
            }
            item.list = data
            this.singleScore = this.singleScore + Number(item.score)
            this.formdata.single.push(item)
          } else if (item.type === 'multiple') {
            const data = []
            for (const i in item.setting.list) {
              data.push(item.setting.list[i])
            }
            item.list = data
            this.multipleScore = this.multipleScore + Number(item.score)
            this.formdata.multiple.push(item)
          } else if (item.type === 'judge') {
            this.judgeScore = this.judgeScore + Number(item.score)
            this.formdata.judge.push(item)
          } else if (item.type === 'fills') {
            const data = []
            for (const i in item.setting.answer) {
              data.push(item.setting.answer[i])
            }
            item.fills = data
            this.fillsScore = this.fillsScore + Number(item.score)
            this.formdata.fills.push(item)
          } else if (item.type === 'answer') {
            this.answerScore = this.answerScore + Number(item.score)
            this.formdata.answer.push(item)
          }
        })
        if (this.formdata.single.length !== 0) {
          this.titleData.unshift(this.$t('单选题'))
        }
        if (this.formdata.multiple.length !== 0) {
          this.titleData.push(this.$t('多选题'))
        }
        if (this.formdata.judge.length !== 0) {
          this.titleData.push(this.$t('判断题'))
        }
        if (this.formdata.fills.length !== 0) {
          this.titleData.push(this.$t('填空题'))
        }
        if (this.formdata.answer.length !== 0) {
          this.titleData.push(this.$t('简答题'))
        }
        if (this.config.data.settings.restrictScreen) {
          this.restrictScreen = this.config.data.settings.restrictScreen
          document.addEventListener('mouseleave', this.checkMouseLeave)
        }
        this.questionTotal = this.formdata.single.length + this.formdata.multiple.length + this.formdata.judge.length + this.formdata.fills.length + this.formdata.answer.length
        this.scoreTotal = this.singleScore + this.multipleScore + this.judgeScore + this.fillsScore + this.answerScore
        this.loading = false
      })
    },
    detailshow (config) {
      this.formdata = {}
      this.titleData = []
      this.config = config
      this.questionTotal = 0
      this.singleScore = 0
      this.multipleScore = 0
      this.judgeScore = 0
      this.fillsScore = 0
      this.answerScore = 0
      this.scoreTotal = 0
      this.visible = true
      this.loading = true
      if (config.user !== 'person') {
        this.showanswer = true
        this.showcorrect = true
      }
      this.axios({
        url: '/exam/achievement/checkGrade',
        data: { gradeId: config.data.id, action: config.action, paperId: config.data.paperId, username: config.data.username }
      }).then(res => {
        this.formdata = res.result.data
        this.formdata.reviewlog = res.result.reviewlog || []
        this.formdata.paperSetting = res.result.paperSetting
        const time = new Date()
        if (res.result.paperSetting.paperAfter === '1' && Date.parse(res.result.paperSetting.endTime) > Date.parse(time)) {
          this.showcorrect = true
        }
        if (res.result.paperSetting.paperAfter === '2' && Date.parse(res.result.paperSetting.endTime) > Date.parse(time)) {
          this.showcorrect = true
          this.showanswer = true
        }
        if (res.result.paperSetting.examAfter === '1' && Date.parse(res.result.paperSetting.endTime) < Date.parse(time)) {
          this.showcorrect = true
        }
        if (res.result.paperSetting.examAfter === '2' && Date.parse(res.result.paperSetting.endTime) < Date.parse(time)) {
          this.showcorrect = true
          this.showanswer = true
        }
        this.formdata.single = []
        this.formdata.multiple = []
        this.formdata.judge = []
        this.formdata.fills = []
        this.formdata.answer = []
        res.result.question.forEach(item => {
          if (item.type === 'single') {
            const data = []
            for (const i in item.setting.list) {
              data.push(item.setting.list[i])
            }
            item.list = data
            this.singleScore = this.singleScore + Number(item.score)
            this.formdata.single.push(item)
          } else if (item.type === 'multiple') {
            const data = []
            for (const i in item.setting.list) {
              data.push(item.setting.list[i])
            }
            item.list = data
            this.multipleScore = this.multipleScore + Number(item.score)
            this.formdata.multiple.push(item)
          } else if (item.type === 'judge') {
            this.judgeScore = this.judgeScore + Number(item.score)
            this.formdata.judge.push(item)
          } else if (item.type === 'fills') {
            const data = []
            for (const i in item.setting.answer) {
              data.push(item.setting.answer[i])
            }
            item.fills = data
            this.fillsScore = this.fillsScore + Number(item.score)
            this.formdata.fills.push(item)
          } else if (item.type === 'answer') {
            this.answerScore = this.answerScore + Number(item.score)
            this.formdata.answer.push(item)
          }
        })
        if (this.formdata.single.length !== 0) {
          this.titleData.unshift(this.$t('单选题'))
        }
        if (this.formdata.multiple.length !== 0) {
          this.titleData.push(this.$t('多选题'))
        }
        if (this.formdata.judge.length !== 0) {
          this.titleData.push(this.$t('判断题'))
        }
        if (this.formdata.fills.length !== 0) {
          this.titleData.push(this.$t('填空题'))
        }
        if (this.formdata.answer.length !== 0) {
          this.titleData.push(this.$t('简答题'))
        }
        this.questionTotal = this.formdata.single.length + this.formdata.multiple.length + this.formdata.judge.length + this.formdata.fills.length + this.formdata.answer.length
        this.scoreTotal = this.singleScore + this.multipleScore + this.judgeScore + this.fillsScore + this.answerScore
        this.loading = false
      })
    },
    // 考试数据提交
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let title = this.$t('题目')
          const setting = []
          const number = []
          for (const i in values.info.single) {
            this.formdata.single.forEach((item, index) => {
              if (item.id === i && !values.info.single[i]) {
                number.push(item.sort)
              }
            })
            const data = {}
            data.question = i
            data.answer = values.info.single[i] ? values.info.single[i] : ''
            setting.push(data)
          }
          for (const i in values.info.multiple) {
            this.formdata.multiple.forEach((item, index) => {
              if (item.id === i && !values.info.multiple[i]) {
                number.push(item.sort)
              }
            })
            const data = {}
            data.question = i
            data.answer = values.info.multiple[i] ? values.info.multiple[i] : []
            setting.push(data)
          }
          for (const i in values.info.judge) {
            this.formdata.judge.forEach((item, index) => {
              if (item.id === i && !values.info.judge[i]) {
                number.push(item.sort)
              }
            })
            const data = {}
            data.question = i
            data.answer = values.info.judge[i] ? values.info.judge[i] : ''
            setting.push(data)
          }
          for (const i in values.info.fills) {
            this.formdata.fills.forEach((item, index) => {
              if (item.id === i && !values.info.fills[i][0]) {
                number.push(item.sort)
              }
            })
            const data = {}
            data.question = i
            data.answer = values.info.fills[i] ? values.info.fills[i] : []
            setting.push(data)
          }
          for (const i in values.info.answer) {
            this.formdata.answer.forEach((item, index) => {
              if (item.id === i && !values.info.answer[i]) {
                number.push(item.sort)
              }
            })
            const data = {}
            data.question = i
            data.answer = values.info.answer[i] ? values.info.answer[i] : ''
            setting.push(data)
          }
          number.sort(function (a, b) { return a - b })
          title += number.toString()
          if (this.config.title !== this.$t('审阅试卷')) {
            if (this.timeout) {
              document.removeEventListener('visibilitychange', this.checkChangeTab)
              document.removeEventListener('mouseleave', this.checkMouseLeave)
              this.axios({
                url: '/exam/achievement/exam',
                data: { action: 'submit', gradeId: this.formdata.gradeId, setting: setting }
              }).then(res => {
                this.$emit('ok', '')
                clearInterval(this.timer)
                this.$message.success(this.$t('交卷成功'))
                this.visible = false
              })
            } else {
              const self = this
              this.$confirm({
                title: number.length > 0 ? title + this.$t('尚未填写，您确定要提交试卷吗？') : this.$t('您确定要提交试卷吗？'),
                onOk () {
                  self.axios({
                    url: '/exam/achievement/exam',
                    data: { action: 'submit', gradeId: self.formdata.gradeId, setting: setting }
                  }).then(res => {
                    self.$emit('ok', '')
                    clearInterval(self.timer)
                    self.$message.success(self.$t('交卷成功'))
                    self.visible = false
                  })
                }
              })
            }
          } else {
            const set = []
            const info = {}
            info.grade = 0
            this.formdata.single.forEach(item => {
              if (item.correct === 1) {
                item.grade = item.score
                info.grade = info.grade + Number(item.score)
              }
            })
            this.formdata.multiple.forEach(item => {
              if (item.correct === 1) {
                item.grade = item.score
                info.grade = info.grade + Number(item.score)
              }
            })
            this.formdata.judge.forEach(item => {
              if (item.correct === 1) {
                item.grade = item.score
                info.grade = info.grade + Number(item.score)
              }
            })
            for (const i in values.info.fills) {
              const data = {}
              data.question = i
              data.answer = values.info.fills[i]
              set.push(data)
            }
            for (const i in values.info.answer) {
              const data = {}
              data.question = i
              data.answer = values.info.answer[i]
              set.push(data)
            }
            set.forEach(item => {
              delete item.answer
              for (const i in values.info.scoring) {
                if (item.question === i) {
                  item.grade = values.info.scoring[i] || 0
                  info.grade = info.grade + item.grade
                }
              }
            })
            this.axios({
              url: '/exam/achievement/review',
              data: { action: 'submit', gradeId: this.config.data.id, info: info, setting: set }
            }).then(res => {
              this.$emit('ok', '')
              this.$message.success(res.message)
              this.visible = false
            })
          }
        }
      })
    },
    checkMouseLeave () {
      --this.restrictScreen
      if (this.restrictScreen === 0) {
        this.timeout = true
        this.handleSubmit()
        return
      }
      this.$confirm({
        title: this.$t(`${this.restrictScreen}次切屏后强制交卷`)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.input {
  background-color: #f5f5f5;
}
.stuanswer {
  border-radius: 5px;
  background-color: @primary-color;
  color: white;
  padding: 2px;
  margin-right: 15px;
}
.rightanswer {
  border-radius: 5px;
  background-color: #73d13d;
  color: white;
  padding: 2px;
  margin-right: 15px;
}
.analysis {
  border-radius: 5px;
  background-color: #fadb14;
  color: white;
  padding: 2px;
  margin-right: 15px;
}
.color {
  color: #ff4d4f;
}
</style>
