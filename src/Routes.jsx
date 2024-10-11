import React from 'react';
import { Route, Routes } from 'react-router';
import App from './App';
import TelaActivity from './components/TelaActivity';
import TelaHome from './components/TelaHome';

const routes = () => {
  return (
      <Routes>
        <Route path="/" element={<TelaHome />}></Route>
        <Route path="/activity" element={<TelaActivity />}></Route>
    </Routes>
  );
};

export default routes;
