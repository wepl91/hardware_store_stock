import React from 'react';
import { Button, Navbar, Position, Tooltip } from "@blueprintjs/core";

const HeaderNavbar = ({onSignOut, menuOpen, setMenuOpen}) => {
  return (
    <Navbar>
        <Navbar.Group>
          <div className="menu-button-container">
            <Button
              className="bp3-minimal"
              icon={menuOpen ? 'menu-closed' : 'menu-open'}
              onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          <Navbar.Divider />
          <div className="navbar-actions-container">
            <div className="bp3-input-group .modifier search-input">
              <span className="bp3-icon bp3-icon-search"></span>
              <input className="bp3-input" type="search" placeholder="Buscar" dir="auto" />
            </div>
          </div>
        </Navbar.Group>
        <div className="logout-container">
          <Tooltip content="Cerrar sesión" position={Position.BOTTOM_LEFT}>
            <Button className="bp3-minimal" icon="log-out" onClick={() => onSignOut()}/>
          </Tooltip>
        </div>
      </Navbar>)
}

export default HeaderNavbar;