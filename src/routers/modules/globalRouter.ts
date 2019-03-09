/**
 * 全局路由(无需嵌套布局)
 */

const BlogHead = (r: any) => (require as any).ensure([], () => r(require('@/components/header/BlogHead'), 'BlogHead'));
const BlogMain = (r: any) => (require as any).ensure([], () => r(require('@/components/main/BlogMain'), 'BlogMain'));
const BlogFooter = (r: any) => (require as any).ensure([], () => r(require('@/components/footer/BlogFooter'), 'BlogFooter'));
const Login = (r: any) => (require as any).ensure([], () => r(require('@/views/login/Login'), 'Login'));
const Register = (r: any) => (require as any).ensure([], () => r(require('@/views/register/Register'), 'Register'));
const NotFound = (r: any) => (require as any).ensure([], () => r(require('@/views/common/404'), 'NotFound'));


const globalRouter = [
  {
    path: '/head', name: 'headLink', component: BlogHead, meta: {title: '页头'},
  },
  {
    path: '/main', name: 'mainLink', component: BlogMain, meta: {title: '页身'},
  },
  {
    path: '/footer', name: 'footerLink', component: BlogFooter, meta: {title: '页脚'},
  },
  {
    path: '/login', name: 'loginLink', component: Login, meta: {title: '登录'},
  },
  {
    path: '/register', name: 'registerLink', component: Register, meta: {title: '注册'},
  },
  {
    path: '/404', name: 'notFoundLink', component: NotFound, meta: {title: '404'},
  },
];


export default globalRouter;
