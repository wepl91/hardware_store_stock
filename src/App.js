import React, { useState } from 'react';
import Sidebar from "react-sidebar";
import { Button, Navbar } from "@blueprintjs/core";
import './App.scss';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={menuOpen}
      onSetOpen={() => setMenuOpen(!menuOpen)}
      styles={{ sidebar: { background: "white" } }}
    >
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>Blueprint</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
    </Sidebar>
  );
}

export default App;
