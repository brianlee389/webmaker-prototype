$(function() {
    $('.dd').nestable();

    // custombox modal
    console.log(getTag(1));
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
    
    // a lot more abstractions can be made, but this is a prototype
    // so I didn't care
    $(".create").click(function() {
        // retrieve value from select tag
        var selectVal = $(".select-tags").val();
        
        var handlediv = $('<div></div>').addClass('dd-handle dd3-handle');
        var innerdiv = $('<div></div>').addClass('dd3-content mobile-li');
        
        var spanleft = $('<span></span>').addClass('name-tag').text(getTag(parseInt(selectVal)));
        
        var spanright = $('<span></span>').addClass('edit-tag').text('Edit');
        
        innerdiv.append(spanleft);
        innerdiv.append(spanright);

        var expandableContent = $("<div></div>").addClass("content mobile-li");
        
        var button = $('<button></button>').addClass('circle-button');
        var buttonText = button.clone().text("text");
        var buttonLink = button.clone().text("link");
        
        expandableContent.append(buttonLink);
        expandableContent.append(buttonText);
        
        var newid = $('.dd-item').size() + 1;
        var litag = $('<li></li>').addClass("dd-item dd3-item").attr("data-id", newid);
        
        // adding the 3 divs into the dd-item
        litag.append(handlediv)
            .append(innerdiv)
            .append(expandableContent);
        
        // sample attributes
        litag.attr("data-ref", "http://www.google.com");
        litag.attr("data-tag", selectVal);
        litag.attr("data-text", "HEre is some sample text");
        
        var ddlist = $('.dd').find('.dd-list').first();
        ddlist.append(litag);
        
        // setup the expand
        $(spanright).simpleexpand();
    });
    
    function getTag(tagnum) {
        
        switch(tagnum) {
            case 0:
                return "<a>";
            case 1:
                return "<img>";
            case 2:
                return "<p>";
            case 3:
                return "<div>";
            case 4:
                return "<h1>";
        }
    }
    
    function createPreviewTag(item) {
        var tagref = item.attr("data-ref");
        var tagtype = parseInt(item.attr("data-tag"));
        var tagtext = item.attr("data-text");
        
        var createdtag = $(getTag(tagtype));
        
        // dealing with tags that need references
        if(tagtype == 0) {
            createdtag.attr("href", tagref);
        } else if(tagtype == 1) {
            createdtag.attr("src", tagref);
        }
        
        createdtag.text(tagtext);
        
        return createdtag;
    }
    
    /* Rendering the preview */
    function renderHtml() {
    /*
        This traverses the the dd-list of dd-items using
        breadth first search and creates and adds the tags 
        into the preview html.
        -addto should be a tag that is created to be put into
        the preview html.
        -additem should be a <ol class="dd-list">
    */
        function renderList(addto, additem) {
            var childitems = additem.children(".dd-item");
            var listsize = childitems.length;
            
            for(var i = 0; i < listsize; i++) {
                var item = childitems[i];
                
                //create the child tag from the data
                var createdtag = createPreviewTag($(item));

                // recursively visit each dd-item tag in the list if it exists
                var innerlist = $(item).children(".dd-list");
                if(innerlist.length > 0) {
                    renderList(createdtag, innerlist);
                }
                
                // add the item to the parent tag
                addto.append(createdtag);
            }      
        } // end renderList function
        
        var previewTag = $(".preview").children(".scrollable");
        var initialList = $('.dd').children(".scrollable").children(".dd-list");
        previewTag.html("");
        renderList(previewTag, initialList);
    } // renderHtml function
    
    renderHtml();
    
    $(".remove-tag-button").click(function() {
        renderHtml();
    });
});