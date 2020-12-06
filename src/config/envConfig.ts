export default class EnvConfig {

  // public static basicUrl = process.env.NODE_ENV === 'development' ? 'http://dev.blog-api.marcher.xin' : 'https://blog-api.marcher.xin';
  // public static basicUrl = process.env.NODE_ENV === 'development' ? 'http://b-api-dev.marcher.xin' : 'http://b-api.marcher.xin';
  public static basicUrl = process.env.NODE_ENV === 'development' ? 'http://blog-api.aiwangchen.com' : 'http://blog-api.aiwangchen.com';
}

