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

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token'); // Obter o token do localStorage
      const response = await fetch('https://api.airsoftcontrol.com.br/api/admin/listar', {
        method: 'GET', // Método da requisição (GET)
        headers: {
          'Content-Type': 'application/json', // Tipo de conteúdo
          Authorization: `Bearer ${token}`, // Adicionando o token ao cabeçalho
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários.'); // Tratamento de erro se a resposta não for OK
      }
  
      const data = await response.json();
      setDataSource(data.map(user => ({
        ...user,
        key: user.id, // Mapear id para key
        role: user.roles.length > 0 ? user.roles[0].name : '' // Pegar o nome do primeiro papel
      })));
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      message.error('Erro ao carregar usuários.');
    }
  };

  useEffect(() => {
    fetchUsuarios(); // Carrega os dados ao montar o componente
  }, []);

  // Função para criar novo usuário
  const createUser = () => {
    setEditingUser({
      id: '',
      email: '',
      operador: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      telefoneEmergencia: '',
      tipoSanguineo: '',
      ocupacao: '',
      role: 'RECRUTA', // Definir valor padrão
    });
    setIsEditing(true);
  };

  const saveUser = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const method = editingUser.id ? 'PUT' : 'POST';
      const url = editingUser.id 
        ? `https://api.airsoftcontrol.com.br/api/admin/atualizar/${editingUser.id}`
        : 'https://api.airsoftcontrol.com.br/api/admin/cadastro';
  
      const userData = {
        ...values,
        operador: Number(values.operador), // Converter operador para número
      };
  
      console.log('Dados enviados:', userData); // Adicione esta linha para ver os dados
  
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao salvar usuário.');
      }
  
      message.success(editingUser.id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
      setIsEditing(false);
      fetchUsuarios(); // Atualiza a tabela após salvar.
    } catch (error) {
      console.error(error);
      message.error('Erro ao salvar usuário.');
    }
  };

  // Função para editar um usuário
  const editUser = (record) => {
    setEditingUser(record);
    setIsEditing(true);
  };

  // Função para excluir um usuário
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://api.airsoftcontrol.com.br/api/admin/remover/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário.');
      }

      message.success('Usuário excluído com sucesso!');
      fetchUsuarios(); // Atualiza a tabela após exclusão
    } catch (error) {
      console.error(error);
      message.error('Erro ao excluir usuário.');
    }
  };

  // Função para pesquisa
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filtrando dados com base na pesquisa
  const filteredData = dataSource.filter((user) =>
    user.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  // Definição das colunas
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: 'Operador',
      dataIndex: 'operador',
      key: 'operador',
      sorter: (a, b) => a.operador - b.operador,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      sorter: (a, b) => a.cpf.localeCompare(b.cpf),
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'dataNascimento',
      key: 'dataNascimento',
      sorter: (a, b) => new Date(a.dataNascimento) - new Date(b.dataNascimento),
      render: (text) => (text ? new Date(text).toLocaleDateString() : ''),
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Telefone de Emergência',
      dataIndex: 'telefoneEmergencia',
      key: 'telefoneEmergencia',
    },
    {
      title: 'Tipo Sanguíneo',
      dataIndex: 'tipoSanguineo',
      key: 'tipoSanguineo',
    },
    {
      title: 'Ocupação',
      dataIndex: 'ocupacao',
      key: 'ocupacao',
      sorter: (a, b) => a.ocupacao.localeCompare(b.ocupacao),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={createUser}
              style={{ marginLeft: 16 }}
            />
          </div>

          <Table dataSource={filteredData} columns={columns} />

          {isEditing && (
            <Modal
              title={editingUser?.id ? "Editar Usuário" : "Criar Usuário"}
              open={isEditing}
              onCancel={() => setIsEditing(false)}
              footer={null} // Ocultar o rodapé padrão do modal
            >
              <Form
                layout="vertical"
                onFinish={saveUser}
                initialValues={editingUser} // Preenche o formulário com os dados do usuário
              >
                <Form.Item
                  label="Nome"
                  name="nome"
                  rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Por favor, insira um email válido!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Senha"
                  name="senha"
                  rules={[{ required: true, message: 'Por favor, insira a senha!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Operador"
                  name="operador"
                  rules={[{ required: true, message: 'Por favor, insira o número do operador!' }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="CPF"
                  name="cpf"
                  rules={[{ required: true, message: 'Por favor, insira o CPF!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Data de Nascimento"
                  name="dataNascimento"
                  rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
                >
                  <Input placeholder="Formato: AAAA-MM-DD" />
                </Form.Item>
                <Form.Item
                  label="Telefone"
                  name="telefone"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Telefone de Emergência"
                  name="telefoneEmergencia"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tipo Sanguíneo"
                  name="tipoSanguineo"
                  rules={[{ required: true, message: 'Por favor, insira o tipo sanguíneo!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ocupação"
                  name="ocupacao"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: 'Por favor, selecione um papel!' }]}
                >
                  <Select placeholder="Selecione uma opção">
                    <Option value="RECRUTA">RECRUTA</Option>
                    <Option value="OPERADOR">OPERADOR</Option>
                    <Option value="ADMINISTRADOR">ADMINISTRADOR</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    {editingUser?.id ? 'Atualizar Usuário' : 'Criar Usuário'}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Airsoft Control ©2024
      </Footer>
    </Layout>
  );
};

export default TelaOperador;
