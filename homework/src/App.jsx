
import React from 'react'
import { TodoElementList } from './components/TodoElementsList/TodoElementList';
import { TodoElementFormModal } from './components/TodoElementFormModal/TodoElementFormModal';
import './App.css';
import {selectIsAddElementModalVisible} from "./rdx/app/selector";
import {useSelector} from "react-redux";

const App = () => {

  const isAddElementModalVisible = useSelector(selectIsAddElementModalVisible);

  return (
    <div>
      <TodoElementList/>
      {isAddElementModalVisible ? (
        <TodoElementFormModal/>) : null}
    </div>
  );
}

export default App;
