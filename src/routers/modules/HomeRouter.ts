/**
 * Home 首页路由
 */
import adminRouter from '@/routers/modules/AdminRouter';

const Home = (r: any) => (require as any).ensure([], () => r(require('@/views/home/Home.vue'), 'Home'));

const ArticleListMain = (r: any) => (require as any).ensure([], () => r(require('@/views/articleListMain/ArticleListMain.vue'), 'ArticleListMain'));
const ArticleContentMain = (r: any) => (require as any).ensure([], () => r(require('@/views/articleContentMain/ArticleContentMain.vue'), 'ArticleContentMain'));

const homeRouter = [{
  path: '/',
  redirect: {name: 'articleListMainLink'},
  name: 'homeLink',
  component: Home,
  children: [
    {
      path: '/articleListMain', name: 'articleListMainLink', component: ArticleListMain, meta: {title: '博客列表内容主体'},
    },
    {
      path: '/articleContentMain', name: 'articleContentMainLink', component: ArticleContentMain, meta: {title: '博客内容主体'},
    },
    ...adminRouter,
  ],
}];


export default homeRouter;
