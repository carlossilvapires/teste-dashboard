import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useState } from 'react';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton';
import AppRoutes from './routes';

const { Header, Sider, Content } = Layout;

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica se o token está no localStorage
};

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {isAuthenticated() ? ( // Renderiza a barra lateral e o conteúdo do dashboard apenas se autenticado
        <>
          <Sider 
            collapsed={collapsed} 
            collapsible 
            trigger={null} 
            theme={darkTheme ? 'dark' : 'light'} 
            className='sidebar'
          >
            <Logo />
            <MenuList darkTheme={darkTheme} />
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
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
            <Content style={{ margin: '16px' }}>
              <AppRoutes /> {/* Renderiza as rotas aqui */}
            </Content>
          </Layout>
        </>
      ) : (
        <AppRoutes /> // Apenas renderiza as rotas (login) se não estiver autenticado
      )}
    </Layout>
  );
}

export default App;
