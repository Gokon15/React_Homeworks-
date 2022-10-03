import React from 'react';
import { Routes, Route } from "react-router-dom";

import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { DashboardPage } from './components/DashboardPage/DashboardPage';
import { NewItemForm } from './components/NewItemForm/NewItemForm';

import './App.css';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='*' element={<WelcomePage />} />
        <Route path='/app' element={<DashboardPage />} >
          <Route path='edit' element={<NewItemForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
