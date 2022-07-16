$('#markItUp').markItUp(mySettings);



// You can add content from anywhere in your page
// $.markItUp( { Settings } );
$('.add').click(function() {
    $('#markItUp').markItUp('insert',
        { 	openWith:'<opening tag>',
            closeWith:'<\/closing tag>',
            placeHolder:"New content"
        }
    );
    return false;
});

// And you can add/remove markItUp! whenever you want
// $(textarea).markItUpRemove();
$('.toggle').click(function() {
    if ($("#markItUp.markItUpEditor").length === 1) {
        $("#markItUp").markItUp('remove');
        $("span", this).text("get markItUp! back");
    } else {
        $('#markItUp').markItUp(mySettings);
        $("span", this).text("remove markItUp!");
    }
    return false;
});