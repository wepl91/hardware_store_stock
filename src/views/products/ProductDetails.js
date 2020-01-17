import React from 'react';
import { Text } from "@blueprintjs/core";

const ProductDetails = ({product}) => {
  return (
    <div className="product-details-container">
      <div className="product-details-row">
        <Text className="item"><strong>Nombre: </strong>{product.name}</Text>
        <Text className="item"><strong>Referencia: </strong>{product.reference}</Text>
        <Text className="item"><strong>Descripción: </strong>{product.description}</Text>
        <Text className="item"><strong>Proveedores: </strong>{product.providers.map(prov => `${prov.name}, `)}</Text>
        <Text className="item"><strong>Precio: </strong>${product.price}</Text>
      </div>
    </div>
  )
}

export default ProductDetails