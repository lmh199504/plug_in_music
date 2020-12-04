console.log('background')


chrome.cookies.getAll({}, function(arr) {
	// console.log(arr)
})



function test() {
	console.log('I am function from bg.')
}

var notificationsId;
chrome.notifications.create(

	Math.random() + '', // id

	{

		type: 'list',

		iconUrl: './images/icon1.png',

		appIconMaskUrl: './images/icon1.png',

		title: '通知主标题',

		message: '通知副标题',

		contextMessage: '我好帅啊！',

		buttons: [{
			title: '按钮1的标题',
			iconUrl: './images/icon1.png'
		}, {
			title: '按钮2的标题',
			iconUrl: './images/icon1.png'
		}],

		items: [{
			title: '消息1',
			message: '今天天气真好！'
		}, {
			title: '消息2',
			message: '明天天气估计也不错！'
		}],

		eventTime: Date.now() + 2000

	},

	(id) => {
		notificationsId = id
		console.log(id);

	})


chrome.notifications.onClicked.addListener(() => {
	chrome.notifications.update(notificationsId, {

		type: 'image',

		iconUrl: './images/icon1.png',

		imageUrl: './images/icon1.png',

		title: '更新标题',

		message: '更新副标题',

		contextMessage: '好开心呀，终于会更新了通知里面的内容！'

	}, function(wasUpdated) {

		wasUpdated ? console.log('更新完成') : console.log('更新失败');

	});
	console.log('点击面板内除按钮的其他地方!');
	window.open('https://www.baidu.com')

});


chrome.notifications.onClosed.addListener(function() {

	console.log('点击了关闭按钮!');

})






//点击自定义的按钮

chrome.notifications.onButtonClicked.addListener((notificationId, index) => {

	console.log(notificationId, index); //当前通知的ID和当前点击按钮的index

});


chrome.notifications.getPermissionLevel((level) => {

	console.log(level); //granted ( 批注：默认 granted )

})


