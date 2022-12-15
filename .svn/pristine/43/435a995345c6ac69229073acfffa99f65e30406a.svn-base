<template>
  <div
    style="cursor: pointer"
    @click.stop="
      (e) => {
        e.preventDefault()
      }
    "
  >
    <div
      style="height: 100%; width: 23px; display: flex; justify-content: center; align-items: center"
      @click="searchAlias"
    >
      <font-awesome-icon :icon="'fa-code'" class="font-awesome-icon" />
    </div>
    <!-- <a-popover trigger="click" placement="bottomRight">
      <template slot="content">
        <a-list>
          <a-list-item v-for="(item, index) in dataSource" :key="index" class="alias-list" @click="selectAlias(item)">
            <a-row style="width: 250px">
              <a-col :span="8">
                <span>{{ item.text }}</span>
              </a-col>
              <a-col :span="16">
                <a-popover>
                  <span style="overflow: hidden; text-overflow: ellipsis; display: block">{{ item.value }}</span>
                  <template slot="content">
                    <p>{{ item.value }}</p>
                  </template>
                </a-popover>
              </a-col>
            </a-row>
          </a-list-item>
          <a-list-item v-if="dataSource.length === 0">
            <a-spin :spinning="loading">
              <a-row style="width: 250px">
                <a-col v-if="!loading" :span="24" style="text-align: center">{{ $t('暂无数据') }}</a-col>
              </a-row>
            </a-spin>
          </a-list-item>
        </a-list>
      </template>
      <div style="height: 100%; display: flex; justify-content: center; align-items: center" @click="searchAlias">
        <font-awesome-icon :icon="'fa-code'" class="font-awesome-icon" />
      </div>
    </a-popover> -->
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    aliasDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    this.searchAlias = debounce(this.searchAlias, 500)
    return {
      loading: true
    }
  },
  methods: {
    searchAlias () {
      this.loading = true
      const name = this.name
      if (name.trim() && !this.aliasDisabled) {
        this.axios({
          url: '/admin/general/getPinYin',
          params: {
            content: this.name
          }
        }).then(res => {
          this.loading = false
          this.$emit('setAlias', res.result)
        })
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.alias-list {
  cursor: pointer;
}
.alias-list:hover {
  color: #40a9ff;
}
</style>
