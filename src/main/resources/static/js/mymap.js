(async function () {
    //0.接受后台ProvinceOutput数据
    var po = {};
    var provincename = new Array();
    var patentnumber = new Array();
    var sum = 0;
    await axios.get("TownOutput")
        .then(response => {
                po = response.data;
                for (var i = 0; i < po.length; i++) {
                    provincename[i] = po[i].town;
                    patentnumber[i] = po[i].four_num + po[i].five_num;
                    sum = sum + patentnumber[i]
                }
            }
        );

    // // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".map .chart"));
    myChart.showLoading();

    let outname = provincename;
    let outvalue = patentnumber;
    var outdata = [];

    var max = 6000,
        min = 10;
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    for (var i = 0; i < outname.length; i++) {
        outdata.push({
            name: outname[i],
            value: outvalue[i]
        })
    }

    var geoCoordMap = {};

    // await axios.get('json/beibei_geo.json').then(response => {
    await axios.get('json/bishan_geo.json').then(response => {
        myChart.hideLoading();

        let beibeiJson = response.data;
        // echarts.registerMap('beibei', beibeiJson);
        echarts.registerMap('bishan', beibeiJson);


        /*获取地图数据*/
        // var mapFeatures = echarts.getMap('beibei').geoJson.features;
        var mapFeatures = echarts.getMap('bishan').geoJson.features;
        mapFeatures.forEach(function (v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
        });

        // 处理数据
        var convertData = function (outdata) {
            var res = [];
            for (var i = 0; i < outdata.length; i++) {
                var geoCoord = geoCoordMap[outdata[i].name];
                if (geoCoord) {
                    res.push({
                        name: outdata[i].name,
                        value: geoCoord.concat(outdata[i].value),
                    });
                }
            }
            return res;
        };

        option = {
            tooltip: {
                show: true,
                formatter: function (params) {
                    if (params.value.length > 1) {
                        return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;专利数量:' + params.value[2] + '&nbsp;&nbsp;';
                    } else {
                        return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;专利数量:' + params.value + '&nbsp;&nbsp;';
                    }
                },

            },

            geo: {
                // map: 'beibei',
                map: 'bishan',
                show: true,
                roam: false,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                layoutSize: "100%",
                itemStyle: {
                    normal: {
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00F6FF'
                        }, {
                            offset: 1,
                            color: '#53D9FF'
                        }], false),
                        borderWidth: 3,
                        shadowColor: 'rgba(10,76,139,1)',
                        shadowOffsetY: 0,
                        shadowBlur: 60
                    }
                }
            },
            series: [{
                type: 'map',
                // map: 'beibei',
                map: 'bishan',
                aspectScale: 0.75,
                //zoom:1.1,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#073684' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#061E3D' // 100% 处的颜色
                            }],
                        },
                        borderColor: '#215495',
                        borderWidth: 1,
                    },
                    emphasis: {
                        areaColor: {

                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#073684' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#061E3D' // 100% 处的颜色
                            }],
                        },
                    }
                },
                data: outdata,
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'stroke'
                },
                showEffectOn: 'render',
                itemStyle: {
                    normal: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(5,80,151,0.2)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(5,80,151,0.8)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,108,255,0.7)'
                            }],
                            global: false // 缺省为 false
                        },
                    }

                },
                label: {
                    normal: {
                        show: true,
                        color: '#fff',
                        fontWeight: 'bold',
                        position: 'inside',
                        align: 'center',
                        formatter: function (para) {
                            // console.log(para.data.name);
                            return para.data.name + '\n{cnNum|' + para.data.value[2] + '}'
                        },
                        rich: {
                            cnNum: {
                                fontSize: 13,
                                color: '#D4EEFF',
                            }
                        }
                    },
                },
                symbol: 'circle',
                symbolSize: function (val) {
                    if (val[2] === 0) {
                        return 0;
                    }
                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                    var b = maxSize4Pin - a * max;
                    return a * val[2] + b * 1.2;
                },
                data: convertData(outdata),
                zlevel: 1,
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    });

})();
