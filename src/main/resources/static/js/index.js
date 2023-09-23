//自调用函数
(function () {
    // 1、页面一加载就要知道页面宽度计算
    var setFont = function () {
        // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
        var html = document.documentElement;// 获取html
        // 获取宽度
        var width = html.clientWidth;

        // 判断
        if (width < 1024) width = 1024
        if (width > 1920) width = 1920
        // 设置html的基准值
        var fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 2、页面改变的时候也需要设置
    // 尺寸改变事件
    window.onresize = function () {
        setFont();
    }
})();


(function () {
    //事件委托
    $('.monitor').on('click', ' a', function () {
        //点击当前的a 加类名 active  他的兄弟删除类名
        $(this).addClass('active').siblings().removeClass('active');
        //获取一一对应的下标
        var index = $(this).index();
        //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
        $('.content').eq(index).show().siblings('.content').hide();
    });
    //滚动
    //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
    //      然后动画向上滚动，滚动到一半重新开始滚动
    //因为选取的是两个marquee  所以要遍历
    $('.monitor .marquee').each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
    });

})();
(function () {
    var myechart = echarts.init($('.pie')[0]);
    option = {
        // 控制提示
        tooltip: {
            // 非轴图形，使用item的意思是放到数据对应图形上触发提示
            trigger: 'item',
            // 格式化提示内容：
            // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 控制图表
        series: [
            {
                // 图表名称
                name: '地区',
                // 图表类型
                type: 'pie',
                // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                // 百分比基于  图表DOM容器的半径
                radius: ['10%', '70%'],
                // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                center: ['50%', '50%'],
                // 半径模式，另外一种是 area 面积模式
                roseType: 'radius',
                // 数据集 value 数据的值 name 数据的名称
                data: [
                    {value: 10, name: '其他'},//196
                    {value: 6345, name: '大专院校'},//实际上是152843 ，此处为了美观
                    {value: 17065, name: '企业'},//实际上是153360，此处为了美观
                    {value: 1581, name: '科研单位'},//11371
                    {value: 5564, name: '个人'},//953
                    {value: 215, name: '机关团体'},//381
                ],
                //文字调整
                label: {
                    fontSize: 12
                },
                //引导线
                labelLine: {
                    length: 8,
                    length2: 10
                }
            }
        ],
        color: [
            "#006cff",
            "#cd5501",
            "#ed8884",
            "#ffc80a",
            "#0096ff",
            "#9fe6b8",
        ],
    };
    myechart.setOption(option);
})();

(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".panel-footer"));
    option = {
        tooltip: {
            left: 50,
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: function(p) {
                //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
            }
        },
        // legend: {
        //     orient: 'vertical',
        //     top: 5,
        //     left:-5,
        //     itemWidth: 10,
        //     itemHeight: 10,
        //     data: ["人类生活必需(A)", "作业;运输(B)","化学;冶金(C)","纺织;造纸(D)","固定建筑物(E)","机械工程(F)","物理(G)","电学(H)"],
        //     // data: ["A", "B","C","D","E\n","F","G","H"],
        //     textStyle: {
        //         color: "#4c9bfd",
        //         fontSize: "12"
        //     }
        // },
        series: [
            {
                name: "分类号",
                type: "pie",
                center: ["35%", "38%"],
                radius: ["40%", "60%"],
                color: [
                    "#3dab1e",
                    "#7bab27",
                    "#ab6f2a",
                    "#64a0ab",
                    "#2eab9b",
                    "#b43004",
                    "#c8afbd",
                    "#d15ddc",
                    "#f0029e"
                ],
                label: { show: true },
                labelLine: { show: true },
                data: [
                    { value: 4723, name: "人类生活必需(A)" },
                    { value: 6590, name: "作业;运输(B)" },
                    { value: 2867, name: "化学;冶金(C)" },
                    { value: 355, name: "纺织;造纸(D)" },
                    { value: 959, name: "固定建筑物(E)" },
                    { value: 3184, name: "机械工程(F)" },
                    { value: 5019, name: "物理(G)" },
                    { value: 2586, name: "电学(H)" }
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})();

// 产业概况

(async function () {
    var cpy = {};
    var companyname = new Array();
    var first_claim = new Array();

    await axios.get("CompanyOutput")
        .then(response => {

                cpy = response.data;
                //var option = myechart.option;
                for (var i = 0; i < cpy.length; i++) {
                    var arr = cpy[i].company.split(' ')
                    companyname[i] = arr[0];
                    first_claim[i] = cpy[i].first_claim;

                }
            }
        );

    // // 中间省略的数据  准备三项
    // var item = {
    //     name: '',
    //     value: 1200,
    //     // 柱子颜色
    //     itemStyle: {
    //         color: '#254065'
    //     },
    //     // 鼠标经过柱子颜色
    //     emphasis: {
    //         itemStyle: {
    //             color: '#254065'
    //         }
    //     },
    //     // 工具提示隐藏
    //     tooltip: {
    //         extraCssText: 'opacity:0'
    //     }
    // };

    option = {
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // 轴触发提示才有效
            axisPointer: {
                // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果
                type: 'shadow'
            }
        },
        // 图表边界控制
        grid: {
            left: '0',
            right: '3%',
            bottom: '3%',
            top: '5%',
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [
            {
                // 使用类目，必须有data属性
                type: 'category',
                // 使用 data 中的数据设为刻度文字
                data: companyname,
                // 刻度设置
                axisTick: {
                    // true意思：图形在刻度中间
                    // false意思：图形在刻度之间
                    alignWithLabel: false,
                    show: true
                },
                //文字
                axisLabel: {
                    color: '#5efd4c',
                    interval: 0,
                    rotate: 30,
                    formatter:function(value){
                        let prefix = value.substr(0, 2);
                        if (prefix == '重庆') {
                            return value.substr(2, 4);
                        }else {
                            return value.substr(0, 4);
                        }
                    },
                }
            }
        ],
        // 控制y轴
        yAxis: [
            {
                // 使用数据的值设为刻度文字
                type: 'value',
                axisTick: {
                    alignWithLabel: true,
                    show: true,
                },
                //文字
                axisLabel: {
                    color: '#4c9bfd'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
            }
        ],
        // 控制x轴
        series: [

            {
                // series配置
                // 颜色
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#00fffb'}, // 0 起始颜色
                            {offset: 1, color: '#0061ce'}  // 1 结束颜色
                        ]
                    )
                },
                // 图表数据名称
                name: '高价值专利数量',
                // 图表类型
                type: 'bar',
                // 柱子宽度
                barWidth: '50%',
                // 数据
                data: first_claim,
            }

        ]
    };

    var myechart = echarts.init($('.users .bar')[0]);
    myechart.setOption(option);
})();


