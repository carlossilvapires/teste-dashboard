import { Menu } from "antd";
import { AppstoreOutlined, AreaChartOutlined, BarsOutlined, HomeOutlined, PayCircleOutlined, SettingOutlined, } from '@ant-design/icons';

const MenuList = ({ darkTheme }) => {
    return(
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
            <Menu.Item key="home" icon={<HomeOutlined/>}>
            Home
            </Menu.Item>
            <Menu.Item key="activity" icon={<AppstoreOutlined />}>
            Activity
            </Menu.Item>
            <Menu.SubMenu key="subtasks" icon={<BarsOutlined/>} title="Tasks">
                <Menu.Item key="task-1">Task 1</Menu.Item>
                <Menu.Item key="task-2">Task 2</Menu.Item>
                <Menu.SubMenu key="subtask" title="Subtasks">
                    <Menu.Item key="subtask1">Subtask 1</Menu.Item>
                    <Menu.Item key="subtask2">Subtask 2</Menu.Item>
                </Menu.SubMenu>
            </Menu.SubMenu>
            
            <Menu.Item key="progress" icon={<AreaChartOutlined />}>
            Progress
            </Menu.Item>
            <Menu.Item key="payment" icon={<PayCircleOutlined />}>
            Payment
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>
            Settings
            </Menu.Item>
            
        </Menu>
    );
};

export default MenuList