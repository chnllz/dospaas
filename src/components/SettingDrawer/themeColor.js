import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

export default {
  getAntdSerials (color) {
    let transparency = 'FF'
    if (color.length === 9) {
      transparency = color.substr(-2)
    }
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',') + ',' + transparency
    const colorList = lightens.concat(colorPalettes).map(item => {
      return item + transparency
    })
    return colorList.concat(rgb)
  },
  changeColor (newColor) {
    var options = {
      newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
      changeUrl (cssUrl) {
        return `${process.env.VUE_APP_BASE_URL}${cssUrl}` // while router is not `hash` mode, it needs absolute path
      }
    }
    return client.changer.changeColor(options, Promise)
  }
}