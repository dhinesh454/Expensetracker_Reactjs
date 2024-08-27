import React from 'react';
import Switch from '@mui/material/Switch';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { expenseAction } from '../store/expense';

export default function ToggleSwitch() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.expenses.isDarkTheme);

  const handleChange = (event) => {
    dispatch(expenseAction.darkModeToogle());
  };

  return (
    <div>
      <Form.Label className='m-1 fw-bold fst-italic text-dark'>
        {isDarkTheme ? 'Switch to LightTheme' : 'Switch to DarkMode'}
      </Form.Label>
      <Switch
        checked={isDarkTheme} // Ensures the switch reflects the state
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </div>
  );
}
