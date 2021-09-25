import React from "react";
// import { Menu } from 'antd';
import { Dropdown, Icon, Menu } from "antd";

const years = [
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
];

const menu = (
  <Menu>
    {years.map((year) => (
      <Menu.Item>
        <a href={`byYear?year=${year}`}>{year}</a>
      </Menu.Item>
    ))}
  </Menu>
);

function LeftMenu(props) {
  return (
    // <Menu mode={props.mode}>
    //   <Menu.Item key="favorite">
    //     <a href="/favorite">Favorite</a>
    //   </Menu.Item>
    // </Menu>
    <>
      <Menu mode={props.mode}>
        <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="favorite">
          <a href="/discover">Search</a>
        </Menu.Item>
        <Menu.Item key="discover">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              Discover <Icon type="down" />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default LeftMenu;
