import {_get, _post, _delete} from '@/utils/request';

// 登录
export const login = (data: any) => {
  const req = {
    data,
    url: 'blog/passport/login',
  };
  return _post(req);
};

// 获取用户信息
export const userInfo = (data: any) => {
  const req = {
    data,
    url: 'blog/user/info',
  };
  return _get(req);
};
