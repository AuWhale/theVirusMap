// 地图的数据接口
var rawDataToMapData = function (rawData) {
    // 选出 国家是 中国的 数据 filter 这个不用管, 奇葩写法
    var data = []
    var chinaData = rawData.results.filter(p => p.countryName == '中国')
    for (let i = 0; i < chinaData.length; i++) {
        let e = chinaData[i]
        let o = {
            name: e.provinceShortName,
            value: e.confirmedCount,
        }
        data.push(o)
    }
    log("map data", data)
    
    return data
}

// 这里写好经纬度之后, 当作参数传进去
const mapInit = function (mapData) {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    
    // 这里换
    var data = mapData

    var geoCoordMap = {
        '西藏': [91.11, 29.97],
        '上海': [121.48, 31.22],
        '福建': [119.3, 26.08],
        '广西': [108.33, 22.84],
        '广东': [113.23, 23.16],
        '山西': [112.53, 37.87],
        '云南': [102.73, 25.04],
        '海男': [110.35, 20.02],
        '辽宁': [123.38, 41.8],
        '吉林': [125.35, 43.88],
        '宁夏': [106.27, 38.47],
        '青海': [101.74, 36.56],
        '内蒙古': [111.65, 40.82],
        '四川': [104.06, 30.67],
        '陕西': [108.95, 34.27],
        '重庆': [106.54, 29.59],
        '江苏': [118.78, 32.04],
        '贵州': [106.71, 26.57],
        '北京': [116.46, 39.92],
        '新疆': [87.68, 43.77],
        '浙江': [120.19, 30.26],
        '香港': [114.12, 22.15],
        '山东': [117, 36.65],
        '甘肃': [103.73, 36.03],
        '天津': [117.2, 39.13],
        '河南': [113.65, 34.76],
        '黑龙江': [126.63, 45.75],
        '河北': [114.48, 38.03],
        '湖南': [113, 28.21],
        '安徽': [117.27, 31.86],
        '湖北': [114.31, 30.52],
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                // log("value", geoCoord.concat(data[i].value))
                // var list = [geoCoord[0], data[i].value, geoCoord[1]]
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                    // value: list,
                });
            }
        }
        // log("res", res)
        return res;
    };


    option = {
        title: {
            text: '全国疫情地图 - 百度地图',
            subtext: 'data from 丁香园',
            sublink: 'http://www.dxy.cn/',
            left: 'center'
        },

        tooltip: {
            trigger: 'item',
            formatter: function (val) {
                // log(val)
                var name = val.name
                var test = e("#id-div-test")
                test.innerHTML = name
                return `${val.name}<br>${val.seriesName}:${val.value[2]}`
            }
        },

        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,

            roam: false,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },

        series: [
            {
                name: '确诊人数',
                type: 'scatter',
                coordinateSystem: 'bmap',
                datasetIndex: 2,
                data: convertData(data),
                //紫色圈圈的大小
                symbolSize: function (val) {
                    // log("symbolSize val", val)
                    // var d = val[2]
                    // var s = 0
                    // if (d < 100) {
                    //     s = 5
                    // } else if (d < 1)
                    return val[2] / 1000 + 20;
                    // return val[2]
                },
                label: {
                    position: 'right',
                    show: false,
                },
                itemStyle: {
                    color: 'red',
                },
                emphasis: {
                    label: {
                        formatter: '{b}',
                        show: true
                    }
                },
            },

        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

const __MapMain = function() {
    var rawData = __rawData
    var mapData = rawDataToMapData(rawData)
    mapInit(mapData)
}

__MapMain()
