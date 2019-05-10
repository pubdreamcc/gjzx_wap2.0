import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: resolve => require(['../components/Home.vue'], resolve),
      name: 'Home'
    },
    {
      path: '/forgetpsd',
      component: resolve => require(['../components/ForgetPsd.vue'], resolve),
      name: 'ForgetPsd'
    },
    {
      path: '/scan',
      component: resolve => require(['../components/Scan.vue'], resolve),
      name: 'Scan'
    },
    {
      path: '/coursedetail',
      component: resolve => require(['../components/CourseDetail.vue'], resolve),
      name: 'CourseDetail'
    },
    {
      path: '/examinationregistration',
      component: resolve => require(['../components/ExaminationRegistration.vue'], resolve),
      name: 'ExaminationRegistration'
    },
    {
      path: '/myscore',
      component: resolve => require(['../components/MyScore.vue'], resolve),
      name: 'MyScore'
    },
    {
      path: '/mycourse',
      component: resolve => require(['../components/MyCourse.vue'], resolve),
      name: 'MyCourse'
    },
    {
      path: '/mynotices',
      component: resolve => require(['../components/MyNotices.vue'], resolve),
      name: 'MyNotices'
    },
    {
      path: '/resourcecenter',
      component: resolve => require(['../components/ResourceCenter.vue'], resolve),
      name: 'ResourceCenter'
    },
    {
      path: '/noticedetail',
      component: resolve => require(['../components/NoticeDetail.vue'], resolve),
      name: 'NoticeDetail'
    },
    {
      path: '/mycertificate',
      component: resolve => require(['../components/MyCertificate.vue'], resolve),
      name: 'MyCertificate'
    },
    {
      path: '/changepsd',
      component: resolve => require(['../components/ChangePsd.vue'], resolve),
      name: 'ChangePsd'
    },
    {
      path: '/setting',
      component: resolve => require(['../components/Setting.vue'], resolve),
      name: 'Setting'
    },
    {
      path: '/aboutus',
      component: resolve => require(['../components/AboutUs.vue'], resolve),
      name: 'AboutUs'
    },
    {
      path: '/mine',
      component: resolve => require(['../components/Mine.vue'], resolve),
      name: 'Mine'
    },
    {
      path: '/personinfo',
      component: resolve => require(['../components/PersonInfo.vue'], resolve),
      name: 'PersonInfo'
    },
    {
      path: '/register',
      component: resolve => require(['../components/Register.vue'], resolve),
      name: 'Register'
    },
    {
      path: '/search',
      component: resolve => require(['../components/Search.vue'], resolve),
      name: 'Search'
    },
    {
      path: '/myinfo',
      component: resolve => require(['../components/Myinfo.vue'], resolve),
      name: 'Myinfo'
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Mine') {
    // 登陆/注册就去用户详情页
    if (localStorage.getItem('userID')) {
      router.replace('/myinfo')
    }
  }
  next()
})
export default router
