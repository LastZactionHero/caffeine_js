import React from 'react';
import $ from 'jquery';

var MgInBody = React.createClass({
  getInitialState: function(){
    return {
      mg: null
    }
  },

  componentDidMount: function(){
    this.serverRequest = $.get(
      API_HOST + '/status/now',
      function(result){
        this.setState({
          mg: Math.floor(result.mg_in_body)
        });
      }.bind(this)
    );
  },

  render(){
    return(
      <div className='jumbotron text-center'>
        <h1 className=''>{this.state.mg}mg</h1>
      </div>
    )
  }
});

module.exports = MgInBody;
