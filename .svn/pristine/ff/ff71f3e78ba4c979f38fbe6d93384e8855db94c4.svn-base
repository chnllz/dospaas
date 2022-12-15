<template>
  <a-card size="small" style="height: 100%" :bordered="false">
    <a-spin :spinning="loading">
      <a-form :form="form" layout="inline">
        <a-card size="small" :bordered="true">
          <div slot="title">
            <span style="color: rgba(0, 0, 0, 0.92); font-weight: 500; font-size: 15px">{{ $t('分配规则') }}</span>
            <a-popover placement="bottomLeft">
              <div slot="content" style="line-height: 2">
                <div>{{ $t('工单分配规则如下：') }}</div>
                <div>{{ $t('第一级：必要条件') }}</div>
                <div>{{ $t('1、客服是“在线”状态。') }}</div>
                <div>
                  {{
                    $t(
                      '2、客服属性中，{工单类型}、{工单来源}、站点覆盖范围（{主站点}+{其他站点}）的设置，能匹配待分配工单的{工单类型}、{工单来源}、{站点}。（支付渠道类工单，需满足的条件属性为{支付渠道工单类型}）'
                    )
                  }}
                </div>
                <div>{{ $t('3、客服当前待处理的工单数量，未超过{普通工单阈值}。（支付类工单为{支付工单阈值}）') }}</div>
                <div>{{ $t('第二级：优先级') }}</div>
                <div>
                  {{
                    $t(
                      '1、熟客优先。在指定的时间范围内（{确定为熟客的时长}），该客户（按照客户邮箱地址判断）有工单。则该客户是他最后一个工单的{责任客服}的熟客，该客户将优先分配给该{责任客服}。'
                    )
                  }}
                </div>
                <div>{{ $t('2、主站点优先。优先将工单分配给客户属性中{主站点}，与当前工单的{站点}匹配的客户。') }}</div>
                <div>{{ $t('第三级：分配方案') }}</div>
                <div>{{ $t('经过上述2级，筛选出来的可分配客服数量≥2时，执行分配方案。') }}</div>
                <div>
                  {{
                    $t(
                      '1、饱和度分配。饱和度=客服当前待处理工单数 / 客服的{普通工单阈值}，分配给饱和度最低的客服。如果存在2个以上饱和度相同的客服，则随机分配。'
                    )
                  }}
                </div>
                <div>{{ $t('2、最久未分配。分配给，可分配客服中，离当前时间最久未分配到工单的客服。') }}</div>
                <div>{{ $t('3、随机分配。随机分配给可分配客服中的任意一个。') }}</div>
              </div>
              <a-icon type="question-circle" />
            </a-popover>
          </div>
          <div>
            <a-divider orientation="left">
              <span style="font-size: 14px">{{ $t('优先级方案') }}</span>
            </a-divider>
            <a-row style="margin-top: 16px">
              <a-col :span="1"></a-col>
              <a-col :span="21">
                <draggable
                  v-model="info.prioritySchemes"
                  animation="200"
                  handle=".handle"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div
                    v-for="(element, key) in info.prioritySchemes"
                    :key="key"
                    class="list-item"
                    :gutter="8"
                    style="display: flex"
                  >
                    <span class="handle" style="display: inline-block; margin-top: 8px">
                      <a-icon type="drag" />
                    </span>
                    <a-form-item>
                      <a-checkbox
                        :value="element.rule"
                        :checked="element.isOpen"
                        @change="
                          (e) => {
                            element.isOpen = e.target.checked
                            if (e.target.value === '熟客优先') {
                              showTime = !showTime
                              duration = null
                            }
                          }
                        "
                      >
                        <span class="text" style="margin-right: 40px">
                          {{ element.rule || '--' }}
                        </span>
                      </a-checkbox>
                    </a-form-item>
                    <a-form-item v-if="element.rule === '熟客优先' && showTime">
                      <span slot="label">
                        {{ $t('确定为熟客的时长') }}
                        <a-tooltip placement="top">
                          <template slot="title">{{ $t('请输入1-60范围内的数字') }}</template>
                          <a-icon type="question-circle" />
                        </a-tooltip>
                      </span>
                      <div style="display: flex; align-items: center">
                        <a-input-number
                          v-decorator="[
                            'info[duration]',
                            {
                              initialValue: info.duration,
                              rules: [{ required: true, message: $t('熟客时长不能为空') }]
                            }
                          ]"
                          size="small"
                          :max="60"
                          :min="1"
                          @change="inputNumber"
                        />
                        <span style="white-space: nowrap; margin-left: 4px">{{ $t('天') }}</span>
                      </div>
                    </a-form-item>
                  </div>
                </draggable>
              </a-col>
            </a-row>
          </div>
          <div>
            <a-divider orientation="left">
              <span style="font-size: 14px">{{ $t('分配方案') }}</span>
            </a-divider>
            <a-row style="margin-top: 24px">
              <a-col :span="1"></a-col>
              <a-col :span="21">
                <a-radio-group v-model="info.assignPriority" @change="(e) => (info.assignPriority = e.target.value)">
                  <a-radio :style="radioStyle" value="饱和度分配">{{ $t('饱和度分配') }}</a-radio>
                  <a-radio :style="radioStyle" value="最久未分配">{{ $t('最久未分配') }}</a-radio>
                  <a-radio :style="radioStyle" value="随机分配">{{ $t('随机分配') }}</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
          </div>
        </a-card>
        <a-card size="small" :title="$t('回访频率规则')" style="margin-top: 8px">
          <a-form-item :label="$t('回访频率限制')">
            {{ $t('相同站点，相同邮箱，') }}
            <a-input-number
              v-decorator="[
                'returnVisitFrequency',
                {
                  initialValue: info.returnVisitFrequency || 30,
                  rules: [{ required: true, message: $t('回访频率限制不能为空') }]
                }
              ]"
              :min="10"
              :max="60"
            />
            {{ $t('天（含），不重复回访') }}
          </a-form-item>
        </a-card>
        <a-row style="margin-top: 16px">
          <a-col :span="1"></a-col>
          <a-col :span="21">
            <a-button type="primary" @click="handleSave">{{ $t('保存') }}</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  i18n: window.lang('crm'),
  components: {
    draggable: () => import('vuedraggable')
  },
  data () {
    return {
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      showTime: false,
      form: this.$form.createForm(this),
      loading: false,
      info: {
        assignPriority: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.getRules()
  },
  methods: {
    handleSave () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          const duration = values && values.info ? values.info.duration : this.info.duration
          this.loading = true
          this.axios({
            url: '/crm/workOrderRules/insertRules',
            data: {
              prioritySchemes: this.info.prioritySchemes,
              assignPriority: this.info.assignPriority,
              duration: duration,
              returnVisitFrequency: values.returnVisitFrequency
            }
          }).then(res => {
            this.loading = false
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    inputNumber (e) {
      if (e > 60) {
        this.$message.warning(this.$t('最大值为60'))
      }
      if (e < 1) {
        this.$message.warning(this.$t('最小值为1'))
      }
    },
    getRules () {
      this.loading = true
      this.axios({
        url: '/crm/workOrderRules/getRules'
      }).then(res => {
        this.loading = false
        this.info = res.result
        res.result.prioritySchemes.forEach(element => {
          if (element.rule === '熟客优先' && element.isOpen) {
            this.showTime = true
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list-item {
  padding: 0px 0;
  margin-bottom: -1px;
  background-color: #fff;
  // border: 1px solid rgba(0, 0, 0, .125);
}
.list-item[draggable='true'] {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-item .handle {
  margin-right: 5px;
  padding: 0 16px 0 0;
  cursor: move;
}
.list-item .text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list-item:first-child {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.list-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
</style>
