require('normalize.css');
require('styles/App.scss');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')

import React from 'react';

import MgInBody from './MgInBody';
import MgGraph from './MgGraph';
import Ingest from './Ingest';
import $ from 'jquery';
import _ from 'underscore';

var AppComponent = React.createClass({
  getInitialState: function(){
    return {
      mgOverTime: null,
      mgInBody: null
    }
  },

  componentDidMount: function(){
    this.fetchMgOverTime();
    this.fetchMgInBody();
  },

  fetchMgInBody: function() {
    this.serverRequest = $.get(
      API_HOST + '/status/now',
      function(result){
        this.setState({
          mgInBody: Math.floor(result.mg_in_body)
        });
      }.bind(this)
    );
  },

  fetchMgOverTime: function(){
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 0.5);

    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 0.5);

    var interval = 1;

    var queryStr =
      '?start_time=' + encodeURIComponent(startDate.toJSON()) +
      '&end_time=' + encodeURIComponent(endDate.toJSON()) +
      '&interval=' + interval;

    this.serverRequest = $.get(
      API_HOST + '/status/time' + queryStr,
      function(results){
        this.setState({
          mgOverTime: {
            labels: _.map(results, function(result){
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
                data: _.map(results, function(result){return result.mg})
              }
            ]
          }
        });
      }.bind(this)
    );
  },

  handleIngest: function(){
    this.fetchMgOverTime();
    this.fetchMgInBody();
  },

  render() {
    return (
      <div className='index'>
        <MgInBody mg={this.state.mgInBody} />
        <MgGraph data={this.state.mgOverTime} />
        <Ingest onIngest={this.handleIngest}/>
      </div>
    );
  }
});

module.exports = AppComponent;
