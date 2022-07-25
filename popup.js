$("#base64").click(function (){
    window.open("base64/base64.html")
})

$("#render").click(function (){
    window.open("render/render.html")
})
$("#notebook").click(function (){
    window.open("notebook/notebook.html")
})
$("#tabs").click(function (){
    window.open("tabs/tabs.html")
})

$("#yml").click(function (){
    window.open("yml/yml.html")
})
$("#links").click(function (){
    getCurrentTabs().then(tab=>{
        console.log(tag)
    })

    // window.open("link/links.html")
})