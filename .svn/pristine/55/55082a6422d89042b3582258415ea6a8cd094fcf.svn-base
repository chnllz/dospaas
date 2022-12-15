<template>
  <a-modal
    :title="config.title"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    :bodyStyle="{
      height: 'calc(100vh - 150px)',
      overflow: 'auto'
    }"
    centered
    @cancel="hadnleCancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-form-item :label="this.$t('分类')" required>
          <a-cascader
            v-decorator="[
              'info[parentId]',
              { initialValue: parentidArr, rules: [{ required: true, message: this.$t('请选择分类') }] }
            ]"
            :options="options"
            change-on-select
            :fieldNames="fieldNames"
            :placeholder="this.$t('请选择分类')"
          />
        </a-form-item>
        <a-form-item :label="this.$t('所属模块')" required>
          <a-select
            v-decorator="[
              'module',
              { initialValue: moduleValue, rules: [{ required: true, message: '请选择所属模块' }] }
            ]"
            show-search
            option-filter-prop="children"
            @search="handleSearch"
          >
            <a-select-option v-for="(item, index) in moduleOptions" :key="index" :value="item.fullDictDataNumber">
              {{ item.fullDictDataName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="this.$t('所属品牌')" required>
          <a-select
            v-decorator="[
              'brands',
              { initialValue: brandValue, rules: [{ required: true, message: '请选择所属品牌' }] }
            ]"
            show-search
            option-filter-prop="children"
            @search="handleSearch"
          >
            <a-select-option v-for="(item, index) in brandOptions" :key="index" :value="item.fullDictDataNumber">
              {{ item.fullDictDataName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="适配产品">
          <a-button @click="openProduct">
            <a-badge :status="adaptiveProduct.length > 0 ? 'success' : 'default'" />
            选择
          </a-button>
          <a-input v-show="false" v-decorator="['adaptiveProduct', { initialValue: adaptiveProduct.toString() }]" />
        </a-form-item>
        <a-form-item :label="this.$t('必读用户')">
          <a-button v-if="!mustReadPersons.length" size="small" style="margin-right: 10px" @click="handleUser">
            {{ $t('选择') }}
          </a-button>
          <a-card v-else size="small">
            <a-tag v-for="(userItem, userIndex) in mustReadPersons" :key="userIndex" style="margin-bottom: 5px">
              <a-icon v-if="userItem.type === 'user'" type="user" />
              <a-icon v-else-if="userItem.type === 'depart'" type="apartment" />
              <a-icon v-else type="team" />
              {{ userItem.name }}
            </a-tag>
            <a style="position: absolute; top: 0px; right: 3px" @click="handleUser">{{ $t('修改') }}</a>
          </a-card>
        </a-form-item>
        <a-form-item>
          <span slot="label">
            {{ $t('标签') }}
            <a-tooltip>
              <div slot="title">
                <div>1. {{ $t('单个标签最长长度不能超过20个字，超过部分将会被自动截取。') }}</div>
                <div>2. {{ $t('1条知识的标签总内容不能超过255个字，超过将无法保存') }}</div>
              </div>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-select
            v-decorator="['info[label]', { initialValue: label, rules: [{ validator: checkTag }] }]"
            show-search
            mode="tags"
            :placeholder="$t('请输入标签，多个标签以英文逗号分开')"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @select="getSelect"
            @blur="getSelectBlur"
          >
            <a-select-option v-for="(item, index) in data" :key="index" :value="item.label">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('生效时间')" required>
          <a-date-picker
            v-decorator="[
              'info[effectStartTime]',
              {
                initialValue:
                  Number(article.effectType) !== 1 && article.effectStartTime ? moment(article.effectStartTime) : null,
                rules: [{ required: !startTime, message: $t('请选择生效时间') }]
              }
            ]"
            :placeholder="startTime ? '' : $t('请选择日期')"
            format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
            style="width: 50%"
            :disabled="startTime"
            :disabledDate="disabledDate"
          />
          <a-checkbox
            style="margin-left: 10px"
            :checked="startTime"
            @change="
              (e) => {
                startTime = e.target.checked
                form.setFieldsValue({
                  'info[effectStartTime]': null
                })
              }
            "
          >
            {{ $t('审核通过后立即生效') }}
          </a-checkbox>
        </a-form-item>
        <a-form-item :label="$t('失效时间')" required>
          <a-date-picker
            v-decorator="[
              'info[effectEndTime]',
              {
                initialValue:
                  Number(article.effectForever) !== 1 && article.effectEndTime ? moment(article.effectEndTime) : null,
                rules: [{ required: !endTime, message: $t('请选择失效时间') }]
              }
            ]"
            :placeholder="endTime ? '' : $t('请选择日期')"
            format="YYYY-MM-DD HH:mm:ss"
            :show-time="{ defaultValue: moment('23:59:59', 'HH:mm:ss') }"
            style="width: 50%"
            :disabled="endTime"
            :disabledDate="handleDisabledDate"
          />
          <a-checkbox
            style="margin-left: 10px"
            :checked="endTime"
            @change="
              (e) => {
                endTime = e.target.checked
                form.setFieldsValue({
                  'info[effectEndTime]': null
                })
              }
            "
          >
            {{ $t('永久生效') }}
          </a-checkbox>
        </a-form-item>
        <a-form-item required>
          <span slot="label">
            {{ $t('标题') }}
            <a-tooltip>
              <div slot="title">
                <div>{{ $t('标题长度范围：1~200个字符。') }}</div>
              </div>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'info[title]',
              {
                initialValue: article.title,
                rules: [
                  { required: true, message: $t('请输入标题') },
                  {
                    validator: (rule, value, callback) => {
                      if (!value) {
                        callback()
                        return
                      }
                      validateText(rule, value, callback, { min: 1, max: 200 })
                    }
                  }
                ]
              }
            ]"
            :placeholder="$t('请输入标题')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('内容')"
          :required="true"
          validateStatus="error"
          :help="!textContent ? $t('请输入内容') : ''"
        >
          <tiny-mce
            v-if="tinyVisible"
            ref="tinyMce"
            v-model="article.content"
            :newOptions="{ height: 300 }"
            @change="
              (e) => {
                textContent = e
              }
            "
          />
        </a-form-item>
      </a-form>
      <inform-visit ref="informVisit" @func="getData" />
    </a-spin>
    <div slot="footer">
      <a-button type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
      <a-button @click="hadnleCancel">{{ $t('关闭') }}</a-button>
    </div>
    <select-product ref="selectProduct" :key="productKey" :product="product" @ok="getProducts" />
  </a-modal>
