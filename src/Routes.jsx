// Routes.js
import { Routes, Route } from 'react-router-dom';
import Login from './components/TelaLogin/Login'; // Importa seu componente de login
import TelaHome from './components/TelaHome'; // Importa a tela home

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/TelaHome" element={<TelaHome />} />
      {/* Outras rotas da aplicação */}
    </Routes>
  );
};

export default AppRoutes;
