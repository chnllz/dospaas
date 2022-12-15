<template>
  <a-drawer :title="config.title" :width="1400" :destroyOnClose="true" :visible="visible" @close="visible = !visible">
    <a-spin :spinning="loading">
      <a-row>
        <a-col :span="18">
          <baidu-map
            :center="center"
            :zoom="zoom"
            :ak="ak"
            :double-click-zoom="false"
            :scroll-wheel-zoom="true"
            @ready="handler"
            @dblclick="clickEvent"
          >
            <bm-view
              :style="{ width: '100%', height: clientHeight - 16 + 'px', flex: 1, marginBottom: '-30px' }"
            ></bm-view>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
            <bm-local-search
              v-show="false"
              :keyword="keyword"
              :auto-viewport="true"
              @markersset="
                (e) => {
                  searchList = e
                }
              "
            />
            <bm-city-list anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-city-list>
            <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP', 'BMAP_SATELLITE_MAP']"
              anchor="BMAP_ANCHOR_TOP_RIGHT"
            ></bm-map-type>
            <bm-marker
              v-if="locData.longitude"
              :position="{ lng: locData.longitude, lat: locData.latitude }"
              :title="locData.address"
              animation="BMAP_ANIMATION_BOUNCE"
            >
              <bm-label
                v-if="locData.address"
                :content="locData.address"
                :labelStyle="{ fontSize: '13px' }"
                :offset="{ width: -35, height: 30 }"
              />
            </bm-marker>
          </baidu-map>
        </a-col>
        <a-col :span="6" style="padding-left: 10px">
          <a-input-search
            @search="
              (e) => {
                keyword = e
              }
            "
          />
          <a-row v-if="locData.longitude" type="flex" align="middle">
            <a-col :span="23">{{ locData.longitude }} , {{ locData.latitude }}</a-col>
            <a-col :span="1"><a-icon type="close-circle" @click="clearOverlays" /></a-col>
          </a-row>

          <ol class="search-box">
            <li v-for="(item, index) in searchList" :key="index" class="search-line" @click="onSelect(item)">
              <span
                class="search-icon"
                :style="{
                  background: `url(https://api.map.baidu.com/images/markers.png) -23px ${-25 * index}px no-repeat`
                }"
              >
                &nbsp;
              </span>
              <div class="search-content" :style="{ background: selectUid === item.uid ? 'rgb(240,240, 240)' : '' }">
                <div class="search-content-title">
                  <b>{{ item.title }}</b>
                </div>
                <div class="search-content-address">
                  <b class="search-content-address-label">地址:</b>
                  <span class="search-content-address-name">
                    {{ item.address }}
                  </span>
                </div>
                <div v-if="item.phoneNumber" class="search-content-phone">
                  <b class="search-content-phone-label">电话:</b>
                  <span class="search-content-phone-name">{{ item.phoneNumber || '--' }}</span>
                </div>
              </div>
            </li>
          </ol>
        </a-col>
      </a-row>
      <div class="bbar">
        <a-button v-if="config.action === 'set'" type="primary" @click="handleSubmit">{{ $t('保存') }}</a-button>
        <a-button @click="visible = !visible">{{ $t('关闭') }}</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>
