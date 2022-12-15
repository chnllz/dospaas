<template>
  <div id="ant-design-tag-select" @click="changeStatus">
    <!-- <a-popover v-model="selectshow" trigger="click" placement="bottomLeft" @click.stop="changeStatus"> -->
    <a-form-item>
      <a-select
        ref="tagSelect"
        v-decorator="[name, { initialValue: contents || undefined, rules: [{ required: required, message: message }] }]"
        :allowClear="allowClear"
        :placeholder="placeholder"
        :open="false"
        :mode="multiple ? 'multiple' : 'default'"
        style="cursor: pointer; margin-top: 4px"
        class="tagCategory"
        :dropdownMatchSelectWidth="true"
        :disabled="disabled"
        @change="onChange"
        @deselect="delSelect"
      >
        <!-- :disabled="pageType !== 'search'" -->
        <a-select-option v-for="node in selectTagList" :key="node.value" style="width: 100%" :disabled="true">
          <div class="tagColor">
            <span class="tagStyle" :class="node.tagType === 0 ? 'tagBlue' : 'tagRed'">{{ node.label }}</span>
          </div>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-popover v-model="selectshow" trigger="click" placement="bottomLeft" @click.stop="changeStatus">
      <div slot="content" style="width: 500px; max-height: 500px; overflow-y: auto; overflow-x: hidden; padding: 0 4px">
        <a-spin :spinning="loading">
          <!-- 搜索区 -->
          <a-row type="flex" :gutter="8" align="middle" class="search_box">
            <a-col :span="8" style="max-height: 28px">
              <a-select
                v-model="searchObj.tagCategory"
                class="tagCategorySearch"
                mode="multiple"
                style="width: 100%"
                :placeholder="$t('分类搜索')"
                @change="searchTagCategory"
              >
                <a-select-option v-for="(item, index) in tagCategoryList" :key="index" :value="item.tagCategoryNumber">
                  {{ item.tagCategoryName }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="15">
              <a-input-search
                v-model="searchObj.tagName"
                :placeholder="$t('请输入标签名称搜索')"
                allowClear
                @search="tagdataRefresh"
              />
            </a-col>
            <a-col :span="1">
              <a-popover placement="right">
                <template slot="content">
                  <div style="margin-bottom: 8px" class="tagColor">
                    <span class="tagStyle tagBlue">{{ $t('手动标签') }}</span>
                    <span>为手动标签</span>
                  </div>
                  <div class="tagColor">
                    <span class="tagStyle tagRed">{{ $t('自动标签') }}</span>
                    <span>为自动标签</span>
                  </div>
                </template>
                <a-icon type="question-circle" />
              </a-popover>
            </a-col>
          </a-row>
          <!-- 已选标签区 -->
          <div
            size="small"
            style="
              padding: 12px 12px 8px 12px;
              border: 1px dashed #e8e8e8;
              margin: 8px 0;
              max-height: 98px;
              overflow-y: auto;
            "
            @mouseenter="delShow = true"
            @mouseleave="delShow = false"
          >
            <a-row v-if="tagList.length" class="selectTagArea">
              <a-col :span="23">
                <div v-if="contents && contents.length > 0" class="tagColor">
                  <a-tag
                    v-for="item in selectTagList"
                    :key="item.value"
                    class="tagClose"
                    style="margin-bottom: 4px"
                    :class="item.tagType === 0 ? 'tagBlue' : ''"
                    :color="item.tagType === 0 ? 'blue' : 'red'"
                    :closable="pageType === 'search' || item.tagType === 0 ? true : false"
                    @close="() => closeTab(item)"
                  >
                    <div slot="closeIcon">
                      <a-icon type="question-circle" />
                    </div>
                    {{ item.label }}
                  </a-tag>
                </div>
                <div v-else style="color: #7f7f7f; margin-bottom: 4px">{{ $t('未选中标签') }}</div>
              </a-col>
              <a-col :span="1" style="text-align: right">
                <a-icon v-if="delShow && selectTagList.length" type="delete" class="delIcon" @click="handleDel" />
              </a-col>
            </a-row>
          </div>
          <!-- 分类 标签区 -->
          <a-spin :spinning="loadingTag">
            <template v-if="tagList.length">
              <div v-for="item in tagList" :key="item.id">
                <span style="font-size: 15px">
                  {{ item.label }} ({{ item.selectType === 0 ? $t('单选') : $t('多选') }})
                </span>
                <a-card
                  v-if="item.children.length"
                  size="small"
                  :bordered="false"
                  class="tagColor"
                  :bodyStyle="{ padding: '4px', display: 'flex', 'flex-flow': 'row wrap' }"
                >
                  <!-- tagType  0-手动标签 1-自动标签 -->
                  <span
                    v-for="(childItem, childIndex) in item.children"
                    :key="childIndex"
                    :style="{
                      cursor: item.tagType === 1 && pageType !== 'search' ? 'no-drop' : 'pointer'
                    }"
                    class="tagStyle"
                    :class="
                      item.tagType === 1 && pageType !== 'search' && value.includes(item.value)
                        ? 'tagRed'
                        : (selectTagList.every((item) => item.label !== childItem.label) &&
                            item.singleIndex !== childIndex) ||
                          contents.length === 0 //&& item.selectType === 1
                        ? 'tagGray'
                        : item.singleIndex === childIndex && item.tagType === 0
                        ? 'tagBlue'
                        : item.tagType === 1 // item.singleIndex !== childIndex &&
                        ? 'tagRed'
                        : 'tagBlue'
                    "
                    @click="addTag(childItem, item, childIndex)"
                  >
                    {{ childItem.label }}
                  </span>
                </a-card>
              </div>
            </template>
            <a-empty v-else />
          </a-spin>
        </a-spin>
      </div>
    </a-popover>
  </div>
