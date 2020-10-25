export default class EnvConfig {

  public static basicUrl = process.env.NODE_ENV === 'development' ? 'http://dev.blog-api.marcher.xin' : 'https://blog-api.marcher.xin';

}

