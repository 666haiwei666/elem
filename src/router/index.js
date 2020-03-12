import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Business from 'components/business/business'
import preview from 'components/preview/preview'
import products from 'components/products/products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: products
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    },
    {
      path: '/products',
      name: 'Products',
      component: products
    },
    {
      path: '/preview',
      name: 'Preview',
      component: preview
    }
  ]
})
