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
      view: 'status',
      mgOverTime: null,
      mgInBody: null,
    }
  },

  componentDidMount: function(){
    this.fetchAll();
  },

  handleIngest: function(){
    this.fetchAll();
    this.showStatus();
  },

  fetchAll: function(){
    this.setState({mgOverTime: null});
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

  showIngest: function(){
    this.setState({view: 'ingest'});
  },

  showStatus: function(){
    this.fetchAll();
    this.setState({view: 'status'});
  },

  render() {
    var visibleComponents = null;
    if(this.state.view == 'status'){
      visibleComponents = <div>
          <a
            href='javascript:void(0)'
            onClick={this.showIngest}
            className='btn btn-primary btn-add'>+</a>
          <MgInBody mg={this.state.mgInBody} />
          <MgGraph data={this.state.mgOverTime} />
        </div>;
    } else if(this.state.view == 'ingest') {
      visibleComponents = <Ingest onCancel={this.showStatus} onIngest={this.handleIngest}/>;
    }
    return (
      <div className='index'>
        {visibleComponents}
      </div>
    );
  }
});

module.exports = AppComponent;
