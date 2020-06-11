
var uploadedDataURL = "/asset/get/s/data-1547533200844-7eBMgp66l.png";

var myChart = echarts.init(document.getElementById('graph'));



option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
};

myChart.setOption(option);