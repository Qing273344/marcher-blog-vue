export default {
  url: {
    /* 配置了nginx请求代理 */
    basicUrl: process.env.NODE_ENV === 'development' ? 'http://blog.marcher.xin' : 'http://blog.marcher.xin',
  },
};
