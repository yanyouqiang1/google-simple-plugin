// chrome save
function storage_save(value) {
    chrome.storage.local.set({tablist: value}, function () {
        console.log('Value is set to ' + value);
    });

}

function storage_get(callback) {
    chrome.storage.local.get(['tablist'], function (result) {
        console.log('Value currently is ' + result.tablist);
        callback(result.tablist)
        return result
    });
}

/*savedData = [{
    name: "测试",
    time: "20210223",
    tabs: [
        {
            title: "baidu",
            url: "www.baidu.com"
        },
        {
            title: "baid222",
            url: "www.baidu.com"
        }
    ],
    markText: "这是一个测试的样例"
}]*/

savedData =[]


function saveAndRefresh(){
    storage_save(savedData);
    refresh()
}
function recordTabs() {
    //记录上tabs
    getAllTabs().then(alltabs => {
        tabs=[]
        for (const tab of alltabs) {
            data = {
                title: tab.title,
                url: tab.url
            }
            tabs.push(data)
        }
        //构建数据
        newData={
            name: "new",
            time:  new Date().format("yyyy-MM-dd HH:mm:ss"),
            tabs: tabs,
            markText: ""
        }
        savedData.unshift(newData)

        saveAndRefresh()
    })

}

//渲染
function render(){
    if (!savedData) return
    // 渲染model数据
    function renderRecord(model,index) {
        lilist = ''
        for (i in model.tabs) {
            tab = model.tabs[i]
            lilist += `<li>
                <a href="${tab.url}">${tab.title}</a>
                <button id="urlDeleteBtn" class="urlDeleteBtn" recordIndex="${index}" urlIndex="${i}">delete</button>
                </li>`
        }
        template = `
<div class="recordsDiv">
    <div class="urlsDiv">
        <input class="title" id="title_${index}" value="${model.name}"><span class="time">${model.time}</span>
        <ul>
           ${lilist}
        </ul>
    </div>
    <div class="remarksDiv">
        <textarea class="remark" id="remark_${index}" >${model.markText}</textarea>
    </div>
    <div class="operationsDiv">
        <ul>
            <li><button index="${index}" id="openAllBtn" class="openAllBtn">打开所有</button></li>
             <li><button index="${index}" id="saveBtn" class="savebtn">保    存</button></li>
            <li><button index="${index}" id="deleteBtn" class="deleteBtn">删   除</button></li>
        </ul>
    </div>
</div>
        `;
        return template;
    }
    // 渲染model 列表数据
    function renderRecords(models){
        html ='';
        for (index in models) {
            html+= renderRecord(models[index],index);
        }
        return html
    }

    $('.containerDiv').append(renderRecords(savedData))

    registerListener();
}

//注册
function registerListener(){
    $('button#urlDeleteBtn').click((e)=>{
        let rindex = $(e.target).attr('recordIndex');
        let uindex = $(e.target).attr('urlIndex');
        savedData[rindex].tabs.splice(uindex,1)

        saveAndRefresh()
    })
    $("button#openAllBtn").click((e) => {
        let index = $(e.target).attr('index');
        urls=[]
        for (tab of savedData[index].tabs){
            urls.push(tab.url)
        }
        openTabs(urls)

    })
    $("button#saveBtn").click((e) => {
        let index = $(e.target).attr('index');

        nname=$(`#title_${index}`).val()
        mark=$(`#remark_${index}`).val()

        savedData[index].name = nname
        savedData[index].markText=mark

        saveAndRefresh();

    })
    $("button#deleteBtn").click((e) => {
        if (confirm("确认删除吗?")){
            let index = $(e.target).attr('index');

            savedData.splice(index,1);

            saveAndRefresh()
        }
    })
}

$("#recordBtn").click(() => {
    recordTabs()
})

storage_get((data)=>{
    savedData = data?data:[]
    render()
})


