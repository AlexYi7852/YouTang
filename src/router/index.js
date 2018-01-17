import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '../page/home/index'

// 课程介绍
import Curriculum from '../page/curriculum/index'
// 介绍
import china from '../page/china'
import landscape from '../page/china/landscape'
import story from '../page/china/story'
import newchina from '../page/china/newchina'
import art from '../page/china/art'
import chinafood from '../page/china/chinafood'
import folk from '../page/china/folk'
import poetry from '../page/china/poetry'
import recite from '../page/china/recite'

// 客户端下载
import Client from '../page/client/index'

// 登录
import Login from '../page/login'
// --------------------------------------------
// 学生页面
import Study from '../page/study'
import MyCourse from '../page/study/mycourse'
import Complete from '../page/study/children/complete'
import Undone from '../page/study/children/undone'
import MyScore from '../page/study/myscore'
import NewComplete from '../page/study/children/newComplete'
import NewUndone from '../page/study/children/newUndone'

// 预约
import Reservation from '../page/reservation/index'
import OneByOne from '../page/reservation/children/onebyone'
import OneByFour from '../page/reservation/children/onebyfour'
import FirstEval from '../page/reservation/children/firstEval'

// 设置个人信息
import Usercenter from '../page/usercenter'

// 购买中心
import Cart from '../page/cart'
import Four from '../page/cart/children/four'
import One from '../page/cart/children/one'

// 有偿信息
import Information from '../page/information/index'
// 注册会员
import registerVIP from '../page/information/registerVIP'
// --------------------------------------------

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/cn'
    },
    //首页
    {
      path: '/cn',
      component: Home
    },
    //客户端下载
    {
      path: '/client',
      component: Client
    },
    // 有偿信息
    {
      path: '/information',
      component: Information
    },
    {
      path: '/registerVIP',
      component: registerVIP
    },
    //课程体系
    {
      path: '/curriculum',
      component: Curriculum
    },
    //登录
    {
      path: '/login',
      component: Login
    },
    //个人信息
    {
      path: '/usercenter',
      component: Usercenter
    },
    //购买中心
    {
      path: '/cart',
      component: Cart,
      redirect: '/cart/four',
      children:[{
        path: 'one',
        component: One
      },
      {
        path: 'four',
        component: Four
      }]
    },
    //学生界面
    {
      path: '/study',
      component: Study,
      redirect: '/study/mycourse',
      children: [{
        path: 'mycourse',
        component: MyCourse,
        redirect: '/study/mycourse/undone',
        children: [
          {
            path: 'complete',
            component: Complete
          },
          {
            path: 'undone',
            component: Undone
          },
          {
            path: 'newComplete',
            component: NewComplete
          },
          {
            path: 'newUndone',
            component: NewUndone
          }
        ]
      },
        {
          path: 'myscore',
          component: MyScore
        }
      ]
    },
    {
      path: '/reservation',
      component: Reservation,
      // redirect: '/reservation/oneByOne',
      children: [
        {
          path: 'firstEval',
          component: FirstEval
        },
        {
          path: 'oneByOne',
          component: OneByOne
        },
        {
          path: 'oneByFour',
          component: OneByFour
        }
      ]
    },
    //介绍
    {
      path: '/china',
      component: china,
      redirect: '/china/landscape',
      children: [{
        path: 'landscape',
        component: landscape
      },
        {
          path: 'story',
          component: story
        },
        {
          path: 'newchina',
          component: newchina
        },
        {
          path: 'art',
          component: art
        },
        {
          path: 'chinafood',
          component: chinafood
        },
        {
          path: 'folk',
          component: folk
        },
        {
          path: 'poetry',
          component: poetry
        },
        {
          path: 'recite',
          component: recite
        }]
    }
  ]
})
