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

  render(){
    return(
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>What did you consume?</h3>
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
