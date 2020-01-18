import React, { useState } from 'react';
import Modal from '../../../components/modal';
import {
  Text,
  InputGroup,
  Button,
} from "@blueprintjs/core";
import fire from '../../../fire';

const ProviderCreateModal = ({showModal, onClose, onCreate}) => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isSaving, setIsSaving] = useState(false)

  const createProvider = (newProvider) => {
    setIsSaving(true);
    fire.collection('providers').doc()
        .set(newProvider)
        .then( () => {
          onCreate(newProvider);
        });
  }

  return (
    <Modal
      className="provider-create"
      key={showModal}
      isOpen={showModal}
      onClose={onClose}
      title="Nuevo proveedor"
      content={
        <React.Fragment>
          <div>
            <Text className="field-label"><strong>Nombre del proveedor</strong></Text>
            <InputGroup
              className="field-input"
              value={name}
              disabled={isSaving}
              placeholder="Nombre.."
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Text className="field-label"><strong>Teléfono del proveedor</strong></Text>
            <InputGroup
              className="field-input"
              value={phone}
              disabled={isSaving}
              placeholder="15-00000000"
              onChange={(e) => setPhone(e.target.value)} />
          </div>
        </React.Fragment> }
      footer={
        <React.Fragment>
          <Button 
            loading={isSaving}
            text="Crear" 
            intent="primary"
            onClick={() => createProvider({name: name, phone_number:phone})} />
          <Button 
            loading={isSaving}
            text="Cancelar" 
            intent="danger" 
            onClick={onClose} />
        </React.Fragment>
      } /> );
}

export default ProviderCreateModal;