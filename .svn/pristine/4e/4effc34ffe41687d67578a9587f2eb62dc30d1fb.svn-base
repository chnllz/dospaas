<template>
  <div>
    <a-drawer :destroyOnClose="true" :title="config.title" :width="900" :visible="visible" @close="visible = !visible">
      <a-spin :spinning="loading">
        <a-form :form="formReply" style="background-color: #f5f5f5">
          <a-card size="small" :bordered="false" style="padding: 12px">
            <h2 style="font-weight: bold">{{ detailsData.title }}</h2>
            <div style="color: rgba(0, 0, 0, 0.45)">
              <a-row>
                <a-col :span="12">
                  <img
                    :src="detailsData.avatar ? setting.rootUrl + detailsData.avatar : ''"
                    style="width: 40px; height: 40px; border-radius: 50%"
                  />
                  <span style="padding: 0 20px 0 10px">{{ detailsData.inputUser }}</span>
                  <span>{{ detailsData.inputTime }}</span>
                  <span style="padding: 0 20px">{{ $t('浏览') }}( {{ detailsData.views }} )</span>
                  <span>{{ $t('回答') }}( {{ detailsData.answer }} )</span>
                </a-col>
                <a-col :span="12" style="text-align: right">
                  <a v-if="detailsData.editPriv" @click="questionEdit">{{ $t('编辑') }}</a>
                  <a-divider v-if="detailsData.delPriv" type="vertical" />
                  <a v-if="detailsData.delPriv" style="color: #f5222d" @click="questionDetele">{{ $t('删除') }}</a>
                </a-col>
              </a-row>
            </div>
            <div style="padding: 30px 0">
              <div>{{ detailsData.content }}</div>
              <div>
                <div v-viewer>
                  <img
                    v-for="(img, number) in detailsData.images"
                    :key="number"
                    :src="img ? setting.rootUrl + img : ''"
                    style="width: 200px; height: auto; cursor: pointer"
                  />
                </div>
                <div v-if="detailsData.videos" style="margin-top: 10px">
                  <video type="video/mp4" controls style="max-width: 800px; height: auto">
                    <source :src="setting.rootUrl + detailsData.videos" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <div style="padding-bottom: 20px">
              <a-row>
                <a-col :span="12">
                  <span style="padding-right: 10px">{{ $t('所属分类') }}:</span>
                  <a-tag v-for="(value, index) in detailsData.categoryName" :key="index">{{ value }}</a-tag>
                </a-col>
                <a-col :span="12" style="text-align: right">
                  <a-button style="margin-right: 10px" @click="checkFollow">
                    <a-icon
                      type="star"
                      :theme="detailsData.hassub ? 'filled' : 'outlined'"
                      :style="{ color: detailsData.hassub ? '#FADB14' : '' }"
                    />
                    {{ $t('关注') }}( {{ detailsData.subscribe }} )
                  </a-button>
                  <a-button type="primary" icon="form" @click="answerQuestion(detailsData.hasanswer ? 'edit' : 'add')">
                    {{ detailsData.hasanswer ? $t('编辑我的回答') : $t('我要回答') }}
                  </a-button>
                </a-col>
              </a-row>
            </div>
          </a-card>
          <a-card size="small" :bordered="false" style="margin-top: 20px; padding: 12px">
            <a-row type="flex" align="middle">
              <a-col :span="12">
                <h2 style="font-weight: bold; margin-bottom: 0">{{ answerData.length }}{{ $t('个回答') }}</h2>
              </a-col>
              <a-col :span="12" style="text-align: right; padding-right: 20px">
                <a-dropdown>
                  <span>
                    {{ answerSearch.type }}
                    <a-icon type="down" />
                  </span>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a
                        @click="
                          answerSearch.type = '创建时间由近到远'
                          answerSearch.value = 'inputTime'
                          getAnswer()
                        "
                      >
                        {{ $t('创建时间由近到远') }}
                      </a>
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        @click="
                          answerSearch.type = '点赞数由多到少'
                          answerSearch.value = 'star'
                          getAnswer()
                        "
                      >
                        {{ $t('点赞数由多到少') }}
                      </a>
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        @click="
                          answerSearch.type = '评论数由多到少'
                          answerSearch.value = 'comment'
                          getAnswer()
                        "
                      >
                        {{ $t('评论数由多到少') }}
                      </a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-col>
            </a-row>
            <a-divider style="margin: 10px 0" />
            <div>
              <a-list item-layout="vertical" :data-source="answerData">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <template slot="actions">
                    <a-row style="cursor: auto">
                      <a-col :span="24" style="text-align: left; margin-left: 50px">
                        <span style="margin-right: 16px">
                          <a-icon
                            type="like"
                            style="font-size: 16px"
                            :theme="item.hasstar ? 'filled' : 'outlined'"
                            @click="checkLike(item)"
                          />
                          {{ item.star }}
                        </span>
                        <span style="margin-right: 16px">
                          <a-icon
                            type="message"
                            style="font-size: 16px; margin-right: 8px"
                            @click="showReply(item, index)"
                          />
                          {{ item.comment }}
                        </span>
                        <span v-if="item.editPriv" style="margin-right: 16px">
                          <a-icon
                            type="edit"
                            style="font-size: 16px; margin-right: 8px"
                            @click="answerQuestion('edit', item)"
                          />
                        </span>
                        <span v-if="item.delPriv" style="margin-right: 16px">
                          <a-icon
                            type="delete"
                            style="font-size: 16px; margin-right: 8px"
                            @click="answerDelete(item)"
                          />
                        </span>
                        <span v-if="userInfo.username === detailsData.inputUser" style="margin-right: 16px">
                          <a-icon
                            type="heart"
                            :style="{
                              'font-size': '16px',
                              'margin-right': '8px',
                              color: item.bestAnswer === '1' ? '#f5222d' : ''
                            }"
                            :theme="item.bestAnswer === '1' ? 'filled' : 'outlined'"
                            @click="setBest(item)"
                          />
                        </span>
                      </a-col>
                      <a-col v-if="item.showReply" :span="24" style="margin-left: 50px">
                        <a-spin :spinning="loadingReply" style="cursor: auto; margin-top: 10px">
                          <a-form-item style="text-align: left">
                            <a-input-search
                              v-decorator="[
                                'reply' + index,
                                {
                                  initialValue: item.replyText,
                                  rules: [{ required: true, message: $t('回复不能为空') }]
                                }
                              ]"
                              :placeholder="$t('回复') + ' ' + item.inputUser"
                              @search="sendContent(item, index)"
                            >
                              <a-button slot="enterButton">
                                {{ $t('回复') }}
                              </a-button>
                            </a-input-search>
                          </a-form-item>
                          <div
                            v-for="(value, key) in item.contentOne"
                            :key="key"
                            style="text-align: left; margin-top: 10px"
                          >
                            <a-divider />
                            <div>
                              <img
                                :src="setting.rootUrl + value.avatar"
                                style="width: 20px; height: 20px; border-radius: 50%"
                              />
                              <span style="margin-left: 10px">
                                {{ value.inputUser }} {{ $t('回复') }} {{ item.inputUser }} :
                              </span>
                            </div>
                            <div style="padding: 10px 35px">{{ value.content }}</div>
                            <div style="padding: 0 30px">
                              {{ value.inputTime }}
                              <span>
                                <a-icon
                                  type="message"
                                  style="font-size: 13px; margin-left: 8px"
                                  @click="replyContent(value, key)"
                                />
                                {{ value.comment }}
                                <a-icon
                                  type="delete"
                                  style="font-size: 13px; margin-left: 8px"
                                  @click="contentDelete(item, value)"
                                />
                              </span>
                            </div>
                            <a-form-item v-if="value.showReply" style="padding-left: 30px">
                              <a-input-search
                                v-decorator="[
                                  'replyContent' + key,
                                  {
                                    initialValue: value.replyText,
                                    rules: [{ required: true, message: $t('回复不能为空') }]
                                  }
                                ]"
                                :placeholder="$t('回复') + ' ' + value.inputUser"
                                @search="sendReply(value, key, item, index)"
                              >
                                <a-button slot="enterButton">
                                  {{ $t('回复') }}
                                </a-button>
                              </a-input-search>
                            </a-form-item>
                            <div v-for="(values, keys) in value.commentList" :key="keys">
                              <div>
                                <img
                                  :src="setting.rootUrl + values.avatar"
                                  style="width: 20px; height: 20px; border-radius: 50%"
                                />
                                <span style="margin-left: 10px">
                                  {{ values.inputUser }} {{ $t('回复') }} {{ values.commentUser }} :
                                </span>
                              </div>
                              <div style="padding: 10px 35px">{{ values.content }}</div>
                              <div style="padding: 0 30px">{{ values.inputTime }}</div>
                            </div>
                          </div>
                        </a-spin>
                      </a-col>
                    </a-row>
                  </template>
                  <a-list-item-meta>
                    <div slot="title">
                      <a-row>
                        <a-col :span="12">
                          <span style="padding-right: 10px">{{ item.inputUser }}</span>
                          <span>{{ item.inputTime }}</span>
                        </a-col>
                        <a-col v-if="item.bestAnswer === '1'" :span="12" style="text-align: right; padding-right: 30px">
                          <a-button type="danger" style="cursor: auto" ghost>{{ $t('最佳答案') }}</a-button>
                        </a-col>
                      </a-row>
                    </div>
                    <div slot="description">
                      <div>{{ item.content }}</div>
                      <div>
                        <div v-viewer>
                          <img
                            v-for="(img, number) in item.images"
                            :key="number"
                            :src="setting.rootUrl + img"
                            style="width: 120px; height: auto; cursor: pointer"
                          />
                        </div>
                        <div v-if="item.videos" style="margin-top: 10px">
                          <video type="video/mp4" controls style="max-width: 560px; height: auto">
                            <source :src="setting.rootUrl + item.videos" type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <a-avatar
                      slot="avatar"
                      :src="setting.rootUrl + item.avatar"
                      style="width: 30px; height: 30px; border-radius: 50%"
                    />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-card>
        </a-form>
        <div class="bbar">
          <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
        </div>
      </a-spin>
      <answer-question
        ref="answerQuestion"
        @ok="
          () => {
            getAnswer()
            getQuestion()
            $emit('ok', '')
          }
        "
      />
      <ask-questions ref="askQuestions" @ok="getQuestion" />
    </a-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('forum'),
  components: {
    AnswerQuestion: () => import('./AnswerQuestion'),
    AskQuestions: () => import('./AskQuestions')
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      loadingReply: false,
      data: [],
      showImg: false,
      // 问题详情
      detailsData: {},
      formReply: this.$form.createForm(this),
      // 评论详情
      answerData: [],
      answerSearch: {
        type: '默认排序',
        value: 'inputTime'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'setting'])
  },
  methods: {
    show (config) {
      this.config = config
      this.visible = true
      this.loading = true
      this.getQuestion()
      this.getAnswer()
      this.answerSearch = {
        type: '默认排序',
        value: 'inputTime'
      }
    },
    getQuestion () {
      this.loading = true
      this.detailsData = {}
      this.axios({
        url: '/forum/index/details',
        data: { number: this.config.data.number }
      }).then(res => {
        this.detailsData = res.result
        this.loading = false
      })
    },
    getAnswer () {
      this.loading = true
      this.answerData = []
      const parameter = {
        pageNo: 1,
        pageSize: 20,
        sortField: this.answerSearch.value,
        sortOrder: 'desc'
      }
      this.axios({
        url: '/forum/index/getAnswers',
        data: Object.assign(parameter, { number: this.config.data.number })
      }).then(res => {
        this.answerData = res.result.data
        this.loading = false
      })
    },
    checkFollow () {
      this.axios({
        url: '/forum/setting/changeSubscribe',
        data: { number: this.detailsData.number }
      }).then(res => {
        if (!res.code) {
          this.detailsData.hassub = !this.detailsData.hassub
          this.detailsData.subscribe = res.result.subscribe
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    setBest (item) {
      this.axios({
        url: '/forum/setting/setbestAnswer',
        data: { number: item.number }
      }).then(res => {
        if (!res.code) {
          this.detailsData.hassub = !this.detailsData.hassub
          this.detailsData.subscribe = res.result.subscribe
          this.$message.success(res.message)
          this.getQuestion()
          this.getAnswer()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    checkLike (record) {
      this.axios({
        url: '/forum/setting/changeStar',
        data: { answerNumber: record.number }
      }).then(res => {
        if (!res.code) {
          record.star = res.result.star
          record.hasstar = !record.hasstar
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    answerQuestion (type, record) {
      let myData = {}
      if (record && record.number) {
        myData = record
      } else {
        let array = []
        array = this.answerData.filter(item => item.inputUser === this.userInfo.username)
        myData = array[0] ? array[0] : {}
      }
      this.$refs.answerQuestion.show({
        action: type,
        title: this.$t('回答问题'),
        data: this.detailsData,
        content: myData
      })
    },
    answerDelete (record, type) {
      const self = this
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          self.axios({
            url: '/forum/index/delAnswer',
            data: { answerNumber: record.number }
          }).then(res => {
            if (!res.code) {
              self.$message.success(res.message)
              self.getAnswer()
              self.getQuestion()
              self.$emit('ok', '')
            } else {
              self.$message.error(res.message)
            }
          })
        }
      })
    },
    contentDelete (item, record) {
      const self = this
      this.loadingReply = true
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          self.axios({
            url: '/forum/index/delComment',
            data: { number: record.number }
          }).then(res => {
            if (!res.code) {
              self.$message.success(res.message)
              self.getLevelTwo(item)
              item.comment = res.result.comment
            } else {
              self.$message.error(res.message)
            }
            self.loadingReply = false
          })
        },
        onCancel () {
          self.loadingReply = false
        }
      })
    },
    getLevelTwo (item, index) {
      this.axios({
        url: '/forum/index/getcomments',
        data: { answerNumber: item.number }
      }).then(res => {
        this.$set(item, 'contentOne', res.result)
      })
    },
    showReply (item, index) {
      this.$set(item, 'showReply', !item.showReply)
      this.getLevelTwo(item, index)
    },
    replyContent (item, index) {
      this.$set(item, 'showReply', !item.showReply)
    },
    sendContent (item, index) {
      this.formReply.validateFields(['reply' + index], (err, values) => {
        if (!err) {
          this.loadingReply = true
          const obj = {}
          obj.content = values['reply' + index]
          obj.answerNumber = item.number
          this.axios({
            url: '/forum/index/commentAnswer',
            data: obj
          }).then(res => {
            if (!res.code) {
              this.$message.success(res.message)
              this.getLevelTwo(item, index)
              this.formReply.resetFields()
              item.comment = res.result.comment
            } else {
              this.$message.error(res.message)
            }
            this.loadingReply = false
          })
        }
      })
    },
    sendReply (item, index, value, key) {
      this.formReply.validateFields(['replyContent' + index], (err, values) => {
        if (!err) {
          this.loadingReply = true
          const obj = {}
          obj.content = values['replyContent' + index]
          obj.answerNumber = item.answerNumber
          obj.commentNumber = item.number
          this.axios({
            url: '/forum/index/commentAnswer',
            data: obj
          }).then(res => {
            if (!res.code) {
              this.$message.success(res.message)
              this.getLevelTwo(value, key)
              this.formReply.resetFields()
              item.comment = res.result.comment
            } else {
              this.$message.error(res.message)
            }
            this.loadingReply = false
          })
        }
      })
    },
    questionEdit () {
      this.$refs.askQuestions.show({
        action: 'edit',
        title: this.$t('编辑'),
        data: this.detailsData
      })
    },
    questionDetele () {
      const self = this
      const number = []
      number.push(this.detailsData.number)
      this.$confirm({
        title: this.$t('您确认要删除该记录吗？'),
        onOk () {
          self.axios({
            url: '/forum/index/delQuestion',
            data: { number: number }
          }).then(res => {
            if (!res.code) {
              self.$message.success(res.message)
              self.$emit('ok', '')
              self.visible = false
            } else {
              self.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