</template>
<script>
export default {
  i18n: window.lang('knowledge'),
  components: {
    TinyMce: () => import('@/components/Editor/TinyMce'),
    InformVisit: () => import('@/views/admin/notice/InformVisit'),
    SelectProduct: () => import('./SelectProduct')
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    treeId: {
      type: Array,
      default: () => { }
    }
  },
  data () {
    return {
      config: {},
      title: '',
      article: {},
      replaceFields: {
        key: 'value',
        title: 'name'
      },
      parentidArr: [],
      mustReadPersons: '',
      treeExpand: false,
      adUser: [],
      product: [],
      adaptiveProduct: [],
      adaptiveUser: [],
      articleId: null,
      tinyVisible: false,
      loading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
      visible: false,
      visibleAddress: false,
      form: this.$form.createForm(this),
      options: [],
      data: [],
      label: [],
      startTime: false,
      endTime: false,
      fieldNames: {
        label: 'categoryName',
        value: 'id',
        children: 'children'
      },
      mustRead: false,
      textContent: '',
      moduleOptions: [],
      moduleValue: '',
      brandValue: '',
      brandOptions: [],
      productKey: 'productKey',
      adaptive_product: []
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.loading = true
      this.config = JSON.parse(JSON.stringify(config))
      if (config.action === 'add') {
        this.parentidArr = this.treeId
      }
      this.axios({
        url: '/admin/dict/initData',
        data: {
          dictCategoryNumber: 'zhiShiKuMoKuai'
        }
      }).then(res => {
        if (res.code === 0) {
          this.moduleOptions = res.result
        }
      })
      this.axios({
        url: '/admin/dict/initData',
        data: {
          dictCategoryNumber: 'pinPai'
        }
      }).then(res => {
        if (res.code === 0) {
          this.brandOptions = res.result
        }
      })
      this.axios({
        url: '/knowledge/index/getAddSetting'
      }).then(res => {
        if (!res.code) {
          this.options = res.result.categoryTree
          this.product = res.result.productsTree
          this.product.forEach(item => {
            item.value = 'cppl###' + item.value
            if (item.children) {
              item.children.forEach(itemCplb => {
                itemCplb.value = 'cplb###' + itemCplb.value
                if (itemCplb.children) {
                  itemCplb.children.forEach(itemCpxh => {
                    itemCpxh.value = 'cpxh###' + itemCpxh.value
                  })
                }
              })
            }
          })
          this.adUser = res.result.userOption
          if (config.action === 'edit') {
            this.title = config.title
            this.article = config.detail.article
            if (this.article.label.length > 0) {
              // 如果只有一个label,split会报错
              if (this.article.label.indexOf(',') >= 0) {
                this.label = this.article.label.split(',')
              } else {
                this.label = this.article.label
              }
            } else {
              this.label = undefined
            }
            this.moduleValue = config.detail.article.module
            this.brandValue = config.detail.article.brands
            const adaptiveProduct = config.detail.article.adaptiveProduct ? config.detail.article.adaptiveProduct.split(',') : []
            const adaptiveProductList = []
            adaptiveProduct.forEach(item => {
              this.product.forEach(itemCppl => {
                if (itemCppl.value.indexOf(item) > -1) {
                  adaptiveProductList.push(itemCppl.value)
                } else {
                  if (itemCppl.children) {
                    itemCppl.children.forEach(itemCplb => {
                      if (itemCplb.value.indexOf(item) > -1) {
                        adaptiveProductList.push(itemCplb.value)
                      } else {
                        if (itemCplb.children) {
                          itemCplb.children.forEach(itemCpXh => {
                            if (itemCpXh.value.indexOf(item) > -1) {
                              adaptiveProductList.push(itemCpXh.value)
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            })
            this.adaptiveProduct = adaptiveProductList
            this.adaptiveUser = config.detail.article.adaptiveUser ? config.detail.article.adaptiveUser.split(',') : []
            var arr = config.detail.article.categoryIdCollection ? config.detail.article.categoryIdCollection.split(',') : []
            this.endTime = Number(this.article.effectForever) === 1
            this.startTime = Number(this.article.effectType) === 1
            arr = arr.map(item => parseInt(item))
            this.parentidArr = arr
            this.articleId = config.detail.article.id
            this.mustReadPersons = config.detail.article.selectUser || []
          }
        }
        this.loading = false
      })
      this.$nextTick(() => {
        this.tinyVisible = true
      })
    },
    // 添加一个算字符长度的校验器
    validateText (rule, value, callback, { min = 0, max = 100000000 }) {
      // 将一个全角字符替换成两个半角字符，以得到真实长度。
      const realLength = value.replace(/[\u0391-\uFFE5]/g, 'aa').length
      if (realLength <= max && realLength >= min || !value) {
        callback()
      } else if (max < 100000000) {
        callback(new Error(`标题长度范围：${min}~${max}个字符`))
      } else {
        callback(new Error('至少应输入' + min + '个字符！'))
      }
      // return realLength <= max && realLength >= min || !value ? callback() : max < 100000000 ? callback(`标题长度范围：${min}~${max}个字符`) : callback('至少应输入' + min + '个字符！')
    },
    onCheck (checkedKeys) {
      this.adaptiveProduct = checkedKeys.checked
    },
    // 生效时间不可选
    disabledDate (current) {
      return current && current < this.moment().startOf('day')
    },
    // 获取必读用户
    getData (privData) {
      this.mustReadPersons = privData
    },
    // 选择必读用户
    handleUser () {
      const userData = JSON.parse(JSON.stringify(this.mustReadPersons))
      this.$refs.informVisit.show({
        title: this.$t('选择必读用户'),
        record: userData
      })
    },
    // 添加适配产品
    getProducts (val) {
      this.adaptiveProduct = val
      const obj = {}
      obj.adaptiveProduct = val.toString()
      this.form.setFieldsValue(obj)
      this.visibleAddress = false
    },
    openProduct () {
      this.productKey = this.productKey === 'productKey' ? 'productKey_1' : 'productKey'
      this.$nextTick(() => {
        this.$refs.selectProduct.show({
          adaptiveProduct: this.adaptiveProduct
        })
      })
      this.$set(this, 'visibleAddress', true)
    },
    // 一次输入带英文逗号时，拆分标签
    getSelect (value, option) {
      let arr = value ? value.split(',') : []
      arr = arr.filter(item => item)
      let oldArr = this.form.getFieldsValue().info.label
      if (Array.isArray(oldArr) && typeof oldArr !== 'undefined') {
        oldArr = oldArr.filter(item => !item.includes(','))
      }
      arr = [...oldArr, ...arr]
      arr = Array.from(new Set(arr))
      this.form.setFieldsValue({
        'info[label]': arr
      })
    },
    getSelectBlur (value) {
      const arrStr = value ? value.join(',') : ''
      let arr = arrStr.split(',') || []
      arr = arr.filter(item => item)
      arr = Array.from(new Set(arr))
      this.form.setFieldsValue({
        'info[label]': arr
      })
    },
    // 验证单个标签长度是否大于20
    checkTag (rule, value, callback) {
      if (value) {
        const key = value.some(item => item.length > 20)
        const string = '每个标签长度不能大于 20'
        key ? callback(string) : callback()
      } else {
        callback()
      }
    },
    // 远程搜索标签
    handleSearch (value) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.axios({
          url: '/knowledge/index/getListLabel',
          data: { fieldvalue: value }
        }).then(res => {
          this.data = res.result.data || []
        })
      }, 300)
    },
    hadnleCancel () {
      this.visible = !this.visible
    },
    // 不可选失效时间
    handleDisabledDate (current) {
      const { getFieldValue } = this.form
      let time = getFieldValue('info[effectStartTime]')
      if (this.startTime) {
        time = this.moment().endOf('day')
      }
      return current < this.moment(time).endOf('day')
    },
    // 数据提交
    handleSubmit () {
      let oldArr = this.form.getFieldsValue().info.label
      if (!Array.isArray(oldArr) && typeof oldArr !== 'undefined') {
        oldArr = new Array(oldArr)
        this.form.setFieldsValue({
          'info[label]': oldArr
        })
      }
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (this.endTime) {
            values.info.effectForever = '1'
            values.info.effectEndTime = ''
          } else {
            // 判断失效时间是否小于或等于生效时间
            if (this.moment(values.info.effectEndTime).isBefore(values.info.effectStartTime)) {
              this.$message.warning('失效时间不能小于或等于生效时间，请重新确认')
              return false
            }
            values.info.effectEndTime = values.info.effectEndTime.format('YYYY-MM-DD HH:mm:ss')
          }
          if (this.startTime) {
            values.info.effectType = '1'
            values.info.effectStartTime = ''
          } else {
            values.info.effectStartTime = values.info.effectStartTime.format('YYYY-MM-DD HH:mm:ss')
          }
          values.info.adaptiveUser = values.info.adaptiveUser ? values.info.adaptiveUser.toString() : ''
          const adaptiveProduct = JSON.parse(JSON.stringify(this.adaptiveProduct))
          const adaptiveProductList = []
          if (adaptiveProduct.length > 0) {
            adaptiveProduct.forEach(item => {
              adaptiveProductList.push(item.split('###')[1])
            })
            values.adaptiveProduct = adaptiveProductList
          } else {
            values.adaptiveProduct = []
          }
          if (values.info.label && values.info.label.length > 0) {
            values.info.label = values.info.label.filter(item => { return item && item.trim() })
            values.info.label = values.info.label.join(',')
          } else {
            values.info.label = ''
          }
          values.info.mustRead = this.mustReadPersons.length > 0 ? '1' : '0'
          if (values.info.mustRead === '1') {
            if (this.mustReadPersons.length === 0) {
              this.$message.warning('至少添加一个必读用户')
              return false
            }
          }
          values.info.mustReadPersons = this.mustReadPersons || null
          if (!this.textContent) {
            return false
          }
          values.info.content = this.textContent
          this.loading = true
          if (this.config.action === 'edit') {
            this.axios({
              url: '/knowledge/index/edit',
              data: Object.assign(values, { articleId: this.articleId })
            }).then(res => {
              if (!res.code) {
                this.visible = false
                this.loading = false
                this.$emit('ok')
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.axios({
              url: '/knowledge/index/add',
              data: Object.assign(values)
            }).then(res => {
              if (!res.code) {
                this.visible = false
                this.loading = false
                this.$emit('ok')
              } else {
                this.$message.error(res.message)
              }
            })
          }
        } else {
          this.$message.warning(this.$t('表单填写不符合要求，请参考页面内具体提示修改'))
        }
      })
    }
  }
}
</script>
