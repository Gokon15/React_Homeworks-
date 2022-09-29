import React from 'react';
import PropTypes from 'prop-types';


import './TodoElement.css';
import {Card,Box , CardContent, Typography} from "@mui/material";

export const TodoAddElement = ({ onAddClick }) => {
    const styles = {
        cardContent: {
            width: '300px',
            height: '200px',
        },

    }
  return (
    <div className="element addElement elementsContainer" onClick={onAddClick}>
        <Box>
            <Card>
                <CardContent sx={styles.cardContent}>
                    <Typography className={'typographyExtraStyle'} color="text.secondary">ADD</Typography>
                </CardContent>
            </Card>
        </Box>
    </div>
  )
}

TodoAddElement.propTypes = {
  onAddClick: PropTypes.func.isRequired,
}