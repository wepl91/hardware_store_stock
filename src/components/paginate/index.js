import React, { Component } from 'react';
import { Button, Icon } from "@blueprintjs/core";
import './styles.scss';

const Paginate = ({ currentPage, totalPages, quantityShown, onChange }) => {
  const getDisabled = (action) => {
    if (action === 'prev') {
      if (currentPage == 1 || !totalPages) return true;
    }

    if (action === 'next') {
      if (totalPages == currentPage || !totalPages) return true;
    }

  }

  const renderPrevButtons = () => {
    if (currentPage == 0) return [];
    const buttons = [];
    for (let i = 1; i < quantityShown + 1; i++) {
      let number = currentPage - i;
      if (number > 0) {
        buttons.unshift(
          <Button 
            className="page-button" 
            text={number} 
            onClick={() => onChange(number)}/>)
      }
    }
    return buttons;
  }

  const renderNextButtons = () => {
    if (currentPage == totalPages) return [];
    const buttons = [];
    for (let i = 1; i < quantityShown + 1; i++) {
      let number = currentPage + i;
      if (number <= totalPages) {
        buttons.push(
          <Button 
            className="page-button" 
            text={number} 
            onClick={() => onChange(number)} />)
      }
    }
    return buttons;
  }

  return(
    <div className="paginate-container">
      <Button 
        disabled={getDisabled('prev')} 
        className="prev-button" 
        text="Anterior" 
        onClick={() => onChange(currentPage - 1)} />
      <div className="page-container">
        { (currentPage - quantityShown) > 1 && <Icon className="more" icon="more" intent="primary"/> }
        { renderPrevButtons() }
        <Button className="page-button" text={currentPage} intent="primary" />
        { renderNextButtons() }
        { currentPage + quantityShown < totalPages && <Icon className="more" icon="more" intent="primary"/> }
      </div>
      <Button 
        disabled={getDisabled('next')} 
        className="next-button" 
        text="Siguiente" 
        onClick={() => onChange(currentPage + 1)} />
    </div>);
}

export default Paginate;