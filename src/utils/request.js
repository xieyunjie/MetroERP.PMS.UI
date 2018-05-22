import fetch from 'dva/fetch';
import qs from 'querystring';

// function parseJSON(response) {
//   return response.json();
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }

async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const res = await response.json();

  return res;
}

export default {
  get: async function (url, params) {
    const opt = {
      method: 'GET'
    }
    if (params) {
      url = url + "?" + qs.stringify(params);
    }

    return request(url, opt);
  },
  post: async function (url, body) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
    

    const opt = {
      method: 'POST', 
      headers:myHeaders,
      body:null
    }
    if (body) { 
      opt.body = qs.stringify(body);
    }  
    return request(url, opt);
  },

  request:async function (url, options) {
    return  request(url, options);
  }
}
