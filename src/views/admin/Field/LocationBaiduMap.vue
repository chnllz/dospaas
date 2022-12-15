<template>
  <baidu-map
    :center="center"
    :zoom="zoom"
    :ak="ak"
    :double-click-zoom="false"
    :scroll-wheel-zoom="true"
    @ready="handler"
    @dblclick="clickEvent"
  >
    <bm-view :style="{ width: '100%', height: '280px' }"></bm-view>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
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
  props: {
    mark: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      center: { lng: 116.404355, lat: 39.910792 },
      zoom: 17,
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
      ak: ''
    }
  },
  watch: {
    mark: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          this.locData = {
            longitude: newVal[0] || '',
            latitude: newVal[1] || '',
            address: ''
          }
          this.center = { lng: newVal[0], lat: newVal[1] }
        }
      },
      immediate: true
    }
  }
}
</script>
