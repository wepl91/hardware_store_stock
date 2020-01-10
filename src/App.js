import React, { useState } from 'react';
import Sidebar from "react-sidebar";
import { Button, Navbar } from "@blueprintjs/core";
import './App.scss';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Sidebar
      sidebar={
        <div className="menu-options-container">
          <Button className="bp3-minimal" icon="cog" text="Productos" intent="primary" />
          <Button className="bp3-minimal" icon="list-detail-view" text="Ventas" intent="primary" />
        </div>
      }
      open={menuOpen}
      onSetOpen={() => setMenuOpen(!menuOpen)}
      styles={{ sidebar: { background: "white" } }}
    >
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
            <div class="bp3-input-group .modifier search-input">
              <span class="bp3-icon bp3-icon-search"></span>
              <input class="bp3-input" type="search" placeholder="Buscar" dir="auto" />
            </div>
          </div>
        </Navbar.Group>
        <div className="logout-container">
          <Button className="bp3-minimal" icon="log-out" />
        </div>
      </Navbar>
    </Sidebar>
  );
}

export default App;
