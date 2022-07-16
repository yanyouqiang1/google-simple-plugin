

$("#save").click(function (){
    chrome.storage.local.set({'k1': 'v1'}, function() {
        console.log('Value is set to v1');
    });
})


$("#show").click(function (){
    chrome.storage.local.get(['k1'], function(result) {
        console.log('Value currently is ' + result['k1']);
    });
})



projects_data=[{
    "project": "AI project",
    "functions":[
        {
            "name":"project addr",
            "addr_record":[
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                },
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                },
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                }
            ]
        },
        {
            "name":"project addr",
            "addr_record":[
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                },
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                },
                {
                    "name":"front",
                    "addr":"www.baidu.com",
                    "param":"params"
                }
            ]
        }
    ]
}]

// functions
function functionToHtml(func){
    html =''
    html += '<h2 class="func">'+func.name+'</h2>'
    for (record of func.addr_record){
        html +='<div class="record">'
        html+='<input class="rname" type="text" value="'+record.name+'">'
        html+='<input class="raddr" type="text" value="'+record.addr+'">'
        html+='<textarea class="rparam">'+record.param+'</textarea>'
        html +='<button ></button>'
        // html+='<input class="rparam" type="text" value="'+record.param+'">'
        html+='</div>'
    }
    return html
}

// project
function dataToHtml(project_data){
    html =''
    html += `<h1>`+project_data.project+'</h1><hr>'

    for (func of project_data.functions){
        html += functionToHtml(func)
    }
    return html

}

html = dataToHtml(projects_data[0])
$('body').append(html)

