export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 *生成随机数
 * @param n 生成几个随机数
 */
export function generateRandom (n = 1) {
  var random = function () {
    // 生成10-12位不等的字符串
    return Number(
      Math.random()
        .toString()
        .substr(2)
    ).toString(36) // 转换成十六进制
  }
  var arr = []
  function createId () {
    var num = random()
    var _bool = false
    arr.forEach(v => {
      if (v === num) _bool = true
    })
    if (_bool) {
      createId()
    } else {
      arr.push(num)
    }
  }
  var i = 0
  while (i < n) {
    createId()
    i++
  }
  return n === 1 ? arr[0] : arr // 将生成的转为我们需要的字符串并赋值
}
const cloneObject = function (obj) {
  let newObj = {}
  if (obj instanceof Array) {
    newObj = []
  } else if (typeof obj !== 'object' || !obj) {
    return obj
  }
  for (const key in obj) {
    const val = obj[key]
    newObj[key] = typeof val === 'object' ? cloneObject(val) : val
  }
  return newObj
}
export { cloneObject }
/**
 * 操作表单视图中的tamplte数据
 * @param {*} array template数据
 * @param {*} columnsCallback columnsCallback返回函数
 * @param {*} trsCallback trsCallback返回函数
 * @param {*} tdsCallback tdsCallback返回函数
 * @param {*} listCallback listCallback返回函数
 * 以上返回函数如果有返回值，则终止函数运行
 * @param {*} callback callback主要返回返回函数，主要用于操作template中字段类型
 */
export function handleTemplate (params) {
  const { array } = params
  const paramsY = cloneObject(params)
  for (let i = 0; i < array.length; i++) {
    const index = i
    const temItem = array[index]
    if (temItem.columns) {
      const result = params.columnsCallback && params.columnsCallback(temItem)
      if (result) {
        return result
      }
      paramsY.array = temItem.columns
      handleTemplate(paramsY)
    } else if (temItem.trs) {
      const result = params.trsCallback && params.trsCallback(temItem)
      if (result) {
        return result
      }
      paramsY.array = temItem.trs
      handleTemplate(paramsY)
    } else if (temItem.tds) {
      const result = params.tdsCallback && params.tdsCallback(temItem)
      if (result) {
        return result
      }
      paramsY.array = temItem.tds
      handleTemplate(paramsY)
    } else if (temItem.list) {
      const result = params.listCallback && params.listCallback(temItem)
      if (result) {
        return result
      }
      paramsY.array = temItem.list
      handleTemplate(paramsY)
    } else {
      const result = params.callback && params.callback(temItem)
      if (result) {
        return result
      }
    }
  }
}
