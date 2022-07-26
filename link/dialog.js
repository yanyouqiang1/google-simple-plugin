
function dialogInit(callback){
    function registerSubBtn(tabs){
        $('#addLinkBtn').click(e=>{
            selectIndex = $("input[name='linkIndex']:checked").val();
            tab = tabs[selectIndex]

            tags = $("#inputTags").val().trim().toUpperCase();
            data ={
                id : generateMixed(8),
                title: tab.title,
                url: tab.url,
                tags: tags,
                remark: ''
            }
            callback(data)
        })

    }

    function showDialog(){
        $('#dialogLink').empty();
        getCurrentTabsNoActive().then(tabs=>{
            html = ''
            for (index in tabs) {
                tab = tabs[index]
                html+=`<div><input type="radio" value="${index}" name="linkIndex"/>${tab.title}</div>`
            }
            $(".dialogLink").append(html)

            registerSubBtn(tabs);

            $(".dialogNew").show()
        })




    }


    $("#recordBtn").click(e=>{
        showDialog();
    })
}


