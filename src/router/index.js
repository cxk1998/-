import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/myfiles',
    component: Layout,
    redirect: '/myfiles/dataTable',
    name: 'Myfiles',
    meta: { title: '我的文件', icon: 'example' },
    children: [
      {
        path: 'dataTable',
        name: 'DataTable',
        component: () => import('@/views/table/index'),
        meta: { title: '数据管理', icon: 'table' }
      },
      {
        path: 'modelTable',
        name: 'ModelTable',
        component: () => import('@/views/table/index'),
        meta: { title: '模型管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/submitTask',
    component: Layout,
    redirect: '/submitTask/modelTrain',
    name: 'SubmitTask',
    meta: { title: '提交任务', icon: 'form' },
    children: [
      {
        path: 'modelTrain',
        name: 'ModelTrain',
        component: () => import('@/views/form/index'),
        meta: { title: '模型训练', icon: 'train' }
      },
      {
        path: 'modelEval',
        name: 'ModelEval',
        component: () => import('@/views/form/index'),
        meta: { title: '模型推导', icon: 'eval' }
      }
    ]
  },

  {
    path: '/taskList',
    component: Layout,
    redirect: '/taskList/trainTask',
    name: 'TaskList',
    meta: { title: '任务列表', icon: 'task' },
    children: [
      {
        path: 'trainTask',
        name: 'TrainTask',
        component: () => import('@/views/task/index'),
        meta: { title: '训练任务', icon: 'train' }
      },
      {
        path: 'evalTask',
        name: 'EvalTask',
        component: () => import('@/views/task/index'),
        meta: { title: '推导任务', icon: 'eval' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
