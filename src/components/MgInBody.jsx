import React from 'react';

var MgInBody = React.createClass({
  getInitialState: function(){
    return {
    }
  },

  render(){
    return(
      <div className='jumbotron text-center'>
        <h1 className=''>{this.props.mg}mg</h1>
        <p>caffeine in your body</p>
      </div>
    )
  }
});

module.exports = MgInBody;
