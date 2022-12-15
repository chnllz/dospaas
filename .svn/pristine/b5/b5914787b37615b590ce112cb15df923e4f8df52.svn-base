<template>
  <user-table-list
    :params="{ templateId: query && query.templateId ? query.templateId : $route.query.templateId }"
    :query="query"
  ></user-table-list>
</template>
<script>
import UserTableList from './UserTableList'
import Vue from 'vue'
Vue.component('UserTableList', UserTableList)
export default {
  props: {
    query: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
