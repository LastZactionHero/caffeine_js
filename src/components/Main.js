require('normalize.css');
require('styles/App.scss');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')

import React from 'react';

import MgInBody from './MgInBody';
import MgGraph from './MgGraph';
import Ingest from './Ingest';
import $ from 'jquery';

var AppComponent = React.createClass({
  getInitialState: function(){
    return {
      mgOverTime: null,
      mgInBody: null
    }
  },

  componentDidMount: function(){
    this.fetchAll();
  },

  handleIngest: function(){
    this.fetchAll();
  },

  fetchAll: function(){
    this.fetchMgOverTime();
    this.fetchMgInBody();
  },

  fetchMgInBody: function() {
    this.serverRequest = $.get(
      API_HOST + '/status/now',
      function(result){
        this.setState({mgInBody: Math.floor(result.mg_in_body)});
      }.bind(this)
    );
  },

  fetchMgOverTime: function(){
    var dateRange = 0.5;
    var interval = 1;

    var startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + dateRange);

    var queryStr =
      '?start_time=' + encodeURIComponent(startDate.toJSON()) +
      '&end_time=' + encodeURIComponent(endDate.toJSON()) +
      '&interval=' + interval;

    this.serverRequest = $.get(
      API_HOST + '/status/time' + queryStr,
      function(results){
        this.setState({mgOverTime: results});
      }.bind(this)
    );
  },

  render() {
    return (
      <div className='index'>
        <MgInBody mg={this.state.mgInBody} />
        <MgGraph data={this.state.mgOverTime} />
        <hr/>
        <Ingest onIngest={this.handleIngest}/>
      </div>
    );
  }
});

module.exports = AppComponent;
