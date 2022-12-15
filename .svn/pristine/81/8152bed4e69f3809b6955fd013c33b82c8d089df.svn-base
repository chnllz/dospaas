<template>
  <a-popover v-model="selectshow" :trigger="fieldRule === 'readonly' ? '' : 'click'" placement="bottomLeft">
    <a-form-item>
      <a-input
        v-model="address"
        read-only
        :disabled="fieldRule === 'readonly'"
        :placeholder="fieldRule === 'readonly' ? '' : $t('请选择地址')"
        :style="fieldRule ? {} : { cursor: 'pointer' }"
        @click.stop="showAddressSearch"
      />
    </a-form-item>
    <div slot="content" style="width: 800px; display: flex">
      <AddressSelect
        ref="addressSelect"
        series="2"
        :showInput="false"
        :cityNameInit="cityName"
        @send="getAddress"
      ></AddressSelect>
      <a-select
        showSearch
        :value="undefined"
        style="flex: 1; height: 28px"
        :placeholder="$t('请输入地址关键字进行搜索')"
        allowClear
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        @search="searchAddress"
        @change="
          (e) => {
            if (!e) {
              searchdata = []
            }
          }
        "
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option
          v-for="(item, index) in searchdata"
          :key="index"
          :value="item.coordinate"
          @click="selectAddress(item)"
        >
          <div class="select-content">
            <span>{{ item.name || '--' }}</span>
            <span class="gray">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.address }}</span>
          </div>
        </a-select-option>
      </a-select>
      <div class="map">
        <LocationAMap v-if="mapType !== 'baidu'" :mark="coordinate" />
        <LocationBaiduMap v-else :mark="coordinate" />
      </div>
    </div>
  </a-popover>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  i18n: window.lang('admin'),
  components: {
    AddressSelect: () => import('../Field/AddressSelect'),
    LocationAMap: () => import('./LocationAMap'),
    LocationBaiduMap: () => import('./LocationBaiduMap')
  },
  props: {
    fieldRule: {
      type: String,
      default: ''
    },
    alias: {
      type: String,
      default: ''
    },
    option: {
      type: Array || null,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    this.searchAddress = debounce(this.searchAddress, 800)
    return {
      selectshow: false,
      page: {
        pageNo: 1,
        pageSize: 20,
        sortField: 'id',
        sortOrder: 'descend'
      },
      fetching: false,
      searchdata: [],
      address: '',
      cityName: '',
      mapType: 'baidu',
      coordinate: []
    }
  },
  watch: {
    option: {
      handler (newVal) {
        const option = newVal || []
        const address = option[0] || {}
        this.address = address.fullName
        if (this.address) {
          const addressArray = this.address.split('/')
          const province = addressArray[0]
          this.cityName = addressArray[1]
          if (['北京市', '上海市', '天津市', '重庆市'].includes(province)) {
            this.cityName = province
          }
          if (this.value) {
            this.coordinate = this.value.split(',')
            console.log('coordinate', this.coordinate)
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.axios({
      url: '/admin/map/getMapSetting'
    }).then(res => {
      console.log('res', res)
      if (res.code === 0) {
        this.mapType = res.result.mapEngine
      }
    })
  },
  methods: {
    // 显示地址搜索器
    showAddressSearch () {
      if (this.fieldRule === 'readonly') return false
      this.selectshow = !this.selectshow
    },
    // 获取省市
    getAddress (label) {
      if (label) {
        const addressArray = label.split('/')
        const province = addressArray[0]
        this.cityName = addressArray[1]
        if (['北京市', '上海市', '天津市', '重庆市'].includes(province)) {
          this.cityName = province
        }
      }
    },
    searchAddress (val) {
      if (val) {
        this.fetching = true
        const cityName = this.cityName || ''
        this.axios({
          url: '/admin/map/keywordSearch',
          data: { query: val, region: cityName }
        }).then(res => {
          this.searchdata = res.result || []
          this.searchdata = this.searchdata.map((item, index) => {
            item.coordinate = `${item.lng}, ${item.lat}`
            if (index === 0) {
              this.coordinate = [item.lng, item.lat]
            }
            return item
          })
          this.fetching = false
        })
      } else {
        this.searchdata = []
      }
    },
    // 选择地址
    selectAddress (item) {
      const { province, city, district, address, lat, lng } = item
      this.axios({
        url: '/admin/map/getAddressOption',
        data: {
          province,
          city,
          area: district
        }
      }).then(res => {
        const result = res.result || {}
        const { fullName, fullNumber, number } = result
        this.address = fullName
        const coordinate = `${lng}, ${lat}`
        this.$emit('send', fullName, number, this.alias, fullNumber, address, coordinate)
        this.selectshow = false
        this.coordinate = [lng, lat]
      })
    }
  }
}
</script>

<style scoped>
.select-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.gray {
  color: #a1a1a1;
  font-size: 14px;
}
.map {
  width: 400px;
  height: 280px;
  margin-left: 12px;
}
</style>
