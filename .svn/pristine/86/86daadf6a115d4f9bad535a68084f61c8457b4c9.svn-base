import { UserLayout } from '@/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [ {
  path: '/user',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [ {
    path: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/admin/Index/Login'),
    meta: {
      requireLogin: false
    }
  } ]
}, {
  path: '/CustomPage',
  component: () => import('@/views/admin/Common/CustomPage')
}, {
  path: '/LoadPage',
  component: () => import('@/views/admin/Common/CustomPage'),
  meta: {
    requireLogin: false
  }
}, {
  path: '/404',
  component: () => import('@/views/admin/Exception/404')
}]
