import React from 'react';
import _ from 'underscore';
var LineChart = require('react-chartjs').Line;

var MgGraph = React.createClass({
  getInitialState: function(){
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltipTemplate: "<%= Math.round(value) + 'mg' %>"
      }
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      chartData: {
        labels: _.map(newProps.data, function(result, idx){
          if(idx % 2 != 0){return '';} // Every other label
          var date = new Date(result.time)
          var hours = date.getHours();
          if(hours < 10) hours = '0' + hours;
          var minutes = date.getMinutes();
          if(minutes < 10) minutes = '0' + minutes;
          return hours + ':' + minutes;
        }),
        datasets: [
          {
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(51,122,183,1)',
            pointColor: 'rgba(51,122,183,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: _.map(newProps.data, function(result){return result.mg})
          }
        ]
      }
    });
  },

  render(){
    var chart = null;
    if(this.state.chartData){
      chart = <LineChart data={this.state.chartData} options={this.state.chartOptions} className='mg-graph' redraw/>
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
