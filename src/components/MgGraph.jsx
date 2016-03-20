import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
var LineChart = require('react-chartjs').Line;

var MgGraph = React.createClass({
  getInitialState: function(){
    return {
      isLoaded: false,
    }
  },

  componentDidMount: function(){
    var today = new Date();
    var startDate = new Date(today - 1000 * 60 * 60 * 24 * 1);
    var endDate = new Date(today + 1000 * 60 * 60 * 24 * 1);
    var interval = 1;

    var queryStr =
      '?start_time=' + encodeURIComponent(startDate.toJSON()) +
      '&end_time=' + encodeURIComponent(endDate.toJSON()) +
      '&interval=' + interval;

    this.serverRequest = $.get(
      API_HOST + '/status/time' + queryStr,
      function(results){
        this.setState({
          isLoaded: true,
          data: {
            labels: _.map(results, function(result){
              var date = new Date(result.time)
              return date.getMonth() +
                '/' + date.getDate() +
                ' ' + date.getHours() + ':' + date.getMinutes();
            }),
            datasets: [
              {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: _.map(results, function(result){return result.mg})
              }
            ]
          }
        });
      }.bind(this)
    )
    // this.serverRequest = $.get(
    //   // TODO: Server domain in config
    //
    //   startDate.setDate(d.getDate() - 2);
    //   'http://localhost:8181/status/time',
    //   function(){
    //
    //   });
  },

  render(){
    var chart = null;
    console.log("Render");
    console.log(this.state);
    if(this.state.isLoaded){
      chart = <LineChart data={this.state.data} options='' className='mg-graph' redraw/>
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