<script>
import { BaiduMap, BmNavigation, BmView, BmGeolocation, BmCityList, BmLocalSearch, BmBoundary, BmMarker, BmLabel, BmMapType } from 'vue-baidu-map'
export default {
  name: 'LocationSet',
  components: {
    BaiduMap,
    BmNavigation,
    BmView,
    BmGeolocation,
    BmCityList,
    BmLocalSearch,
    BmBoundary,
    BmMarker,
    BmLabel,
    BmMapType
  },
  data () {
    return {
      center: { lng: 116.404355, lat: 39.910792 },
      zoom: 13,
      locData: {
        longitude: '',
        latitude: '',
        address: ''
      },
      keyword: '',
      location: '',
      clientHeight: document.documentElement.clientHeight - 110, // 屏幕高度
      config: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      options: [],
      data: {},
      ak: '',
      searchList: [],
      selectUid: ''
    }
  },
  methods: {
    show (config) {
      this.visible = true
      this.ak = this.$store.getters.setting.baiduAkBrowser
      this.keyword = ''
      this.config = config
      if (config.data) {
        const data = config.data.split(',')
        this.locData = {
          longitude: data[0] || '',
          latitude: data[1] || '',
          address: ''
        }
      }
    },
    handler ({ BMap, map }) {
      const _this = this	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        if (_this.locData.longitude) {
          _this.center = { lng: _this.locData.longitude, lat: _this.locData.latitude }
        } else {
          _this.center = { lng: r.longitude, lat: r.latitude }
        }
        // 设置center属性值
        _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }		// 自定义覆盖物
        _this.initLocation = true
      }, { enableHighAccuracy: true })
      window.map = map
    },
    // 点击地图监听
    clickEvent (e) {
      console.log('clickEvent')
      // eslint-disable-next-line no-undef
      // map.clearOverlays()
      // eslint-disable-next-line no-undef
      // var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))
      // eslint-disable-next-line no-undef
      // map.addOverlay(myMarker)
      // 用所定位的经纬度查找所在地省市街道等信息
      // eslint-disable-next-line no-undef
      var point = new BMap.Point(e.point.lng, e.point.lat)
      // eslint-disable-next-line no-undef
      var gc = new BMap.Geocoder()
      const _this = this
      gc.getLocation(point, function (rs) {
        // var addComp = rs.addressComponents
        // console.log(addComp) // 地址信息
        _this.locData.address = rs.address
      })
      this.locData.longitude = e.point.lng
      this.locData.latitude = e.point.lat
    },
    clearOverlays () {
      this.locData = {
        longitude: '',
        latitude: '',
        address: ''
      }
    },
    // 定位成功回调
    getLoctionSuccess (point, AddressComponent, marker) {
      // eslint-disable-next-line no-undef
      map.clearOverlays()
      // eslint-disable-next-line no-undef
      var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat))
      // eslint-disable-next-line no-undef
      map.addOverlay(myMarker)
      this.locData.longitude = point.point.lng
      this.locData.latitude = point.point.lat
    },
    onSelect (item) {
      this.selectUid = item.uid
      const point = item.point || {}
      this.locData.longitude = point.lng
      this.locData.latitude = point.lat
    },
    handleSubmit () {
      this.loading = true
      console.log('locData', this.locData)
      if (this.locData.longitude && this.locData.latitude) {
        const data = this.locData.longitude + ',' + this.locData.latitude
        this.$emit('ok', data)
      } else {
        this.$emit('ok', '')
      }
      this.visible = false
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
.search-box {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.search-line {
  margin: 2px 0px;
  padding: 0px 5px 5px 0px;
  cursor: pointer;
  overflow: hidden;
  line-height: 17px;
}
.search-icon {
  width: 19px;
  height: 25px;
  cursor: pointer;
  float: left;
  zoom: 1;
  overflow: hidden;
  margin: 2px 3px 0 5px;
  margin-right: 0px;
  display: inline;
}
.search-content {
  zoom: 1;
  overflow: hidden;
  padding: 0px 5px;
}
.search-content-title {
  line-height: 20px;
  font-size: 12px;
  color: #00c;
}
.search-content-address {
  padding: 2px 0;
  line-height: 18px;
  *zoom: 1;
  overflow: hidden;
}
.search-content-address-label {
  float: left;
  font-weight: bold;
  *zoom: 1;
  overflow: hidden;
  padding-right: 5px;
  *margin-right: -3px;
}
.search-content-address-name {
  color: #666;
  display: block;
  zoom: 1;
  overflow: hidden;
}
.search-content-phone {
  padding: 2px 0;
  line-height: 18px;
  *zoom: 1;
  overflow: hidden;
}
.search-content-phone-label {
  float: left;
  font-weight: bold;
  *zoom: 1;
  overflow: hidden;
  padding-right: 5px;
  *margin-right: -3px;
}
.search-content-phone-name {
  color: #666;
}
</style>
