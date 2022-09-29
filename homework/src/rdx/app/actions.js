export const SHOW_FORM_MODAL = 'SHOW_FORM_MODAL';
export const HIDE_FORM_MODAL = 'HIDE_FORM_MODAL';

export const showFormModal = (id) => {
  return {
    type: SHOW_FORM_MODAL,
    editItemId: id,
  }
}

export const hideFormModal = () => {
  return {
    type: HIDE_FORM_MODAL,
  }
}