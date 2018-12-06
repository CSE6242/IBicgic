import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import axios from 'axios';
import * as _ from 'lodash';

class RowChart extends Component {
    constructor() {
        super();
        this.state={
            in: [],
            out: []
        }
        echarts.registerTheme('my_theme', {
            backgroundColor: '#262932'
        });
    }

    // componentDidMount() {
    //     axios.get("https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/all-use?divide_by=week")
    //         .then((res) => {
    //             let raw_data = res.data;
    //             let new_data_in = [];
    //             let new_data_out = [];
    //             _.each(raw_data, (d) => {
    //                 new_data_in.push(d.in);
    //                 new_data_out.push(d.out);
    //             });
    //             this.setState({
    //                 in: new_data_in,
    //                 out: new_data_out
    //             });
    //         })
    // }

    getOption() {
        // let data1 = this.state.in;
        // let data2 = this.state.out;
        let data1 = [313622, 441132, 430021, 519287, 469876, 438989, 324824];
        let data2 = [312234, 443221, 430012, 519341, 469801, 438980, 324813];
        return {    
                title: {
                    text: 'Usage by Week',
                    top: 25,
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {           
                        type : 'shadow'  
                    }
                },
                legend: {
                    data: ['borrow', 'return'],
                    top: 25,
                    textStyle: {
                        color: '#eee'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        color: '#fff',
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['Sun','Mon','Tue','Wed','THUR','FRI','SAT'],
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: 'borrow',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            color: '#ad358b'
                        },
                        data: data1
                    },
                    {
                        name: 'return',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            color: '#00aced'
                        },
                        data: data2
                    }
                ]
        }
    }

    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                lazyUpdate={true}
                style={{height: '300px', width: '30vw'}}
                theme={"my_theme"}
                className={"row-chart"}
                showLoading={false}
            />
        )
    }
}

export default RowChart;