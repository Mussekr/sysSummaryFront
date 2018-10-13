import React, { Component } from 'react';
import RTChart from 'react-rt-chart';
import { socketConnect } from 'socket.io-react';

class KuhlerChartV2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            [props.type]: [],
        };
    }

    componentDidMount() {
        this.props.socket.on('kuhler', (data) => {
            this.setState({ [this.props.type]: data[this.props.type] });
        })
    }
    render() {
        return (
            <RTChart
                fields={[this.props.type]}
                data={{ [this.props.type]: this.state[this.props.type], date: new Date(), }}
                maxValues={300}
                flow={{
                    duration: 200,
                }}
            />
        )
    }
}

export default socketConnect(KuhlerChartV2);