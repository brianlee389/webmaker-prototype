$(".add-tag-button").click(function() {
    var insidediv = $('<div></div>').addClass('dd-handle mobile-li').text("<a>");
    var newid = $('.dd-item').size() + 1;
    var litag = $('<li></li>').addClass("dd-item").attr("data-id", newid).append(insidediv);
    
    var ddlist = $('.dd').find('.dd-list').first();
    ddlist.append(litag).fadeIn();
});


$('.dd').nestable();


/*
console.log($('.dd-item').size());
$('<li></li>').addClass("dd-item");
$('<div></div>').addClass('dd-handle');
*/
/*

<li class="dd-item" data-id="1">
    <div class="dd-handle mobile-li">&lt; a &gt;</div>
</li>*/