import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

class RowChart extends Component {
    constructor() {
        super();
        this.state={
            params: []
        }
        echarts.registerTheme('my_theme', {
            backgroundColor: '#262932'
        });
    }

    getOption() {
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