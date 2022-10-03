import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { createItemThunk } from '../../rdx/goods/thunks';
import { selectIsDataAdding } from '../../rdx/goods/selectors';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    maxWidth: '300px',
  }
};
export const NewItemForm = () => {
  const { itemId } = useParams();
  const firstFieldRef = useRef(null);

  // const todoData = useSelector(selectTodoData);
  const isLoading = useSelector(selectIsDataAdding);
  const todoData = useCallback(() => {return []}, []) ;
  const navigate = useNavigate();

  const element = useMemo(() => {
    if (!itemId) {
      return null;
    }
    return todoData.find(e => e.id === itemId);
  }, [todoData, itemId]);
  
  const [title, setTitle] = useState(element ? element.title : '');
  const [description, setDescription] = useState(element ? element.description : '');
  const [weight, setWeight] = useState(element ? element.weight : '');

  useEffect(() => {
    console.log('firstFieldRef: ', firstFieldRef.current);
    firstFieldRef?.current.focus();
  }, []);

  useEffect(() => {
    if (element) {
      setDescription(element.description);
      setTitle(element.title);
      setWeight(element.weight);
    } else {
      setDescription('');
      setTitle('');
      setWeight('');
    }
  }, [element]);

  const dispatch = useDispatch();

  const onCloseClick = useCallback(() => {
    navigate('/app');
  }, [navigate]);

  const onDescriptionChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const onTitleChange = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const onWeightChange = useCallback((event) => {
    if (event.target.value.length === 0) {
      setWeight('');
    }

    const number = parseInt(event.target.value);
    if (isNaN(number)) {
      return;
    }

    setWeight(event.target.value);
  }, []);

  const onButtonClick = useCallback(() => {
    dispatch(createItemThunk({
      description,
      title,
      weight,
    }));
  }, [description, dispatch, title, weight]);

  return (
    <Box sx={styles.box}>
      <TextField inputRef={firstFieldRef} id="standard-basic" margin="dense" fullWidth label="Description" variant="standard" onChange={onDescriptionChange} value={description}/>
      <TextField id="standard-basic" margin="dense" fullWidth label="Title" variant="standard" onChange={onTitleChange} value={title} />
      <TextField id="standard-basic" margin="dense" fullWidth label="Weight" variant="standard" onChange={onWeightChange} value={weight} />
      {element ? <Typography variant="caption" component="div">{element.longDescription}</Typography> : null}
      {isLoading ? <CircularProgress color="success" /> : <Button onClick={onButtonClick} size="small">Save</Button>}
      <Button onClick={onCloseClick} size="small">Close</Button>
    </Box>
  );
};
