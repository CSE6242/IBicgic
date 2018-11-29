import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import * as _ from 'lodash';

class PieChart extends Component {
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
        return {
            title: {
                text: 'Usage by Age',
                top: 20,
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'left',
                data:["12~21", "21~35", "35~55", "55-75", ">75"]
            },
            series: [
                {
                    name:'age',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:44141848, name:'12-21'},
                        {value:1686292083, name:'21-35'},
                        {value:1858214232, name:'35-55'},
                        {value: 556505299, name:'55-75'},
                        {value: 4145153462, name:'>75'}
                    ]
                }
            ]
            
        };
    }

    render() {
        return (
            <ReactEcharts
                option={this.getOption()}
                lazyUpdate={true}
                style={{height: '300px', width: '30vw'}}
                theme={"my_theme"}
                className={"pie-chart"}
                showLoading={false}
            />
        )
    }
}

export default PieChart;