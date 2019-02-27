import * as Axios from 'axios';
import {AxiosError, AxiosResponse} from 'axios';

import config from '@/config/envConfig';
import {ResponseBean} from '@/bean/common/ResponseBean';
import {Message} from 'element-ui';

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
    'X-Requested-With': 'XMLHttpRequest',
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
  requestFail();
  return Promise.resolve(error);
});

kyAxios.interceptors.response.use((response: AxiosResponse): any => {
  return responseSuccess(response);
}, (error: AxiosError): any => {
  requestFail();
  return Promise.resolve(error);
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
    return responseBean;
  }
  return responseHint(responseBean);
}

/**
 * 请求失败
 */
function requestFail() {
  Message({message: '服务器出错, 请稍后重试!', type: 'error', duration: 5 * 1000});
}

/**
 * 服务器返回非success
 * @param responseBean  返回的数据, 其中code!=0
 */
function responseHint(responseBean: ResponseBean) {
  Message({message: responseBean.status.msg, type: 'warning', duration: 5 * 1000});
  return Promise.resolve(responseBean);
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
