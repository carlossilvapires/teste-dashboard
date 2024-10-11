import { AreaChartOutlined, BarsOutlined, HomeOutlined, PayCircleOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Link } from 'react-router-dom';

const MenuList = ({ darkTheme }) => {
    const items = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
        },
        {
            key: '/activity',
            icon: <AppstoreOutlined />,
            label: <Link to="/activity">Activity</Link>,
        },
        {
            key: 'subtasks',
            icon: <BarsOutlined />,
            label: 'Tasks',
            children: [
                { key: 'task-1', label: 'Task 1' },
                { key: 'task-2', label: 'Task 2' },
                {
                    key: 'subtask',
                    label: 'Subtasks',
                    children: [
                        { key: 'subtask1', label: 'Subtask 1' },
                        { key: 'subtask2', label: 'Subtask 2' },
                    ],
                },
            ],
        },
        {
            key: 'progress',
            icon: <AreaChartOutlined />,
            label: 'Progress',
        },
        {
            key: 'payment',
            icon: <PayCircleOutlined />,
            label: 'Payment',
        },
        {
            key: 'setting',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar" items={items} />
    );
};

export default MenuList;
