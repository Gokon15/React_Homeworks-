// fetch('http://127.0.0.1:8080/goods', { 
//   method: 'GET',
//   headers: 
//     { 
//       "Content-Type": "application/json"
//     }
//   })
//   .then((response) => response.json())
//   .then((jsonResponse) => {
//     console.log('jsonResponse: ', jsonResponse);
//   })
const baseGoodsUrl = 'http://127.0.0.1:8080';

const commonHeaders = { 
  "Content-Type": "application/json"
}

export const requestGoods = () => {
  return performRequest({ path: 'goods', method: 'GET' })
}

export const createItem = (item) => {
  return performRequest({ path: 'goods', method: 'POST', body: item })
}

export const deleteItem = (itemId) => {
  return performRequest({ path: 'goods/' + itemId, method: 'DELETE'})
}

export const editItem = (item) => {
  return performRequest({ path: 'goods/' + item.id, method: 'PUT', body: item})
}

export const performRequest = async ({ path, method = 'GET', body }) => {
  try {
    const bodyString = body ? JSON.stringify(body) : undefined;
    console.log('request method: ', method);
    console.log('headers: ', commonHeaders);
    console.log('body: ', body);
    const response = await fetch([baseGoodsUrl, path].join('/'), { 
      method,
      headers: commonHeaders,
      body: bodyString,
    });
    if (response.ok) {
      const responseJson = await response.json();
      console.log('Response: ', responseJson);
      return { success: true, response: responseJson };
    } else {
      return {success: false, error: 'Something Went Wrong'};  
    }
  } catch(error) {
    console.log('Something went wrong: ', error);
    return {success: false, error: 'Something Went Wrong'};
  }
}