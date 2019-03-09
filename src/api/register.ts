import { _post } from '@/utils/request';

// 注册
export const register = (data: any) => {
  const req = {
    data,
    url: '/blog/passport/register',
  };
  return _post(req);
};
