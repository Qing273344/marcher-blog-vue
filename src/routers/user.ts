import userRouter from 'vue-router'

// 登录
const Login = (r: any) =>
  (require as any).ensure([], () => r(require('@/views/login/Login'), 'Login'));

export default  {

}
