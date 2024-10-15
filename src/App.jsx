import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, theme } from 'antd';
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

  // Função para deslogar com confirmação
  const handleLogout = () => {
    Modal.confirm({
      title: 'Deseja sair?',
      content: 'Tem certeza de que deseja deslogar?',
      onOk: () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        navigate('/login'); // Redireciona para a página de login
      },
      onCancel: () => {
        // Ação opcional no cancelamento
      },
    });
  };

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
            <MenuList darkTheme={darkTheme} onLogout={handleLogout}/>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height:'60px' }}>
              <div>
                <Button
                  type="text"
                  className="toggle"
                  onClick={() => setCollapsed(!collapsed)}
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                />
              </div>
              <Button type="primary" onClick={handleLogout} style={{ marginRight: '16px' }}> {/* Adiciona margem à direita */}
                Logout
              </Button>
            </Header>
            <Content style={{ margin: '16px', overflow: 'auto', height:'100vh'}}>
  <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
    <AppRoutes /> {/* Renderiza as rotas principais */}
  </div>
</Content>
          </Layout >
        </>
      ) : (
        <Layout style={{ padding: 0}}>
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <AppRoutes /> {/* Renderiza apenas o componente de login */}
          </Content>
        </Layout>
      )}
    </Layout>
  );
}

export default App;
