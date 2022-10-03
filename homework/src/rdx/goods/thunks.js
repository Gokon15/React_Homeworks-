import { requestGoods, createItem, deleteItem, editItem } from '../../services/goodsService';
import { 
  getGoodsListRequest, 
  getGoodsListSuccess, 
  getGoodsListFailed,
  createItemRequest,
  createItemFailed,
  createItemSuccess,
  removeItemRequest,
  removeItemFailed,
  removeItemSuccess,
  editItemRequest,
  editItemFailed,
  editItemSuccess,
} from './actions';

export const fetchGoodsThunk = () => {
  return async (dispatch) => {
    dispatch(getGoodsListRequest());
    const response = await requestGoods();
    if (response.success) {
      dispatch(getGoodsListSuccess(response.response.goods));
    } else {
      dispatch(getGoodsListFailed(response.error));
    }
  };
};

export const createItemThunk = (item) => {
  return async (dispatch) => {
    dispatch(createItemRequest());
    const response = await createItem(item);
    if (response.success) {
      dispatch(createItemSuccess(response.response));
    } else {
      dispatch(createItemFailed(response.error));
    }
  };
};

export const deleteItemThunk = (itemId) => {
  return async (dispatch) => {
    dispatch(removeItemRequest(itemId));
    const response = await deleteItem(itemId);
    if (response.success) {
      dispatch(removeItemSuccess(itemId));
    } else {
      dispatch(removeItemFailed(response.error, itemId));
    }
  };
};

export const editItemThunk = (item) => {
  return async (dispatch) => {
    dispatch(editItemRequest(item));
    const response = await editItem(item);
    if (response.success) {
      dispatch(editItemSuccess(item));
    } else {
      dispatch(editItemFailed(response.error, item));
    }
  };
};