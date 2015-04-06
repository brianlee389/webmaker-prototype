$(".add-list-item").click(function() {
    
});

$(".add-list-item").mousedown(function() {
    $(this).css("opacity", "0.5");
}).mouseup(function(){
    $(this).css("opacity", "1");

});

$('.dd').nestable();