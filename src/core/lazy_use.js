import Vue from 'vue'
import store from '@/store/'
// base library
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  Result,
  Statistic,
  Descriptions,
  message,
  Notification,
  Cascader,
  Tree,
  Slider,
  AutoComplete,
  Pagination,
  Empty,
  TreeSelect,
  Space,
  Collapse
} from 'ant-design-vue'
import Viser from 'viser-vue'
// ext library
import VueCropper from 'vue-cropper'
import Dialog from '@/components/Dialog'
import MultiTab from '@/components/MultiTab'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'
import VueContextMenu from 'vue-contextmenu/src/main'
import vcolorpicker from 'vcolorpicker'
import moment from 'moment'
import { STable, DataPicker, TagIcon } from '@/components'
import Loader from '@/components/Loader'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import { VueAxios } from '@/utils/request'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Drawer.props.keyboard.default = false
library.add(fas)
Vue.use(VueAxios)
Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Cascader)
Vue.use(Tree)
Vue.use(Slider)
Vue.use(Pagination)
Vue.use(AutoComplete)
Vue.use(Empty)
Vue.use(VueContextMenu)
Vue.use(vcolorpicker)
Vue.use(Viser)
Vue.use(Dialog) // this.$dialog func
Vue.use(MultiTab)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
Vue.use(Viewer)
Vue.use(TreeSelect)
Vue.use(Space)
Vue.use(Collapse)
Vue.use(Notification)
Vue.use(VueI18n)

Vue.prototype.moment = moment
Vue.prototype.window = window
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$deepmerge = deepmerge

Vue.component('STable', STable)
Vue.component('DataPicker', DataPicker)
Vue.component('TagIcon', TagIcon)
Vue.component('Loader', Loader)
Vue.component('font-awesome-icon', FontAwesomeIcon)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')

Vue.prototype.$showDocument = (obj) => {
  if (obj.number) {
    obj.visible = true
  }
  store.commit('SHOW_DOCUMENT', Object.assign({}, store.state.app.showDocument, obj))
}

Vue.prototype.$setLoading = (obj) => {
  store.commit('SET_GLOBAL_SPIN', obj)
}
Vue.prototype.$setWebsocket = (obj) => {
  store.commit('SET_WEBSOCKET', obj)
}
Vue.prototype.$setSetting = (obj) => {
  store.commit('SET_SETTING', obj)
}
Vue.prototype.$notification = (obj) => {
  store.commit('NOTIFICATION', obj)
}
