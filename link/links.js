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
        id: 12345678
        title: "Baidu",
        url:"www.baidu.com",
        remark:"bbbbbbbbbbbbb",
        tags:["baidu","baidu"]
    }
]
*/
linksData = []

function saveAndRefresh() {
    storage_save(linksData);
    refresh()
}

function rendLink(data) {
    taghtml = ''

    html = `<div class="col-md-12 column">
      <p class="ptitle">
        <a href=""><span class="ltitle">${data.title}</span><span class="llink">${data.url}</span> </a>
      </p>
      <div class="detail" id="detail_${data.id}">
              <textarea class="remark" id="remark_${data.id}">${data.remark}</textarea>
      </div>
      <p class="tagsDiv">
            <input type="text" value="${data.tags}" id="tags_${data.id}" class="dataTags"> 
            <button class="saveBtn" id="saveBtn" index="${data.id}">save</button>
       </p>
    </div>
    `

    return html
}

function renderLinks(datas) {
    $("#containerDiv").empty()
    html = ''
    for (data of datas) {
        html += rendLink(data)
    }
    $("#containerDiv").append(html)

    registerListener()
}

function registerListener() {
    $("button#saveBtn").click(e => {
        let id = $(e.target).attr('index');

        tags = $(`#tags_${data.id}`).val()
        tags = tags.split(' ').filter(s => !!s).join(' ') //filter empty

        data = linksData.find(data => data.id == id)

        data.tags = tags
        data.remark = $(`#remark_${id}`).val()

        storage_save(linksData);
        searchAndShow()

    })

    $("a#showDetails").click(e=>{
        let id = $(e.target).attr('index');
        $(`#detail_${id}`).show()
    })

}


storage_get((data) => {
    linksData = data ? data : []
    renderLinks(linksData)
})


dialogInit(data => {
    linksData.unshift(data)
    saveAndRefresh()
})

function searchAndShow(){
    keyword = $('#search').val().trim();
    if (keyword){
        result = []

        // let findResult = linksData.find(data=>data.tags.matchAll(keyword));
        let findResult = linksData.filter(data=> similarity2(data.tags,keyword)>0);
        result= result.concat(findResult)
        renderLinks(result)
    }else{
        renderLinks(linksData)
    }

}

$('#search').bind('keypress', function (event) {
    if (event.keyCode == "13") {
        searchAndShow()
    }
})
