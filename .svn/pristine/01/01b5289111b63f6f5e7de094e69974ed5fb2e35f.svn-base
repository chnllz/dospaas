<template>
  <div>
    <a-tabs
      v-if="record.type === 'tabs'"
      class="grid-row"
      :default-active-key="0"
      :tabBarGutter="Number(record.options.tabBarGutter)"
      :type="record.options.type"
      :size="record.options.size"
      :tabPosition="record.options.tabPosition"
      :style="{
        'margin-top': record.topMargin + 'px',
        'margin-right': record.rightMargin + 'px',
        'margin-bottom': record.downMargin + 'px',
        'margin-left': record.leftMargin + 'px'
      }"
    >
      <a-tab-pane v-for="(tabItem, indexs) in record.columns" :key="indexs" :tab="tabItem.label">
        <user-table-card-build
          v-for="item in tabItem.list"
          ref="nestedComponents"
          :key="item.key"
          :data="data"
          :record="item"
        />
      </a-tab-pane>
    </a-tabs>
    <!-- 栅格布局 -->
    <a-row
      v-else-if="record.type === 'grid'"
      class="grid-row"
      style="display: flex; flex-flow: row wrap; align-items: center"
      :gutter="Number(record.options.gutter)"
    >
      <a-col v-for="(colItem, idnex) in record.columns" :key="idnex" class="grid-col" :span="colItem.span || 0">
        <user-table-card-build
          v-for="item in colItem.list"
          ref="nestedComponents"
          :key="item.key"
          :data="data"
          :record="item"
        />
      </a-col>
    </a-row>
    <!-- 卡片布局 -->
    <a-card
      v-else-if="record.type === 'card'"
      size="small"
      class="grid-row"
      :title="record.label"
      :bordered="record.bordered === '1'"
      :style="{
        'margin-top': record.topMargin + 'px',
        'margin-right': record.rightMargin + 'px',
        'margin-bottom': record.downMargin + 'px',
        'margin-left': record.leftMargin + 'px'
      }"
    >
      <user-table-card-build
        v-for="item in record.list"
        ref="nestedComponents"
        :key="item.key"
        :data="data"
        :record="item"
      />
    </a-card>
    <!-- 表格布局 -->
    <table
      v-else-if="record.type === 'table'"
      class="kk-table-9136076486841527"
      :class="{
        bright: record.options.bright,
        small: record.options.small,
        bordered: record.options.bordered
      }"
      :style="{
        'margin-top': record.topMargin + 'px',
        'margin-right': record.rightMargin + 'px',
        'margin-bottom': record.downMargin + 'px',
        'margin-left': record.leftMargin + 'px'
      }"
    >
      <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
        <td
          v-for="(tdItem, tdIndex) in trItem.tds"
          :key="tdIndex"
          class="table-td"
          :colspan="tdItem.colspan"
          :rowspan="tdItem.rowspan"
        >
          <user-table-card-build
            v-for="item in tdItem.list"
            ref="nestedComponents"
            :key="item.key"
            :data="data"
            :record="item"
          />
        </td>
      </tr>
    </table>
    <div v-else>
      <a-form-item
        v-if="record.formType === 'image'"
        :label="!record.labelShow || record.labelShow === '1' ? record.name : false"
      >
        <div
          v-if="data[record.alias] && data[record.alias][0]"
          v-viewer
          style="text-align: center; margin-right: 8px; cursor: pointer"
        >
          <img
            :style="{ width: '100%', maxHeight: '120px', 'border-radius': record.borderRadius === '1' ? '50%' : '5px' }"
            :src="setting.rootUrl + data[record.alias][0].filePath"
          />
        </div>
      </a-form-item>
      <div v-else-if="record.type === 'divider'">
        <a-divider style="margin: 0px" />
      </div>
      <div v-else-if="record.formType === 'treeselect'">
        <span v-if="!record.labelShow || record.labelShow === '1'">
          <span v-if="record.fontSize === '1'" :style="{ 'font-weight': 'bold', 'font-size': '2em' }">
            {{ record.name }} :
          </span>
          <h2 v-else-if="record.fontSize === '2'" :style="{ color: record.labelColor, display: 'inline' }">
            {{ record.name }} :
          </h2>
          <h3 v-else-if="record.fontSize === '3'" :style="{ color: record.labelColor, display: 'inline' }">
            {{ record.name }} :
          </h3>
          <h4 v-else-if="record.fontSize === '4'" :style="{ color: record.labelColor, display: 'inline' }">
            {{ record.name }} :
          </h4>
          <h5 v-else-if="record.fontSize === '5'" :style="{ color: record.labelColor, display: 'inline' }">
            {{ record.name }} :
          </h5>
          <h6 v-else-if="record.fontSize === '6'" :style="{ color: record.labelColor, display: 'inline' }">
            {{ record.name }} :
          </h6>
          <span v-else :style="{ color: record.labelColor }">{{ record.name }} :</span>
        </span>
        <span v-for="(tree, treeIndex) in data[record.alias].split(',')" v-show="data[record.alias]" :key="treeIndex">
          <a-tag style="margin-bottom: 3px" :color="record.color">{{ tree }}</a-tag>
        </span>
        <span v-show="!data[record.alias]">--</span>
      </div>
      <div v-else>
        <div v-if="record.fontSize === '1'" :style="{ 'font-weight': 'bold', 'font-size': '2em' }">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </div>
        <h2 v-else-if="record.fontSize === '2'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </h2>
        <h3 v-else-if="record.fontSize === '3'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </h3>
        <h4 v-else-if="record.fontSize === '4'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </h4>
        <h5 v-else-if="record.fontSize === '5'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </h5>
        <h6 v-else-if="record.fontSize === '6'">
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </h6>
        <div v-else>
          <span v-if="!record.labelShow || record.labelShow === '1'" :style="{ color: record.labelColor }">
            {{ record.name }} :
          </span>
          <span
            :style="{
              borderRadius: '2px',
              color: record.color,
              background: record.backGroundColor,
              paddingTop: record.topPadding + 'px',
              paddingBottom: record.bottomPadding + 'px',
              paddingLeft: record.leftPadding + 'px',
              paddingRight: record.rightPadding + 'px',
              marginTop: record.topMargin + 'px',
              marginBottom: record.bottomMargin + 'px',
              marginLeft: record.leftMargin + 'px',
              marginRight: record.rightMargin + 'px',
              display: 'inline-block'
            }"
          >
            {{ data[record.alias] ? data[record.alias] : '--' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserTableCardBuild',
  props: {
    record: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['setting', 'userInfo'])
  }
}
</script>
