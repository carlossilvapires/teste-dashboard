import { BarsOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from "antd";

const MenuList = ({ darkTheme }) => {
    return(
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
            <Menu.Item key="home" icon={<HomeOutlined/>}>
            Home
            </Menu.Item>
            <Menu.SubMenu key="subtasks1" icon={<BarsOutlined/>} title="Operador">
                <Menu.Item key="task-1">Cadastro</Menu.Item>
                <Menu.Item key="task-2">Editar</Menu.Item>
                <Menu.Item key="task-3">Listar</Menu.Item>
                <Menu.Item key="task-4">Excluir</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="subtasks2" icon={<BarsOutlined/>} title="Presença">
                <Menu.Item key="task-5">Cadastro</Menu.Item>
                <Menu.Item key="task-6">Editar</Menu.Item>
                <Menu.Item key="task-7">Listar</Menu.Item>
                <Menu.Item key="task-8">Excluir</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="subtasks3" icon={<BarsOutlined/>} title="Jogos">
                <Menu.Item key="task-9">Cadastro</Menu.Item>
                <Menu.Item key="task-10">Editar</Menu.Item>
                <Menu.Item key="task-11">Listar</Menu.Item>
                <Menu.Item key="task-12">Excluir</Menu.Item>
            </Menu.SubMenu>
            
        </Menu>
    );
};

export default MenuList