/**
 * 全局路由(无需嵌套布局)
 */

const BlogHead = (r: any) => (require as any).ensure([], () => r(require('@/components/header/BlogHead.vue'), 'BlogHead'));
const BlogMain = (r: any) => (require as any).ensure([], () => r(require('@/components/main/BlogMain.vue'), 'BlogMain'));
const BlogFooter = (r: any) => (require as any).ensure([], () => r(require('@/components/footer/BlogFooter.vue'), 'BlogFooter'));
const Login = (r: any) => (require as any).ensure([], () => r(require('@/views/login/Login.vue'), 'Login'));
const Register = (r: any) => (require as any).ensure([], () => r(require('@/views/register/Register.vue'), 'Register'));

const PublishMd = (r: any) => (require as any).ensure([], () => r(require('@/views/adminArticlePublish/PublishMd.vue'), 'PublishMd'));
const NotFound = (r: any) => (require as any).ensure([], () => r(require('@/views/common/404.vue'), 'NotFound'));


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
    path: '/publishMd', name: 'publishMdLink', component: PublishMd, meta: {title: '发布文字(md编辑器)'},
  },
  {
    path: '/404', name: 'notFoundLink', component: NotFound, meta: {title: '404'},
  },
];


export default globalRouter;
