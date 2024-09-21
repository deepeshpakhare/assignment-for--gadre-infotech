import React from 'react';
import { Link } from 'react-router-dom';

const navabarStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: "10px",
    justifyContent: 'flex-start',
    alignItems: 'center',
}

export default function Navbar() {
  return (
    <div style={navabarStyle}>
        <h1><Link to={"/"}>Products</Link></h1>
        <h1><Link to={"/analytics"}>Analytics</Link></h1>
    </div>
  )
}
