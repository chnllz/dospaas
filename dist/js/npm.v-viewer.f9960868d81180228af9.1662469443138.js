(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["npm.v-viewer"],{6944:function(e,t,n){(function(t,o){e.exports=o(n("c82c"),n("a026"))})(0,(function(e,t){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function o(){var e={},t=!1,n=0,i=arguments.length;function r(n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t&&"[object Object]"===Object.prototype.toString.call(n[i])?e[i]=o(!0,e[i],n[i]):e[i]=n[i])}for("[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);n<i;n++){var u=arguments[n];r(u)}return e}t["a"]=o},function(e,n){e.exports=t},function(e,t,n){"use strict";var o=n(0),i=n.n(o),r=n(1),u=n(2),c=n.n(u),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.images,o=void 0===t?[]:t,u=e.options,a=void 0===u?{}:u;a=n.i(r["a"])(a,{inline:!1});var s=c.a.extend({render:function(e){return e("div",{style:{display:"none"},class:["__viewer-token"]},o.map((function(t){return e("img",{attrs:"string"===typeof t?{src:t}:t})})))}}),d=new s;d.$mount(),document.body.appendChild(d.$el);var f=new i.a(d.$el,a),l=f.destroy.bind(f);return f.destroy=function(){return l(),d.$destroy(),document.body.removeChild(d.$el),f},f.show(),d.$el.addEventListener("hidden",(function(){this.viewer===f&&f.destroy()})),f};t["a"]=a},function(e,t,n){"use strict";(function(e){var o=n(0),i=n.n(o),r=n(7),u=(n.n(r),n(2)),c=n.n(u),a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.name,u=void 0===o?"viewer":o,a=t.debug,s=void 0!==a&&a;function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];c.a.nextTick((function(){o&&!f(e)||(n||!e["$"+u]?(v(e),e["$"+u]=new i.a(e,t),y("Viewer created")):(e["$"+u].update(),y("Viewer updated")))}))}function f(e){var t=e.innerHTML.match(/<img([\w\W]+?)[\\/]?>/g),n=t?t.join(""):void 0;return e.__viewerImageDiffCache===n?(y("Element change detected, but image(s) has not changed"),!1):(y("Image change detected"),e.__viewerImageDiffCache=n,!0)}function l(t,n,o,i){h(t);var r=e.MutationObserver||e.WebKitMutationObserver||e.MozMutationObserver;if(r){var u=new r((function(e){e.forEach((function(e){y("Viewer mutation:"+e.type),o(t,n,i,!0)}))})),c={attributes:!0,childList:!0,characterData:!0,subtree:!0};u.observe(t,c),t.__viewerMutationObserver=u,y("Observer created")}else y("Observer not supported")}function p(e,t,n,o){var i=t.expression,r=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;i&&r.test(i)?(e.__viewerUnwatch=n.context.$watch(i,(function(t,n){y("Change detected by watcher: ",i),o(e,t,!0)}),{deep:!0}),y("Watcher created, expression: ",i)):y("Only simple dot-delimited paths can create watcher")}function v(e){e["$"+u]&&(e["$"+u].destroy(),delete e["$"+u],y("Viewer destroyed"))}function h(e){e.__viewerMutationObserver&&(e.__viewerMutationObserver.disconnect(),delete e.__viewerMutationObserver,y("Observer destroyed"))}function w(e){e.__viewerUnwatch&&(e.__viewerUnwatch(),delete e.__viewerUnwatch,y("Watcher destroyed"))}function y(){var e;s&&(e=console).log.apply(e,arguments)}var b={bind:function(e,t,o){y("Viewer bind");var i=n.i(r["debounce"])(50,d);i(e,t.value),p(e,t,o,i),t.modifiers.static||l(e,t.value,i,t.modifiers.rebuild)},unbind:function(e,t){y("Viewer unbind"),h(e),w(e),v(e)}};return b};t["a"]=a}).call(t,n(9))},function(e,t,n){var o=n(10)(n(8),n(11),null,null);o.options.__file="/Volumes/public/Workspace/web/v-viewer/src/component.vue",o.esModule&&Object.keys(o.esModule).some((function(e){return"default"!==e&&"__esModule"!==e}))&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] component.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n(0),r=n.n(i),u=n(5),c=n.n(u),a=n(4),s=n(3);n.d(t,"component",(function(){return c.a})),n.d(t,"directive",(function(){return a["a"]})),n.d(t,"api",(function(){return s["a"]})),n.d(t,"Viewer",(function(){return r.a})),t["default"]={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.name,u=void 0===i?"viewer":i,d=t.debug,f=void 0!==d&&d,l=t.defaultOptions;r.a.setDefaults(l),e.component(u,n.i(o["a"])(c.a,{name:u})),e.directive(u,n.i(a["a"])({name:u,debug:f})),e.prototype["$"+u+"Api"]=s["a"]},setDefaults:function(e){r.a.setDefaults(e)}}},function(e,t,n){var o,i,r,u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};(function(n,c){"object"===u(t)&&"undefined"!==typeof e?c(t):(i=[t],o=c,r="function"===typeof o?o.apply(t,i):o,void 0===r||(e.exports=r))})(0,(function(e){"use strict";function t(e,t,n,o){var i,r=!1,u=0;function c(){i&&clearTimeout(i)}function a(){c(),r=!0}function s(){for(var a=arguments.length,s=new Array(a),d=0;d<a;d++)s[d]=arguments[d];var f=this,l=Date.now()-u;function p(){u=Date.now(),n.apply(f,s)}function v(){i=void 0}r||(o&&!i&&p(),c(),void 0===o&&l>e?p():!0!==t&&(i=setTimeout(o?v:p,void 0===o?e-l:e)))}return"boolean"!==typeof t&&(o=n,n=t,t=void 0),s.cancel=a,s}function n(e,n,o){return void 0===o?t(e,n,!1):t(e,o,!1!==n)}e.debounce=n,e.throttle=t,Object.defineProperty(e,"__esModule",{value:!0})}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n.n(o);t["default"]={props:{images:{type:Array},rebuild:{type:Boolean,default:!1},trigger:{},options:{type:Object}},data:function(){return{}},computed:{},methods:{onChange:function(){this.rebuild?this.rebuildViewer():this.updateViewer()},rebuildViewer:function(){this.destroyViewer(),this.createViewer()},updateViewer:function(){this.$viewer?(this.$viewer.update(),this.$emit("inited",this.$viewer)):this.createViewer()},destroyViewer:function(){this.$viewer&&this.$viewer.destroy()},createViewer:function(){this.$viewer=new i.a(this.$el,this.options),this.$emit("inited",this.$viewer)}},watch:{images:function(){var e=this;this.$nextTick((function(){e.onChange()}))},trigger:{handler:function(){var e=this;this.$nextTick((function(){e.onChange()}))},deep:!0},options:{handler:function(){var e=this;this.$nextTick((function(){e.rebuildViewer()}))},deep:!0}},mounted:function(){this.createViewer()},destroyed:function(){this.destroyViewer()}}},function(e,t){var n,o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(i){"object"===("undefined"===typeof window?"undefined":o(window))&&(n=window)}e.exports=n},function(e,t){e.exports=function(e,t,n,o){var i,r=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(i=e,r=e.default);var c="function"===typeof r?r.options:r;if(t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns),n&&(c._scopeId=n),o){var a=Object.create(c.computed||null);Object.keys(o).forEach((function(e){var t=o[e];a[e]=function(){return t}})),c.computed=a}return{esModule:i,exports:r,options:c}}},function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._t("default",null,{images:e.images,options:e.options})],2)},staticRenderFns:[]},e.exports.render._withStripped=!0}])}))}}]);