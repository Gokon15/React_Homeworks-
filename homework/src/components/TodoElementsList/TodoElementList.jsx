import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { TodoElement } from '../TodoElement/TodoElement';
import { TodoAddElement } from '../TodoElement/TodoAddElement';
import './TodoElementList.css'
import {arraySearch} from "../../utils/search";



export const TodoElementList = ({ data, onAddClick, onRemoveElement, onEditElement, onDoneElement, onProgressElement }) => {


  const [filter, setFilter] = useState(data);
  const [updateByFilter, setUpdateByFilter] = useState(false);

  useEffect(() => {
    setFilter(data)
  },[data]);

  useEffect(() => {
    setFilter(filter)
  },[updateByFilter]);

  const handleOnChange =  (e) => {
    let value = e.target.value;
    if (value.length > 1) {
      let search =  arraySearch(filter, value);
      setFilter(search)
    } else {
      setFilter(data)
    }
  }

  const sortByCreationDate = () => {
    const sortedData = filter.sort(
        (objA, objB) => Date.parse(objB.creation_date) - Date.parse(objA.creation_date),
    );
    setFilter(sortedData)
    setUpdateByFilter(!updateByFilter);
  }
  const sortByUpdateDate = () => {
    const sortedData = filter.sort(
        (objA, objB) => Date.parse(objB.update_date) - Date.parse(objA.update_date),
    );
    setFilter(sortedData)
    setUpdateByFilter(!updateByFilter);
  }

  return (
      <div className='elementList'>
        <div>
          <input type="text"  placeholder="Search by status" onChange={handleOnChange}/>
          <button onClick={sortByCreationDate}>Sort by creation date</button>
          <button onClick={sortByUpdateDate}>Sort by update date</button>
        </div>
      {filter.map(element => <TodoElement element={element} key={element.id}
                                        onRemoveElement={onRemoveElement}
                                        onEditElement={onEditElement}
                                        onDoneElement = {onDoneElement}
                                        onProgressElement = {onProgressElement} />)}
      <TodoAddElement onAddClick={onAddClick} />
    </div>
  )
}

TodoElementList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    when: PropTypes.string,
    priority: PropTypes.number,
    done: PropTypes.bool,
  })),
  onAddClick: PropTypes.func.isRequired,
  onRemoveElement: PropTypes.func.isRequired,
  onEditElement: PropTypes.func.isRequired,
}