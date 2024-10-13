// src/components/operador.js
import React, { useState } from 'react';
import { Layout, Table, Button, Space, Modal, Input, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Ícone de +

const { Header, Content, Footer } = Layout;

const TelaOperador = () => {
  // Dados de exemplo
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'João Operador',
      cpf: '123.456.789-00',
      ocupacao: 'Operador de Máquina',
    },
    {
      key: '2',
      name: 'Maria Operadora',
      cpf: '987.654.321-00',
      ocupacao: 'Supervisora',
    },
  ]);

  // Estados para criação/edição e pesquisa
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Função para criar novo usuário
  const createUser = () => {
    setEditingUser({ key: '', name: '', cpf: '', ocupacao: '' });
    setIsEditing(true);
  };

  // Função para salvar um novo usuário ou editar um existente
  const saveUser = () => {
    if (editingUser.key) {
      // Edição de usuário
      setDataSource((prev) =>
        prev.map((user) => (user.key === editingUser.key ? editingUser : user))
      );
    } else {
      // Criação de novo usuário
      setDataSource((prev) => [
        ...prev,
        { ...editingUser, key: Date.now().toString() },
      ]);
    }
    setIsEditing(false);
  };

  // Função para editar um usuário
  const editUser = (record) => {
    setEditingUser(record);
    setIsEditing(true);
  };

  // Função para excluir um usuário
  const deleteUser = (key) => {
    setDataSource((prev) => prev.filter((user) => user.key !== key));
  };

  // Função para pesquisa
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filtrando dados com base na pesquisa
  const filteredData = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Definição das colunas
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), // Ordenação por nome
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
      sorter: (a, b) => a.cpf.localeCompare(b.cpf), // Ordenação por CPF
    },
    {
      title: 'Ocupação',
      dataIndex: 'ocupacao',
      key: 'ocupacao',
      sorter: (a, b) => a.ocupacao.localeCompare(b.ocupacao), // Ordenação por ocupação
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editUser(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => deleteUser(record.key)}
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
      {/* Header Section */}
      <Header style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '0 50px' }}>
        <h1 style={{ color: '#fff' }}>Tela Operador</h1>
      </Header>

      {/* Content Section */}
      <Content style={{ padding: '0 50px', marginTop: '20px', height: '100vh' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <h1>Operador</h1>
          <p>Esta é a tela de operador.</p>

          {/* Container para a barra de pesquisa e botão */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Input
              placeholder="Pesquisar por nome"
              value={searchText}
              onChange={onSearchChange}
              style={{ width: 300 }}
            />
            {/* Botão para criar novo usuário com ícone de + */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={createUser}
              style={{ marginLeft: 16 }}
            />
          </div>

          {/* Tabela de Usuários */}
          <Table dataSource={filteredData} columns={columns} />

          {/* Modal para criação/edição */}
          {isEditing && (
            <Modal
              title={editingUser?.key ? "Editar Usuário" : "Criar Usuário"}
              open={isEditing} // Usando a nova propriedade `open`
              onCancel={() => setIsEditing(false)}
              onOk={saveUser}
            >
              <Input
                value={editingUser?.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                placeholder="Nome do usuário"
              />
              <Input
                value={editingUser?.cpf}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, cpf: e.target.value })
                }
                placeholder="CPF do usuário"
                style={{ marginTop: 10 }}
              />
              <Input
                value={editingUser?.ocupacao}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, ocupacao: e.target.value })
                }
                placeholder="Ocupação do usuário"
                style={{ marginTop: 10 }}
              />
            </Modal>
          )}
        </div>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center', background: '#387' }}>
        Ant Design ©2024 Created by You
      </Footer>
    </Layout>
  );
};

export default TelaOperador;
