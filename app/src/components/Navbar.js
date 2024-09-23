import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Space } from 'antd';


export default function Navbar() {
  const [current, setCurrent] = useState('');

  const items = [
    {
        label: (
            <Link to={"/"}><h3>Add Products</h3> </Link>
            
        ),
        key: "products"
    },
    {
        label: (
            <Link to={"/analytics"}><h3>Analytics</h3></Link>
           
        ),
        key: "analytics"
    },
  ]

  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div>
        <Menu style={{height: 80}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  )
}
