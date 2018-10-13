import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import Chart from './Chart';

class KuhlerChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineChartData: {
              labels: [],
              datasets: [
                {
                  type: "line",
                  label: props.type,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderColor: "#3f51b5",
                  pointBackgroundColor: "#f50057",
                  pointBorderColor: "#f50057",
                  borderWidth: "2",
                  lineTension: 0.45,
                  data: []
                }
              ]
            },
            lineChartOptions: {
              responsive: true,
              maintainAspectRatio: false,
              tooltips: {
                enabled: true
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10
                    }
                  }
                ]
              }
            }
          };
    }

      componentDidMount() {
        this.props.socket.on('kuhler', (data) => {
            const oldKuhlerDataSet = this.state.lineChartData.datasets[0];
            let newKuhlerDataSet = { ...oldKuhlerDataSet };
            const oldKuhlerLabels = this.state.lineChartData.labels;
            let newKuhlerLabels = [...oldKuhlerLabels];
            /*if (oldKuhlerDataSet.data.length > 300) {
                newKuhlerDataSet = { ...oldKuhlerDataSet, data: oldKuhlerDataSet.data.slice(1, oldKuhlerDataSet.data.length), }
                newKuhlerLabels = oldKuhlerLabels.slice(1, oldKuhlerLabels.length);
            }*/
            newKuhlerDataSet.data.push(data[this.props.type]);
            newKuhlerLabels.push(new Date().toLocaleTimeString());

            const newChartData = {
                ...this.state.lineChartData,
                datasets: [newKuhlerDataSet],
                labels: newKuhlerLabels,
            };
            this.setState({ lineChartData: newChartData });
        });
      }

      render() {
          return (
            <div className="chart-container">
              <Chart options={this.state.lineChartOptions} data={this.state.lineChartData} />
            </div>
          )
      }
}

export default socketConnect(KuhlerChart);
