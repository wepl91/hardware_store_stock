import React from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button } from "@blueprintjs/core";
import ReactDataGrid from 'react-data-grid';
import './styles.scss'

const ProductsList = (props) => {
  const onClickNewProd = (props) => {
    props.history.push(`${props.history.location.pathname}/new`)
  }
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' }];

  const rows = [{ id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 }];

  return (
    <div className="product-list-container">
      <H2><Text>Listado de productos</Text></H2>
      <Button
        className="new-product-button"
        text="Nuevo producto"
        intent="primary"
        onClick={() => onClickNewProd(props)} />
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={3}
        minHeight={150} />
    </div>
  )
}

export default withRouter(ProductsList);