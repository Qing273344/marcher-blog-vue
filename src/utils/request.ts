import Axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';

import EnvConfig from '@/config/envConfig';
import { ResponseBean } from '@/bean/common/ResponseBean';
import { Message } from 'element-ui';
import { UserModule } from '@/store/modules/user';
import { ContentTypeEnum } from '@/commons/enums/ContentTypeEnum';
import PageUtil from '@/utils/pageUtil';
import { RequestBean } from '@/bean/common/RequestBean';

let responseBean = new ResponseBean();

/**
 * ------------------------------------------------------------------------------------------------------- axios config
 */
// api请求的baseURL
const baseURL = EnvConfig.basicUrl;
const axios = Axios.create({
  baseURL,
  timeout: 6000,
  withCredentials: true, // 允许跨域 cookie
  maxContentLength: 2000,
});


/**
 * ---------------------------------------------------------------------------------------------------------- 响应拦截器
 */
axios.interceptors.response.use((response: AxiosResponse): any => {
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
  if (responseBean.code === 0) {
    // 若没有分页则返回 data
    if (responseBean.data && responseBean.data.totalRow) {
      const page = new PageUtil();
      page.totalRow = Number.parseFloat(responseBean.data.totalRow);
      page.pageNo = responseBean.data.pageCurrent;
      page.pageSize = responseBean.data.pageSize;
      responseBean.page = page;
      return responseBean;
    }
    return responseBean.data;
  }
  response.status = responseBean.code;
  responseHint(responseBean);
}

/**
 * 请求失败
 */
function requestFail(error: AxiosError) {
  if (error && error.response) {
    // 后端提示的异常
    let msg = '';
    if (error.response.data.code) {
      msg = error.response.data.message;
    }

    switch (error.response.status) {
      case 400:
        error.message = msg ? msg : '请求错误(400)';
        break;
      case 401:
        // error.message = '未授权, 请重新登录(401)';
        error.message = msg ? msg : '未授权, 请重新登录(401)';
        break;
      case 403:
        error.message = '是想访问么? 让我想想...';
        break;
      case 404:
        error.message = '404';
        break;
      case 500:
        error.message = msg ? msg : '服务器出错(500)';
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
  // 未登录
  if (responseBean.code === 10 || responseBean.code === 401) {
    // 未登录初始化用户信息
    UserModule.INIT_USER_INFO();
    responseBean.message = '登录后才可以悄悄的干坏事哟!';
  }

  Message({message: responseBean.message, type: 'warning', duration: 2 * 1000});
  return false;
  // throw new Error();
}


/**
 * ---------------------------------------------------------------------------------------------------------------- 请求
 */
export const get = (reqs: RequestBean) => request(reqs);
export const post = (reqs: RequestBean) => request(reqs, ContentTypeEnum.JSON);
export const postForm = (reqs: RequestBean) => request(reqs, ContentTypeEnum.FORM);
export const postFile = (reqs: RequestBean) => request(reqs, ContentTypeEnum.FILE);


const request = (reqs: RequestBean, contentType: ContentTypeEnum | null = null) => {
  const data = reqs.data;
  if (!contentType) {
    return axios.get(reqs.url, {params: reqs.data});
  } else if (ContentTypeEnum.FORM === contentType) {
    return axios({method: 'post', url: `/${reqs.url}`, data: qs.stringify(data), headers: {'Content-Type': contentType}});
  } else {
    return axios({method: 'post', url: `/${reqs.url}`, data, headers: {'Content-Type': contentType}});
  }
};
