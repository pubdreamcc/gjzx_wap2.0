// import Vue from 'vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

const router = new VueRouter({
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
      path: '/task',
      component: resolve => require(['../components/Task.vue'], resolve),
      name: 'Task'
    },
    {
      path: '/coursebuy',
      component: resolve => require(['../components/CourseBuy.vue'], resolve),
      name: 'CourseBuy'
    },
    {
      path: '/completetask',
      component: resolve => require(['../components/CompleteTask.vue'], resolve),
      name: 'CompleteTask'
    },
    {
      path: '/mytask',
      component: resolve => require(['../components/MyTask.vue'], resolve),
      name: 'MyTask'
    },
    {
      path: '/mycredit',
      component: resolve => require(['../components/MyCredit.vue'], resolve),
      name: 'MyCredit'
    },
    {
      path: '/myexam',
      component: resolve => require(['../components/MyExam.vue'], resolve),
      name: 'MyExam'
    },
    {
      path: '/examread',
      component: resolve => require(['../components/ExamRead.vue'], resolve),
      name: 'ExamRead'
    },
    {
      path: '/myorder',
      component: resolve => require(['../components/MyOrder.vue'], resolve),
      name: 'MyOrder'
    },
    {
      path: '/doexam',
      component: resolve => require(['../components/DoExam.vue'], resolve),
      name: 'DoExam'
    },
    {
      path: '/coursedetail',
      component: resolve => require(['../components/CourseDetail.vue'], resolve),
      name: 'CourseDetail'
    },
    {
      path: '/myrecord',
      component: resolve => require(['../components/MyRecord.vue'], resolve),
      name: 'MyRecord'
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
