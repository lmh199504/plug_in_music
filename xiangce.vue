
<style scoped>

</style>




<template>
<div>



</div>



</template>


<script type="text/javascript">
	$(function(){
		AudioControl('js-video');
		function AudioControl(id){
			// 音频控制进度条
			var audio = document.getElementById(id);
			$(audio).on('loadedmetadata',function(){
				audio.pause();
				// 进度条控制
				$(document).on('touchend','.timeline',function(e){
					var x = e.originalEvent.changedTouches[0].clientX-this.offsetLeft;
					var X = x < 0 ? 0 : x ;
					var W = $(this).width();
					var place = X > W ? W : X;
					audio.currentTime = (place/W).toFixed(2)*audio.duration;
					$(this).children().css({width:(place/W).toFixed(2)*100+"%"})
				});
				// 播放
				$(document).on('click','#js-play',function(){
					audio.play()
				});
				// 暂停
				$(document).on('click','#js-pause',function(){
					audio.pause()
				});
			});
			setInterval(function () {
				var currentTime = audio.currentTime;
				setTimeShow(currentTime);
			}, 1000);
			// 设置播放时间
			function setTimeShow(t) {
				t = Math.floor(t);
				var playTime = secondToMin(audio.currentTime);
				$(".size").html(playTime);
				$('.timeshow').text(secondToMin(audio.duration));
				$('.timeline').children().css({width:(t/audio.duration).toFixed(4)*100+"%"})
			}
			// 计算时间
			function secondToMin(s) {
				var MM = Math.floor(s / 60);
				var SS = s % 60;
				if (MM < 10)
					MM = "0" + MM;
				if (SS < 10)
					SS = "0" + SS;
				var min = MM + ":" + SS;
				return min.split('.')[0];
			}
		}
	})
</script>
<script>
	var $img1=$('#img1');
	var $img2=$('#img2');
	$img1.click(function(){
		$img1.css({
			'display':'none'
		});
		$img2.css({
			'display':'block'
		});
	});
	$img2.click(function(){
		$img2.css({
			'display':'none'
		});
		$img1.css({
			'display':'block'
		});
	});
</script>

<script>
	export default{
		data(){
			return {

			}
		},
		created(){

		},
		mounted(){
			
		},
		methods:{

		},

	}


</script>