<template>
  <a-icon :component="svg"></a-icon>
</template>
<script>
import storage from '@/utils/storage'
export default {
  data () {
    return {
      svg: {
        template: `<svg t="1639648071074" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5648" width="200" height="200"><path d="M758.560512 68.191078 265.439488 68.191078c-54.490032 0-98.130971 44.134173-98.130971 98.624205l-0.493234 788.993638L512 807.872614l345.184717 147.936307L857.184717 166.815283C857.184717 112.325251 813.04952 68.191078 758.560512 68.191078z" p-id="5649" fill="${storage.get('DEFAULT_COLOR')}"></path></svg>`
        // template: `<svg t="1639648972057" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11188" width="200" height="200"><path d="M791.272727 89.041455C791.272727 0 698.181818 0 698.181818 0L325.818182 0c0 0-93.090909 0-93.090909 89.041455L232.727273 1024l279.272727-267.124364L791.272727 1024 791.272727 89.041455z" p-id="11189" fill="#1296db"></path></svg>`
      }
    }
  }
}
</script>
