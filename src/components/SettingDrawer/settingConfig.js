// import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';
import themeColor from './themeColor.js'

// let lessNodesAppended

const colorList = [
  {
    key: '薄暮', color: '#F5222D', headColor: 'linear-gradient(90deg, #a8071a, #cf1322, #f5222d)'
  },
  {
    key: '火山', color: '#FA541C', headColor: 'linear-gradient(90deg, #ad2102, #d4380d, #fa541c)'
  },
  {
    key: '日暮', color: '#FAAD14', headColor: 'linear-gradient(90deg, #ad4e00, #d46b08, #fa8c16)'
  },
  {
    key: '明青', color: '#13C2C2', headColor: 'linear-gradient(90deg, #006d75, #08979c, #13c2c2)'
  },
  {
    key: '极光绿', color: '#52C41A', headColor: 'linear-gradient(90deg, #237804, #389e0d, #52c41a)'
  },
  {
    key: '拂晓蓝（默认）', color: '#1890FF', headColor: 'linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff)'
  },
  {
    key: '极客蓝', color: '#2F54EB', headColor: 'linear-gradient(90deg, #10239e, #1d39c4, #2f54eb)'
  },
  {
    key: '酱紫', color: '#722ED1', headColor: 'linear-gradient(90deg, #391085, #531dab, #722ed1)'
  }
]

const updateTheme = newPrimaryColor => {
  // const hideMessage = message.loading('正在切换主题！', 0)
  themeColor.changeColor(newPrimaryColor).finally(t => {
    // setTimeout(() => {
    //   // hideMessage()
    // }, 10)
  })
}

/*
const updateTheme = primaryColor => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } * /
  // Determine if the component is remounted
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          hideMessage()
        })
    }, 200)
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}
*/

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  const app = document.body.querySelector('#app')
  colorWeak ? app.classList.add('colorWeak') : app.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
