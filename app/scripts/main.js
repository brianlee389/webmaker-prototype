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
    
    $('.edit-tag').simpleexpand();
    
    function createTag(tagname) {
        return "< " + tagname + " >"
    }
    
    // a lot more abstractions can be made, but this is a prototype
    // so I didn't care
    $(".create").click(function() {
        var selectVal = $(".select-tags").val();
        var insidediv = $('<div></div>').addClass('mobile-li');
        
        var spanleft = $('<span></span>').addClass('dd-handle').text(createTag(selectVal));
        var spanright = $('<span></span>').addClass('edit-tag').text('Edit');
        
        insidediv.append(spanleft);
        insidediv.append(spanright);
        
        var newid = $('.dd-item').size() + 1;
        var litag = $('<li></li>').addClass("dd-item").attr("data-id", newid).append(insidediv);

        var expandableContent = $("<div></div>").addClass("content mobile-li");
        
        var button = $('<button></button>').addClass('circle-button');
        var buttonText = button.clone().text("text");
        var buttonLink = button.clone().text("link");
        
        expandableContent.append(buttonLink);
        expandableContent.append(buttonText);
        
        var ddlist = $('.dd').find('.dd-list').first();
        ddlist.append(litag).fadeIn();
        
        // setup the expand
        $(spanright).simpleexpand();
    });
    

                        
                        
    
    /* Rendering the preview */
    var previewTag = $(".preview").children(".scrollable");
    var initialList = $('.dd').children(".scrollable").children(".dd-list");
    
    function renderList(addto, additem) {
        var itemlist = additem.children(".dd-item");
        var listsize = itemlist.length;
        for(var i = 0; i < itemsize; i++) {
            var item = itemlist[i];
            var data = item.find(".dd-handle").first();
            //create the tag from the data
            
            var innerlist = item.find(".dd-list");
            if(innerlist.length > 0) {
                // pass the created tag to renderList and add the rest of the inner tags
                //renderList(innerlist)
            }
        }
    }
    
    $( "#accordion" ).accordion({
        collapsible: true
    });
    // renderList(previewTag, initialList)
    
    
    //.children("li")
});


