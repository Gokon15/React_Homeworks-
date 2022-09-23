import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import './TodoElementFormModal.css';

export const TodoElementFormModal = ({ element, onAddElement, onEditElement, onCloseClick }) => {
  const [description, setDescription] = useState(element ? element.description : '');
  const [when, setWhen] = useState(element ? element.when : '');
  const [priority, setPriority] = useState(element ? element.priority : '');

  const onDescriptionChange = useCallback((event) => {
    setDescription(event.target.value);
  }, [])

  const onWhenChange = useCallback((event) => {
    setWhen(event.target.value);
  }, [])

  const onPriorityChange = useCallback((event) => {
    if (event.target.value.length === 0) {
      setPriority('');
    }

    const number = parseInt(event.target.value);
    if (isNaN(number) || number < 0 || number > 2) {
      return;
    }

    setPriority(number);
  }, [])

  const onSaveClickHandler = useCallback(() => {
    if (element) {
      onEditElement({
        ...element,
        description,
        when,
        priority,
      });
      return;
    } 
    onAddElement({
      description,
      when,
      priority,
    })
  }, [onAddElement, description, when, priority, onEditElement, element]);

  return (
    <div className="form">
      <div className="input">
        <label htmlFor="desc">Description</label>
        <input id="desc" onChange={onDescriptionChange} value={description} maxLength={100} />
      </div>
      <div className="input">
        <label htmlFor="when">When</label>
        <input id="when" onChange={onWhenChange} value={when} maxLength={100}/>
      </div>
      <div className="input">
        <label htmlFor="priority">Priority</label>
        <input id="priority" onChange={onPriorityChange} value={priority} maxLength={1} />
      </div>
      <div className="buttonContainer">
        <button onClick={onSaveClickHandler}>Save</button>
        <button onClick={onCloseClick}>Close</button>
      </div>
    </div>
  )
}

TodoElementFormModal.defaultProps = {
  onAddElement: () => {},
  onCloseClick: () => {},
}

TodoElementFormModal.propTypes = {
  onAddElement: PropTypes.func,
  onEditElement: PropTypes.func,
  onCloseClick: PropTypes.func,
  element: PropTypes.shape({
    description: PropTypes.string,
    when: PropTypes.string,
    priority: PropTypes.number,
    done: PropTypes.bool,
  }),
}