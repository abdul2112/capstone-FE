/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Dropdown } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Upload = require('../../../../assets/images/upload.png');

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a href="/home">home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/favorite">Favorite</a>
      </Menu.Item> */}
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  );
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign in</a>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <a href="/register">Sign up</a>
        </Menu.Item> */}
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Dropdown overlay={menu}>
            <img
              src={user && user.userData && user.userData.profilePicture}
              alt="profile"
              style={{ height: '68px', padding: '12px 20px' }}
            />
          </Dropdown>
        </Menu.Item>
        {/* <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item> */}
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
