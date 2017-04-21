window.onload = function() {
	var start = document.getElementById("start");
	var end = document.getElementById("end");
	var message = document.getElementById("message");
	var check = document.getElementById("out");
	start.addEventListener("mouseover",startMove);
}
function startMove(){
	var start = false;
	var finish = true;
	message.innerHTML = "";
	document.onmouseover = function(event) {
		if(event.target.id == "start") {
			finish = false;
			start = true;
		}
		else if (event.target.id == "out") {
			if (!finish){
				finish = true;
				start = false;
				message.innerHTML = "out";
			}
		}
		else if (event.target.className != "ok") {
			if (!finish){
				finish = true;
				start = false;
				message.innerHTML = "cross wall";
			}
		}
		if (event.target.id == "end"){
			if (start){
				message.innerHTML = "finish";
			}
			finish = true;
			start = false;
		}
	}
}