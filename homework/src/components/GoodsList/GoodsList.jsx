import React, {useEffect, useState, useCallback, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CircularProgress, TextField} from '@mui/material';

import { GoodsItemCard } from './GoodsItemCard';
import {selectGoodsToDisplay, selectIsDataLoading} from "../../rdx/goods/selectors";
import {useDebounce} from "../hooks/useDebounce";
import {fetchGoodsThunk} from "../../rdx/goods/thunks";
import {setFilterAction} from "../../rdx/goods/actions";
import {useSearchParams} from "react-router-dom";


export const GoodsList = () => {
  const dispatch = useDispatch();
  const goods = useSelector(selectGoodsToDisplay);
  const isDataLoading = useSelector(selectIsDataLoading);
  const debounce = useDebounce();
  const [filterByTitle, setFilterByTitle] = useState('');
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort');
  console.log('sortType: ', sortType);
  console.log('goods: ', goods);


  useEffect(() => {
    dispatch(fetchGoodsThunk());
  }, [dispatch]);

  const dataToDisplay = useMemo(() => {

    if(!sortType) {
      return goods;
    }

    return [...goods].sort((a, b) => {
      if(a[sortType] > b[sortType]) {
        return 1;
      } else if(a[sortType] < b[sortType]) {
        return -1;
      } else if (sortType === 'weightDesc') {
        if(a['weight'] < b['weight']) {
          return 1;
        } else if(a['weight'] > b['weight']) {
          return -1;
        }
      }
      return 0
    })
  }, [goods, sortType])

  const onFilterChangeByTitle = useCallback((event) => {
    setFilterByTitle(event.target.value);
    debounce(() => {
      dispatch(setFilterAction(event.target.value));
    });
  }, [dispatch,debounce]);


  if (isDataLoading) {
    return <CircularProgress color="success" />;
  }
  const styles = {
    filters: {
      margin: '0px 10px 0px 10px',
    }
  }

  return (
    <>
      <TextField  sx={styles.filters}
        id="standard-basic"
        size = 'small'
        name='description' 
        label="Search by Title"
        variant="standard" 
        onChange={onFilterChangeByTitle}
        value={filterByTitle}
      />
      {dataToDisplay.map((item, index) => <GoodsItemCard item={item} key={item.id} index={index} />)}
    </>
  );
};