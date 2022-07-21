inputText = $("#inputText")
show = $("#show")
showArea = $("#show-area")


show.click(()=>{
    let s = inputText.val();
    showArea.empty()
    showArea.append(s)
})