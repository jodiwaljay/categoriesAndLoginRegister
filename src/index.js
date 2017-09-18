import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRoutes from './routes/app-routes';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoutes />, document.getElementById('root'));
registerServiceWorker();
