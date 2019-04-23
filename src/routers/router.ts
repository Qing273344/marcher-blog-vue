/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */

import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from '@/routers/modules/homeRouter';
import globalRouter from '@/routers/modules/globalRouter';

Vue.use(Router);

/**
 * 路由模块化后在此处引入
 */
const router = new Router({
  // 去掉url中的#号 栗子:localhost:8080/#/
  mode: 'history',
  routes: [
    /**
     * 全局router
     */
    ...globalRouter,
    /**
     * home主页router
     */
    ...homeRouter,

    /**
     * 进行最后拦截
     */
    {
      path: '/*',
      redirect: '/404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 若跳转的router为null, 则跳至首页
  if (!to.name) {
    router.push({name: '/'});
  }
  next();
});

export default router;

