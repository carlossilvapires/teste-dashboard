import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, message, Modal, Popconfirm, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const TelaOperador = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm(); // Adicione isso na declaração de estado


  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api.airsoftcontrol.com.br/api/admin/listar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários.');
      }

      const data = await response.json();
      setDataSource(data.map(user => ({
        ...user,
        key: user.id,
        role: user.roles.length > 0 ? user.roles[0].name : ''
      })));
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      message.error('Erro ao carregar usuários.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);
  
  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue(editingUser);
    }
  }, [editingUser, isEditing, form]);

  const createUser = () => {
    setEditingUser({
      id: '',
      email: '',
      senha: '',
      operador: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      telefoneEmergencia: '',
      tipoSanguineo: '',
      ocupacao: '',
      statusOperador: 'ATIVO',
      role: 'RECRUTA',
    });
    setIsEditing(true);
  };

  const saveUser = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const method = editingUser.id ? 'PUT' : 'POST';
      const url = editingUser.id 
        ? 'https://api.airsoftcontrol.com.br/api/admin/atualizar/${editingUser.id}'
        : 'https://api.airsoftcontrol.com.br/api/admin/cadastro';
  
      const userData = {
        ...values,
        operador: Number(values.operador),
      };
  
      console.log('Dados enviados:', userData);
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.text(); // Pode ser .json() se a API retornar JSON
  
      if (!response.ok) {
        throw new Error(result || 'Erro ao salvar usuário.');
      }
  
      message.success(editingUser.id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
      setIsEditing(false);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      message.error(error.message || 'Erro ao salvar usuário.');
    }
  };
  

  const editUser = (record) => {
    console.log("Editando usuário:", record); // Verifique o que está sendo passado
    setEditingUser({ ...record }); // Cria uma nova referência para garantir a atualização correta do estado
    setIsEditing(true);
  };
  
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://api.airsoftcontrol.com.br/api/admin/remover/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário.');
      }

      message.success('Usuário excluído com sucesso!');
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      message.error('Erro ao excluir usuário.');
    }
  };

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = dataSource.filter((user) =>
    user.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Status',
      dataIndex: 'statusOperador',
      key: 'statusOperador',
      sorter: (a, b) => a.statusOperador.localeCompare(b.statusOperador),
      responsive: ['md'],
      width: 100,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      responsive: ['md'],
      width: 150,
    },
    {
      title: 'Operador',
      dataIndex: 'operador',
      key: 'operador',
      sorter: (a, b) => a.operador - b.operador,
      responsive: ['md'],
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      responsive: ['md'],
      width: 250,
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      sorter: (a, b) => a.cpf.localeCompare(b.cpf),
      responsive: ['md'],
      width: 155,
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNascimento',
      sorter: (a, b) => new Date(a.dataNascimento) - new Date(b.dataNascimento),
      render: (text) => (text ? new Date(text).toLocaleDateString() : ''),
      responsive: ['lg'],
      width: 120,
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      responsive: ['xl'],
      width: 160,
    },
    {
      title: 'Telefone Emergência',
      dataIndex: 'telefoneEmergencia',
      key: 'telefoneEmergencia',
      responsive: ['xl'],
      width: 150,
    },
    {
      title: 'Tipo Sanguíneo',
      dataIndex: 'tipoSanguineo',
      key: 'tipoSanguineo',
      responsive: ['lg'],
      width: 110,
    },
    {
      title: 'Ocupação',
      dataIndex: 'ocupacao',
      key: 'ocupacao',
      sorter: (a, b) => a.ocupacao.localeCompare(b.ocupacao),
      responsive: ['lg'],
      width: 150,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      responsive: ['md'],
      width: 150,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editUser(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => deleteUser(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      ),
      fixed: 'right',
      width: 190,
    },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '0 50px' }}>
        <h1 style={{ color: '#fff' }}>Tela Operador</h1>
      </Header>

      <Content style={{ padding: '0 50px', marginTop: '20px', height: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <h1>Operador</h1>
          <p>Esta é a tela de operador.</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Input
              placeholder="Pesquisar por nome"
              value={searchText}
              onChange={onSearchChange}
              style={{ width: 300 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={createUser}>
              Cadastrar Usuário
            </Button>
          </div>

          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ x: false }}
          />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center'}}>
        Gestão de Usuários ©2024
      </Footer>

      <Modal
        title={editingUser?.id ? 'Editar Usuário' : 'Cadastrar Usuário'}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
    form={form} // Adicione esta linha
    initialValues={editingUser}
    onFinish={saveUser}
    layout="vertical"
>
          <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor insira o nome!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor insira o email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Senha" name="senha" rules={[{ required: true, message: 'Por favor insira a senha!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Operador" name="operador">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="CPF" name="cpf" rules={[{ required: true, message: 'Por favor insira o CPF!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Data de Nascimento" name="dataNascimento">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Telefone" name="telefone">
            <Input />
          </Form.Item>
          <Form.Item label="Telefone Emergência" name="telefoneEmergencia">
            <Input />
          </Form.Item>

          <Form.Item label="Tipo Sanguíneo" name="tipoSanguineo">
            <Select>
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>

            </Select>
          </Form.Item>
          
          <Form.Item label="Ocupação" name="ocupacao">
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Por favor selecione um role!' }]}>
            <Select>
              <Option value="RECRUTA">RECRUTA</Option>
              <Option value="OPERADOR">OPERADOR</Option>
              <Option value="ADMINISTRADOR">ADMINISTRADOR</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="statusOperador" rules={[{ required: true, message: 'Por favor selecione o papel!' }]}>
            <Select>
              <Option value="ATIVO">ATIVO</Option>
              <Option value="INATIVO">INATIVO</Option>
            </Select>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser?.id ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default TelaOperador;