window.onload = function() {
	// 监听消息
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		// code...
		console.log(request)
		if (request.cmd == 'playOne') {
			vm._data.musicList.splice(vm._data.musicIndex, 0, request.item)
			console.log(vm._data.musicList)
			vm.playMusic(request.item)
			sendResponse('我已收到你的消息：' + 'playOne'); //做出回应
		} else if (request.cmd == "prevMusic") {
			console.log('播放上一首');
			vm._data.musicIndex--;
			console.log(vm._data.musicIndex)
			if (vm._data.musicIndex < 0) {
				vm._data.musicIndex = vm._data.musicList.length - 1

			}
			vm.playMusic(vm._data.musicList[vm._data.musicIndex])
			sendResponse({
				res: vm._data.musicList[vm._data.musicIndex]
			})
		} else if (request.cmd == "nextMusic") {
			vm._data.musicIndex++;
			console.log(vm._data.musicIndex)
			if (vm._data.musicIndex == vm._data.musicList.length) {
				vm._data.musicIndex = 0;
			}
			vm.playMusic(vm._data.musicList[vm._data.musicIndex])

			sendResponse({
				res: vm._data.musicList[vm._data.musicIndex]
			})
		} else if (request.cmd == "continueMusic") {
			console.log(vm._data.myaudio.src)
			if (vm._data.myaudio.src.indexOf('background.html') > -1) {
				vm.playMusic(vm._data.musicList[vm._data.musicIndex])

			} else {
				vm._data.myaudio.play()
			}


		} else if (request.cmd == "pauseMusic") {


			clearInterval(vm._data.timer);
			vm._data.myaudio.pause()
		} else if (request.cmd == "giveMeMusic") {
			console.log(vm._data.musicList)
			sendResponse({
				res: vm._data.musicList[vm._data.musicIndex]
			})
		} else if (request.cmd == "playAll") {


			vm._data.musicList = request.list;
			vm._data.musicIndex = 0;
			vm.playMusic(vm._data.musicList[vm._data.musicIndex])
			sendResponse({
				res: vm._data.musicList[vm._data.musicIndex]
			})

		}

	});



	var vm = new Vue({
		el: "#app",
		data: {
			myaudio: null,
			musicSrc: '',
			musicList: [],
			musicIndex: 0,
			timer: null, //定时器获取播放进度
		},
		created() {
			console.log('created')
		},
		mounted() {
			var that = this;
			this.myaudio = this.$refs.myaudio
			this.myaudio.src = ''
			console.log('mounted')
			// this.randMusic(function(){
			// 	console.log('随机歌曲')
			// })
			this.getMyLike()
			this.myaudio.onplay = function() {

				that.timer = setInterval(function() {
					chrome.runtime.sendMessage({
							cmd: "play",
							currentTime: that.myaudio.currentTime,
							duration: that.myaudio.duration
						},
						function(response) {
							console.log(response)
						}
					);
				}, 1000)

			}

			this.myaudio.onended = function() {
				console.log('end')
				if (that.musicIndex < that.musicList.length - 1 && that.musicList.length != 0) {
					that.musicIndex++
					that.playMusic(that.musicList[that.musicIndex])

				} else {
					that.randMusic(function() {
						that.musicIndex = 0;
						that.playMusic(that.musicList[that.musicIndex])
					})
				}

			}

		},
		methods: {
			playMusic(item) {
				clearInterval(this.timer)
				var url =
					'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' +
					item.songmid + '&filename=C400' + item.songmid + '.m4a&guid=126548448';

				var guid = '1429839143';
				const data = {
					req: {
						module: "CDN.SrfCdnDispatchServer",
						method: "GetCdnDispatch",
						param: {
							guid: guid,
							calltype: 0,
							userip: ""
						}
					},
					req_0: {
						module: "vkey.GetVkeyServer",
						method: "CgiGetVkey",
						param: {
							guid: guid,
							songmid: [item.songmid],
							songtype: [0],
							uin: "0",
							loginflag: 1,
							platform: "20"
						}
					},
					comm: {
						uin: 0,
						format: "json",
						ct: 24,
						cv: 0
					}
				}

				const params = Object.assign({
					format: 'json',
					data: JSON.stringify(data),
				});
				axios.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {
					params
				}).then(res => {
					// console.log('---------')
					// console.log(res.data)

					let playLists = []; //可播放的列表
					const req_0 = res.data.req_0.data;
					req_0.sip.map(sipURL => {
						const purl = req_0.midurlinfo[0].purl;
						const URI = `${sipURL}${purl}`
						playLists.push(URI);
					});

					if (playLists.length === 0) {
						this.musicIndex++;
						if (this.musicIndex == this.musicList.length) {
							this.musicIndex = 0;
						}
						this.playMusic(this.musicList[this.musicIndex]);
						return
					}



					this.musicSrc = playLists[0];
					console.log(this.musicSrc)
					this.myaudio.src = this.musicSrc
					this.myaudio.play()


					var localList = JSON.parse(localStorage.getItem('localList'))
					if (localList == null) {
						localList = [];
					}
					let isPush = true;
					for (let i = 0; i < localList.length; i++) {
						if (item.songmid == localList[i].songmid) {
							isPush = false
						}
					}

					if (isPush) {
						localList.push(item)
						localStorage.setItem('localList', JSON.stringify(localList))
					}

					chrome.runtime.sendMessage({
							cmd: "playChange",
							item: item
						},
						function(response) {
							console.log('告诉popup播放歌曲已经改变')
						}
					);
				})
			},


			randMusic(callback) {
				var url =
					'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=20&_=' +
					new Date().getTime()
				axios.get(url).then(response => {

					var list = response.data.songlist;
					for (var i = 0; i < list.length; i++) {
						this.musicList.push({
							value: list[i].data.songname + '------' + list[i].data.singer[0].name,
							albumname: list[i].data.albumname,
							songid: list[i].data.songid,
							songname: list[i].data.songname,
							artistname: list[i].data.singer[0].name,
							songmid: list[i].data.songmid,
							albumid: list[i].data.albumid,
							img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list[i].data.albumid + "_0.jpg"
						})
					}
					callback()
				})
			},

			getMyLike() {
				var localLike = JSON.parse(localStorage.getItem('localLike'))
				if (localLike == null) {
					localLike = []
				}

				this.musicList = localLike;
			},

		}
	})
}
