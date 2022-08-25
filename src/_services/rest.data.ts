import store from '@/store';
import { ALERT_ERROR } from '@/store/actions/alert';
import axios from 'axios';

// intercepting responses
axios.interceptors.response.use(
  function (res) {
    // Do something with response data
    return res;
  },
  function (err) {
    switch (err.response.status) {
      case 400:
        store.commit(ALERT_ERROR, { title: '', mess: store.getters.locale.http400_er });
        break;
      case 401:
        store.commit(ALERT_ERROR, { title: '', mess: store.getters.locale.http401_er });
        break;
      case 403:
        store.commit(ALERT_ERROR, { title: '', mess: store.getters.locale.http403_er });
        break;
      case 404:
        if (err.response.data === 'referal') {
          store.commit(ALERT_ERROR, { title: store.getters.locale.reg_reg, mess: store.getters.locale.http404ref_er });
        } else {
          if (err.response.data === 'user') {
            store.commit(ALERT_ERROR, { title: store.getters.locale.log_log, mess: store.getters.locale.http404user_er });
          } else {
            if (err.response.data === 'receiver') {
              store.commit(ALERT_ERROR, { title: store.getters.locale.menu_pays, mess: store.getters.locale.http404receiver_er });
            } else {
              store.commit(ALERT_ERROR, { title: 'Error 404', mess: err.message + '. ' + err.response.data });
            }
          }
        }
        break;
      case 405:
        store.commit(ALERT_ERROR, { title: '', mess: err.response.data });
        break;
      case 406:
        store.commit(ALERT_ERROR, { title: '', mess: err.response.data });
        break;
      case 409:
        if (err.response.data.type === 'register') {
          store.commit(ALERT_ERROR, { title: store.getters.locale.reg_reg, mess: err.response.data.mess });
        } else {
          if (err.response.data.type === 'changepass') {
            store.commit(ALERT_ERROR, { title: store.getters.locale.cpass_name, mess: err.response.data.mess });
          } else {
            if (err.response.data.type === 'partnerbecome') {
              store.commit(ALERT_ERROR, { title: store.getters.locale.header_partnerbecome, mess: err.response.data.mess });
            } else {
              store.commit(ALERT_ERROR, { title: '', mess: err.response.data.mess });
            }
          }
        }
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        store.commit(ALERT_ERROR, { title: '', mess: store.getters.locale.http500_er });
        break;
      default:
        store.commit(ALERT_ERROR, { title: '', mess: err.message });
        break;
    }
    return Promise.reject(err);
  }
);

export const authenticate = (user: string, pass: string, idempotencykey: string): Promise<any> => {
  const formData = new FormData();
  formData.append('user', user);
  formData.append('pass', pass);
  return axios.post('/api/login', formData, {
    headers: {
      'x-idempotency-key': `${idempotencykey}`
    }
  });
}
export const regconfirm = (data: any, file: any, idempotencykey: string): Promise<any> => {
  const formData = new FormData();
  formData.append('passscan', file);
  formData.append('data', JSON.stringify(data));
  return axios.post('/api/register', formData, {
    headers: {
      'x-idempotency-key': `${idempotencykey}`
    }
  });
}
export const regcheck = (data: any, idempotencykey: string): Promise<any> => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  return axios.post('/api/register', formData, {
    headers: {
      'x-idempotency-key': `${idempotencykey}`
    }
  });
}
export const checkref = (refer: string): Promise<any> => {
  const params = { 'refer': refer };
  return axios.get<any>('/api/refer', { params });
}
export const media = (list: any = {}): Promise<any> => {
  const params: { [k: string]: any } = {};
  for (const key of Object.keys(list)) {
    if (list[key]) {
      if (list[key] instanceof Array) {
        list[key].forEach((item: any) => {
          params[`${key.toString()}[]`] = item;
        });
      } else {
        params[key.toString()] = list[key];
      }
    }
  }
  return axios.get<any>('/api/media', { params });
}
export const download = (path: string, token: string): Promise<any> => {
  return axios.get(window.location.origin + path, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
    }, responseType: 'blob'
  });
}
export const get = (url: string, list: any = {}, token: string): Promise<any> => {
  const params: { [k: string]: any } = {};
  for (const key of Object.keys(list)) {
    if (list[key]) {
      if (list[key] instanceof Array) {
        list[key].forEach((item: any) => {
          params[`${key.toString()}[]`] = item;
        });
      } else {
        params[key.toString()] = list[key];
      }
    }
  }
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }, params
  });
}
export const getfile = (url: string): Promise<any> => {
  return axios.get(url);
}
const formdata = (model: any): any => {
  const formData = new FormData();
  for (const key of Object.keys(model)) {
    if (model[key]) {
      if (model[key] instanceof Array) {
        model[key].forEach((item: any) => {
          formData.append(`${key.toString()}[]`, item);
        });
      } else {
        formData.append(key.toString(), model[key]);
      }
    }
  }
  return formData;
}
export const update = (url: string, model: any, idempotencykey: string, token: string): Promise<any> => {
  const formData = formdata(model);
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`, 'x-idempotency-key': `${idempotencykey}`
    }
  });
}
export const getblob = (url: string, model: any, token: string): Promise<any> => {
  const formData = formdata(model);
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }, responseType: 'blob' as 'json'
  });
}

/*
const mocks = {
  'auth': { POST: { token: "This-is-a-mocked-token" } },
  'user/me': { GET: { name: "doggo", title: "sir" } }
};

const apiCall = ({ url, method }: { url: any, method: any }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log(`Mocked '${url}' - ${method || "GET"}`);
        if (url === 'auth'){
          resolve(mocks["auth"].POST);
          console.log("response: ", mocks["auth"]);
        } else {
          resolve(mocks["user/me"].GET);
          console.log("response: ", mocks["user/me"]);
        }                
      } catch (err: any) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default apiCall;*/
