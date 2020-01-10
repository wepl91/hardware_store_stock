import React from 'react';
import { Dialog } from "@blueprintjs/core";
import './styles.scss';

const Modal = (props) => {
  return (
    <Dialog isOpen={props.isOpen}>
      <div class="bp3-dialog-header">
        <span class="bp3-icon-large bp3-icon-inbox"></span>
        <h4 class="bp3-heading">{ props.title }</h4>
        <button 
          aria-label="Close" 
          class="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"
          onClick={() => props.onClose()}></button>
      </div>
      <div class="bp3-dialog-body">
        { props.content }
      </div>
      <div class="bp3-dialog-footer">
        <div class="bp3-dialog-footer-actions">
          { props.footer }
        </div>
      </div>
  </Dialog> );
}

export default Modal;