import Taro from '@tarojs/taro';
import Tips from './tips';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

const API_BASE_URL = 'http://192.168.0.108:1888';

/**
 * http request 请求
 * @param {http method} method
 * @param {*} requestHandler
 */
export async function request(url, option) {
    const options = {
        ...option
    };
    const defaultOptions = {
        credentials: 'include'
    };
    const newOptions = { ...defaultOptions, ...options };

    newOptions.headers = {
        ...newOptions.headers,
        // 客户端认证
        Authorization: `Basic bGVnYWw6bGVnYWxfc2VjcmV0`
    };

    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData) && !(newOptions.body instanceof RequestForm)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                ...newOptions.headers
            };
            // newOptions.body = JSON.stringify(newOptions.body);
        } else if (newOptions.body instanceof RequestForm) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                ...newOptions.headers
            };
            // newOptions.body = newOptions.body.parse();
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                ...newOptions.headers
            };
        }
    }

    //token鉴权
    //   const token = Taro.getStorageSync('sword-token')
    const token =
        'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEsMTEyMzU5ODgxNzczODY3NTIwMyIsInVzZXJfaWQiOiIxMTIzNTk4ODIxNzM4Njc1MjAxIiwicm9sZV9pZCI6IjExMjM1OTg4MTY3Mzg2NzUyMDEiLCJ1c2VyX25hbWUiOiLnrqHnkIblkZgiLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjEwMDAiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJsZWdhbCIsImV4cCI6MTYzMTI3Nzg0OSwibmJmIjoxNjMxMTkxNDQ4fQ.swPsAsKkpqbVlqTJJjVNCr4Tj3CMljazibF9Qa-nA3MuwLvnRshbKS0Y5OKh3I_f41CYJzqN0qFjWIQdcXtxVw';
    if (token) {
        newOptions.headers = {
            ...newOptions.headers,
            'Blade-Auth': token
        };
    }

    /*//注意：可以对params签名等处理
  let params = requestHandler.params
  params = apiParamSign(params)
  let closeLoading = requestHandler.closeLoading*/

    /*if (!closeLoading) {
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
  }*/

    const checkStatus = (response) => {
        if (
            (response.code >= 200 && response.code < 300) ||
            response.code === 400 ||
            response.code === 500
        ) {
            return;
        }
        const errortext = codeMessage[response.code] || response.code;
        // 错误通知
        const error = new Error(errortext);
        error.name = response.code.toString();
        // throw error;
        console.log('error', JSON.stringify(error));
    };

    const checkCode = (response) => {
        if (response.code && response.code === 401) {
            // RootNavigation.replace("Login", {});
            console.log('checkCode', codeMessage[401]);
        }
    };

    const success = function (res, resolve) {
        console.log('URL：', API_BASE_URL + url);
        console.log('REQUEST SUCCESS,DATA IS：', JSON.stringify(res.data));
        if (res.data.success) {
            resolve(res.data);
        }
        /*console.log('request success!')
console.log(res.data)
if (!closeLoading) {
Taro.hideLoading()
}
if (res.data.status == 'success') {
requestHandler.success(res.data)
} else if (res.data.status == 'error') {
//错误回调处理
requestHandler.fail()
Taro.showToast({
  title: res.data.msg,
  icon: 'none'
})
} else {
//请他情况当成失败处理
requestHandler.fail()
}*/
    };

    const fail = function (res, reject) {
        Tips.toast('mniha');
        console.log('URL：', API_BASE_URL + url);
        console.log('REQUEST FAIL,DATA IS：', JSON.stringify(res.data));
        reject('网络请求错误');
        /*console.log('request failed!')
if (!closeLoading) {
Taro.hideLoading()
}
//错误回调处理
requestHandler.fail()*/
    };

    //print info
    const complete = function (res) {
        checkStatus(res.data);
        checkCode(res.data);
    };

    return new Promise((resolve, reject) => {
        Taro.request({
            url: API_BASE_URL + url,
            data: newOptions.body,
            method: newOptions.method,
            responseType: 'text',
            credentials: newOptions.credentials,
            header: newOptions.headers,
            mode: 'no-cors',
            success: (res) => success(res, resolve),
            fail: (res) => fail(res, reject),
            complete
        });
    });
}
