import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import UniverseStore from './UniverseStore';
import Grid from './Grid';

ReactDOM.render(<Grid store={ UniverseStore }/>, document.getElementById('root'));
registerServiceWorker();
