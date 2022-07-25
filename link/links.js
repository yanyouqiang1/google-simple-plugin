// chrome save
function storage_save(value) {
    chrome.storage.local.set({linksData: value}, function () {
        console.log('Value is set to ' + value);
    });

}

function storage_get(callback) {
    chrome.storage.local.get(['linksData'], function (result) {
        console.log('Value currently is ' + result.linksData);
        callback(result.linksData)
        return result
    });
}

/*
linksData=[
    {
        title: "Baidu",
        url:"www.baidu.com",
        remark:"bbbbbbbbbbbbb",
        tags:["baidu","baidu"]
    }
]
*/
linksData=[]

function saveAndRefresh(){
    storage_save(savedData);
    refresh()
}


function rendLink(data){
    taghtml =''
    for (tag of data.tags){
        taghtml +=`<li>${tag}</li>`
    }

    html =`<div class="col-md-12 column">
      <p>
        <a href=""><span class="ltitle">${data.title}</span><span class="llink">${data.url}</span> </a>
      </p>
      <p>
        <textarea class="remark">${data.remark}</textarea>
        <button class="saveBtn">save</button>
      </p>
      <p>
      <ul>
        ${taghtml}
      </ul>
      </p>
    </div>`

    return html
}

function renderLinks(datas){
    html =''
    for (data of datas){
        html += rendLink(data)
    }
    return html
}

function render(){
    $("#containerDiv").append(renderLinks(linksData))
}


storage_get((data)=>{
    linksData = data?data:[]
    render()
})
