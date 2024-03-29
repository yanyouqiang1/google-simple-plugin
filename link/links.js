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
        <a href="#"><span class="ltitle" id="ltitle" index="${data.id}">${data.title}</span></a>
        <a href="${data.url}"><span class="llink">${data.url}</span> </a>
      </p>
      <div class="detail" id="detail_${data.id}">
               <button class="putaway" id="putaway" index="${data.id}">收起</button><br>
              <textarea class="remark" id="remark_${data.id}">${data.remark}</textarea>
      </div>
      <p class="tagsDiv">
            <input type="text" value="${data.tags}" id="tags_${data.id}" class="dataTags"> 
            <button class="deleteBtn" id="deleteBtn" index="${data.id}">delete</button>
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

        tags = $(`#tags_${id}`).val()
        tags = tags.split(' ').filter(s => !!s).join(' ') //filter empty

        data = linksData.find(data => data.id == id)

        data.tags = tags
        data.remark = $(`#remark_${id}`).val()

        storage_save(linksData);
        searchAndShow()

    })

    $("button#deleteBtn").click(e => {
        if (!confirm("确认删除吗？")){
            return;
        }
        let id = $(e.target).attr('index');
        //delete
        linksData.forEach(function(item, index, arr) {
            if(item.id==id){
                arr.splice(index, 1);
            }
        })

        storage_save(linksData);
        searchAndShow()
    })

    // $("a#showDetails").click(e=>{
    //     let id = $(e.target).attr('index');
    //     $(`#detail_${id}`).show()
    // })
    $("span#ltitle").click(e=>{
        let id = $(e.target).attr('index');
        $(`#detail_${id}`).show()
    })
    $("button#putaway").click(e=>{
        let id = $(e.target).attr('index');
        $(`#detail_${id}`).hide()
    })

}


storage_get((data) => {
    linksData = data ? data : []
    renderLinks(linksData.slice(0,10))
})


dialogInit(data => {
    linksData.unshift(data)
    saveAndRefresh()
})

function searchAndShow(){
    keyword = $('#search').val().trim().toUpperCase();;
    if (keyword){
        result = []

        // let findResult = linksData.find(data=>data.tags.matchAll(keyword));
        // let findResult = linksData.filter(data=> similarity2(data.tags,keyword)>0.3);
        result = linksData.map(data=>{
            val = similarity2(data.tags,keyword)
            if (val>0){
                return {
                    similar: val,
                    data: data
                }
            }
        }).filter(a=>a)

        result.sort((a,b)=>b.similar-a.similar)

        result = result.map(data=>data.data)

        // result= result.concat(findResult)
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

$('#search').focus()
