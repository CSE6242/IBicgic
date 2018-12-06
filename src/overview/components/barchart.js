import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import axios from 'axios';
import * as _ from 'lodash';

class BarChart extends Component {
    constructor() {
        super();
        this.state={
            datas: []
        }
        echarts.registerTheme('my_theme', {
            backgroundColor: '#262932'
        });
    }

    // componentDidMount() {
    //     axios.get("https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/all-use?divide_by=hour")
    //         .then((res) => {
    //             let raw_data = res.data;
    //             let new_data = [];
    //             _.each(raw_data, (d) => {
    //                 new_data.push(d.value);
    //             });
    //             this.setState({
    //                 datas: new_data
    //             });
    //         })
    // }

    getOption() {
        let dataAxis = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '19', '20', '21', '22', '23'];
        // let data = this.state.data;
        let data = [47970, 15099, 9247, 9697, 37332, 135196, 295057, 521677, 390009, 264272, 267234, 308932, 327863, 343513, 363885, 419021, 568875, 522586, 344298, 231571, 163890, 123029, 80027];
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
            dataShadow.push(500);
        }
        return {
            title: {
                text: 'Usage by Hour',
                top: 25,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        };
    }

    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                lazyUpdate={true}
                style={{height: '300px', width: '35vw'}}
                theme={"my_theme"}
                className={"bar-chart"}
                showLoading={false}
            />
        )
    }
}

export default BarChart;