import { 
  GET_GOODS_LIST_REQUEST, 
  GET_GOODS_LIST_SUCCESS, 
  GET_GOODS_LIST_FAILED,
  CREATE_ITEM_FAILED,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_REQUEST,
  REMOVE_ITEM_FAILED,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_REQUEST,
  EDIT_ITEM_FAILED,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_REQUEST,
  SET_FILTER,
} from './actions';

const initialState = {
  data: [],
  isDataLoading: false,
  isDataAdding: false,
  isItemRemoving: {},
  isItemUpdating: {},
  filter: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ITEM_REQUEST:
    return {
      ...state,
      error: null,
      isDataAdding: true,
    };
  case CREATE_ITEM_SUCCESS:
    return {
      ...state,
      isDataAdding: false,
      data: [...state.data, action.item],
    };
  case CREATE_ITEM_FAILED:
    return {
      ...state,
      isDataAdding: false,
      error: action.error,
    };
  case GET_GOODS_LIST_FAILED:
    return {
      ...state,
      data: [],
      error: action.error,
      isDataLoading: false,
    };
  case GET_GOODS_LIST_REQUEST:
    return {
      ...state,
      error: null,
      isDataLoading: true,
    };
  case GET_GOODS_LIST_SUCCESS:
    return {
      ...state,
      data: action.list,
      isDataLoading: false,
    };
  case REMOVE_ITEM_FAILED:
    return {
      ...state,
      error: action.error,
      isItemRemoving: {
        ...state.isItemRemoving,
        [action.itemId]: false,
      },
    };
  case REMOVE_ITEM_REQUEST:
    return {
      ...state,
      error: null,
      isItemRemoving: {
        ...state.isItemRemoving,
        [action.itemId]: true,
      },
    };
  case REMOVE_ITEM_SUCCESS:
    return {
      ...state,
      data: state.data.filter(i => i.id !== action.itemId),
      isItemRemoving: {
        ...state.isItemRemoving,
        [action.itemId]: false,
      },
    };
  case EDIT_ITEM_FAILED:
    return {
      ...state,
      error: action.error,
      data: state.data.map(i => {
        if (i.id === action.item.id) {
          return {...i};
        }
        return i;
      }),
      isItemUpdating: {
        ...state.isItemUpdating,
        [action.item.id]: false,
      },
    };
  case EDIT_ITEM_REQUEST:
    return {
      ...state,
      error: null,
      isItemUpdating: {
        ...state.isItemUpdating,
        [action.item.id]: true,
      },
    };
  case EDIT_ITEM_SUCCESS:
    return {
      ...state,
      data: state.data.map(i => {
        if (i.id === action.item.id) {
          return action.item;
        }
        return i;
      }),
      isItemUpdating: {
        ...state.isItemUpdating,
        [action.item.id]: false,
      },
    };
  case SET_FILTER:
    return {
      ...state,
      filter: action.filter,
    };
  default:
    return state;
  }
};