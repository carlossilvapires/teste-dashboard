// Routes.js
import { Route, Routes } from 'react-router-dom';
import TelaHome from './components/TelaHome'; // Importa a tela home
import Login from './components/TelaLogin/Login'; // Importa seu componente de login
import TelaOperador from './components/TelaOperador';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/TelaHome" element={<TelaHome />} />
      <Route path='/TelaOperador' element={<TelaOperador/>}></Route>
    </Routes>
  );
};

export default AppRoutes;
