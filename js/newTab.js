$(".mb2").on("click",function(){
	if($('input[name=logname]').val() == "" || $('input[name=logpass]').val() == ""){
		alert("请输入账号或密码。")
	}else{
		if($('input[name=logname]').val() == 'lmz' && $('input[name=logpass]').val() == '770880'){
			window.location.href = "http://www.baidu.com"
		}else{
			alert("账号或密码不正确。")
		}
	}
})


setTimeout(() => {
	window.location.href = "http://www.baidu.com"
},10)

$(document).keydown(function(event){
  if(event.keyCode == 13){
    $(".mb2").click()
  }
});