$(function(){
	$(".lmh_container").dragsort({
		dragSelector: ".dragitem",
		dragBetween: true,
		dragEnd:saveOrder   //拖拽完成后回调函数
	})
		
		
	function saveOrder(){
		console.log('ok')
	}
	
		console.log("四萨迪克就发哈上雕刻技法")

})