import React from 'react';
import $ from 'jquery';
import Consumable from './Consumable';
import NewConsumable from './NewConsumable';

var Ingest = React.createClass({
  getInitialState: function(){
    return {
      consumables: []
    }
  },

  componentDidMount: function(){
    this.fetchConsumables();
  },

  consumableAdded: function(){
    this.fetchConsumables();
  },

  fetchConsumables: function(){
    $.get(API_HOST + '/consumables', function(consumables){
      this.setState({
        consumables: consumables
      });
    }.bind(this));

  },

  ingest: function(consumable){
    $.ajax({
      type: 'POST',
      url: API_HOST + '/ingest',
      data: JSON.stringify({
        consumable_id: consumable.id,
        energy_level: 1
      }),
      contentType: 'application/json',
      success: function(){
        this.props.onIngest();
      }.bind(this)
    });
  },

  cancelIngest: function(){
    this.props.onCancel();
  },

  render(){
    return(
      <div className='panel panel-default ingest'>
        <div className='panel-heading'>
          <div className='row'>
          <div className='col-xs-8'>
            <h3 className='panel-title'>What did you consume?</h3>
          </div>
          <div className='col-xs-4 text-right'>
            <a className='btn btn-danger' onClick={this.cancelIngest}>Cancel</a>
          </div>
          </div>
        </div>
        <ul className='list-group consumables'>
          {this.state.consumables.map(function(consumable) {
            return <Consumable key={consumable.id} consumable={consumable} onSelected={this.ingest}/>;
          }.bind(this))}
        </ul>
        <div className='panel-body'>
          <NewConsumable onNewConsumable={this.consumableAdded}/>
        </div>
      </div>
    )
  }
});

module.exports = Ingest;
