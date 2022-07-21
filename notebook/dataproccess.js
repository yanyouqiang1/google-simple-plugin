handleBtn = $('#datahandle')
exportBtn = $('#export')
importBtn = $('#import')
textData = $('#textData')


function disableBtn(btn){
    btn.attr("disabled","disabled");
}

function enableBtn(btn){
    btn.removeAttr("disabled");
}

disableBtn(exportBtn)
disableBtn(importBtn)

handleBtn.click(()=>{
    textData.show();
    enableBtn(exportBtn)
    enableBtn(importBtn)
})


exportBtn.click(()=>{
    textData.val(JSON.stringify(record_datas))
})


importBtn.click(()=>{
    data = textData.val()

    im = JSON.parse(data)

    record_datas = im.concat(record_datas)

    refresh()

})