</template>

<script>
export default {
  props: {
    allowClear: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    pageType: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => 'contents'
    },
    required: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => { }
    },
    value: {
      type: Array,
      default: () => []
    },
    tagDeafultData: {
      type: Array,
      default: () => []
    },
    rnumber: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectshow: false,
      loading: false,
      loadingTag: false,
      contents: undefined,
      searchObj: {},
      tagCategoryList: [],
      delShow: false,
      tagList: [],
      parameter: {},
      selectTagList: [],
      isSearch: false
    }
  },
  watch: {
    name (newVal) {
      this.contents = undefined
      this.selectTagList = []
    },
    tagDeafultData: {
      handler (newVal) {
        if (newVal && newVal.length && this.value && this.value.length > 0) {
          this.selectTagList = newVal.map(item => {
            const obj = {}
            obj.value = item.number
            obj.label = item.name
            obj.tagType = item.tagType
            return obj
          })
        } else {
          this.selectTagList = []
        }
      },
      immediate: true
    },
    value: {
      handler (newVal) {
        if (newVal) {
          this.contents = newVal
        }
      }
    }
  },
  created () {
    if (this.value && this.value.length) {
      this.contents = this.value
      this.selectTagList = this.tagDeafultData.map(item => {
        const obj = {}
        obj.value = item.number
        obj.label = item.name
        obj.tagType = item.tagType
        return obj
      })
    } else {
      this.contents = undefined
    }
  },
  mounted () {
    // 多选模式下，禁止输入框聚焦
    if (this.multiple) {
      const tagSelect = document.getElementById('ant-design-tag-select')
      const selectInput = tagSelect.getElementsByClassName('ant-select-search__field')
      selectInput && selectInput[0].setAttribute('readonly', 'true')
    }
  },
  methods: {
    searchTagCategory (e) {
      this.loadingTag = true
      this.isSearch = true
      this.tagdataRefresh()
    },
    changeStatus () {
      if (this.disabled) {
        this.selectshow = false
      } else {
        this.selectshow = true
      }
      this.searchObj = {}
      this.parameter = {
        pageNo: 1,
        pageSize: 999,
        sortField: 'id',
        sortOrder: 'descend',
        tagCategoryNumber: this.rnumber
      }
      if (this.tagCategoryList.length === 0) {
        this.getCategory()
      }
      if (this.tagList.length === 0) {
        this.getTagOption()
      }
    },
    // 获取分类
    getCategory () {
      this.loading = true
      this.axios({
        url: '/admin/tag/categoryInit',
        data: this.parameter
      }).then(res => {
        this.loadingTag = this.loading = false
        this.tagCategoryList = res.result.data
      })
    },
    // 获取标签
    getTagOption () {
      this.axios({
        url: '/admin/tag/tagOption',
        data: this.parameter
      }).then(res => {
        if (res.result?.option) {
          if (this.searchObj?.tagName) {
            this.tagList = res.result.option.filter(item => item.children.length > 0)
          } else {
            this.tagList = res.result.option
          }
          this.tagList.forEach(item => {
            item.singleIndex = -1
            item.children.forEach((subItem, subIndex) => {
              if (this.contents?.length) {
                this.contents.forEach(contentItem => {
                  if (contentItem === subItem.value) {
                    item.singleIndex = subIndex
                  }
                })
              }
            })
          })
        }
        this.delShow = true
        this.loadingTag = this.loading = false
        if (this.value?.length && this.contents?.length && !this.isSearch) {
          // 初始化是否有值 有值显示选中值
          this.selectTagList = []
          this.tagList.forEach(item => {
            item.children.forEach(subItem => {
              if (this.value.includes(subItem.value)) {
                this.selectTagList.push({
                  label: subItem.label,
                  value: subItem.value,
                  tagType: item.tagType,
                  selectType: item.selectType,
                  categoryLabel: item.label
                })
              }
            })
          })
        }
      })
    },
    tagdataRefresh () {
      this.parameter = {
        pageNo: 1,
        pageSize: 999,
        sortField: 'id',
        sortOrder: 'descend',
        tagName: this.searchObj.tagName,
        tagCategoryNumber: this.searchObj?.tagCategory?.length ? this.searchObj.tagCategory : this.rnumber
      }
      this.isSearch = true
      this.getTagOption()
    },
    handleDel () {
      this.tagList.forEach(item => {
        item.singleIndex = -1
      })
      this.selectTagList = this.selectTagList.filter(subItem => subItem.tagType === 1)
      if (this.pageType === 'search') {
        this.selectTagList = []
      }
      this.contents = this.selectTagList.map(item => item.value)
      this.$emit('select', this.contents)
    },
    addTag (option, item, optionIndex) {
      // selectType  0-单选 1-多选      tagType  0-手动标签 1-自动标签
      if (this.pageType === 'search' || item.tagType === 0) {
        const isExit = this.selectTagList.every(item => item.value !== option.value)
        if (isExit) {
          if (this.pageType === 'search' || item.selectType === 1) {
            // 多选
            this.selectTagList.push({
              label: option.label,
              value: option.value,
              tagType: item.tagType,
              selectType: item.selectType,
              categoryLabel: item.label
            })
          } else if (item.selectType === 0) {
            // 单选
            this.selectTagList.forEach(singItem => {
              item.children.forEach(ss => {
                if (singItem.value === ss.value) {
                  singItem.label = option.label
                  singItem.value = option.value
                }
              })
              if (singItem.categoryLabel === item.label && item.selectType === 0) {
                singItem.label = option.label
                singItem.value = option.value
              }
            })
            if (this.selectTagList.every(item => item.value !== option.value)) {
              this.selectTagList.push({
                label: option.label,
                value: option.value,
                tagType: item.tagType,
                selectType: item.selectType,
                categoryLabel: item.label
              })
            }
            this.tagList.forEach(tagitem => {
              tagitem.children.forEach(ssItem => {
                if (option.value === ssItem.value) {
                  tagitem.singleIndex = -1
                }
              })
            })
          }
        } else {
          this.tagList.forEach(item => {
            if (item.selectType === 0) {
              item.singleIndex = -1
            }
            item.children.forEach(ssItem => {
              this.contents.forEach(contentItem => {
                if (contentItem === ssItem.value) {
                  item.singleIndex = -1
                }
              })
            })
          })
          this.selectTagList = this.selectTagList.filter(item => {
            return item.value !== option.value
          })
        }
      }
      // if (item.selectType === 0 && item.tagType === 0) {
      //   item.singleIndex = item.singleIndex === optionIndex ? -1 : optionIndex
      // }
      this.contents = this.selectTagList.map(item => item.value)
      this.$emit('select', this.contents)
    },
    closeTab (tagItem) {
      this.tagList.forEach(item => {
        item.children.forEach(ssItem => {
          this.contents.forEach(contentItem => {
            if (contentItem === ssItem.value) {
              item.singleIndex = -1
            }
          })
        })
      })
      const tags = this.selectTagList.filter(tag => tag.value !== tagItem.value)
      this.selectTagList = tags
      this.contents = this.selectTagList.map(item => item.value)
      this.$emit('select', this.contents)
    },
    delSelect (e) {
      this.tagList.forEach(item => {
        item.children.forEach(subItem => {
          if (e === subItem.value) {
            item.singleIndex = -1
          }
        })
      })
      // if (this.pageType !== 'search') {
      //   this.selectTagList.forEach(item => {
      //     if (item.value === e && item.tagType === 1) {
      //       this.$message.warning('自动标签无法更改')
      //     }
      //   })
      // }
    },
    onChange (e, type) {
      if (e.length === 0) {
        this.tagList.forEach(item => {
          item.singleIndex = -1
        })
        if (this.pageType !== 'search') {
          this.selectTagList = this.selectTagList.filter(subItem => subItem.tagType === 1)
        } else {
          this.selectTagList = []
        }
      }
      this.selectTagList = e.map(item => { const obj = this.selectTagList.filter(subItem => item === subItem.value)[0]; return obj })
      this.contents = this.selectTagList.map(item => item.value)
      this.$emit('select', this.contents)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  width: auto;
  padding: 0;
  border: none;
  margin: 1px 0 0 0;
}
.search_box /deep/.ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
  padding: 0 17px;
}
.selectTagArea {
  .delIcon:hover {
    color: #f5222d;
  }
}
// 分类下拉框固定高度
/deep/.tagCategory {
  .ant-select-selection--multiple {
    cursor: pointer;
  }
}
/deep/.tagCategorySearch {
  .ant-select-selection--multiple {
    max-height: 28px;
    overflow: hidden;
    cursor: pointer;
  }
}
// 标签颜色
.tagColor {
  .tagStyle {
    margin: 4px;
    border: 1px solid #d9d9d9;
    background: #fafafa;
    color: rgba(0, 0, 0, 0.85);
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 2px;
  }
  .tagRed {
    color: #f5222d !important;
    background: #fff1f0 !important;
    border-color: #ffa39e !important;
  }
  .tagBlue {
    color: #1890ee !important;
    background: #e6f7fe !important;
    border-color: #91d5fe !important;
  }
  .tagGray {
    color: rgba(0, 0, 0, 0.85) !important;
    background: #fafafa !important;
    border-color: #d9d9d9 !important;
  }
}
div::-webkit-scrollbar {
  text-align: right;
  width: 8px;
  height: 8px;
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #333;
}
div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
