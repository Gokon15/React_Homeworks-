import React, {useMemo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import { getColorFromPriority } from '../../utils/elementsUtils';

import './TodoElement.css';

export const  TodoElement = ({  element, onEditElement = () => {}, onRemoveElement = () => {}, onDoneElement = () => {}, onProgressElement = () => {}   }) => {

  const additionalCardStyle = useMemo(() => {
    return { backgroundColor: getColorFromPriority(element.priority) }
  }, [element.priority])

  const onRemoveClick = useCallback(() => {
    onRemoveElement(element.id)
  }, [element.id, onRemoveElement])

  const onEditClick = useCallback(() => {
    onEditElement(element.id)
  }, [element.id, onEditElement])

  const onDoneClick = useCallback(() => {
    onDoneElement(element.id)
  }, [element.id, onDoneElement])

  const onProgressClick = useCallback(() => {
    onProgressElement(element.id)
  }, [element.id, onProgressElement])


  return (
    <div style={additionalCardStyle} className="element">
      <div className="elementsContainer">
        <div>
          {element.description}
        </div>
        <div>
          {element.when}
        </div>
        <div>
          {element.status}
        </div>
        <div>
          {element.creation_date}
        </div>
        <div>
          {element.update_date}
        </div>

      </div>
      <div className="buttonContainer">
        <button onClick={onDoneClick}>DONE</button>
        <button onClick={onProgressClick}>In progress</button>
        <button onClick={onRemoveClick}>Remove</button>
        <button onClick={onEditClick}>Edit</button>
      </div>
    </div>
  )
}

TodoElement.propTypes = {
  element: PropTypes.shape({
    description: PropTypes.string,
    when: PropTypes.string,
    priority: PropTypes.number,
    done: PropTypes.bool,
  }),
  onEditElement: PropTypes.func,
  onRemoveElement: PropTypes.func,
  onDoneClick: PropTypes.func,
}