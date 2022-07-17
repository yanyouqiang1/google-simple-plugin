// chrome save
function storage_save(value) {
    chrome.storage.local.set({notebookKey: value}, function () {
        console.log('Value is set to ' + value);
    });

}

function storage_get(callback) {
    chrome.storage.local.get(['notebookKey'], function (result) {
        console.log('Value currently is ' + result.notebookKey);
        callback(result.notebookKey)
        return result
    });
}

function refresh() {
    window.location.reload()
}

record_datas = []

function htmlOfRecord(index, record) {
    htmlTemplate = `<div class="recordDiv">
        <div class="titleDiv">
            <textarea class="title" id="title${index}">${record.title}</textarea>
        </div>
        <div class="contentDiv">
            <textarea class="content" id="content${index}">${record.content}</textarea>
        </div>
        <div class="saveDiv">
            <button class="savebtn" index="${index}">save</button>
        </div>
        <div class="deleteDiv">
            <button class="deleteBtn" index="${index}">delete</button>
        </div>
    </div>`;
    return htmlTemplate
}

function htmlOfRecordDates(record_data) {
    html = ''
    for (row in record_data) {
        html += htmlOfRecord(row, record_data[row])
    }
    return html
}

function save(index) {
    if (index == -1) { //new
        title = $(`#title`).val()
        content = $(`#content`).val()

        data = {
            'title': title,
            "content": content
        }
        record_datas.push(data);

    } else {  //update
        title = $(`#title${index}`).val()
        content = $(`#content${index}`).val()

        record_datas[index].title = title
        record_datas[index].content = content
    }

    storage_save(record_datas)
    refresh()
    console.log(title)
}
function delData(index){
    record_datas.splice(index,1)
    storage_save(record_datas)
    refresh()
}

//new
$(".newbtn").click(function () {
    htmlTemplate = `<div class="recordDiv">
        <div class="titleDiv">
            <textarea class="title" id="title" placeholder="input"></textarea>
        </div>
        <div class="contentDiv">
            <textarea class="content" id="content" placeholder="input"></textarea>
        </div>
        <div class="saveDiv">
            <button class="savebtn" index="${-1}">save</button>
        </div>
    </div>`;
    $(".newBtnDiv").css("display", "none")
    $('.containerDiv').append(htmlTemplate);
    bind()
})

function bind() {
    $(".savebtn").click(function (e) {
        let index = $(e.target).attr('index');
        save(index)
        // console.log(index)
    })

    $(".deleteBtn").click(function (e) {
        let index = $(e.target).attr('index');
        if (confirm("确认删除吗？")) {
            delData(index)
        }
    })
}

storage_get(function (record_datas_save) {
    record_datas = record_datas_save
    if (!record_datas) {
        record_datas = [
            {
                "title": "i'm title",
                "content": "content"
            }
        ]
    }

    $('.containerDiv').append(htmlOfRecordDates(record_datas))

    bind()
});