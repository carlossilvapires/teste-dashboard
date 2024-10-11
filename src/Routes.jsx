import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TelaActivity from './components/TelaActivity';
import TelaHome from './components/TelaHome';
import Login from './components/TelaLogin/Login.jsx';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se o token está no localStorage
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota para a página de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota padrão, redireciona para login se não estiver autenticado */}
      <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      
      {/* Rota para a página inicial (home), protegida */}
      <Route path="/home" element={isAuthenticated() ? <TelaHome /> : <Navigate to="/login" />} />
      
      {/* Rota protegida para "activity" */}
      <Route path="/activity" element={isAuthenticated() ? <TelaActivity /> : <Navigate to="/login" />} />
      
      {/* Redireciona qualquer rota não encontrada para a página de login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
