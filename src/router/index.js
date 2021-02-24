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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/blob',
    component: Layout,
    redirect: '/blob/articleTable',
    name: 'blob',
    meta: { title: '博客', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'articleTable',
        name: 'articleTable',
        component: () => import('@/views/backEnd/blob/article/index'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'articleTable/addArticle',
        name: 'addArticle',
        hidden: true,
        component: () => import('@/views/backEnd/blob/article/addArticle'),
        meta: { title: '新增文章' }
      },
      {
        path: 'categoryTable',
        name: 'categoryTable',
        component: () => import('@/views/backEnd/blob/category/index'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'categoryTable/addCategory',
        name: 'addCategory',
        hidden: true,
        component: () => import('@/views/backEnd/blob/category/addCategory'),
        meta: { title: '新增分类' }
      },
      {
        path: 'tagsTable',
        name: 'tagsTable',
        component: () => import('@/views/backEnd/blob/tags/index'),
        meta: { title: '标签列表', icon: 'table' }
      },
      {
        path: 'tagsTable/addTags',
        name: 'addTags',
        hidden: true,
        component: () => import('@/views/backEnd/blob/tags/addTags'),
        meta: { title: '新增标签' }
      },
      {
        path: 'commentTable',
        name: 'commentTable',
        component: () => import('@/views/backEnd/blob/comment/index'),
        meta: { title: '评论列表', icon: 'table' }
      },
      {
        path: 'commentTable/addComment',
        name: 'addComment',
        hidden: true,
        component: () => import('@/views/backEnd/blob/comment/addComment'),
        meta: { title: '新增评论' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/userTable',
    name: 'manage',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userTable',
        name: 'userTable',
        component: () => import('@/views/backEnd/manage/user/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'userTable/addUser',
        name: 'addUser',
        hidden: true,
        component: () => import('@/views/backEnd/manage/user/addUser'),
        meta: { title: '新增用户' }
      },
      {
        path: 'roleTable',
        name: 'roleTable',
        component: () => import('@/views/backEnd/manage/role/index'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: 'roleTable/addRole',
        name: 'addRole',
        hidden: true,
        component: () => import('@/views/backEnd/manage/role/addRole'),
        meta: { title: '新增角色' }
      },
      {
        path: 'menuTable',
        name: 'menuTable',
        component: () => import('@/views/backEnd/manage/menu/index'),
        meta: { title: '菜单列表', icon: 'table' }
      },
      {
        path: 'menuTable/addMenu',
        name: 'addMenu',
        hidden: true,
        component: () => import('@/views/backEnd/manage/menu/addMenu'),
        meta: { title: '新增菜单' }
      },
      {
        path: 'resourceTable',
        name: 'resourceTable',
        component: () => import('@/views/backEnd/manage/resource/index'),
        meta: { title: '资源列表', icon: 'table' }
      },
      {
        path: 'resourceTable/addResource',
        name: 'addResource',
        hidden: true,
        component: () => import('@/views/backEnd/manage/resource/addResource'),
        meta: { title: '新增资源' }
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
