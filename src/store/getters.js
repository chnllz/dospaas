const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  multiTab: state => state.app.multiTab,
  setting: state => state.app.setting,
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  lang: state => state.i18n.lang
}

export default getters
