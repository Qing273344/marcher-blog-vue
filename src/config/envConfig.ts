export default class EnvConfig {

  public static basicUrl = process.env.NODE_ENV === 'development' ? 'http://dev.blog-api.marcher.xin' : 'https://blog-api.marcher.xin';

  // url: {
  //   // 配置了 nginx 请求代理
  //   basicUrl: process.env.NODE_ENV === 'development' ? 'http://dev.blog-api.marcher.xin' : 'https://blog-api.marcher.xin',
  // },
}

