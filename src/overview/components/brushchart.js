import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import mydata from './data';
import * as _ from 'lodash';

export default class BrushChart extends Component {
    constructor() {
        super();
        this.state={
            datas: []
        }
        echarts.registerTheme('my_theme', {
            backgroundColor: '#262932'
        });
    }

    getOption() {
        let date = [];
        let data = [];
        _.each(mydata, (d) => {
            date.push(d.datedata);
            data.push(d.count);
        })
        return {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: 'New York Citi Bike',
                textStyle: {
                    color: '#eee',
                },
                top: 20
            },
            
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
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
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
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
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(255, 127, ,14 0.8)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'usuage',
                    type:'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(30, 119, 180)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(30, 119, 180)'
                        }, {
                            offset: 1,
                            color: 'rgb(180, 206, 226)'
                        }])
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
                style={{height: '300px', width: '100%'}}
                theme={"my_theme"}
                className={"brush-chart"}
                showLoading={false}
            />
        )
    }
}