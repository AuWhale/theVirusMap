var test_data = [
    // {
    //     region: "香港",
    //     existing_confirmed: 553,
    //     cumulative_confirmed: 900,
    //     death: 4,
    //     cure: 459,
    // },
]

// 列表的数据接口
var rawDataToTableData = function(rawData) {
    // log(rawData)
    // 选出 国家是 中国的 数据 filter 这个不用管, 奇葩写法
    var chinaData = rawData.results.filter(p => p.countryName == '中国')
    for (let i = 0; i < chinaData.length; i++) {
        let e = chinaData[i]
        let o = {
            region: e.provinceShortName,
            existing_confirmed: e.currentConfirmedCount,
            cumulative_confirmed: e.confirmedCount,
            death: e.deadCount,
            cure: e.curedCount,
        }
        test_data.push(o)
    }
}

var setTable = function(list) {
    var table = e("#form")
    table.innerHTML = tableTemplate(list)
    bindEvent()
}

var tableTemplate = function(list) {
    var listStr = ""
    // 先把 数组排好, table不能用 inserAdjectHTML 不知道为啥... 只能插字符串
    for (let i = 0; i < list.length; i++) {
        let e = list[i]
        var s = `
            <tr>
                <td align="center" style="padding-right:0px;">${e.region}</td>
                <td class="existing-confirmed" align="right">${e.existing_confirmed}</td>
                <td align="right">${e.cumulative_confirmed}</td>
                <td align="right">${e.death}</td>
                <td align="right">${e.cure}</td>
                <td align="right"><a href = “”>详情></td>
            </tr>
        `
        listStr += s
    }
    var str = `
         <table id="table">
            <tr>
                <th style="width:150px;">地区</th>
                <th id="id-existing-confirmed">现存确诊</th>
                <th id="id-cumulative-confirmed">累计确诊</th>
                <th>死亡</th>
                <th>治愈</th>
                <th>疫情</th>
            </tr>
            ${listStr}
        </table>
    `
    return str
}

var bindEvent = function() {
    let existing_confirmed = e("#id-existing-confirmed")
    
    existing_confirmed.addEventListener('click', function(event) {
        //log("点到了 existing_confirmed")
        test_data.sort(function (a, b) {
            return b.existing_confirmed - a.existing_confirmed;
        });
        setTable(test_data)
    })

    let cumulative_confirmed = e("#id-cumulative-confirmed")
    cumulative_confirmed.addEventListener('click', function (event) {
        //log("点到了 cumulative_confirmed")
        test_data.sort(function (a, b) {
            return b.cumulative_confirmed - a.cumulative_confirmed;
        });
        setTable(test_data)
    })
}

var __sortMain = function() {
    var rawData = __rawData
    rawDataToTableData(rawData)
    setTable(test_data)
    bindEvent()
}

__sortMain()