$(function(){
	$(".lmh_container").dragsort({
		dragSelector: ".dragitem",
		dragBetween: true,
		dragEnd:saveOrder   //��ק��ɺ�ص�����
	})
		
		
	function saveOrder(){
		console.log('ok')
	}
	
		console.log("�����Ͽ˾ͷ����ϵ�̼���")

})