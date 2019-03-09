/**
 * Home首页路由
 */

const Home = (r: any) => (require as any).ensure([], () => r(require('@/views/home/Home'), 'Home'));
const About = (r: any) => (require as any).ensure([], () => r(require('@/views/about/About'), 'About'));


const homeRouter = [{
  path: '/',
  redirect: {name: 'aboutLink'},
  name: 'homeLink',
  component: Home,
  children: [
    {
      path: '/about', name: 'aboutLink', component: About, meta: {title: '关于'},
    },
  ],
}];


export default homeRouter;
