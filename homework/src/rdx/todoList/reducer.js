import { v4 as uuidv4 } from 'uuid';
import {
  REMOVE_TODO_ITEM,
  ADD_TODO_ITEM,
  EDIT_TODO_ITEM,
  DONE_TODO_ITEM,
  PROGRESS_TODO_ITEM,
  SORT_BY_CREATION_DATE, SORT_BY_UPDATE_DATE
} from './actions';


const initialState = {
  data: [
    {
      id: uuidv4(),
      description: 'Buy Milk',
      when: 'Tomorrow',
      priority: 1,
      status: "Open",
      creation_date: new Date().toLocaleString(),
      update_date: '',
    },
    {
      id: uuidv4(),
      description: 'Sell ETH',
      when: 'Next week',
      priority: 2,
      status: "Open",
      creation_date: new Date().toLocaleString(),
      update_date: '',
    },
    {
      id: uuidv4(),
      description: 'Visit a doctor',
      when: 'Today',
      priority: 0,
      status: "Open",
      creation_date: new Date().toLocaleString(),
      update_date: '',
    },
  ]
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      return {
        ...state,
        data: [...state.data, action.item],
      }
    case REMOVE_TODO_ITEM:
      return {
        ...state,
        data: state.data.filter(e => e.id !== action.itemId),
      }
    case EDIT_TODO_ITEM: 
      return {
        ...state,
        data: state.data.map(element => {
          if (element.id === action.item.id) {
            return action.item;
          } else {
            return element;
          }
        })
      }
    case DONE_TODO_ITEM:
      return {
        ...state,
        data: state.data.map(obj =>
            obj.id === action.itemId ? { ...obj, status: "Done", update_date: new Date().toLocaleString() } : obj)
      }
    case PROGRESS_TODO_ITEM:
      return {
        ...state,
        data: state.data.map(obj =>
            obj.id === action.itemId ? { ...obj, status: "In progress", update_date: new Date().toLocaleString() } : obj)
      }
    case SORT_BY_CREATION_DATE:
      return {
        ...state,
        data: state.data.sort(
            (objA, objB) => Date.parse(objB.creation_date) - Date.parse(objA.creation_date),
        )
      }
    case SORT_BY_UPDATE_DATE:
      return {
        ...state,
        data:
            state.data.sort(
            (objA, objB) =>  Date.parse(objB.update_date) - Date.parse(objA.update_date)

        )
      }
    default:
      return state;
  }

}

/*if (objA.update_date === '' && objB.update_date === '') {
  objA.update_date === Date.parse('0');
  objB.update_date === Date.parse('0');
}*/
/*
const handleOnChange =  (e) => {
  let value = e.target.value;
  if (value.length > 1) {
    let search =  arraySearch(filter, value);
    setFilter(search)
  } else {
    setFilter(data)
  }
}*/
