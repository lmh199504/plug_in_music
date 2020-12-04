
window.onload = function(){
	$(".lmh_container").dragsort({
		dragSelector: ".dragitem",
		dragBetween: true,
		dragEnd:saveOrder   //拖拽完成后回调函数
	})
		
		
	function saveOrder(){
		console.log('ok')
	}
	



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




	// 1. 定义 (路由) 组件。
	// 可以从其他文件 import 进来
	const musictype = { 
		template: '#musictype' ,
	}


	// 2. 定义路由
	// 每个路由应该映射一个组件。 其中"component" 可以是
	// 通过 Vue.extend() 创建的组件构造器，
	// 或者，只是一个组件配置对象。
	// 我们晚点再讨论嵌套路由。
	const routes = [
	  { path: '/musicList', component: musictype },

	]

	// 3. 创建 router 实例，然后传 `routes` 配置
	// 你还可以传别的配置参数, 不过先这么简单着吧。
	const router = new VueRouter({
	  routes // (缩写) 相当于 routes: routes
	})

	// 4. 创建和挂载根实例。
	// 记得要通过 router 配置参数注入路由，
	// 从而让整个应用都有路由功能


	// import xiangce from '../xiangce.vue';

	var vm = new Vue({
		el:"#app",
		data:{
			message:"我是popup",
			restaurants: [],
	        state: '',
	        timeout:  null,
	        myAudio:null,
	        activeName:'first',
	        coverImg:'',
	        isplay:false,
	        musicMessage:null,
	        progress:0,
	        currentTime:'00:00',
	        duration:'00:00',
	        isLike:false,
	        mylocalLike:[],
			leftSlide_active:false,
			topList:[
				{
					img:"./images/20.jpg",
					id:20,
				},{
					img:"./images/21.jpg",
					id:34,
					
				},{
					img:"./images/22.jpg",
					id:32
				},{
					img:"./images/26.jpg",
					id:26
				},{
					img:"./images/27.jpg",
					id:27
				},{
					img:"./images/28.jpg",
					id:28
				},{
					img:"./images/29.jpg",
					id:29
				},{
					img:"./images/30.jpg",
					id:30
				},{
					img:"./images/31.jpg",
					id:31
				},{
					img:"./images/32.jpg",
					id:32
				},{
					img:"./images/33.jpg",
					id:33
				},{
					img:"./images/34.jpg",
					id:34
				}
			],
			slideMusicList:[],
			likeSingerList:[
				
			],
			addSingerDialog:false,
			addSingerName:"",
			singerSong:[],
			leftSlideSinger_active:false,

			serverSingerList:[],   //qq音乐歌手接口
			username:"",
			password:"",
			login_box_hide:false
		},
		// components:{
		// 	xiangce,
		// },
		updated() {

		},
		created(){
			console.log('created');
			this.getServerSinger()
			if(localStorage.getItem("login_box_hide") == null){
				this.login_box_hide = false;
			}else{
				this.login_box_hide = true
			}

		},
		// destroyed() {
		// 	chrome.runtime.sendMessage({cmd:"popup_destroyed"},
		// 		function(response) {
		// 			console.log(response)
		// 		}
		// 	);
		// },
		beforeDestroy() {
			chrome.runtime.sendMessage({cmd:"popup_destroyed"},
				function(response) {
					console.log(response)
				}
			);
		},
		router:router,
		mounted(){
			console.log('mounted');
			this.myAudio = this.$refs.myaudio;

			var that = this;
			chrome.runtime.sendMessage({cmd:"giveMeMusic"},
				function(response) {
					// console.log(response)
					if(response == null || response == undefined || response.res == null){
						
					}else{


						that.musicMessage = response.res;
						that.coverImg = response.res.img;
						that.checkIsLike(that.musicMessage)
					}
					
				}
			);
			// $(".container").dragsort({
			// 	dragSelector: ".dragitem",
			// 	dragBetween: true,
			// 	dragEnd:saveOrder   //拖拽完成后回调函数
			// })
			// 	
			// 	
			// function saveOrder(){
			// 	console.log('ok')
			// }	

			chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
				if(request.cmd == 'play'){
					that.isplay = true;
					that.progress = Number(((request.currentTime/request.duration)*100).toFixed(1))
					// console.log(request.currentTime,request.duration)

					that.currentTime = (Math.floor(request.currentTime / 60) < 10 ? "0" + Math.floor(request.currentTime / 60) : Math.floor(request.currentTime / 60)) + ":" + (Math.floor(request.currentTime % 60) < 10 ? '0' + Math.floor(request.currentTime % 60) : Math.floor(request.currentTime % 60));
					that.duration = (Math.floor(request.duration / 60) < 10 ? "0" + Math.floor(request.duration / 60) : Math.floor(request.duration / 60)) + ":" + (Math.floor(request.duration % 60) < 10 ? '0' + Math.floor(request.duration % 60) : Math.floor(request.duration % 60));
					sendResponse('I konw the progress.')
				}else if(request.cmd == "playChange"){
					that.musicMessage = request.item;
					that.coverImg = request.item.img;
					that.checkIsLike(that.musicMessage)
					sendResponse("I know music change")
				}else if(request.cmd == 'playerror'){
					that.$message({
						type:"error",
						message:"歌曲播放错误，2s后播放下一首."
					})
				}
				
			})


			this.getMyLike()
			this.getMyLikeSinger()
			var history = localStorage.getItem('localList')

		},
		methods:{
			seak(e){
				console.log(e)
			},
			querySearchAsync(queryString, cb) {
				if(queryString == ''){
					return false
				}
				// console.log(queryString)
				var url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=10&w='+queryString;
				// console.log(url)
				axios.get(url).then(response=>{


					this.restaurants = [];
					if(JSON.parse(response.data.substring(9,response.data.length - 1)).subcode == 0){
						var list = JSON.parse(response.data.substring(9,response.data.length - 1)).data.song.list;
						// console.log(list);
						for(let i = 0;i<list.length;i++){
							this.restaurants.push({
								value:list[i].songname+'------'+list[i].singer[0].name,
								albumname: list[i].albumname,
					            songid:list[i].songid,
					            songname:list[i].songname,
					            artistname: list[i].singer[0].name,
					            songmid: list[i].songmid,
					            albumid: list[i].albumid,
					            img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list[i].albumid + "_0.jpg"
							})
						}
						cb(this.restaurants)
						// console.log(this.restaurants)
					}
					
				})

			},


			getMyLikeSinger(){
				if(localStorage.getItem('myLikeSinger') == null){
					this.likeSingerList = [
					{
						name:"许嵩",
						img:"./images/xusong.jpg",
						
					},{
						name:"林俊杰",
						img:"./images/linjj.jpg"
					},{
						name:"星弟",
						img:"./images/xingdi.jpg"
					},{
						name:"徐秉龙",
						img:"./images/xubinglong.jpg"
					},{
						name:"陈柏宇",
						img:"./images/chenboyu.jpg"
					},{
						name:"排骨教主",
						img:"./images/paigu.jpg"
					},{
						name:"河图",
						img:"./images/hetu.jpg"
					},{
						name:"汪苏泷",
						img:"./images/wangsulong.jpg"
					},{
						name:"周杰伦",
						img:"./images/zhoujielun.jpg"
					},{
						name:"郑源",
						img:"./images/zhengyuan.jpg"
					},{
						name:"回音哥",
						img:"./images/huiyinge.jpg"
					},{
						name:"周兴哲",
						img:"./images/zhouxingzhe.jpg"
					}]
				}else{
					this.likeSingerList =JSON.parse(localStorage.getItem('myLikeSinger'))
				}
			},
		    handleSelect(item) {
		    	// console.log(item);	
		    	// this.playMusic(item.songmid)
		    	this.activeName = 'first';
		    	this.coverImg = item.img;
		    	this.musicMessage = item;
		    	this.activeName = 'first';
		    	this.isplay = true;
		    	chrome.runtime.sendMessage({item:item,cmd:"playOne"},
					function(response) {
						console.log('我已收到你的消息：' + response)
					}
				);

		    	this.checkIsLike(item)
		    	this.getLyr(item)
		    },

		    playMusic(songmid){
		    	
		    	var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' + songmid + '&filename=C400' + songmid+'.m4a&guid=126548448';
		    	axios.get(url).then(res=>{
		    		console.log(res)

		    		this.musicSrc = 'http://ws.stream.qqmusic.qq.com/' + res.data.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' + res.data.data.items[0].vkey;
		    		this.myAudio.src=this.musicSrc
		    		this.myAudio.play()

		    	})
		    },
		    nextMusic(){
		    	this.isplay = true;
		    	var that = this;
		    	chrome.runtime.sendMessage({cmd:"nextMusic"},
					function(response) {
						that.musicMessage = response.res;
						that.coverImg = response.res.img;
						that.checkIsLike(that.musicMessage)
					}
				);
		    },
		    prevMusic(){
		    	this.isplay = true;
		    	var that = this;
		    	chrome.runtime.sendMessage({cmd:"prevMusic"},
					function(response) {
						that.musicMessage = response.res;
						that.coverImg = response.res.img;
						that.checkIsLike(that.musicMessage)
					}
				);
		    },
		    pauseMusic(){
		    	this.isplay = !this.isplay;
		    	chrome.runtime.sendMessage({cmd:"pauseMusic"},
					function(response) {
						console.log('我已收到你的消息：' + response)
					}
				);
		    },
		    continueMusic(){
		    	this.isplay = !this.isplay;
		    	chrome.runtime.sendMessage({cmd:"continueMusic"},
					function(response) {
						console.log('我已收到你的消息：' + response)
					}
				);
		    },
		    topTabClick(tab, event) {
		    	this.getMyLike()
	        	console.log(tab, event);
	      	},
	      	checkIsLike(item){
	      		var localLike = JSON.parse(localStorage.getItem('localLike'))
	      		if(localLike == null){
	      			localLike = []
	      		}

	      		var isLike = false;
	      		for(let i = 0;i<localLike.length;i++){
	      			if(item.songmid == localLike[i].songmid){
	      				isLike = true
	      			}
	      		}



	      		if(isLike){
	      			this.isLike = true
	      		}else{
	      			this.isLike = false
	      		}
	      	},
	      	addMyLike(){

	      		var localLike = JSON.parse(localStorage.getItem('localLike'))
	      		if(localLike == null){
	      			localLike = []
	      		}
	      		this.isLike = !this.isLike
	      		if(this.isLike == true){
	      			//加入
	      			localLike.push(this.musicMessage);
	      			localStorage.setItem('localLike',JSON.stringify(localLike))

	      			this.$message({
	      				message:"添加成功.",
	      				type:"success",
	      				offset:300
	      			})

	      		}else{
	      			//删除
	      			for(let i = 0;i<localLike.length;i++){
	      				if(localLike[i].songmid == this.musicMessage.songmid){
	      					localLike.splice(i,1)
	      					localStorage.setItem('localLike',JSON.stringify(localLike))
	      				}
	      			}


	      			this.$message({
	      				message:"取消成功.",
	      				type:"success",
	      				offset:300
	      			})
	      		}

	      	},
	      	getMyLike(){
	      		var localLike = JSON.parse(localStorage.getItem('localLike'))
	      		if(localLike == null){
	      			localLike = [{"value":"你瞒我瞒------陈柏宇","albumname":"Close Up","songid":102388821,"songname":"你瞒我瞒","artistname":"陈柏宇","songmid":"000XJvlv11ltfF","albumid":38565,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_38565_0.jpg"},{"value":"尊严------陈柏宇","albumname":"五年新曲+精选","songid":861316,"songname":"尊严","artistname":"陈柏宇","songmid":"000CUGDr4bTxuN","albumid":73215,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_73215_0.jpg"},{"value":"不分手的恋爱------汪苏泷","albumname":"好安静","songid":7112782,"songname":"不分手的恋爱","artistname":"汪苏泷","songmid":"000wkTbk3kaHCk","albumid":666206,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_666206_0.jpg"},{"value":"我不后悔------郑源","albumname":"真的用心良苦","songid":463082,"songname":"我不后悔","artistname":"郑源","songmid":"003ZcOuq2UZsKb","albumid":8288,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_8288_0.jpg"},{"value":"不要在我寂寞的时候说爱我------郑源","albumname":"源情歌","songid":874843,"songname":"不要在我寂寞的时候说爱我","artistname":"郑源","songmid":"004GlMh222wYeV","albumid":33812,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_33812_0.jpg"},{"value":"南山忆------许嵩","albumname":"Vae新歌+精选珍藏合辑","songid":1688258,"songname":"南山忆","artistname":"许嵩","songmid":"000Afq8O0JRzXv","albumid":35485,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_35485_0.jpg"},{"value":"麻雀------李荣浩","albumname":"麻雀","songid":246492240,"songname":"麻雀","artistname":"李荣浩","songmid":"000lv3Zi13dSVA","albumid":9513235,"img":"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_9513235_0.jpg"}]
	      		}

	      		this.mylocalLike = localLike;
	      	},
	      	delLike(item){

	      		this.$confirm("是否删除", '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'warning'
	            }).then(() => {
		      		// console.log(item)
		      		var localLike = JSON.parse(localStorage.getItem('localLike'))
		      		if(localLike == null){
		      			localLike = []
		      		}

		      		for(let i = 0;i<localLike.length;i++){
	      				if(localLike[i].songmid == item.songmid){
	      					localLike.splice(i,1)
	      					localStorage.setItem('localLike',JSON.stringify(localLike))
	      				}
	      			}

	      			this.getMyLike()
	            }).catch(() => {
	   
	            });
	      	},
	      	downMusic(item){
	      		var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' + item.songmid + '&filename=C400' + item.songmid+'.m4a&guid=126548448';
		    	axios.get(url).then(res=>{

		    		var downUrl = 'http://ws.stream.qqmusic.qq.com/' + res.data.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' + res.data.data.items[0].vkey;
		    		// window.open(downUrl)
					var xhr = new XMLHttpRequest();
					xhr.open('GET', downUrl);
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.responseType = "blob";
					xhr.onprogress = function (event) {



						if (event.lengthComputable) {

							var load_process = ((event.loaded/event.total)*100).toFixed(1)


						}
					};
					xhr.onloadstartchange = function(){
					console.log('onloadstartchange')
					}
					xhr.onloadedmetadata = function(){
						console.log('onloadedmetadata')
					}
					xhr.onload = function (oEvent) {


						if (xhr.readyState === 4 && xhr.status === 200) {



							var blob = new Blob([xhr.response], {type: 'audio/mp3'});
							var csvUrl = URL.createObjectURL(blob);
							var link = document.createElement('a');
							link.href = csvUrl;
							link.download = item.songname;
  


							var event = document.createEvent('MouseEvents');
							event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
							link.dispatchEvent(event);
							URL.revokeObjectURL(csvUrl);  


						}
					}
					xhr.onerror = function(){
						that.$message({
							message:"下载失败。",
							type:"error",
							duration:2000,
							offset:300
						})
					}
					xhr.send();
		    	})
	      	},
	      	playAll(type){
	      		var that = this;
				var list = []
				
				if(type == "mylike"){
					list = this.mylocalLike
				}else if(type == "tuijian"){
					list = this.slideMusicList
				}else if(type == 'singerSonger'){
					list = this.singerSong
				}
	      		if(list.length != 0){
			    	chrome.runtime.sendMessage({cmd:"playAll",list:list},
						function(response) {

							that.musicMessage = response.res;
							that.coverImg = response.res.img;
							that.checkIsLike(that.musicMessage)
		
							that.$message({
			      				message:"正在播放该列表",
			      				type:"success",
			      				offset:300
			      			})
						}
					);
	      		}else{
	      			that.$message({
	      				message:"列表为空。",
	      				type:"warning",
	      				offset:300
	      			})
	      		}

	      	},
	      	getLyr(item){
	      		var url = 'http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid='+item.songid+'&callback=jsonp1&g_tk=938407465&jsonpCallback=jsonp1&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
	      		axios.get(url).then(response=>{
	      			console.log(response)
	      		})
	      		axios.get('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1577502288950&songmid='+item.songmid+'&g_tk=986388268&loginUin=207374233&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0')
	      	},
			getSongList(item){
				this.getMyLike()
				this.leftSlide_active = true;
				this.slideMusicList = [];
				var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid='+item.id+'&_='+new Date().getTime()
				axios.get(url).then(response=>{
					
					var list = response.data.songlist;
					for(let i = 0;i<list.length;i++){
						var isLike = false;
						for(let j = 0;j<this.mylocalLike.length;j++){
							if(this.mylocalLike[j].songmid == list[i].data.songmid){
								isLike = true;
							}
						}
						
						this.slideMusicList.push({
							islike:isLike ? true : false,
							value:list[i].data.songname+'------'+list[i].data.singer[0].name,
							albumname: list[i].data.albumname,
				            songid:list[i].data.songid,
				            songname:list[i].data.songname,
				            artistname: list[i].data.singer[0].name,
				            songmid: list[i].data.songmid,
				            albumid: list[i].data.albumid,
				            img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list[i].data.albumid + "_0.jpg"
						})
					}
					console.log(this.slideMusicList)
					// callback()
				})
			},
			tjAddLove(item){
				this.getMyLike()
				if(item.islike == true){
					item.islike = false;
					for(let i = 0;this.mylocalLike.length;i++){
						if(item.songmid == this.mylocalLike[i].songmid){
							this.mylocalLike.splice(i,1);
							localStorage.setItem('localLike',JSON.stringify(this.mylocalLike))
						}
					}
					
				}else if(item.islike == false){
					// this.$set(item,islike,true)
					item.islike = true;
					this.mylocalLike.push(item)
					localStorage.setItem('localLike',JSON.stringify(this.mylocalLike))
				}
			},
			getSingerSong(item){
				this.getMyLike()
				this.leftSlideSinger_active = true;
				var url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=50&w='+item.name;
				// console.log(url)
				axios.get(url).then(response=>{


					this.singerSong = [];
					if(JSON.parse(response.data.substring(9,response.data.length - 1)).subcode == 0){
						var list = JSON.parse(response.data.substring(9,response.data.length - 1)).data.song.list;
						// console.log(list);
						
						
						
						for(let i = 0;i<list.length;i++){
							var isLike = false;
							for(let j = 0;j<this.mylocalLike.length;j++){
								if(this.mylocalLike[j].songmid == list[i].songmid){
									isLike = true;
								}
							}
							
							
							this.singerSong.push({
								islike:isLike ? true :false,
								value:list[i].songname+'------'+list[i].singer[0].name,
								albumname: list[i].albumname,
					            songid:list[i].songid,
					            songname:list[i].songname,
					            artistname: list[i].singer[0].name,
					            songmid: list[i].songmid,
					            albumid: list[i].albumid,
					            img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list[i].albumid + "_0.jpg"
							})
						}
		

					}
					
				})
			},
			addSinger(){
				this.addSingerDialog = true;
			},
			addSingerClose(){
				console.log("close")
				this.addSingerDialog = false;
			},
			getServerSinger(){
				var url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1";
				axios.get(url).then(response=>{
					var s = response.data.substring(5,response.data.length - 1);
					// console.log(JSON.parse(s).data.list)
					this.serverSingerList = JSON.parse(s).data.list;

					// for(let i = 0;i<this.serverSingerList.length;i++){
					// 	this.likeSingerList.push({
					// 		name:this.serverSingerList[i].Fsinger_name,
					// 		img:'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ this.serverSingerList[i].Fsinger_mid + '.jpg?max_age=2592000'
					// 	})	
					// }
				})
			},
			addSingerBtnOk(){
				if(this.addSingerName == ""){
					this.$message({
						type:"warning",
						message:"请输入歌手名"
					})
				}else{
					var url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=10&w='+ this.addSingerName;

					axios.get(url).then(response=>{



						if(JSON.parse(response.data.substring(9,response.data.length - 1)).subcode == 0){
							var list = JSON.parse(response.data.substring(9,response.data.length - 1)).data.song.list;
							
							this.likeSingerList.push({
							
					            name: list[0].singer[0].name,
					      		
					            img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list[1].albumid + "_0.jpg"
							})



							localStorage.setItem('myLikeSinger',JSON.stringify(this.likeSingerList))

							this.addSingerDialog = false;
						}
					})
				}
			},
			delLikeSinger(item){
				this.$confirm('删除该歌手？', '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'error'
	            }).then(()=>{
					this.getMyLikeSinger()

					for(let i = 0;i<this.likeSingerList.length;i++){
						if(item.img == this.likeSingerList[i].img){
							this.likeSingerList.splice(i,1)
							localStorage.setItem('myLikeSinger',JSON.stringify(this.likeSingerList))
						}
					}
	            }).catch(()=>{

	            })




			},
			errorHandler(){
				return true
			},
			myLogin(){
				if(this.username == "" || this.password == ""){
					this.$message({
						type:"warning",
						offset:300,
						message:"请输入账号或密码。"
					})
				}else{
					if(this.username == 'llt' && this.password == "770880"){
						this.login_box_hide = true;
						this.$message({
							type:"success",
							message:"登陆成功",
							offset:300
						})
						localStorage.setItem('login_box_hide',new Date().getTime())
					}else{
						this.$message({
							type:"warning",
							offset:300,
							message:"账号或密码不正确。"
						})
					}
				}
			},
			usernameFocus(){
				var that = this;
				$(document).keydown(function(event){
					if(event.keyCode == 13){
						that.myLogin()
					}
				});
			},
			passwordFocus(){
				var that = this;
				$(document).keydown(function(event){
				  	if(event.keyCode == 13){
				    	that.myLogin()
				  	}
				});
			}
		},
		
	})

	var bg = chrome.extension.getBackgroundPage();
	bg.test();//test()是background中的一个方法

	console.log(bg)





}