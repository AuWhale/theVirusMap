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
    var myChart = echarts.init(document.getElementById("container"));

        var data = mapData

        // 加颜色
        var markData = function (data) {
            for (var i = 0; i < data.length; i++) {
                let e = data[i]
                let value = e.value
                let color = 'white'
                if (value >= 1 && value <= 9) {
                    color = '#fee5dc'
                } else if (value >= 10 && value <= 99) {
                    color = '#fee5dc'
                } else if (value >= 100 && value <= 999) {
                    color = '#f3766a'
                } else if (value >= 1000 && value <= 9999) {
                    color = '#e4474a'
                } else if (value >= 10000) {
                    color = '#b60f16'
                }
                // log(color, value)
                e.itemStyle = {
                    normal: {
                        areaColor: color
                    }
                }
            }
            return data
        };
       
        option = {

            tooltip: {
                trigger: 'item',
                formatter: function (val) {
                    log(val)
                    var name = val.name
                    var test = e("#id-div-test")
                    test.innerHTML = name
                    return `${val.name}<br>确诊人数: ${val.data.value}`
                }
            },

            series: [{
                name: '中国',
                type: 'map',
                mapType: 'china',
                selectedMode: 'single',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: markData(data),
            }]
        };

        myChart.setOption(option, true);
}

const __MapMain = function() {
    var rawData = __rawData
    var mapData = rawDataToMapData(rawData)
    mapInit(mapData)
}

__MapMain()
