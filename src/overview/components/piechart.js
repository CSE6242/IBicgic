import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import axios from 'axios';
import * as _ from 'lodash';

class PieChart extends Component {
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
    //     axios.get("https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/riding-count?startDate=2016-10-01&endDate=2017-01-01&type=age")
    //         .then((res) => {
    //             let raw_data = res.data;
    //             let new_data = [];
    //             _.each(raw_data, (d) => {
    //                 new_data.push({value: d.value, name: d.name});
    //             });
    //             this.setState({
    //                 datas: new_data
    //             });
    //         })
    // }

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
                orient: 'vertical',
                x: 'left',
                top: 40,
                data:["12~21", "21~35", "35~55", "55-75", ">75"],
                textStyle: {
                    color: '#eee'
                }
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
                    // data: this.state.datas;
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
                style={{height: '300px', width: '20vw'}}
                theme={"my_theme"}
                className={"pie-chart"}
                showLoading={false}
            />
        )
    }
}

export default PieChart;