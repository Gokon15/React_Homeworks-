export const GET_GOODS_LIST_REQUEST = 'GET_GOODS_LIST_REQUEST';
export const GET_GOODS_LIST_SUCCESS = 'GET_GOODS_LIST_SUCCESS';
export const GET_GOODS_LIST_FAILED = 'GET_GOODS_LIST_FAILED';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILED = 'CREATE_ITEM_FAILED';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILED = 'REMOVE_ITEM_FAILED';

export const EDIT_ITEM_REQUEST = 'EDIT_ITEM_REQUEST';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAILED = 'EDIT_ITEM_FAILED';

export const SET_FILTER = 'SET_FILTER';

export const removeItemFailed = (error, itemId) => ({
  type: REMOVE_ITEM_FAILED,
  error: error,
  itemId,
});

export const removeItemRequest = (itemId) => ({
  type: REMOVE_ITEM_REQUEST,
  itemId,
});

export const removeItemSuccess = (itemId) => ({
  type: REMOVE_ITEM_SUCCESS,
  itemId,
});

export const createItemFailed = (error,) => ({
  type: CREATE_ITEM_FAILED,
  error: error,
});

export const createItemRequest = () => ({
  type: CREATE_ITEM_REQUEST
});

export const createItemSuccess = (item) => ({
  type: CREATE_ITEM_SUCCESS,
  item,
});

export const getGoodsListFailed = error => ({
  type: GET_GOODS_LIST_FAILED,
  error: error,
});

export const getGoodsListRequest = () => ({
  type: GET_GOODS_LIST_REQUEST
});

export const getGoodsListSuccess = (list) => ({
  type: GET_GOODS_LIST_SUCCESS,
  list,
});

export const editItemFailed = (error, item) => ({
  type: EDIT_ITEM_FAILED,
  error: error,
  item,
});

export const editItemRequest = (item) => ({
  type: EDIT_ITEM_REQUEST,
  item
});

export const editItemSuccess = (item) => ({
  type: EDIT_ITEM_SUCCESS,
  item,
});

export const setFilterAction = (filter) => ({
  type: SET_FILTER,
  filter,
});