var test_data = [
    {
        region: "香港",
        existing_confirmed: 553,
        cumulative_confirmed: 900,
        death: 4,
        cure: 459,
    },
    {
        region: "广东",
        existing_confirmed: 500,
        cumulative_confirmed: 1100,
        death: 6,
        cure: 400,
    },
    {
        region: "四川",
        existing_confirmed: 501,
        cumulative_confirmed: 1000,
        death: 6,
        cure: 400,
    },
]

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
    setTable(test_data)
    bindEvent()
}

__sortMain()