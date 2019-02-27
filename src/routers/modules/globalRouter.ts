/**
 * 全局路由(无需嵌套布局)
 */

const Login = (r: any) => (require as any).ensure([], () => r(require('@/views/login/Login'), 'Login'));
const NotFound = (r: any) => (require as any).ensure([], () => r(require('@/views/common/404'), 'NotFound'));
const BlogHead = (r: any) => (require as any).ensure([], () => r(require('@/components/header/BlogHead'), 'BlogHead'));
const BlogFooter = (r: any) => (require as any).ensure([], () => r(require('@/components/footer/BlogFooter'), 'BlogFooter'));


const globalRouter = [
  {
    path: '/login', name: 'loginLink', component: Login, meta: {title: '登录'},
  },
  {
    path: '/head', name: 'headLink', component: BlogHead, meta: {title: '页头'},
  },
  {
    path: '/footer', name: 'footerLink', component: BlogFooter, meta: {title: '页脚'},
  },
  {
    path: '/404', name: 'notFoundLink', component: NotFound, meta: {title: '404'},
  },
];


export default globalRouter;
