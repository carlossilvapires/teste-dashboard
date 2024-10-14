// App.js
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import AppRoutes from './Routes'; // Importando as rotas

const { Header, Sider, Content } = Layout;

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se o token está no localStorage
};

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Verifique se o usuário está autenticado ao carregar a aplicação
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redireciona para a página de login se não estiver autenticado
    }
  }, [navigate]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100%' }}>
      {isAuthenticated() ? (
        <>
          <Sider 
            collapsed={collapsed} 
            collapsible 
            trigger={null} 
            theme={darkTheme ? 'dark' : 'light'} 
            className='sidebar'
          >
            <Logo />
            <MenuList darkTheme={darkTheme}/>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
            <Content style={{ margin: '16px', height: 'auto', width: 'auto' }}>
  <AppRoutes />
</Content>
          </Layout>
        </>
      ) : (
        <Layout style={{ padding: 0}}>
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <AppRoutes /> {/* Renderiza o componente de login aqui */}
          </Content>
        </Layout>
      )}
    </Layout>
  );
}

export default App;
