import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home.vue"
const Car = () =>import('../views/Car.vue')
const Quotation = () =>import('../views/Quotation.vue')
const MyImg = () =>import('../views/myImg.vue')
const MyColor=()=>import('../views/myColor.vue')
const Type= () =>import('../views/Type.vue')

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path:'/car/:id',
      name:'car',
      component:Car
    },{
      path:'/quotation',
      name:'quotation',
      component:Quotation
    },{
      path:'/myImg',
      name:'MyImg',
      component:MyImg
    },{
      path:'/myColor',
      name:'myColor',
      component:MyColor
    },{
      path:'/type',
      name:'type',
      component:Type
    }
  ]
})
