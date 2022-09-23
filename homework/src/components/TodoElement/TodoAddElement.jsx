import React from 'react';
import PropTypes from 'prop-types';


import './TodoElement.css';

export const TodoAddElement = ({ onAddClick }) => {

  return (
    <div className="element addElement elementsContainer" onClick={onAddClick}>
      ADD
    </div>
  )
}

TodoAddElement.propTypes = {
  onAddClick: PropTypes.func.isRequired,
}