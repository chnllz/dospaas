<!--
 * @Description: 表单设计器内容展示操作组件
 * @Author: kcz
 * @Date: 2019-12-31 19:39:48
 * @LastEditors: kcz
 * @LastEditTime: 2020-10-28 16:17:29
 -->
<template>
  <div class="form-panel">
    <p v-show="data.list.length === 0" class="hint-text">{{ $t('从左侧选择控件添加') }}</p>
    <a-form
      class="a-form-box k-form-build"
      :layout="data.config.layout"
      :selfUpdate="true"
      :hideRequiredMark="data.config.hideRequiredMark"
      :style="data.config.customStyle"
    >
      <draggable
        v-model="data.list"
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 240,
          handle: '.drag-move'
        }"
        @add="deepClone"
        @start="dragStart($event, data.list)"
      >
        <transition-group tag="div" name="list" class="list-main">
          <layoutItem
            v-for="record in data.list"
            :key="record.key + 'list'"
            class="drag-move"
            :tabSelectIndex="tabKey"
            :record="record"
            :config="data.config"
            :selectItem.sync="selectItem"
            :startType="startType"
            @dragStart="dragStart"
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy"
            @handleDelete="handleDelete"
            @handleColAdd="handleColAdd"
            @handleShowRightMenu="handleShowRightMenu"
            @handlePaste="handlePaste"
            @handleTabChange="handleTabChange"
          />
        </transition-group>
      </draggable>
    </a-form>
    <!-- 右键菜单 start -->
    <div v-show="showRightMenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" class="right-menu">
      <ul>
        <li @click="handleDownMerge">
          <a-icon type="caret-down" />
          {{ $t('向下合并') }}
        </li>
        <li @click="handleRightMerge">
          <a-icon type="caret-right" />
          {{ $t('向右合并') }}
        </li>
        <li @click="handleRightSplit">
          <a-icon type="border-inner" />
          {{ $t('拆分单元格') }}
        </li>
        <li @click="handleAddCol">
          <a-icon type="border-horizontal" />
          {{ $t('增加') }}
          <span @click.stop="getTable"><a-input-number v-model="tableCol" :min="1" /></span>
          {{ $t('列') }}
        </li>
        <li @click="handleAddRow">
          <a-icon type="border-verticle" />
          {{ $t('增加') }}
          <span @click.stop="getTable"><a-input-number v-model="tableRow" :min="1" /></span>
          {{ $t('行') }}
        </li>
        <li @click="copyRow">
          <a-icon type="copy" />
          {{ $t('复制该行') }}
        </li>
        <li v-if="rowData.tds" @click="pasteRowUp">
          <a-icon type="arrow-up" />
          {{ $t('粘贴至上方') }}
        </li>
        <li v-if="rowData.tds" @click="pasteRowDown">
          <a-icon type="arrow-down" />
          {{ $t('粘贴至下方') }}
        </li>
        <!-- <li @click="handleDelCol"><a-icon type="up-square" />{{ $t('删除一列') }}</li> -->
        <!-- <li @click="handleDelRow"><a-icon type="left-square" />{{ $t('删除一行') }}</li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import 'codemirror/mode/javascript/javascript'
