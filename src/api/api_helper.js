import objectAssign from 'object-assign';
import axios from 'axios';
let api;
const rest = function (url, ...val) {
  val.forEach((v) => {
    if (Array.isArray(v)) {
      v.forEach((i) => {
        url += `/${i}`;
      });
    } else {
      url += `/ ${v}`;
    }
  });
  return url;
};
const filterParams = (params) => {
  let res = {};
  Object.keys(params).forEach((key) => {
    if (params[key] || params[key] === 0 || params[key] === false) {
      res[key] = params[key]
    }
  })
  return res;
}

/*设置请求参数axios的ajax请求对象*/
function getParam(params) {
  let str = '';
  for (let key in params) {
    str += key + '=' + params[key] + '&'
  }
  str = str.substring(0, str.length - 1);
  return str
}

const assignParams = function (obj, params) {
  if (obj.isFormData && ['post', 'put', 'patch'].indexOf(obj.method) >= 0) {
    obj.data = getParam(params);
  } else if (['get', 'delete', 'head'].indexOf(obj.method) >= 0) {
    obj.url = `${obj.url}?${getParam(params)}`;
  } else {
    obj.data = params;
  }
  return obj;
};
const requestApi = function (obj, params, otherParams) {
  if (!obj.method) {
    obj.method = 'get';
  }
  if (otherParams && otherParams.restUrl) {
    obj.url += '/' + otherParams.restUrl
  }
  if (typeof params === 'string' || typeof params === 'number') {
    obj.url += '/' + params
    params = null
  }
  if (localStorage.AccessToken) {
    obj.headers = {Authorization: localStorage.AccessToken}
  }
  if (params) {
    if (Array.isArray(params)) {
      if (obj.method === 'get') {
        obj.url = rest(obj.url, params);
      }
      obj.data = params;
      // if (otherParams) {
      //   obj = assignParams(obj, otherParams);
      // }
    } else {
      params = filterParams(params);
      obj = assignParams(obj, params);
    }
  }
  const p = axios.request(obj);
  return Promise.resolve(p).then(v => new Promise((resolve) => {
    if (v.data.code !== 2 && v.data.code) {
      console.error("状态有误", v.data, obj.url)
      return;
    }
    if (api.defaultErrorHandler) {
      const handleResult = api.defaultErrorHandler(v.data);
      if (!handleResult) {
        return;
      }
    }
    resolve(v);
  })).catch(err => new Promise((resolve, reject) => {
    // if (err.response.status === 401 && obj.url !== '/api/authenticate') {
    //   localStorage.AccessToken = '';
    //   window.location.href = window.location.origin
    // } else if (err.response.status === 504 || err.response.status === 500) {
    // }
    reject(err);
  }));
};
const requestApi2 = function (obj, params, otherParams) {
  const p = requestApi(obj, params, otherParams);
  return Promise.resolve(p).then(v => new Promise((resolve, reject) => {
    if (v.data.success) {
      resolve(v.data);
    } else {
      if (api.defaultErrorHandler) {
        const handleResult = api.defaultErrorHandler(v.data);
        if (!handleResult) {
          return;
        }
      }
      reject(v.data);
    }
  })).catch(err => new Promise((resolve, reject) => {
    reject(err);
  }));
};
const defineReq = function (obj, commonSettings) {
  if (obj.url) {
    obj = objectAssign({}, obj, commonSettings);
    obj.request = (params, otherParams) =>
      requestApi(objectAssign({}, obj), params, otherParams);
    obj.req = (params, otherParams) => requestApi2(objectAssign({}, obj), params, otherParams);
  }
  /* eslint-disable no-restricted-syntax*/
  for (const property in obj) {
    /*eslint-disable */
    if (obj.hasOwnProperty(property) && typeof obj[property] === 'object') {
      obj[property] = defineReq(obj[property], commonSettings);
    }
  }
  return obj;
};


const defineApi = function (apiObj, commonSettings) {
  const newObj = objectAssign({}, apiObj);
  api = defineReq(newObj, commonSettings);
  return api;
};
export const define = defineApi;

