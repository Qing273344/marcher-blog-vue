export default {
  url: {
    /* 配置了nginx请求代理 */
    basicUrl: process.env.NODE_ENV === 'development' ? 'http://dev.blog-api.marcher.xin' : 'http://blog-api.marcher.xin',
  },
};

