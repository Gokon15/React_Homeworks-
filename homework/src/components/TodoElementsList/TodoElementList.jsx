import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { TodoElement } from '../TodoElement/TodoElement';
import { TodoAddElement } from '../TodoElement/TodoAddElement';
import './TodoElementList.css'
import {arraySearch} from "../../utils/search";



export const TodoElementList = ({ data, onAddClick, onRemoveElement, onEditElement, onDoneElement, onProgressElement }) => {


  const [filter, setFilter] = useState(data);

  useEffect(() => {
    setFilter(data)
  },[data]);

  const handleOnChange =  (e) => {
    let value = e.target.value;
    if (value.length > 1) {
      let search =  arraySearch(filter, value);
      setFilter(search)
    } else {
      setFilter(data)
    }
  }

  const sortByCreationDate = () =>{
    console.log(filter)
    const sortedData = filter.sort(
        (objA, objB) => Date.parse(objB.creation_date) - Date.parse(objA.creation_date),
    );
    console.log(sortedData)
    setFilter(sortedData)
  }


  return (
      <div className='elementList'>
      <input type="text"  placeholder="Search Filter" onChange={handleOnChange}/>
      <button onClick={sortByCreationDate}>Sort by update date</button>
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