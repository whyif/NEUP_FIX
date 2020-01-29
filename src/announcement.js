import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from "antd";

const { TextArea } = Input;

class Ancmt extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        value: '',
    };
    handleClick(){

    }

    handleChange({ target: { value } }){
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        return(
            <div>
            <TextArea
                value={value}
                onChange={this.handleChange}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <Button type='Primary' onClick={this.handleClick()}>发布一个公告</Button>

            </div>
        )
    }




}

export default Ancmt;