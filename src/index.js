import { Card } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import Mainmenu from './mainform.js';
import Ancmt from "./announcement";
//import {AxiosInstance as axios} from "axios";
import axios from 'axios';

let info = '';


axios.get('/home')
    .then(function(response) {
        console.log(response.data);

    if (response.status = '200'){
        const data = JSON.parse(response.data);
        info = data.map((part) => <Card title={part.publicid} extra={part.time} style={{ width: 1350 }}>
            <p>{part.content}</p>
        </Card>
        );
    }
    else info = <h>No info</h>;
    });

/*
const data = '[{"publicid": "user1","content": "公告的内容1","time": "YYYY-MM-DD"},' +
    '{"publicid": "发布人2","content": "公告的内容2","time": "2020-MM-DD"},' +
    '{"publicid": "发布人3","content": "公告的内容3","time": "2020-1-28"}]';
const Odata = JSON.parse(data);


const Odata = [{"publicid": "user1","content": "公告的内容1","time": "YYYY-MM-DD"},
    {"publicid": "发布人2","content": "公告的内容2","time": "2020-MM-DD"}];

//测试部分，公告显示正常

const info = Odata.map((part) => {return <Card title={part.publicid} extra={part.time} style={{ width: 1350 }}>
                        <p>{part.content}</p>
                        </Card> });
*/

ReactDOM.render(<Mainmenu />, document.getElementById('mainmenu'));
ReactDOM.render(
    <div>
        {info}
    </div>
,document.getElementById('announcement'));
ReactDOM.render(
    <div>
    <Ancmt />
    </div>
    , document.getElementById('temp'));
