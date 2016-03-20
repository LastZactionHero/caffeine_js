require('normalize.css');
require('styles/App.scss');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')

import React from 'react';

import MgInBody from './MgInBody';
import MgGraph from './MgGraph';

class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <MgInBody />
        <MgGraph />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
