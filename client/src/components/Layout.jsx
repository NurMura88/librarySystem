import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 1px solid #e8d3b9;
  border-radius: 45px;
  background-color: #fffdfa;
  padding: 57px 75px;
`;

export const Admin = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const Layout = () => {
  const location = useLocation();
  const block = location.pathname.split('/')[1];
  return (
    <>
      {block === 'admin' ? (
        <>
          <Navbar />
          <Admin>
            <Outlet />
          </Admin>
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <Container>
            <Outlet />
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
