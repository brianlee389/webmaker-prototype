$(function() {
    /* Initialize Webpage */
    $('.dd').nestable();
    $('.edit-tag').simpleexpand();
    $(".select-tags").selectOrDie({
        placeholder: "Select a HTML tag"
    });
    
    // render the html from the items in tag with clas dd to preview
    renderHtml();
    setEditTextButton();
    /* Initialize Webpage end */
    
    // used to map tags to id numbers
    // Purpose: easier to see what tags are needed
    var tagEnum = {
        A: 0,
        IMG: 1,
        P: 2,
        DIV: 3,
        SPAN: 4,
        I: 5,
        BUTTON: 6,
        LI: 7
    };
    
    /* Create event handlers */
    // wire close button for modal
    $('.modal .close').on('click', function(e){
        e.preventDefault();
        $.modal().close();
        $.find(".selected-edit-text").first().removeClass("selected-edit-text");
    });
    
    // open modal event
    $(".add-tag-button").click(function() {
        $('.modal.create-tag').modal().open();
    });
    
    /* 
    This event refers to editing the text in the tag
    */
    function setEditTextButton() {
        $('.modal.insert-text .close').on('click', function(e){
            e.preventDefault();
            $.modal().close();
        });
        
        $(".circle-button.fi-pencil").click(function() {
            var dditem = $(this).addClass("selected-edit-text");
            
            $('.modal.insert-text').modal().open();
        });    
    }
    
    // TODO: remove this when automatic re-rendering
    // is added to this prototype
    $(".remove-tag-button").click(function() {
        renderHtml();
    });
    
    // TODO: refactoring part 2, finished part 1 
    // useing a simple factory method
    $(".modal.create-tag .button").click(function() {
        // retrieve value from select tag
        var selectVal = parseInt($('.select-tags').val());
        var handlediv = createTag(tagEnum.DIV, 'dd-handle dd3-handle');
        var innerdiv = createTag(tagEnum.DIV, 'dd3-content mobile-li');
        var nameTag = createTag(tagEnum.SPAN, 'name-tag').text(getTag(selectVal));
        var editIcon = createTag(tagEnum.I, 'edit-tag fi-page-edit');
        var expandableContent = createTag(tagEnum.DIV, "content mobile-li");
        
        /*var icon = createTag(tagEnum.I, "large");
        var linkIcon = icon.clone().addClass("fi-link");
        var pencilIcon = icon.clone().addClass("fi-pencil");
        */
        var button = createTag(tagEnum.DIV, 'circle-button');
        /* var buttonLink = button.clone().append(linkIcon);
        var buttonText = button.clone().append(pencilIcon);
        */
        var buttonLink = button.clone().addClass('fi-link large');
        var buttonText = button.clone().addClass('fi-pencil large');
        
        
        var newid = $('.dd-item').size() + 1;
        var litagAttr = {
            "data-id" : newid,
            "data-ref" : "www.google.com",
            "data-tag" : selectVal,
            "data-text" : "Hello World!"    
        }
        
        var litag = createTag(tagEnum.LI, "dd-item dd3-item").attr(litagAttr);
        var ddlist = $('.dd').children(".scrollable").children('.dd-list').first();
        
        /* Insert the nested tags */
        innerdiv.append(nameTag);
        innerdiv.append(editIcon);
        
        expandableContent.append(buttonLink);
        expandableContent.append(buttonText);
        
        litag.append(handlediv)
            .append(innerdiv)
            .append(expandableContent);
        
        ddlist.append(litag);
        
        // setup the simpleexpand
        $(editIcon).simpleexpand();
       
        // reset the event handler for editing link
        /*$(".circle-button.fi-pencil").click(function() {
            
            var dditem = $(this).parent("dd-item").first().addClass("selected-edit-text");
            console.log(dditem);
            $('.modal.insert-text').modal().open();
        });
        */
        
        setEditTextButton();
    });
    
    // TODO: rendering the text
    // insert text event
    $(".modal.insert-text .button").click(function() {
        var value = $(this).parent().find("input").first().val();
        
        var selecteditem = $().find(".selected-edit-text");
        selecteditem.closest(".dd-item").attr("data-text", value);
        selecteditem.removeClass("selected-edit-text");
        
        renderHtml();
        $.modal().close();
    });
    
    /* End Event Handlers */
    
    /* Start Helper Function definition */
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
                return "<span>";
            case 5:
                return "<i>";
            case 6:
                return "<button>";
            case 7:
                return "<li>"
            default:
                console.log("INVALID TAG NUMBER");
                return "<div>";
        }
    }
    
    // creates a tag with classess
    function createTag(tagnum, classes) {
        var createdTag = $(getTag(tagnum));
        if(classes) {
            createdTag.addClass(classes);
        }
        
        return createdTag;
    }
    
    // this creates a tag to be inserted into the preview section
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
        
        // this resets the preview to empty html
        previewTag.html("");
        // render the tags into the preview
        renderList(previewTag, initialList);
    } // renderHtml end function
    
    /* End Helper Function definition */
});