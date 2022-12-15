import { CodeMirror } from 'vue-codemirror'
(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS
    mod(require('codemirror'))
  // eslint-disable-next-line no-undef
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    // eslint-disable-next-line no-undef
    define(['codemirror'], mod)
  } else { // Plain browser env
    mod(CodeMirror)
  }
})(function (CodeMirror) {
  'use strict'

  CodeMirror.defineMode('mymodel', function (config, parserConfig) {
    var jsonldMode = parserConfig.jsonld
    // eslint-disable-next-line no-unused-vars
    var isOperatorChar = /[+\-*&%=<>!?|~^@]/
    function parseWords (str) {
      var obj = {}
      var words = str.split(' ')
      for (var i = 0; i < words.length; ++i) obj[words[i]] = true
      return obj
    }

    // 关键字
    var keywords = parseWords(config.ukeys)

    // eslint-disable-next-line no-unused-vars
    var type, content

    function ret (tp, style, cont) {
      type = tp
      content = cont
      return style
    }

    function tokenBase (stream, state) {
      // eslint-disable-next-line no-unused-vars
      var beforeParams = state.beforeParams
      state.beforeParams = false
      var ch = stream.next()
      if (ch === '"' || ch === "'") {
        state.tokenize = tokenString(ch)
        return state.tokenize(stream, state)
      // eslint-disable-next-line no-useless-escape
      } else if (ch === '.' && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
        return ret('number', 'number')
      } else if (ch === '[') {
        stream.skipTo(']')
        stream.eat(']')
        return ret('string', 'string')
      } else if (/\d/.test(ch)) {
        // eslint-disable-next-line no-useless-escape
        stream.eatWhile(/[\w\.]/)
        return 'number'
      } else {
        stream.string = stream.string.replace(/[^ $a-zA-Z0-9]/g, ' ')
        // eslint-disable-next-line no-useless-escape
        stream.eatWhile(/[\w\$_#{}\xa1-\uffff]/)
        var word = stream.current()
        if (keywords && keywords.propertyIsEnumerable(word)) {
          state.beforeParams = true
          return 'function'
        }

        return null
      }
    }

    function tokenString (quote) {
      return function (stream, state) {
        var escaped = false
        var next
        // eslint-disable-next-line no-undef
        if (jsonldMode && stream.peek() === '@' && stream.match(isJsonldKeyword)) {
          state.tokenize = tokenBase
          return ret('jsonld-keyword', 'meta')
        }
        while ((next = stream.next()) != null) {
          if (next === quote && !escaped) break
          escaped = !escaped && next === '\\'
        }
        if (!escaped) state.tokenize = tokenBase
        return ret('string', 'string')
      }
    }

    return {
      startState: function () {
        return {
          tokenize: tokenBase,
          beforeParams: false,
          inParams: false
        }
      },
      token: function (stream, state) {
        if (stream.eatSpace()) return null
        return state.tokenize(stream, state)
      }
    }
  })

  CodeMirror.registerHelper('hint', 'mymodel', function (cm) {
    // 自动补全
    var hintList = []

    var cur = cm.getCursor()
    var token = cm.getTokenAt(cur)
    var start = token.start
    var end = cur.ch
    var str = token.string

    var list = hintList.filter(function (item) {
      return item.indexOf(str) === 0
    })

    if (list.length) {
      return {
        list: list,
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end)
      }
    }
  })

  CodeMirror.defineMIME('text/x-mymodel', 'mymodel')
})
