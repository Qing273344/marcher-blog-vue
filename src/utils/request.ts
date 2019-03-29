import * as Axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';

import config from '@/config/envConfig';
import { ResponseBean } from '@/bean/common/ResponseBean';
import { Message } from 'element-ui';

let responseBean = new ResponseBean();


/**
 * -------------------------------------------------------------------------------------------------------------------- axios config
 */
// api请求的baseURL
const baseURL = config.url.basicUrl;
// json格式请求
const axios = Axios.default.create({
  baseURL,
  timeout: 0,
  withCredentials: true, // 允许跨域 cookie
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  maxContentLength: 2000,
});

// key-value格式请求
const kyAxios = Axios.default.create({
  baseURL,
  timeout: 0,
  withCredentials: true, // 允许跨域 cookie
  maxContentLength: 2000,
});


/**
 * -------------------------------------------------------------------------------------------------------------------- 响应拦截器
 */
axios.interceptors.response.use((response: AxiosResponse): any => {
  return responseSuccess(response);
}, (error: AxiosError): any => {
  return requestFail(error);
});

kyAxios.interceptors.response.use((response: AxiosResponse): any => {
  return responseSuccess(response);
}, (error: AxiosError): any => {
  return requestFail(error);
});

/**
 * 请求成功
 * @param response  响应数据
 */
function responseSuccess(response: AxiosResponse) {
  responseBean = response.data;
  // 数据正确
  if (responseBean.status.code === 0) {

    // 若没有分页则返回data
    if (!responseBean.page) {
      return responseBean.data;
    }
    return response;
  }
  response.status = responseBean.status.code;
  return responseHint(responseBean);
}

/**
 * 请求失败
 */
function requestFail(error: AxiosError) {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误(400)';
        break;
      case 401:
        error.message = '未授权, 请重新登录(401)';
        break;
      case 403:
        error.message = '拒绝访问(403)';
        break;
      case 404:
        error.message = '404';
        break;
      case 500:
        error.message = '服务器出错(500)';
        break;
      case 501:
        error.message = '网络未实现(501)';
        break;
      case 502:
        error.message = '网络错误(502)';
        break;
      case 503:
        error.message = '服务不可用(503)';
        break;
      case 504:
        error.message = '网络超时(504)';
        break;
      case 505:
        error.message = 'http版本不支持该请求(504)';
        break;
      default:
        error.message = '连接出错(${error.response.status})';
    }
  } else {
    error.message = '服务器出错, 请稍后重试!';
  }
  Message({message: error.message, type: 'error', duration: 3 * 1000});
  return Promise.reject(error);
}

/**
 * 服务器返回非success
 * @param responseBean  返回的数据, 其中code!=0
 */
function responseHint(responseBean: ResponseBean) {
  Message({message: responseBean.status.msg, type: 'warning', duration: 2 * 1000});
  throw new Error();
  // return Promise.resolve(responseBean.status.msg);
}


/**
 * -------------------------------------------------------------------------------------------------------------------- 请求
 */
export const _get = (req: any) => {
  return kyAxios.get(req.url, {params: req.data});
};

export const _post = (req: any) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data});
};

export const _put = (req: any) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data});
};

export const _delete = (req: any) => {
  return axios({method: 'delete', url: `/${req.url}`, data: req.data});
};
