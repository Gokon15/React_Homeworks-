import { v4 as uuidv4 } from 'uuid';

export const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const EDIT_TODO_ITEM = 'EDIT_TODO_ITEM';
export const DONE_TODO_ITEM = 'DONE_TODO_ITEM';
export const PROGRESS_TODO_ITEM = 'PROGRESS_TODO_ITEM';
export const SORT_BY_CREATION_DATE = 'SORT_BY_CREATION_DATE';
export const SORT_BY_UPDATE_DATE = 'SORT_BY_UPDATE_DATE';


export const addTodoItem = (itemData) => {
  return {
    type: ADD_TODO_ITEM,
    item: {
      ...itemData,
      id: uuidv4(),
      status: "Open",
      creation_date: new Date().toLocaleString() ,
      update_date: '',
    }
  }
}

export const removeTodoItem = (id) => {
  return {
    type: REMOVE_TODO_ITEM,
    itemId: id,
  }
}

export const editTodoItem = (itemData) => {
  return {
    type: EDIT_TODO_ITEM,
    item: itemData,
  }
}

export const doneTodoItem = (id) => {
  return {
    type: DONE_TODO_ITEM,
    itemId: id,
  }
}

export const progressTodoItem = (id) => {
  return {
    type: PROGRESS_TODO_ITEM,
    itemId: id,
  }
}


export const byCreationDate = () => {
  return {
    type: SORT_BY_CREATION_DATE,
  }
}

export const byUpdateDate = () => {
  return {
    type: SORT_BY_UPDATE_DATE,
  }
}

