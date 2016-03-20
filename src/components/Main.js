require('normalize.css');
require('styles/App.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')

import React from 'react';

import MgInBody from './MgInBody';

// var LineChart = require('react-chartjs').Line;
//
// var data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             fillColor: 'rgba(220,220,220,0.2)',
//             strokeColor: 'rgba(220,220,220,1)',
//             pointColor: 'rgba(220,220,220,1)',
//             pointStrokeColor: '#fff',
//             pointHighlightFill: '#fff',
//             pointHighlightStroke: 'rgba(220,220,220,1)',
//             data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: 'My Second dataset',
//             fillColor: 'rgba(151,187,205,0.2)',
//             strokeColor: 'rgba(151,187,205,1)',
//             pointColor: 'rgba(151,187,205,1)',
//             pointStrokeColor: '#fff',
//             pointHighlightFill: '#fff',
//             pointHighlightStroke: 'rgba(151,187,205,1)',
//             data: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
// };
// <LineChart data={data} options='' width='600' height='250'/>

class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <MgInBody />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
