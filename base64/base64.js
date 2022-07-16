function parserFileToBase64(file,callback){
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload=function (result){
        let str_result = result.target['result'];
        console.log(str_result)
        callback(str_result);
    }
}

function resolveBase64Str(str,callback){
    po = str.indexOf(',')
    top_seg = str.substring(0,po+1)
    last_seg = str.substring(po+1);
    callback(top_seg,last_seg)
}



$("#input-file").change(function (e){
    file = $("#input-file").get(0).files[0];
    if (file){
        parserFileToBase64(file,result=>{
            resolveBase64Str(result,(top,last)=>{
                $("#data-top").val(top)
                $("#data-main").val(last)


            })
        })
    }
    console.log(file)
})


