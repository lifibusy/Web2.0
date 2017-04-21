/*
* @Author: Administrator
* @Date:   2017-04-14 10:14:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:31:59
*/


$(function(){
	createBox();
	$(startGameBtn).click(startGame);
});

function createBox(){
	for(var i = 0; i < 16; i++){
		var box = $("<div></div>");
		box.addClass("box backgroundImage ");
		box.attr("id", i);
		var leftX = ((i%4) * 87) + "px";
		var topY = (Math.floor(i/4) * 87) + "px";
		box.css("background-position", "-" + leftX + " " + "-" + topY);
		box.css({"position":"absolute","position":"absolute", "left":leftX, "top":topY});
		box.click(move);
		$("#GameContainer").append(box);
	}
	$(".box").last().removeClass("backgroundImage");
	$(".box").last().addClass("empty");
}
function move(event){

	if(canMove(event)){
		var theSelectedBox = $(event.target);
		var theEmptyBox = $(".empty").first();

		var theSelectedBoxID = parseInt(event.target.id);
		var theEmptyBoxID = parseInt(theEmptyBox.attr("id"));

		var theEmptyBoxLeft = theEmptyBox.css("left");
		var theEmptyBoxTop = theEmptyBox.css("top");

		var theSelectedBoxLeft = theSelectedBox.css("left");
		var theSelectedBoxTop = theSelectedBox.css("top");

		theSelectedBox.css({"left":theEmptyBoxLeft, "top":theEmptyBoxTop});
		theEmptyBox.css({"left": theSelectedBoxLeft, "top": theSelectedBoxTop});
		theEmptyBox.attr("id", theSelectedBoxID);
		theSelectedBox.attr("id", theEmptyBoxID);
	
	}
}
function canMove(event){
	var index = parseInt(event.target.id);
	/*
	 *here use the index of the empty box in the box class, it hasn't change
	*/
	var emptyBoxIndex =parseInt($(".empty").first().attr("id"));

	var Nindex = index - 4;
	var Sindex = index + 4;
	var Windex = index - 1;
	var Eindex = index + 1;

	var theBoxCanMove = false;
	if (Nindex == emptyBoxIndex || Sindex == emptyBoxIndex || Windex == emptyBoxIndex || Eindex == emptyBoxIndex){
		theBoxCanMove = true;
	}
	return theBoxCanMove;
}
function startGame(){
	for (var i = 0; i < 1000; i++){
		var index = Math.floor(Math.random() * 15);
		var theSelectedBox = $(".box").get(index).click(move);
	}
}