import { Menu } from "antd";
import { AppstoreOutlined, AreaChartOutlined, BarsOutlined, HomeOutlined, PayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Importa o Link

const MenuList = ({ darkTheme }) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link> {/* Adiciona o link para Home */}
            </Menu.Item>
            <Menu.Item key="activity" icon={<AppstoreOutlined />}>
                <Link to="/activity">Activity</Link> {/* Adiciona o link para Activity */}
            </Menu.Item>
            <Menu.SubMenu key="subtasks" icon={<BarsOutlined />} title="Tasks">
                <Menu.Item key="task-1">Task 1</Menu.Item>
                <Menu.Item key="task-2">Task 2</Menu.Item>
                <Menu.SubMenu key="subtask" title="Subtasks">
                    <Menu.Item key="subtask1">Subtask 1</Menu.Item>
                    <Menu.Item key="subtask2">Subtask 2</Menu.Item>
                </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="progress" icon={<AreaChartOutlined />}>
                <Link to="/progress">Progress</Link> {/* Adiciona o link para Progress, se necessário */}
            </Menu.Item>
            <Menu.Item key="payment" icon={<PayCircleOutlined />}>
                <Link to="/payment">Payment</Link> {/* Adiciona o link para Payment, se necessário */}
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link> {/* Adiciona o link para Settings */}
            </Menu.Item>
        </Menu>
    );
};

export default MenuList;
