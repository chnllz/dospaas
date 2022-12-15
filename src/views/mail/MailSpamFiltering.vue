<template>
  <a-modal
    :title="$t('垃圾邮件过滤规则')"
    :width="1200"
    :closable="true"
    :visible="visible"
    :bodyStyle="{ height: '500px', overflowY: 'auto' }"
    @cancel="visible = !visible"
  >
    <a-spin :spinning="loading">
      <a-space style="margin-bottom: 16px">
        <a-button icon="plus" type="primary" @click="addData()">{{ $t('添加') }}</a-button>
      </a-space>
      <a-form :form="form">
        <a-row
          v-for="(item, index) in data"
          v-show="data.length !== 0"
          :key="index"
          type="flex"
          align="middle"
          :gutter="[0, 32]"
        >
          <a-col :span="22">
            <a-form-item :wrapper-col="{ span: 24 }">
              <a-row type="flex" align="middle" :gutter="10" style="border: 1px solid #e8e8e8">
                <a-col :span="21">
                  <div>
                    <a-row
                      v-for="(simpleItem, simpleIndex) in item.simpleCondition"
                      :key="simpleIndex"
                      type="flex"
                      align="middle"
                      :gutter="[8, 16]"
                    >
                      <a-col :span="4">
                        <a-select
                          v-model="simpleItem.field"
                          show-search
                          :allowClear="true"
                          option-filter-prop="children"
                        >
                          <a-select-option
                            v-for="(fieldItem, fieldIndex) in fieldArr"
                            :key="fieldIndex"
                            :value="fieldItem.alias"
                          >
                            {{ fieldItem.name }}
                          </a-select-option>
                        </a-select>
                      </a-col>
                      <a-col :span="18">
                        <a-row type="flex" align="middle">
                          <a-col :span="21">
                            <a-row
                              v-for="(includeItem, includeIndex) in simpleItem.condition"
                              :key="includeIndex"
                              type="flex"
                              align="middle"
                              :gutter="10"
                            >
                              <a-col :span="6">
                                <a-select
                                  v-model="includeItem.include"
                                  :dropdownMatchSelectWidth="false"
                                  @change="
                                    (value) => {
                                      choiceInclude(value, includeItem)
                                    }
                                  "
                                >
                                  <a-select-option
                                    v-for="(crItem, crIndex) in conditionArr"
                                    :key="crIndex"
                                    option-filter-prop="children"
                                    :value="crItem.value"
                                  >
                                    {{ crItem.label }}
                                  </a-select-option>
                                </a-select>
                              </a-col>
                              <a-col :span="15">
                                <a-input v-model="includeItem.value" />
                              </a-col>
                              <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
                                <a-icon
                                  :style="{ fontSize: '24px', color: '#52c41a' }"
                                  type="plus-square"
                                  theme="filled"
                                  @click="
                                    simpleItem.condition.splice(includeIndex + 1, 0, {
                                      include: '',
                                      value: undefined
                                    })
                                  "
                                />
                                <a-icon
                                  :style="{
                                    fontSize: '24px',
                                    color: simpleItem.condition.length === 1 ? '#bfbfbf' : '#ff4d4f',
                                    'padding-left': '8px'
                                  }"
                                  type="minus-square"
                                  theme="filled"
                                  @click="deleteCondition(index, simpleIndex, includeIndex)"
                                />
                              </a-col>
                            </a-row>
                          </a-col>
                          <a-col flex="auto">
                            <a-select v-model="simpleItem.logic" style="width: 100%">
                              <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                              <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                            </a-select>
                          </a-col>
                        </a-row>
                      </a-col>
                      <a-col
                        flex="auto"
                        style="display: flex; align-items: center; justify-content: center; padding-right: 0px"
                      >
                        <a-icon
                          :style="{ fontSize: '24px', color: '#52c41a' }"
                          type="plus-square"
                          theme="filled"
                          @click="
                            item.simpleCondition.splice(simpleIndex + 1, 0, {
                              condition: [
                                {
                                  include: '',
                                  value: ''
                                }
                              ],
                              logic: 'and'
                            })
                          "
                        />
                        <a-icon
                          :style="{
                            fontSize: '24px',
                            color: item.simpleCondition.length === 1 ? '#bfbfbf' : '#ff4d4f',
                            'padding-left': '8px'
                          }"
                          type="minus-square"
                          theme="filled"
                          @click="
                            item.simpleCondition.length === 1 ? '' : data[index].simpleCondition.splice(simpleIndex, 1)
                          "
                        />
                      </a-col>
                    </a-row>
                  </div>
                </a-col>
                <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
                  <a-select v-model="item.logic" style="width: 100%">
                    <a-select-option value="and">{{ $t('且(and)') }}</a-select-option>
                    <a-select-option value="or">{{ $t('或(or)') }}</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
            <a-icon
              :style="{ fontSize: '24px', color: '#52c41a', 'padding-left': '10px' }"
              type="plus-square"
              theme="filled"
              @click.stop="addData(index, 'true')"
            />
            <a-icon
              :style="{ fontSize: '24px', color: '#ff4d4f', 'padding-left': '10px' }"
              type="minus-square"
              theme="filled"
              @click.stop="handleDelete(index)"
            />
          </a-col>
        </a-row>
        <div v-show="data.length === 0">
          <a-empty />
        </div>
      </a-form>
    </a-spin>
    <div slot="footer" class="bbar">
      <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="visible = !visible">
        {{ $t('关闭') }}
      </a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('admin'),
  components: {
    AddressSelect: () => import('@/views/admin/Field/AddressSelect'),
    TabsSelect: () => import('@/views/admin/Field/TabsSelect')
  },
  data () {
    return {
      config: {},
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      // 搜索条件
      data: [],
      fieldArr: [{
        alias: 'sender',
        name: '发件人'
      }, {
        alias: 'domain',
        name: '发件域'
      }, {
        alias: 'receiver',
        name: '收件人'
      }, {
        alias: 'title',
        name: '邮件主题'
      }],
      conditionArr: [{
        label: '包含',
        value: 'cn'
      }, {
        label: '不包含',
        value: 'nc'
      }]
    }
  },
  methods: {
    show (config) {
      this.config = config
      this.loading = true
      this.visible = true
      this.axios({
        url: '/mail/account/editMailFilterRules',
        data: {
          action: 'get',
          type: 'mailFilterRules'
        }
      }).then(res => {
        this.loading = false
        this.data = res.result || []
      })
    },
    addData (index, type) {
      const arr = {
        logic: 'and',
        simpleCondition: [{
          condition: [{
            include: '',
            value: ''
          }],
          logic: 'and'
        }]
      }
      if (type) {
        this.data.splice(index + 1, 0, arr)
      } else {
        this.data.splice(this.data.length, 0, arr)
      }
    },
    handleDelete (index) {
      this.data.splice(index, 1)
    },
    deleteCondition (index, simpleIndex, includeIndex) {
      if (this.data[index].simpleCondition[simpleIndex].condition.length === 1) {
        return false
      } else {
        this.data[index].simpleCondition[simpleIndex].condition.splice(includeIndex, 1)
        this.data = JSON.parse(JSON.stringify(this.data))
      }
    },
    deleteSimpleCondition (index, simpleIndex) {
      this.data[index].simpleCondition.splice(simpleIndex, 1)
      this.data = JSON.parse(JSON.stringify(this.data))
    },
    // 搜索
    handleSubmit () {
      this.loading = true
      this.axios({
        url: '/mail/account/editMailFilterRules',
        data: {
          action: 'submit',
          type: 'mailFilterRules',
          mailConditions: this.data
        }
      }).then(res => {
        this.loading = false
        if (!res.code) {
          this.$message.success(res.message)
          this.visible = false
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>
