/*
* @Author: Administrator
* @Date:   2017-04-19 23:45:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-21 13:29:35
*/

'use strict';
$(function(){
	initialization();
});
var toDoHead = $("#todo th");
var staffHead = $("#staff th");

function initialization(){
	$("th").each(function(){
		var that = this;
		that.addEventListener('click',sort);
	});
}
function sort(event){
	var that = $(event.target);
	var allTh = $("th");
	var index = allTh.index(that);
	var lastGroup = $(".selected")[0];

	var lastIndex = lastGroup? allTh.index(lastGroup): -1;
	//初始情况
	if (lastIndex < 0){
		that.addClass("descend selected");
		that.css("background", "#a4b0fc");
		$("#icon").addClass("descend" + index);
		descendSort(index);
	}
	else {
		/*
		* 清除icon的显示
		*/
		$("#icon").removeClass("ascend" + lastIndex);
		$("#icon").removeClass("descend" + lastIndex);
		/*点击不同的块
		*将上一个的背景消除
		*默认降序排序
		*修改背景
		*icon显示
		*/
		if (lastIndex != index){
			lastGroup.className = "";
			lastGroup.style.background = "#041a7f";

			that.addClass("descend selected");
			that.css("background", "#a4b0fc");
			$("#icon").addClass("descend" + index);
			descendSort(index);
		}
		/*点击相同的块
		*降序和升序互换
		*icon显示
		*/
		else {
			if (lastGroup.classList[0] == "descend") {
				lastGroup.className = "ascend selected";
				$("#icon").addClass("ascend" + index);
				ascendSort(index);
			}
			else {
				lastGroup.className = "descend selected";
				$("#icon").addClass("descend" + index);
				descendSort(index);
			}
		}
	}
}
function by(name,descendOrAscend){
    return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (descendOrAscend == "ascend"){
            	if (typeof a === typeof b) {
                	return a < b ? -1 : 1;
            	}
            	return typeof a < typeof b ? -1 : 1;
        	} 
        	else {
        		if (typeof a === typeof b) {
                	return b < a ? -1 : 1;
            	}
            	return typeof b < typeof a ? -1 : 1;
        	}
        }
        else {
            throw ("error");
        }
    }
}

function descendSort(index){
	var allMessage = getTodoRows();
	var selectedColumn = getTodoColumns(index);
	var rowObject = [];
	for (var i = 0; i < selectedColumn.length; i++){
		rowObject[i] = {column: selectedColumn[i], row: allMessage[i]};
	}
	rowObject.sort(by("column", "descend"));
	var rows = $("#todo tbody tr");
	for (var i = 0; i < allMessage.length; i++) {
		var row = rows[i];
		for (var j = 0; j < allMessage[i].length; j++) {
			row.children[j].innerHTML = rowObject[i].row[j];
		}
	}
}

function ascendSort(index){
	var allMessage = getTodoRows();
	var selectedColumn = getTodoColumns(index);
	var rowObject = [];
	for (var i = 0; i < selectedColumn.length; i++){
		rowObject[i] = {column: selectedColumn[i], row: allMessage[i]};
	}
	rowObject.sort(by("column", "ascend"));
	var rows = $("#todo tbody tr");
	for (var i = 0; i < allMessage.length; i++) {
		var row = rows[i];
		for (var j = 0; j < allMessage[i].length; j++) {
			row.children[j].innerHTML = rowObject[i].row[j];
		}
	}
}
function getTodoRows(){
	var allMessage = new Array();
	var rows = $("#todo tbody tr");
	for (var i = 0; i < rows.length; i++){
		var row = rows[i];
		var messages = new Array();
		for (var j = 0; j < row.children.length; j++) {
			var message = row.children[j].innerHTML;
			messages[j] = message;
		}
		allMessage[i] = messages;
	}
	return allMessage;
}
function getTodoColumns(index){
	var allMessage = getTodoRows();
	var column = new Array();
	for (var i = 0; i < allMessage.length; i++){
		column[i] = allMessage[i][index];
	}
	return column;
}