// //订单
// (function () {
//     var data = {
//         day365: { orders: '20,301,987', amount: '99834' },
//         day90: { orders: '301,987', amount: '9834' },
//         day30: { orders: '1,987', amount: '3834' },
//         day1: { orders: '987', amount: '834' }
//     //点击事件
//     $('.order').on('click', '.filter a', function () {
//         //点击之后加类名
//         $(this).addClass('active').siblings().removeClass('active');
//         // 先获取点击a的 data-key自定义属性
//         var key = $(this).attr('data-key');
//         //获取自定义属性
//         // data{}==>data.shuxing data['shuxing]
//         key = data[key];//
//         $('.order .item h4:eq(0)').text(key.orders);
//         $('.order .item h4:eq(1)').text(key.amount);
//     });
//     //定时器
//     var index = 0;
//     var aclick = $('.order a');
//     setInterval(function () {
//         index++;
//         if (index > 3) {
//             index = 0;
//         }
//         //每san秒调用点击事件
//         aclick.eq(index).click();
//     }, 3000);
// })();


//专利增长
(function () {

    option = {
        //鼠标提示工具
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            // 类目类型
            type: 'category',
            // x轴刻度文字
            data: ['2001年', '2002年', '2003年', '2004年', '2005年', '2006年', '2007年', '2008年','2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年'],
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线
            },
            boundaryGap: false//去除轴内间距
        },
        yAxis: {
            // 数据作为刻度文字
            type: 'value',
            axisTick: {
                show: false//去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd'//文本颜色
            },
            axisLine: {
                show: false//去除轴线
            },
            boundaryGap: false//去除轴内间距
        },
        //图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色

            },
            right: '10%'//距离右边10%
        },
        // 设置网格样式
        grid: {
            show: true,// 显示边框
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
        series: [
            {
                name: '发明申请',
                // 数据
                data: [295,429,417,506,437,354,359,467,389,395,579,370,391,289,500,392,391,647,449,360,245],
                // 图表类型
                type: 'line',
                // 圆滑连接
                smooth: true,
                itemStyle: {
                    color: '#00f2f1'  // 线颜色
                }
            },
            {
                name: '实用新型',
                // 数据
                data: [453,352,470,373,453,336,437,531,299,513,465,549,471,526,428,516,589,425,415,453,250],
                // 图表类型
                type: 'line',
                // 圆滑连接
                smooth: true,
                itemStyle: {
                    color: '#ed3f35'  // 线颜色
                }
            },
            {
                name: '外观设计',
                // 数据
                data: [117,86,136,108,132,129,156,98,122,131,101,189,102,150,178,160,138,146,71,158,92],
                // 图表类型
                type: 'line',
                // 圆滑连接
                smooth: true,
                itemStyle: {
                    color: '#d800ed'  // 线颜色
                }
            }
        ]
    };
    var myechart = echarts.init($('.line')[0]);
    myechart.setOption(option);

    //点击效果
    var data = {
        year: [
            [295,429,417,506,437,354,359,467,389,395,579,370,391,289,500,392,391,647,449,360,245],
            [453,352,470,373,453,336,437,531,299,513,465,549,471,526,428,516,589,425,415,453,250],
            [117,86,136,108,132,129,156,98,122,131,101,189,102,150,178,160,138,146,71,158,92]
            // ],
            // quarter: [
            //     [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            //     [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            // ],
            // month: [
            //     [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            //     [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            // ],
            // week: [
            //     [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            //     [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    $('.sales ').on('click', '.caption a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        //option series   data
        //获取自定义属性值
        var key = $(this).attr('data-type');
        //取出对应的值
        key = data[key];
        //将值设置到 图表中
        option.series[0].data = key[0];
        option.series[1].data = key[1];
        //再次调用才能在页面显示
        myechart.setOption(option);
    });
})();





