var React = require('react');

import $ from "jquery";

var MgInBody = React.createClass({
  getInitialState: function(){
    return {
      mg: null
    }
  },

  componentDidMount: function(){
    this.serverRequest = $.get(
      // TODO: Server domain in config
      "http://localhost:8181/status/now",
      function(result){
        console.log(result.mg_in_body)
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
