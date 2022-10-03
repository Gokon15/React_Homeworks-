import { SHOW_FORM_MODAL, HIDE_FORM_MODAL } from './actions';

const initialState = {
  isAddElementModalVisible: false,
  editItemId: null,
  config: {
    mode: 'dark',
    language: 'ua',
    currency: 'UAH',
  },
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FORM_MODAL: 
      return {
        ...state,
        isAddElementModalVisible: true,
        editItemId: action.editItemId,
      }
    case HIDE_FORM_MODAL:
      return {
        ...state,
        isAddElementModalVisible: false,
      }
    default:
      return state;
  }
}