import React from 'react';
import { Dialog } from "@blueprintjs/core";
import './styles.scss';

const Modal = ({title, onClose, isOpen, content, footer}) => {
  return (
    <Dialog isOpen={isOpen}>
      <div class="bp3-dialog-header">
        <h4 class="bp3-heading">{ title }</h4>
        <button 
          aria-label="Close" 
          class="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"
          onClick={() => onClose()}></button>
      </div>
      <div class="bp3-dialog-body">
        { content }
      </div>
      <div class="bp3-dialog-footer">
        <div class="bp3-dialog-footer-actions">
          { footer }
        </div>
      </div>
  </Dialog> );
}

export default Modal;