export default {
  name: 'KCenter',
  i18n: window.lang('admin'),
  components: {
    draggable: () => import('vuedraggable'),
    layoutItem: () => import('./layoutItem')
  },
  props: {
    noModel: {
      type: Array,
      required: true
    },
    startType: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      // form: this.$form.createForm(this),
      rightMenuSelectValue: {},
      showRightMenu: false,
      rowData: {},
      menuTop: 0,
      menuLeft: 0,
      trIndex: 0,
      tdIndex: 0,
      tableCol: 1,
      tableRow: 1,
      // 新增以下
      tabKey: 0
    }
  },
  mounted () {
    // 添加监听取消右键菜单
    document.addEventListener('click', this.handleRemoveRightMenu, true)
    document.addEventListener('contextmenu', this.handleRemoveRightMenu, true)
  },
  destroyed () {
    // 移除监听
    document.removeEventListener('click', this.handleRemoveRightMenu, true)
    document.removeEventListener(
      'contextmenu',
      this.handleRemoveRightMenu,
      true
    )
  },
  methods: {
    deepClone (evt) {
      const newIndex = evt.newIndex
      // json深拷贝一次
      const list = JSON.stringify(this.data.list)
      this.data.list = JSON.parse(list)
      // 删除icon及compoent属性
      delete this.data.list[newIndex].icon
      delete this.data.list[newIndex].component
      this.$emit('handleSetSelectItem', this.data.list[newIndex])
    },
    handleColAdd (evt, columns, isCopy = false) {
      const newIndex = evt.newIndex
      if (isCopy || columns[newIndex].key === '') {
        // 重置或者生成key值  （内层item项的key）
        const getColumns = (array) => {
          array.forEach((item, index) => {
            if (item.formType || item.type) {
              const number = parseInt(Math.random() * (100000000000 - 1000000000 + 1) + 1000000000, 10)
              item.key = (item.formType || item.type) + '_' + number
              // 删除 model对象属性
              delete item.model
            }
            if (item.columns) {
              // 栅格布局
              getColumns(item.columns)
            } else if (item.trs) {
              // 标签布局
              getColumns(item.trs)
            } else if (item.tds) {
              // 标签布局
              getColumns(item.tds)
            } else if (item.list) {
              // 卡片布局
              getColumns(item.list)
            } else {
              // 无布局 其他组件
            }
          })
        }
        getColumns(columns)
        if (columns[newIndex]) {
          // 重置最外层的 key值
          const key = (columns[newIndex].formType || columns[newIndex].type) + '_' + new Date().getTime()
          this.$set(columns, newIndex, {
            ...columns[newIndex],
            key,
            model: key
          })
          if (this.noModel.includes(columns[newIndex].type)) {
            // 删除不需要的model属性
            delete columns[newIndex].model
          }

          if (typeof columns[newIndex].options !== 'undefined') {
            // 深拷贝options
            const optionsStr = JSON.stringify(columns[newIndex].options)
            columns[newIndex].options = JSON.parse(optionsStr)
          }
          if (typeof columns[newIndex].rules !== 'undefined') {
            // 深拷贝rules
            const rulesStr = JSON.stringify(columns[newIndex].rules)
            columns[newIndex].rules = JSON.parse(rulesStr)
          }
          if (typeof columns[newIndex].columns !== 'undefined') {
            // 深拷贝columns
            const columnsStr = JSON.stringify(columns[newIndex].columns)
            columns[newIndex].columns = JSON.parse(columnsStr)
          }
          if (columns[newIndex].type === 'table') {
            // 深拷贝trs
            const trsStr = JSON.stringify(columns[newIndex].trs)
            columns[newIndex].trs = JSON.parse(trsStr)
          }
        }
      }
      // // 深拷贝数据
      columns[newIndex] = JSON.parse(JSON.stringify(columns[newIndex]))
      this.$emit('handleSetSelectItem', columns[newIndex])
    },
    dragStart (evt, list) {
      // 拖拽结束,自动选择拖拽的控件项
      this.$emit('handleSetSelectItem', list[evt.oldIndex])
    },
    handleSelectItem (record) {
      // 修改选择Item
      this.$emit('handleSetSelectItem', record)
    },
    handleTabChange (key) {
      // 标签布局 tab栏切换选中的key
      this.tabKey = key
    },
    // 粘贴
    handlePaste (e, tabKey = 0) {
      const pasteData = window.sessionStorage.getItem('pasteData')
      const localstorageData = pasteData ? JSON.parse(pasteData) : ''
      const localstorageTableId = window.sessionStorage.getItem('tableId')
      const checkedKey = e
      if (localstorageTableId !== this.params.tableId) {
        this.$message.warning(this.$t('不支持跨表复制粘贴，请检查'))
        return
      }
      if (!localstorageData || localstorageData.length === 0) {
        this.$message.warning(this.$t('暂无复制数据，请先复制数据再粘贴'))
        return
      }
      // isArray判断复制的存储数据类型：true - array类型表示复制的子组件数据  false - object类型表示复制的整体数据
      const isArray = localstorageData instanceof Array
      const traverse = array => {
        array.forEach((element, index) => {
          if (element.key === this.selectItem.key) {
            // 复制添加到选择节点后面
            if (checkedKey === 0) {
              // 粘贴到上方
              if (isArray) {
                // 先把数据顺序反转一下 不然粘贴进去的数据显示  顺序会反
                const data = localstorageData.reverse()
                data.forEach((LItem, Lindex) => {
                  array.splice(index, 0, LItem)
                })
              } else {
                array.splice(index, 0, localstorageData)
              }
            } else if (checkedKey === 2) {
              // 粘贴到下方
              if (isArray) {
                localstorageData.forEach((LItem, Lindex) => {
                  array.splice(index + (Lindex + 1), 0, LItem)
                })
              } else {
                array.splice(index + 1, 0, localstorageData)
              }
            } else if (checkedKey === 1) {
              // 粘贴到子组件内
              const selectTabKey = this.tabKey // 标签栏切换选中的key值 不选默认是0
              // 深拷贝 当前选中的type类型
              const rockType = JSON.parse(JSON.stringify(this.selectItem.type))
              const type = rockType
              if (type === 'grid' || type === 'tabs') {
                // 复制的数据 布局类型：栅格或标签布局
                element.columns[selectTabKey].list = element.columns[selectTabKey].list.concat(localstorageData)
              } else if (type === 'card') {
                // 卡片布局
                element.list = element.list.concat(localstorageData)
              }
            }
            // 粘贴完成，重置key值
            const evt = {
              newIndex: index + 1
            }
            this.handleColAdd(evt, array, true)
            return
          }
          if (element.type === 'grid' || element.type === 'tabs') {
            // 栅格布局
            element.columns.forEach(item => {
              traverse(item.list)
            })
          } else if (element.type === 'card') {
            // 卡片布局
            traverse(element.list)
          } else if (element.type === 'batch') {
            // 动态表格内复制
          }
          if (element.type === 'table') {
            // 表格布局
            element.trs.forEach(item => {
              item.tds.forEach(val => {
                traverse(val.list)
              })
            })
          }
        })
      }
      traverse(this.data.list)
    },
    // 复制按钮事件
    handleCopy (e) {
      // e是选中的key值  0-复制整体 1-复制子组件（内容数据）
      let data = []
      if (e === 0) {
        // 复制整体
        data = this.selectItem
      } else {
        // 复制子组件
        const selectTabKey = this.tabKey || 0 // 标签栏切换选中的key值 不选默认是0
        const type = this.selectItem.type
        if (type === 'grid' || type === 'tabs') {
          // 复制的数据 布局类型：栅格或标签布局
          data = this.selectItem.columns[selectTabKey].list
        } else if (type === 'card') {
          // 卡片布局
          data = this.selectItem.list
        }
      }
      const tableId = this.params.tableId
      window.sessionStorage.setItem('tableId', tableId)
      window.sessionStorage.setItem('pasteData', JSON.stringify(data))
    },
    handleDelete () {
      // 删除已选择
      const traverse = array => {
        array = array.filter((element, index) => {
          if (element.type === 'grid' || element.type === 'tabs') {
            // 栅格布局
            element.columns.forEach(item => {
              item.list = traverse(item.list)
            })
          }
          if (element.type === 'card' || element.type === 'batch') {
            // 卡片布局
            element.list = traverse(element.list)
          }
          if (element.type === 'table') {
            // 表格布局
            element.trs.forEach(item => {
              item.tds.forEach(val => {
                val.list = traverse(val.list)
              })
            })
          }
          if (element.key !== this.selectItem.key) {
            return true
          } else {
            if (array.length === 1) {
              this.handleSelectItem({ key: '' })
            } else if (array.length - 1 > index) {
              this.handleSelectItem(array[index + 1])
            } else {
              this.handleSelectItem(array[index - 1])
            }
            return false
          }
        })
        return array
      }

      this.data.list = traverse(this.data.list)
    },
    getTable () {
      this.showRightMenu = true
    },
    handleDownMerge () {
      // 向下合并
      // 判断当前行是否是最后一行，最后一行无法向下合并
      if (this.rightMenuSelectValue.trs.length - this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan <= this.trIndex) {
        this.$message.error(this.$t('当前是最后一行，无法向下合并'))
        return false
      }
      // 获取当前单元格的rowspan
      const currentRowspan = Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan)

      // 判断下一列单元格与当前单元格的colspan是否一致，如果不一致则无法合并
      if (Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan) !== Number(this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].colspan)) {
        this.$message.error(this.$t('当前表格无法向下合并'))
        return false
      }
      // 获取下一列单元格的rowspan
      const nextRowSpan = Number(this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].rowspan)
      // 当前单元格rowspan等于当前单元格rowspan加上下一列单元格rowspan
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan = currentRowspan + nextRowSpan
      // 将被合并的单元rowspan修改为0
      this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].rowspan = 0
      // 清空被合并单元格list
      this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].list = []
    },
    handleRightMerge () {
      // 向右合并
      // 获取当前列的所有colspan总和
      const sumCols = this.rightMenuSelectValue.trs[this.trIndex].tds
        .map(item => Number(item.colspan))
        .reduce(function (partial, value) {
          return partial + value
        })
      // 判断是否是最后一列，最后一列无法继续向右合并
      if (sumCols - this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan <= this.tdIndex) {
        this.$message.error(this.$t('当前是最后一列，无法向右合并'))
        return false
      }

      // 获取当前单元格的colspan
      const currentColspan = Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan)

      // 判断需要合并的单元格rowspan是否与当前单元格一致
      if (Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan) !== Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].rowspan)) {
        this.$message.error(this.$t('当前表格无法向右合并'))
        return false
      }

      // 合并单元格colspan
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan += Number(this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].colspan)

      // 将被合并的单元格colspan设置为0
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].colspan = 0

      // 情况被合并单元格的list
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].list = []
    },
    // 拆分单元格
    handleRightSplit () {
      // 获取当前单元格的colspan及rowspan
      let { colspan, rowspan } = this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex]
      colspan = Number(colspan)
      rowspan = Number(rowspan)
      for (let rowIndex = this.trIndex, rowLen = this.trIndex + rowspan; rowIndex < rowLen; rowIndex++) {
        for (let colIndex = this.tdIndex, colLen = this.tdIndex + colspan; colIndex < colLen; colIndex++) {
          if (rowIndex === this.trIndex && colIndex === this.tdIndex) continue
          this.rightMenuSelectValue.trs[rowIndex].tds.splice(colIndex, 1, {
            colspan: 1,
            rowspan: 1,
            list: []
          })
        }
      }
      // 修改当前单元格colspan、rowspan为1
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan = 1
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan = 1
    },
    handleAddCol () {
      // 增加列
      this.rightMenuSelectValue.trs.forEach(item => {
        let key = 0
        for (let i = this.tableCol; i > 0; i--) {
          key++
          item.tds.splice(this.tdIndex + key, 0, {
            colspan: 1,
            rowspan: 1,
            list: []
          })
        }
      })
    },
    // 删除列
    handleDelCol () {
      // const { colspan, rowspan } = this.rightMenuSelectValue.trs[ this.trIndex ].tds[this.tdIndex]
    },
    handleAddRow () {
      // 增加行
      // 获取总col值
      const sumCols = this.rightMenuSelectValue.trs[0].tds
        .map(item => Number(item.colspan))
        .reduce(function (partial, value) {
          return partial + value
        })
      const rowJson = { tds: [] }
      for (let i = 0; i < sumCols; i++) {
        rowJson.tds.push({
          colspan: 1,
          rowspan: 1,
          list: []
        })
      }
      // 取当前rowspan最大值
      let maxRowSpan = 1
      this.rightMenuSelectValue.trs[this.trIndex].tds.forEach(item => {
        if (maxRowSpan < Number(item.rowspan)) {
          maxRowSpan = Number(item.rowspan)
        }
      })
      let key = 0
      for (let i = this.tableRow; i > 0; i--) {
        // 在rowspan最大值处插入数据
        this.rightMenuSelectValue.trs.splice(
          this.trIndex + maxRowSpan + key,
          0,
          rowJson
        )
        key++
      }
    },
    handleDelRow () {

    },
    copyRow () {
      this.rowData = JSON.parse(JSON.stringify(this.rightMenuSelectValue.trs[this.trIndex]))
    },
    pasteRowUp () {
      const data = JSON.parse(JSON.stringify(this.rowData))
      const getColumns = (array) => {
        array.forEach((item, index) => {
          if (item.formType || item.type) {
            const number = parseInt(Math.random() * (100000000000 - 1000000000 + 1) + 1000000000, 10)
            item.key = (item.formType || item.type) + '_' + number
            // 删除 model对象属性
            delete item.model
          }
          if (item.columns) {
            // 栅格布局
            getColumns(item.columns)
          } else if (item.trs) {
            // 标签布局
            getColumns(item.trs)
          } else if (item.tds) {
            // 标签布局
            getColumns(item.tds)
          } else if (item.list) {
            // 卡片布局
            getColumns(item.list)
          } else {
            // 无布局 其他组件
          }
        })
      }
      getColumns(data.tds)
      this.rightMenuSelectValue.trs.splice(this.trIndex - 1, 0, data)
    },
    pasteRowDown () {
      const data = JSON.parse(JSON.stringify(this.rowData))
      const getColumns = (array) => {
        array.forEach((item, index) => {
          if (item.formType || item.type) {
            const number = parseInt(Math.random() * (100000000000 - 1000000000 + 1) + 1000000000, 10)
            item.key = (item.formType || item.type) + '_' + number
            // 删除 model对象属性
            delete item.model
          }
          if (item.columns) {
            // 栅格布局
            getColumns(item.columns)
          } else if (item.trs) {
            // 标签布局
            getColumns(item.trs)
          } else if (item.tds) {
            // 标签布局
            getColumns(item.tds)
          } else if (item.list) {
            // 卡片布局
            getColumns(item.list)
          } else {
            // 无布局 其他组件
          }
        })
      }
      getColumns(data.tds)
      this.rightMenuSelectValue.trs.splice(this.trIndex + 1, 0, data)
    },
    handleShowRightMenu (e, val, trIndex, tdIndex) {
      // 显示右键菜单
      e.stopPropagation()
      // this.fileItem = item
      // 显示
      this.showRightMenu = true

      // 定位
      this.menuTop = e.clientY
      this.menuLeft = e.clientX
      // this.rightMenuType = type
      // this.rightId = id
      this.activeArr = [val]
      this.rightMenuSelectValue = val
      this.trIndex = trIndex
      this.tdIndex = tdIndex
      return false
    },
    handleRemoveRightMenu () {
      // 取消右键菜单
      this.showRightMenu = false
    }
  }
}
</script>
