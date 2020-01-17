import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Text, H2 } from "@blueprintjs/core";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="product-create-container">
        <H2>
          <Text>{`Bienvenido ${this.props.loggedInUser.displayName || ''}!`}</Text>
        </H2>
      </div>);
  }

}

export default withRouter(Home);