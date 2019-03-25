/**
 * Home首页路由
 */
import adminRouter from '@/routers/modules/adminRouter';

const Home = (r: any) => (require as any).ensure([], () => r(require('@/views/home/Home'), 'Home'));
const About = (r: any) => (require as any).ensure([], () => r(require('@/views/about/About'), 'About'));

const ArticleListMain = (r: any) => (require as any).ensure([], () => r(require('@/views/articleListMain/ArticleListMain'), 'ArticleListMain'));
const ArticleContentMain = (r: any) => (require as any).ensure([], () => r(require('@/views/articleContentMain/ArticleContentMain'), 'ArticleContentMain'));

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
    {
      path: '/about', name: 'aboutLink', component: About, meta: {title: '关于'},
    },
    ...adminRouter,
  ],
}];


export default homeRouter;
