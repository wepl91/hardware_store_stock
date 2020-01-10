import React from 'react';
import { withRouter } from 'react-router';
import { Text, H2, Button } from "@blueprintjs/core";
import './styles.scss'

const ProductsList = (props) => {
  const onClickNewProd = (props) => {
    props.history.push(`${props.history.location.pathname}/new`)
  }
  return (
    <div className="product-list-container">
      <H2><Text>Listado de productos</Text></H2>
      <Button
        className="new-product-button"
        text="Nuevo producto"
        intent="primary"
        onClick={() => onClickNewProd(props)} />
    </div>
  )
}

export default withRouter(ProductsList);