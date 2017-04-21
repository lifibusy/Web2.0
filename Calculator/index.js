window.onload = function() {
	var button = document.getElementsByTagName("input");
	var screen = document.getElementById("screen");
	var finish = false;
	for (var i = 1; i < button.length; i++) {
		button[i].onclick = function() {
			var that = this;
			if (!finish){
				if (that.value == "=") {
					try{
						var ans = eval(screen.value);
					}
					catch(e) {
						alert("不合法");
					}
					if (ans == "Infinity") 
						alert("0 shouldn't be divider");
					else if (ans == undefined){
						screen.value = "";
					}
					else{
						screen.value = ans;
						finish = true;
					}
				}
				else if(that.value == "←"){
					screen.value = screen.value.substr(0, screen.value.length-1);
				}
				else if (that.value == "CE") {
					screen.value = "";
				}
				else {
					screen.value += that.value;
				}
			}
			else {
				if (that.value == "=") {
				}
				else if(that.value == "←"){
					screen.value = screen.value.substr(0, screen.value.length-1);
					finish = false;
				}
				else if (that.value == "CE") {
					screen.value = "";
					finish = false;
				}
				else {
					screen.value += that.value;
					finish = false;
				}
			}
		}
	}
}
