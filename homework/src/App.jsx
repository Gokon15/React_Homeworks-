import { v4 as uuidv4 } from 'uuid';

import React, { useState, useCallback } from 'react'
import { TodoElementList } from './components/TodoElementsList/TodoElementList';
import { TodoElementFormModal } from './components/TodoElementFormModal/TodoElementFormModal';
import './App.css';

const initialData = [
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

const App = () => {
  const [data, setData] = useState(initialData);
  const [elementToEdit, setElementToEdit] = useState(null);
  const [isAddElementModalVisible, setIsAddElementModalVisible] = useState(false);
  let date = new Date().toLocaleString();
  const [dateOfCreation,setDateOfCreation] = useState(date);

  const onAddElement = useCallback((element) => {
    setData([
      ...data,
      {
        ...element,
        id: uuidv4(),
        status: "Open",
        creation_date: new Date().toLocaleString() ,
        update_date: '',
      }
    ])
    setIsAddElementModalVisible(false);
  }, [data]);

  const onEditElement = useCallback((element) => {
    setData(data.map(e => {
      if (e.id === element.id) {
        return { ...element, update_date: new Date().toLocaleString()  };
      }
      return e;
    }))
    setIsAddElementModalVisible(false);
  }, [data]);

  const onStartEditElement = useCallback((id) => {
    setElementToEdit(data.find(e => e.id === id));
    setIsAddElementModalVisible(true);
  }, [data]);

  const onRemoveElement = useCallback((id) => {
    setData(data.filter(e => e.id !== id));
  }, [data]);

  const onDoneElement = useCallback((id) => {
     setData( data.map(obj =>
         obj.id === id ? { ...obj, status: "Done", update_date: new Date().toLocaleString()  } : obj));
  }, [data]);

  const onProgressElement = useCallback((id) => {
    setData( data.map(obj =>
        obj.id === id ? { ...obj, status: "In progress", update_date: new Date().toLocaleString() } : obj));
  }, [data]);

  const showModal = useCallback(() => {
    setIsAddElementModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsAddElementModalVisible(false);
  }, []);



  return (
    <div>
      <TodoElementList 
        data={data} 
        onAddClick={showModal} 
        onRemoveElement={onRemoveElement}
        onEditElement={onStartEditElement}
        onDoneElement = {onDoneElement}
        onProgressElement = {onProgressElement}
      />
      {isAddElementModalVisible ? (
        <TodoElementFormModal 
          onAddElement={onAddElement}
          onCloseClick={hideModal} 
          onEditElement={onEditElement}
          element={elementToEdit}
        />) : null}
    </div>
  );
}

export default App;
