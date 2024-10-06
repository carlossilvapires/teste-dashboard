import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useState } from 'react';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton';


const { Header, Sider } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken(); // Certifique-se de que o tema está disponível aqui

  return (
    <Layout>
      <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? 'dark' : 'light'} className='sidebar'>
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)} // Corrigido
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
      </Layout>

    </Layout>
  );
}

export default App;
