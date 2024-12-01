import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '@/views/ProductPage.vue'
import CartPage from '@/views/CartPage.vue'
import ProductDetailPage from '@/views/ProductDetailPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  { path: '/products', component: ProductPage },
  { path: '/cart', component: CartPage },
  { path: '/products/:id', component: ProductDetailPage},
  { path: '/', redirect: '/products' },
  { path: '/:pathMatch(.*)*', component: NotFoundPage},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
