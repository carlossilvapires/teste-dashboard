import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout; // Destructure the Layout components

const TelaHome = () => {
  return (
    <Layout>
      {/* Header Section */}
      <Header style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '0 50px' }}>
        <h1 style={{ color: '#fff' }}>Header</h1>
      </Header>

      {/* Content Section */}
      <Content style={{ padding: '0 50px', marginTop: '20px' , height: '100vh',}}>
        <div style={{ background: '#887', padding: 24, minHeight: 280 , }}>
          <h1>Tela Home</h1>
          <p>Tela Home.</p>
          <p>Teste</p>
        </div>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center' ,background: '#387',}}>
        Ant Design ©2024 Created by You
      </Footer>
    </Layout>
  );
};

export default TelaHome;
