var readyToRemoveSmallClass;

var getCurrentPos = function(){
		var current_col = $(this).parent().data('col');
		alert(current_col);
		var current_row = $(this).parents('tr').data('row');
		alert(current_row);
}

var isTdBlock = function($td){
    if ($td.hasClass('stone') ||$td.hasClass('poop')) {
        return true;
    }
    return false;
}

var isTdsCola = function($td){
    if ($td.hasClass('cola')) {
        var new_score = parseInt($('#score').text())+100
        $('#score').text(new_score);
        $td.removeClass('cola').addClass('small poop');
        readyToRemoveSmallClass = $td
    }
}

var generaterColaToAllTd = function(){
    $('td').addClass('cola');
    $('#row-1-1').removeClass('cola');
}

$(document).keydown(function(e) {
        var $newbear = $('.bear').clone();
        var current_col = $('.bear').parent().data('col');
        var current_row = $('.bear').parents('tr').data('row');
        var new_col;
        var new_row;

    switch(e.which) {
        case 37: // left
        case 65:
        	new_col = current_col-1;
        	new_row = current_row;
        break;

        case 38: // up
        	new_col = current_col;
        	new_row = current_row-1;
        break;

        case 39: // right
        	new_col = current_col+1;
        	new_row = current_row;
        break;

        case 40: // down
        	new_col = current_col;
        	new_row = current_row+1;
        break;

        default: return; // exit this handler for other keys
    }


    if (isTdBlock( $('#row-'+new_row+'-'+new_col) ) ||
        new_col <=0 ||
        new_row <=0 ||
        new_col >=6 ||
        new_row >=6) {

    } else {
        if (readyToRemoveSmallClass){
            readyToRemoveSmallClass.removeClass('small');
            readyToRemoveSmallClass = null;
        }
        isTdsCola( $('#row-'+new_row+'-'+new_col) );
        $('.bear').remove();
        $newbear.click(getCurrentPos);
        $('#row-'+new_row+'-'+new_col).html($newbear);
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).ready(function(){
    generaterColaToAllTd();

    while ($('.stone').length <5) {
    var $stone = getRandomDom();
    $stone.addClass('stone').removeClass('cola');
}



})

function getRandomDom() {
    var rowNum = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    var colNum = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    return $('#row-'+rowNum+'-'+colNum);
}