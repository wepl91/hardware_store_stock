import React from 'react';
import './styles.scss'

const SidebarFixed = ({children}) => {
  return (
    <div className="sidebar">
      { children }
    </div>)
}

export default SidebarFixed;