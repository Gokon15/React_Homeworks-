import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { TextField , Button} from '@mui/material';

import {TodoElement} from '../TodoElement/TodoElement';
import {TodoAddElement} from '../TodoElement/TodoAddElement';

import './TodoElementList.css'

import {arraySearch} from "../../utils/search";

import {selectTodoData} from "../../rdx/todoList/selector";

import {
    byCreationDate, byUpdateDate,
    doneTodoItem,
    progressTodoItem,
    removeTodoItem,
} from "../../rdx/todoList/actions";
import {showFormModal} from '../../rdx/app/actions';


export const TodoElementList = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectTodoData);
    const [filter, setFilter] = useState(data);
    const [updateByFilter, setUpdateByFilter] = useState(false);
    const handleOnChange = (e) => {
        let value = e.target.value;
        if (value.length > 1) {
            let search = arraySearch(filter, value);
            setFilter(search)
        } else {
            setFilter(data)
        }
    }

    useEffect(() => {
        setFilter(data)
    }, [data]);


    useEffect(() => {
        setFilter(filter)
    }, [filter]);

    const onAddClicked = useCallback(
        () => {
            dispatch(showFormModal())
        },
        [dispatch],
    );

    const onRemoveElement = useCallback(
        (id) => {
            dispatch(removeTodoItem(id))
        },
        [dispatch],
    );

    const onEditElement = useCallback(
        (id) => {
            dispatch(showFormModal(id))
        },
        [dispatch],
    );

    const onDoneElement = useCallback(
        (id) => {
            dispatch(doneTodoItem(id))
        },
        [dispatch],
    );

    const onProgressElement = useCallback(
        (id) => {
            dispatch(progressTodoItem(id))
        },
        [dispatch],
    );

    const sortByCreationDate = useCallback(
        () => {
            dispatch(byCreationDate())
            setUpdateByFilter(!updateByFilter);
        },
        [dispatch, updateByFilter],
    );

    const sortByUpdateDate = useCallback(
        () => {
            dispatch(byUpdateDate())
            setUpdateByFilter(!updateByFilter);
        },
        [dispatch, updateByFilter],
    );

    return (
        <div >
            <div className={"filtration"}>
                <TextField
                    onChange={handleOnChange}
                    id="filled-search"
                    label="Search by status"
                    type="search"
                    variant="standard"
                />
                <Button onClick={sortByCreationDate} variant="contained">Sort by creation date </Button>
                <Button onClick={sortByUpdateDate} variant="contained">Sort by update date</Button>
            </div>
            <div className='elementList'>
            {filter.map(element => <TodoElement element={element} key={element.id}
                                                onRemoveElement={onRemoveElement}
                                                onEditElement={onEditElement}
                                                onDoneElement={onDoneElement}
                                                onProgressElement={onProgressElement}/>)}
            <TodoAddElement onAddClick={onAddClicked}/>
            </div>
        </div>
    )
}
