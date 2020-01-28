
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import Mainmenu from './mainform.js';


ReactDOM.render(<Mainmenu />, document.getElementById('mainmenu'));
ReactDOM.render(<h>通过后续的render来给主要框架渲染</h>, document.getElementById('annoucement'));