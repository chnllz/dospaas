<template>
  <a-drawer title="导入" :width="500" :visible="visible1" @close="visible1 = !visible1">
    <a-spin :spinning="loading">
      <a-form :form="form">
        <div style="display: flex">
          选择文件：
          <a-upload
            style="width: 100px"
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="{ 'Access-Token': $store.getters.userInfo.accessToken }"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="upload" />
              浏览...
            </a-button>
          </a-upload>
          <a-button>
            <a-icon type="vertical-align-bottom" />
            模板下载
          </a-button>
        </div>
        <a-table
          ref="table"
          size="small"
          :columns="columns"
          :data-source="data"
          :sorter="sorter"
          style="margin-top: 10px"
        ></a-table>
      </a-form>
      <div class="bbar">
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button @click="visible = !visible">关闭</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
export default {
  components: {
  },
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      loading: false,
      visible: false
    }
  }
}
</script>
