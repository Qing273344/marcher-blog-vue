import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


// 登录
const Login = (r: any) =>
  (require as any).ensure([], () => r(require('../../views/login/Login'), 'Login'));

const Home = (r: any) =>
  (require as any).ensure([], () => r(require('../../views/Home'), 'Home'));

const About = (r: any) =>
  (require as any).ensure([], () => r(require('../../views/About'), 'About'));

const BlogHead = (r: any) =>
  (require as any).ensure([], () => r(require('../../components/header/BlogHead'), 'BlogHead'));

const BlogFooter = (r: any) =>
  (require as any).ensure([], () => r(require('../../components/footer/BlogFooter'), 'BlogFooter.vue'));


export default new Router({
  // 去掉url中的#号 栗子:localhost:8080/#/
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homeLink',
      component: Home,
      children: [
        {
          path: '/login',
          name: 'loginLink',
          component: Login,
        },
      ],
    },
    {
      path: '/about',
      name: 'aboutLink',
      component: About,
    },
    // {
    //   path: '/login',
    //   name: 'loginLink',
    //   component: Login,
    // },
    {
      path: '/head',
      name: 'headLink',
      component: BlogHead,
    },
    {
      path: '/footer',
      name: 'footerLink',
      component: BlogFooter,
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});
