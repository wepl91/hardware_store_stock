import React from 'react';

export const ListProvidersContent = () => (
  <React.Fragment>
    <h3>Listado de proveedores</h3>
    <br />
    <label>En esta sección puedes visualizar todos los proveedores en la base de datos.</label>
    <br />
    <br />
    <label>Ademas, puedes ver sus detalles, editar proveedores o eliminarlos.</label>
    <br />
    <br />
    <label>En la parte superior derecha, tienes un botón, el cual generará una ventana para crear un nuevo proveedor.</label>
  </React.Fragment>);

export const ListProductsContent = () => (
  <React.Fragment>
    <h3>Listado de productos</h3>
    <br />
    <label>En esta sección puedes visualizar todos los productos en la base de datos.</label>
    <br />
    <br />
    <label>Ademas, puedes ver sus detalles, editar productos o eliminarlos.</label>
    <br />
    <br />
    <label>En la parte superior derecha, tienes un botón, el cual te dirigirá a la pantalla de creación de productos.</label>
  </React.Fragment>);

export const NewProviderContent= () => (
  <React.Fragment>
    <h3>Nuevo proveedor</h3>
    <br />
    <label>En esta sección pueder cargar un proveedor a la base de datos, con los datos requeridos.</label>
  </React.Fragment>);


export const NewProductContent= () => (
  <React.Fragment>
    <h3>Nuevo producto</h3>
    <br />
    <label>En esta sección pueder cargar un producto a la base de datos, con los datos requeridos.</label>
  </React.Fragment>);