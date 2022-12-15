<template>
  <a-drawer
    :title="$t(config.title)"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    @close="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-form
        :colon="false"
        :form="form"
        layout="horizontal"
        labelAlign="right"
        v-bind="formLayout"
        @submit="handleSubmit"
      >
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('基础设置') }}</h3>
        </a-space>
        <a-card>
          <a-form-item
            :labelCol="{ style: 'width: 110px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('模板名称')"
          >
            <a-input
              v-decorator="[
                'info[templateName]',
                {
                  initialValue: config.action === 'copy' ? '' : setting.templateName,
                  rules: [{ required: true, message: '请输入模板名称' }]
                }
              ]"
              @change="editcheck($event)"
            />
          </a-form-item>
          <a-form-item
            style="display: flex; align-items: center"
            :labelCol="{ style: 'width: 110px; display: inline-block' }"
            :wrapperCol="{ style: 'width: calc(100% - 178px); display: inline-block' }"
            :label="$t('合格条件')"
            :required="true"
          >
            <div style="display: flex; align-items: center">
              <a-form-item
                style="flex: 1"
                :labelCol="{ style: 'width: 110px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 110px); display: inline-block' }"
              >
                <div style="display: flex; align-items: center">
                  <span style="flex: 110px">{{ $t('质检条件') }}</span>
                  <a-select
                    v-decorator="['info[qualifiedTotal]', { initialValue: setting.qualifiedTotal }]"
                    style="margin: 0 10px"
                  >
                    <a-select-option value="gt">{{ $t('大于等于') }}</a-select-option>
                    <a-select-option value="ge">{{ $t('大于') }}</a-select-option>
                  </a-select>
                  <a-input-number
                    v-model="setting.qualifiedTotalScore"
                    style="flex: 180px; width: 100%"
                    :min="1"
                    :max="100"
                  />
                  <span style="margin-left: 10px">{{ $t('分') }}</span>
                </div>
              </a-form-item>
              <a-form-item
                style="flex: 1"
                :labelCol="{ style: 'width: 160px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 87px); display: inline-block' }"
              >
                <div style="display: flex; align-items: center">
                  <span style="flex: 110px">{{ $t('单项得分') }}</span>
                  <a-select
                    v-decorator="['info[qualifiedSingle]', { initialValue: setting.qualifiedSingle }]"
                    style="margin: 0 10px"
                  >
                    <a-select-option value="gt">{{ $t('大于等于') }}</a-select-option>
                    <a-select-option value="ge">{{ $t('大于') }}</a-select-option>
                  </a-select>
                  <a-input-number
                    v-model="setting.qualifiedSingleScore"
                    style="flex: 180px; width: 100%"
                    :min="0"
                    :max="100"
                    class="inputClass"
                  />
                  <span style="margin-left: 10px">{{ $t('分') }}</span>
                </div>
              </a-form-item>
            </div>
          </a-form-item>
        </a-card>
        <a-alert v-if="tip" type="error" :message="tip" />
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('一票否决项') }}</h3>
        </a-space>
        <a-card>
          <a-form-item v-show="false">
            <a-input v-decorator="['info[itemsname_' + nowtime + ']', { initialValue: ' ' }]" />
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['info[itemstype_' + nowtime + ']', { initialValue: 1 }]" />
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['info[itemsscore_' + nowtime + ']', { initialValue: 0 }]" />
          </a-form-item>
          <div v-for="(item, index) in vetoinput" :key="index" :index="index">
            <div v-for="(items, indexs) in item.list" :key="indexs">
              <a-form-item
                :labelCol="{ style: 'width: 140px; display: inline-block' }"
                :wrapperCol="{ style: 'width: calc(100% - 210px); display: inline-block' }"
                :validateStatus="items.status"
                style="width: 100%"
                :label="$t('一票否决项') + `(${indexs + 1})`"
                :help="items.help"
                :required="true"
              >
                <div style="display: flex; width: 100%">
                  <a-input
                    :ref="'itemslistname_' + nowtime + '_' + (lasttime + indexs)"
                    v-model="items.name"
                    style="width: 100%"
                    @change="
                      (e) => {
                        inputChange('veto', e, index, indexs)
                      }
                    "
                  />
                  <div style="display: flex; margin-left: 50px">
                    <a-icon
                      :style="{ fontSize: ' 20px', lineHeight: '40px', color: '#52c41a' }"
                      type="plus-circle"
                      @click="addvetoinput(indexs)"
                    />
                    <a-icon
                      :style="{ fontSize: ' 20px', lineHeight: '40px', color: '#ff4d4f', marginLeft: '30px' }"
                      type="minus-circle"
                      @click="deletevetoinput(indexs)"
                    />
                  </div>
                </div>
              </a-form-item>
              <a-form-item v-show="false">
                <a-input
                  v-decorator="[
                    'info[itemslistscore_' + nowtime + '_' + (lasttime + indexs) + ']',
                    { initialValue: ' ' }
                  ]"
                />
              </a-form-item>
              <a-form-item v-show="false">
                <a-input
                  v-decorator="[
                    'info[itemslistremark_' + nowtime + '_' + (lasttime + indexs) + ']',
                    { initialValue: ' ' }
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </a-card>
        <a-space>
          <tag-icon class="tagIcon" />
          <h3 class="title">{{ $t('评分项') }}</h3>
        </a-space>
        <a-card>
          <a-row v-for="(item, index1) in scoring" :key="index1" type="flex" align="middle">
            <a-col :span="20">
              <a-card style="margin-top: 20px">
                <a-form-item v-show="false">
                  <a-input v-decorator="['info[itemstype_' + (lasttime + index1) + ']', { initialValue: 0 }]" />
                </a-form-item>
                <div style="display: flex">
                  <a-form-item
                    style="flex: 2"
                    labelAlign="right"
                    :labelCol="{ style: 'width: 85px; display: inline-block' }"
                    :wrapperCol="{ style: 'width: calc(100% - 134px); display: inline-block' }"
                    :validateStatus="item.status"
                    :help="item.help"
                    :required="true"
                  >
                    <span slot="label">{{ config.action === 'add' ? $t('分类名称 ') : $t('评分大类') }}</span>
                    <a-input
                      :ref="'itemsname_' + (lasttime + index1)"
                      v-model="item.name"
                      @change="
                        (e) => {
                          inputChange('bigname', e, index1)
                        }
                      "
                    />
                  </a-form-item>
                  <a-form-item
                    style="flex: 100px"
                    :labelCol="{ style: 'width: 100px; display: inline-block' }"
                    :wrapperCol="{ style: 'width: calc(100% - 180px); display: inline-block' }"
                    :required="true"
                  >
                    <span slot="label">{{ config.action === 'add' ? $t('总分 ') : $t('大类总分') }}</span>
                    <a-input
                      :ref="'itemsscore_' + (lasttime + index1)"
                      v-model="item.score"
                      :read-only="true"
                      class="input"
                    />
                  </a-form-item>
                </div>
                <div v-for="(value, option) in item.list" :key="option">
                  <div style="width: 100%">
                    <div style="display: flex; align-items: center">
                      <a-form-item
                        style="flex: 2"
                        :labelCol="{ style: 'width: 85px; display: inline-block' }"
                        :wrapperCol="{ style: 'width: calc(100% - 100px); display: inline-block' }"
                        labelAlign="right"
                        :validateStatus="value.namestatus"
                        :help="value.namehelp"
                        :required="true"
                      >
                        <span slot="label">{{ $t('评分项') }}</span>
                        <a-input
                          :ref="
                            'itemslistname_' + (lasttime + index1) + '_' + (lasttime + index1 + option + option + 2)
                          "
                          v-model="value.name"
                          @change="
                            (e) => {
                              inputChange('smallname', e, index1, option)
                            }
                          "
                        />
                      </a-form-item>
                      <a-form-item
                        style="flex: 100px"
                        :labelCol="{ style: 'width: 132px; display: inline-block' }"
                        :wrapperCol="{ style: 'width: calc(100% - 160px); display: inline-block' }"
                        :validateStatus="value.scorestatus"
                        :help="value.scorehelp"
                        :required="true"
                      >
                        <span slot="label">
                          {{ config.action === 'add' ? $t('分数设置 ') : $t('单项分值') }}
                        </span>
                        <a-input
                          :ref="
                            'itemslistscore_' + (lasttime + index1) + '_' + (lasttime + index1 + option + option + 2)
                          "
                          v-model="value.score"
                          placeholder="10|5|0"
                          @blur="getScore(index1, option, $event)"
                          @change="
                            (e) => {
                              inputChange('scoreSetting', e, index1, option)
                            }
                          "
                        />
                      </a-form-item>
                      <div>
                        <a-icon
                          :style="{ fontSize: ' 20px', color: '#52c41a' }"
                          type="plus-circle"
                          @click="addmarking(index1, option)"
                        />

                        <a-icon
                          :style="{ fontSize: ' 20px', color: '#ff4d4f', marginLeft: '10px' }"
                          type="minus-circle"
                          @click="deletemark(index1, option)"
                        />
                      </div>
                    </div>
                  </div>
                  <div style="display: flex">
                    <a-form-item
                      style="flex: 1"
                      :label="$t('细则备注')"
                      :labelCol="{ style: 'width: 85px; display: inline-block' }"
                      :wrapperCol="{ style: 'width: calc(100% - 163px); display: inline-block' }"
                      :validateStatus="value.remarkstatus"
                      :help="value.remarkhelp"
                      :required="true"
                    >
                      <a-textarea
                        :ref="
                          'itemslistremark_' + (lasttime + index1) + '_' + (lasttime + index1 + option + option + 2)
                        "
                        v-model="value.remark"
                        :auto-size="{ minRows: 1, maxRows: 5 }"
                        @change="
                          (e) => {
                            inputChange('remark', e, index1, option)
                          }
                        "
                      />
                    </a-form-item>
                  </div>
                </div>
              </a-card>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="1">
              <a-icon :style="{ fontSize: ' 20px', color: '#52c41a' }" type="plus-circle" @click="addscoring(index1)" />
            </a-col>
            <a-col :span="1">
              <a-icon
                :style="{ fontSize: ' 20px', color: '#ff4d4f' }"
                type="minus-circle"
                @click="deletescore(index1)"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-form>
      <div class="bbar">
        <a-button type="primary" html-type="submit" @click="handleSubmit">
          {{ config.action === 'edit' ? $t('修改') : $t('保存') }}
        </a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      config: {},
      loading: false,
      advanced: false,
      visibleread: false,
      visibleVetoCheck: [false, false, false, false, false, false, false, false, false, false],
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 }
      },
      score: 10,
      sum: 0,
      tip: '',
      sumstay: '',
      scoring: [{
        type: '0',
        name: '',
        score: '10',
        list: [{
          name: '',
          score: '10|5|0',
          remark: ''
        }]
      }],
      inputUser: [],
      colLayout: {},
      length: '',
      lasttime: '0',
      setting: {},
      showing: {},
      showingveto: {},
      nowtime: '',
      page: [],
      templateName: '',
      vetoinput: [{
        type: '0',
        name: '',
        score: '0',
        list: [{
          name: ''
        }]
      }]
    }
  },
  watch: {
    setting () {
      this.lasttime = new Date().getTime()
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.config = config
      for (const key in config) {
        this[key] = config[key]
      }
    },
    jsonFormat (dataset) {
      const data = dataset.scoringMajorItemsList
      const tableColumns = dataset.scoringMajorItemsList[0]
      let datajson = {}
      var jsonresult = []
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < tableColumns.length; j++) {
          datajson[tableColumns[j]] = data[i][j]
        }
        jsonresult.push(datajson)
        datajson = {}
      }
      return jsonresult
    },
    // 数据提交
    handleSubmit (value) {
      value.preventDefault()
      const table = this.$refs.table
      this.form.validateFields((err, values) => {
        const info = values.info
        info['qualifiedTotalScore'] = this.setting['qualifiedTotalScore']
        info['qualifiedSingleScore'] = this.setting['qualifiedSingleScore']
        delete this.$refs.table
        for (const i in this.$refs) {
          if (this.$refs[i] instanceof Array && this.$refs[i].length === 0) {
            delete this.$refs.i
          } else {
            values.info[i] = this.$refs[i]['0'].value
          }
        }
        this.$refs['table'] = table
        for (const i in this.vetoinput[0].list) {
          if (!this.vetoinput[0].list[i].name) {
            this.$set(this.vetoinput[0].list[i], 'status', 'error')
            this.$set(this.vetoinput[0].list[i], 'help', '请输入一票否决项')
          } else {
            this.$set(this.vetoinput[0].list[i], 'status', 'success')
            this.$set(this.vetoinput[0].list[i], 'help', '')
          }
        }
        for (const i in this.scoring) {
          if (!this.scoring[i].name) {
            this.$set(this.scoring[i], 'status', 'error')
            this.$set(this.scoring[i], 'help', '请输入分类名称')
          } else {
            this.$set(this.scoring[i], 'status', 'success')
            this.$set(this.scoring[i], 'help', '')
          }
          for (const j in this.scoring[i].list) {
            if (!this.scoring[i].list[j].name) {
              this.$set(this.scoring[i].list[j], 'namestatus', 'error')
              this.$set(this.scoring[i].list[j], 'namehelp', '请输入评分项')
            } else {
              this.$set(this.scoring[i].list[j], 'namestatus', 'success')
              this.$set(this.scoring[i].list[j], 'namehelp', '')
            }
            if (!this.scoring[i].list[j].score) {
              this.$set(this.scoring[i].list[j], 'scorestatus', 'error')
              this.$set(this.scoring[i].list[j], 'scorehelp', '请输入分数设置')
            } else {
              this.$set(this.scoring[i].list[j], 'scorestatus', 'success')
              this.$set(this.scoring[i].list[j], 'scorehelp', '')
            }
            if (!this.scoring[i].list[j].remark) {
              this.$set(this.scoring[i].list[j], 'remarkstatus', 'error')
              this.$set(this.scoring[i].list[j], 'remarkhelp', '请输入细则备注')
            } else {
              this.$set(this.scoring[i].list[j], 'remarkstatus', 'success')
              this.$set(this.scoring[i].list[j], 'remarkhelp', '')
            }
          }
        }
        for (const key in this.setting) {
          this.$set(this.setting, key, values.info[key])
        }
        const test = JSON.stringify(this.vetoinput)
        const test2 = JSON.stringify(this.scoring)
        const flag1 = test.indexOf('error') === -1
        const flag2 = test2.indexOf('error') === -1
        if (!flag1 || !flag2 || this.tip) {
          return false
        }
        if (!err) {
          const vetoItemList = []
          const scoringMajorItemsList = []
          this.vetoinput.forEach((items, indexs) => {
            items.list.forEach(item => {
              vetoItemList.push({
                veto: item.name,
                vetoDetail: item.name
              })
            })
          })
          this.setting['totalScore'] = 0
          this.scoring.forEach((items, indexs) => {
            this.setting['totalScore'] += parseInt(items.score)
            scoringMajorItemsList[indexs] = {}
            scoringMajorItemsList[indexs].majorDesc = ''
            scoringMajorItemsList[indexs].majorTotalScore = ''
            scoringMajorItemsList[indexs].scoringSubitemList = []
            scoringMajorItemsList[indexs].majorDesc = items.name
            scoringMajorItemsList[indexs].majorTotalScore = items.score
            items.list.forEach(item => {
              scoringMajorItemsList[indexs].scoringSubitemList.push({
                detailedRemarks: item.remark,
                scoreSettings: item.score.split('|'),
                scoringItem: item.name
              })
            })
          })
          const setting = JSON.stringify(Object.assign({ vetoItemList: vetoItemList }, { scoringMajorItemsList: scoringMajorItemsList }))
          const data = Object.assign(this.setting, { setting: setting })
          if (this.config.action === 'edit') {
            data.id = this.config.id
            this.axios({
              url: '/quality/template/edit',
              data: data
            }).then(res => {
              this.visible = false
              this.loading = false
              this.$message.success('修改成功')
              this.$emit('ok')
            })
          } else {
            this.axios({
              url: '/quality/template/add',
              data: data
            }).then((res) => {
              this.visible = false
              this.loading = false
              this.$message.success('添加成功')
              this.$emit('ok')
            })
          }
        }
      })
    },
    // 添加一票否定项
    addvetoinput (index) {
      this.color = 'red'
      this.vetoinput[0].list.splice(index + 1, 0, { name: '' })
    },
    // 删除一票否决项
    deletevetoinput (index) {
      if (this.vetoinput[0].list.length === 1) {
        return false
      } else {
        this.vetoinput[0].list.splice(index, 1)
      }
    },
    // 添加整个评分大类
    addscoring (index) {
      this.scoring.splice(index + 1, 0, {
        type: '1',
        name: '',
        score: '10',
        list: [{
          name: '',
          score: '10|5|0',
          remark: ''
        }]
      })
    },
    // 删除整个评分大类
    deletescore (index) {
      if (this.scoring.length === 1) {
        return false
      } else {
        this.scoring.splice(index, 1)
      }
    },
    // 添加单个评分项
    addmarking (index1, option) {
      this.scoring[index1].score = Number(this.scoring[index1].score) + 10
      this.scoring[index1].list.splice(option + 1, 0, {
        name: '',
        score: '10|5|0',
        remark: ''
      })
    },
    // 删除单个评分项
    deletemark (index1, option) {
      if (this.scoring[index1].list.length === 1) {
        return false
      } else {
        this.scoring[index1].score = this.scoring[index1].score - 10
        this.scoring[index1].list.splice(option, 1)
      }
    },
    // 总分变化
    getScore (index0, index, e) {
      this.scoring[index0].score = 0
      this.scoring[index0].list[index].score = e.target.value
      for (const j in this.scoring[index0].list) {
        const change = this.scoring[index0].list[j].score
        const test = change.split('|')
        this.scoring[index0].score = this.scoring[index0].score + Number(test[0])
      }
    },
    // 编辑时确认模板名称是否重复
    editcheck (e) {
      if (e.target.value === this.templateName) {
        this.tip = ''
      } else {
        this.checknamefun('', e.target.value)
      }
    },
    // 模板名称核对
    checknamefun (rule, value, callback) {
      return this.axios({
        url: '/quality/template/checkName',
        params: { templateName: value }
      }).then(res => {
        if (res.code === 0) {
          this.tip = ''
        } else {
          this.tip = this.$t(`模板名称不可用`)
        }
      })
    },
    // 输入时表单验证
    inputChange (type, e, index, indexs) {
      const value = e.target.value
      if (type === 'veto') {
        if (!value) {
          this.vetoinput[index].list[indexs].status = 'error'
          this.vetoinput[index].list[indexs].help = '请输入一票否决项'
        } else {
          this.vetoinput[index].list[indexs].status = 'success'
          this.vetoinput[index].list[indexs].help = ''
        }
      } else if (type === 'bigname') {
        if (!value) {
          this.scoring[index].status = 'error'
          this.scoring[index].help = '请输入分类名称'
        } else {
          this.scoring[index].status = 'success'
          this.scoring[index].help = ''
        }
      } else if (type === 'smallname') {
        if (!value) {
          this.scoring[index].list[indexs].namestatus = 'error'
          this.scoring[index].list[indexs].namehelp = '请输入评分项'
        } else {
          this.scoring[index].list[indexs].namestatus = 'success'
          this.scoring[index].list[indexs].namehelp = ''
        }
      } else if (type === 'scoreSetting') {
        if (!value) {
          this.scoring[index].list[indexs].scorestatus = 'error'
          this.scoring[index].list[indexs].scorehelp = '请输入分数设置'
        } else {
          this.scoring[index].list[indexs].scorestatus = 'success'
          this.scoring[index].list[indexs].scorehelp = ''
        }
      } else if (type === 'remark') {
        if (!value) {
          this.scoring[index].list[indexs].remarkstatus = 'error'
          this.scoring[index].list[indexs].remarkhelp = '请输入细则备注'
        } else {
          this.scoring[index].list[indexs].remarkstatus = 'success'
          this.scoring[index].list[indexs].remarkhelp = ''
        }
      }
    },
    // 一票否决项备注窗口弹出
    vetochange (e, index) {
      if (e.target.checked === false) {
        this.visibleVetoCheck.splice(index, 1, false)
      } else {
        this.visibleVetoCheck.splice(index, 1, true)
      }
      if (e.target.checked === true) {
        this.sum = 0
      } else {
        this.sum = this.sumstay
      }
    },
    // 关闭一票否决项备注窗口
    handleOk (e, value) {
      this.visibleVetoCheck.splice(value, 1, false)
    }
  }
}
</script>
<style scoped>
.active {
  color: #d1d1d1;
}
.tagIcon {
  font-size: 15px;
}
.title {
  margin-top: 5px;
}
.input {
  background-color: #f5f5f5;
}
</style>
