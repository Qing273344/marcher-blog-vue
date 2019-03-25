/**
 * admin Main 管理主页
 */
const AdminMain = (r: any) => (require as any).ensure([], () => r(require('@/views/adminMain/BlogAdminMain'), 'AdminMain'));
const AdminArticle = (r: any) => (require as any).ensure([], () => r(require('@/views/adminArticle/AdminArticle'), 'AdminArticle'));
const AdminType = (r: any) => (require as any).ensure([], () => r(require('@/views/adminType/AdminType'), 'AdminType'));
const AdminTag = (r: any) => (require as any).ensure([], () => r(require('@/views/adminTag/AdminTag'), 'AdminTag'));


const adminRouter = [{
  path: '/adminMain',
  redirect: {name: 'adminArticleLink'},
  name: 'adminMainLink',
  component: AdminMain,
  children: [
    {
      path: '/adminArticle', name: 'adminArticleLink', component: AdminArticle, meta: {title: '管理-文章'},
    },
    {
      path: '/adminType', name: 'adminTypeLink', component: AdminType, meta: {title: '管理-文章类型'},
    },
    {
      path: '/adminTag', name: 'adminTagLink', component: AdminTag, meta: {title: '管理-文章标签'},
    },
  ],
}];

export default adminRouter;
