import React from 'react';
var LineChart = require('react-chartjs').Line;

var MgGraph = React.createClass({
  getInitialState: function(){
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltipTemplate: ''
      }
    }
  },

  render(){
    var chart = null;
    if(this.props.data){
      chart = <LineChart data={this.props.data} options={this.state.chartOptions} className='mg-graph' redraw/>
    } else {
      chart = <h2>Loading...</h2>
    }
    return(
      <div>
        {chart}
      </div>

    )
  }
});

module.exports = MgGraph;
