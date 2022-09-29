import React, {useState, useCallback, useMemo} from 'react';

import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button } from '@mui/material';

import './TodoElementFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {selectEditItemId, selectIsAddElementModalVisible} from "../../rdx/app/selector";
import {selectTodoData} from "../../rdx/todoList/selector";
import {hideFormModal} from "../../rdx/app/actions";
import {addTodoItem, editTodoItem} from "../../rdx/todoList/actions";

export const TodoElementFormModal = () => {
  const isAddElementModalVisible = useSelector(selectIsAddElementModalVisible)
  const editItemId = useSelector(selectEditItemId);
  const todoData = useSelector(selectTodoData);

  const element = useMemo(() => {
    if (!editItemId) {
      return null;
    }
    return todoData.find(e => e.id === editItemId)
  }, [todoData, editItemId]);


  const [description, setDescription] = useState(element ? element.description : '');
  const [when, setWhen] = useState(element ? element.when : '');
  const [priority, setPriority] = useState(element ? element.priority : '');
  const dispatch = useDispatch();

  const onCloseClick = useCallback(
      () => {
        dispatch(hideFormModal())
      },
      [dispatch],
  );

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

  const onButtonClick = useCallback(() => {
    if (element) {
      dispatch(editTodoItem({
        ...element,
        description,
        when,
        priority,
      }))
    } else {
      dispatch(addTodoItem({
        description,
        when,
        priority,
      }));
    }
    dispatch(hideFormModal());
  }, [element, dispatch, description, when, priority]);

  return (
      <Dialog open={isAddElementModalVisible} onClose={onCloseClick}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter data to add an item
          </DialogContentText>
          <TextField id="standard-basic" margin="dense" fullWidth label="Description" variant="standard" onChange={onDescriptionChange} value={description} />
          <TextField id="standard-basic" margin="dense" fullWidth label="When" variant="standard" onChange={onWhenChange} value={when} />
          <TextField id="standard-basic" margin="dense" fullWidth label="Priority" variant="standard" onChange={onPriorityChange} value={priority} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onButtonClick} size="small">Save</Button>
          <Button onClick={onCloseClick} size="small">Close</Button>
        </DialogActions>
      </Dialog>
  )
}

TodoElementFormModal.defaultProps = {
  onAddElement: () => {},
  onCloseClick: () => {},
}

