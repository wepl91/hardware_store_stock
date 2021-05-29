import React from 'react';

import { HStack, Input, IconButton } from "@chakra-ui/react"
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'

const HeaderNavbar = ({ onSignOut, menuOpen, setMenuOpen }) => {
  return (
    <div className="navbar-header">
      <HStack spacing="24px">
        <IconButton 
          icon={menuOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </HStack>
    </div>
  );
}

export default HeaderNavbar;