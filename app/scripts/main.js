$(function() {
    $('.dd').nestable();

    // custombox modal
    
    // attach close button handler
    $('.modal .close').on('click', function(e){
        e.preventDefault();
        $.modal().close();
    });

    // open modal with default options or options set with init
    // content will be taken from #login
    $(".add-tag-button").click(function() {
        $('.modal').modal().open();
    });
    
    $(".select-tags").selectOrDie({
        placeholder: "Select a HTML tag"
    });
    
    function createTag(tagname) {
        return "< " + tagname + " >"
    }
    
    $(".create").click(function() {
        var selectVal = $(".select-tags").val();
        var insidediv = $('<div></div>').addClass('dd-handle mobile-li').text(createTag(selectVal));
        var newid = $('.dd-item').size() + 1;
        var litag = $('<li></li>').addClass("dd-item").attr("data-id", newid).append(insidediv);

        var ddlist = $('.dd').find('.dd-list').first();
        ddlist.append(litag).fadeIn();
    });
    
    
    /* Rendering the preview */
});


