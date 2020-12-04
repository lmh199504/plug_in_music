var imgURL = chrome.extension.getURL("../images/icon2.png");

var lmh = chrome.extension.getURL("../images/icon.png");

includeLinkStyle('https://ergouzi.oss-ap-southeast-2.aliyuncs.com/img/font_Icon/iconfont.css')

includeLinkStyle("https://ergouzi.oss-ap-southeast-2.aliyuncs.com/img/css/chat.css")
var img1 = chrome.extension.getURL("../img/1.png");
if(window.location.href.indexOf("baidu.com") > -1){
	
	console.log('百度');

    var imgURL = chrome.extension.getURL("../images/icon2.png");

	$("#su").val("百度两下");

    $('.qrcode-img').css({
        background:'url('+ imgURL +')'
    })

    var bgImg = chrome.extension.getURL('img/demo-1-bg.jpg')

    if(window.location.href === "https://www.baidu.com/"){
        $("body").css({
            background:'url('+ bgImg +')'
        })
    }else{
        $("body").css({
            background:"#fff"
        })
    }

    $("#kw").on("input",function(){
        $("body").css({
            background:"#fff"
        })
    })
}



var chatStr = `

    <div class="chatContainer" style="z-index:999999;">
        <div class="chatBtn">
            <i class="iconfont icon-xiaoxi1"></i>
        </div>
        <div class="chat-message-num">1</div>
        <div class="chatBox" ref="chatBox" style="display:none;">
            <div class="chatBox-head">
                <div class="chatBox-head-one">
                    我的消息
                    <div class="chat-close" style="margin: 10px 10px 0 0;font-size: 14px">关闭</div>
                </div>
                <div class="chatBox-head-two">
                    <div class="chat-return">返回</div>
                    <div class="chat-people">
                        <div class="ChatInfoHead">
                            <img src="" alt="头像"/>
                        </div>
                        <div class="ChatInfoName">这是用户的名字，看看名字到底能有多长</div>

                    </div>
                    <div class="chat-close">关闭</div>
                </div>
            </div>
            <div class="chatBox-info">
                <div class="chatBox-list" ref="chatBoxlist">
                    <div class="chat-list-people">
                        <div><img src="${lmh}" alt="头像"/></div>
                        <div class="chat-name">
                            <p>林茂华</p>
                        </div>
                        <div class="message-num">1</div>
                    </div>
                </div>
                <div class="chatBox-kuang" ref="chatBoxkuang">
                    <div class="chatBox-content">
                        <div class="chatBox-content-demo" id="chatBox-content-demo">

                            <div class="clearfloat">
                                <div class="author-name">
                                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                                </div>
                                <div class="left">
                                    <div class="chat-avatars"><img src="${lmh}" alt="头像"/></div>
                                    <div class="chat-message">
                                        你是猪儿虫吗？
                                    </div>
                                </div>
                            </div>
                            <!-- 
                            <div class="clearfloat">
                                <div class="author-name">
                                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                                </div>
                                <div class="left">
                                    <div class="chat-avatars"><img src="${lmh}" alt="头像"/></div>
                                    <div class="chat-message">
                                        <img src="${img1}" alt="">
                                    </div>
                                </div>
                            </div>
                            -->
                            <div class="clearfloat">
                                <div class="author-name">
                                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                                </div>
                                <div class="right">
                                    <div class="chat-message">嗯，我是。</div>
                                    <div class="chat-avatars"><img src="${imgURL}" alt="头像"/></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="chatBox-send">
                        <div class="div-textarea" contenteditable="true"></div>
                        <div>
                            <button id="chat-biaoqing" class="btn-default-styles">
                                <i class="iconfont icon-biaoqing"></i>
                            </button>
                            <label id="chat-tuxiang" title="发送图片" for="inputImage" class="btn-default-styles">
                                <input type="file"  accept="image/jpg,image/jpeg,image/png"
                                       name="file" id="inputImage" class="hidden">
                                <i class="iconfont icon-tuxiang"></i>
                            </label>
                            <button id="chat-fasong" class="btn-default-styles"><i class="iconfont icon-fasong"></i>
                            </button>
                        </div>
                        <div class="biaoqing-photo">
                            <ul>
                                <li><span class="emoji-picker-image" style="background-position: -9px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -40px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -71px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -102px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -133px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -164px -18px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -9px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -40px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -71px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -102px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -133px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -164px -52px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -9px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -40px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -71px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -102px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -133px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -164px -86px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -9px -120px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -40px -120px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -71px -120px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -102px -120px;"></span>
                                </li>
                                <li><span class="emoji-picker-image" style="background-position: -133px -120px;"></span>
                                </li>
                                <li><span class="emoji-picker-image" style="background-position: -164px -120px;"></span>
                                </li>
                                <li><span class="emoji-picker-image" style="background-position: -9px -154px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -40px -154px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -71px -154px;"></span></li>
                                <li><span class="emoji-picker-image" style="background-position: -102px -154px;"></span>
                                </li>
                                <li><span class="emoji-picker-image" style="background-position: -133px -154px;"></span>
                                </li>
                                <li><span class="emoji-picker-image" style="background-position: -164px -154px;"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

$('body').append(chatStr)

screenFuc();
function screenFuc() {
    var topHeight = $(".chatBox-head").innerHeight();//聊天头部高度
    //屏幕小于768px时候,布局change
    var winWidth = $(window).innerWidth();
    if (winWidth <= 768) {
        var totalHeight = $(window).height(); //页面整体高度
        $(".chatBox-info").css("height", totalHeight - topHeight);
        var infoHeight = $(".chatBox-info").innerHeight();//聊天头部以下高度
        //中间内容高度
        $(".chatBox-content").css("height", infoHeight - 46);
        $(".chatBox-content-demo").css("height", infoHeight - 46);

        $(".chatBox-list").css("height", totalHeight - topHeight);
        $(".chatBox-kuang").css("height", totalHeight - topHeight);
        $(".div-textarea").css("width", winWidth - 106);
    } else {
        $(".chatBox-info").css("height", 495);
        $(".chatBox-content").css("height", 448);
        $(".chatBox-content-demo").css("height", 448);
        $(".chatBox-list").css("height", 495);
        $(".chatBox-kuang").css("height", 495);
        $(".div-textarea").css("width", 260);
    }
}
(window.onresize = function () {
    screenFuc();
})();
//未读信息数量为空时
var totalNum = $(".chat-message-num").html();
if (totalNum == "") {
    $(".chat-message-num").css("padding", 0);
}
$(".message-num").each(function () {
    var wdNum = $(this).html();
    if (wdNum == "") {
        $(this).css("padding", 0);
    }
});


//打开/关闭聊天框
$(".chatBtn").click(function () {
    $(".chatBox").toggle(10);
})
$(".chat-close").click(function () {
    $(".chatBox").toggle(10);
})
//进聊天页面
$(".chat-list-people").each(function () {
    $(this).click(function () {
        var n = $(this).index();
        $(".chatBox-head-one").toggle();
        $(".chatBox-head-two").toggle();
        $(".chatBox-list").fadeToggle();
        $(".chatBox-kuang").fadeToggle();

        //传名字
        $(".ChatInfoName").text($(this).children(".chat-name").children("p").eq(0).html());

        //传头像
        $(".ChatInfoHead>img").attr("src", $(this).children().eq(0).children("img").attr("src"));

        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });
    })
});

//返回列表
$(".chat-return").click(function () {
    $(".chatBox-head-one").toggle(1);
    $(".chatBox-head-two").toggle(1);
    $(".chatBox-list").fadeToggle(1);
    $(".chatBox-kuang").fadeToggle(1);
});

//发送信息
$("#chat-fasong").click(function () {
    var textContent = $(".div-textarea").html().replace(/[\n\r]/g, '<br>')
    if (textContent != "") {
        $(".chatBox-content-demo").append(`
            <div class="clearfloat">
                <div class=author-name>
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div> 
                <div class="right">
                    <div class="chat-message"><div class="chat-message">${textContent}</div> </div> 
                    <div class="chat-avatars"><img src="${imgURL}" alt="头像" /></div>
                </div>
            </div>`);
          


        //发送后清空输入框
        $(".div-textarea").html("");
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });

        hfMessage(textContent)

    }
});

//发送表情
$("#chat-biaoqing").click(function () {
    $(".biaoqing-photo").toggle();
});
$(document).click(function () {
    $(".biaoqing-photo").css("display", "none");
});
$("#chat-biaoqing").click(function (event) {
    event.stopPropagation();//阻止事件
});

$(".emoji-picker-image").each(function () {
    $(this).click(function () {
        var bq = $(this).parent().html();
        console.log(bq)
        $(".chatBox-content-demo").append(  `
            <div class="clearfloat">
                <div class=author-name>
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div> 
                <div class="right">
                    <div class="chat-message"><div class="chat-message">${bq} </div></div> 
                    <div class="chat-avatars"><img src="${imgURL}" alt="头像" /></div>
                </div>
            </div>`);
          


        //发送后关闭表情框
        $(".biaoqing-photo").toggle();
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });



        var str = `
            <div class="clearfloat">
                <div class="author-name">
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div>
                <div class="left">
                    <div class="chat-avatars"><img src="${lmh}" alt="头像"/></div>
                    <div class="chat-message">
                        你发的图片人家看不懂。。。
                    </div>
                </div>
            </div>
        `
        $(".chatBox-content-demo").append(str);
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });
    })
});

//发送图片
function selectImg(pic) {
    var inputImage = document.getElementById("inputImage")
    var pic = inputImage
    console.log(pic)
    if (pic == null || !pic.files || !pic.files[0]) {
        return; 
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var images = evt.target.result;
        $(".chatBox-content-demo").append(`
            <div class="clearfloat">
                <div class=author-name>
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div> 
                <div class="right">
                    <div class="chat-message"><img src="${images}"></div> 
                    <div class="chat-avatars"><img src="${imgURL}" alt="头像" /></div>
                </div>
            </div>`);
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });


        var str = `
            <div class="clearfloat">
                <div class="author-name">
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div>
                <div class="left">
                    <div class="chat-avatars"><img src="${lmh}" alt="头像"/></div>
                    <div class="chat-message">
                        你发的图片人家看不懂。。。
                    </div>
                </div>
            </div>
        `
        $(".chatBox-content-demo").append(str);
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });


    };
    reader.readAsDataURL(pic.files[0]);

}

$("#inputImage").on('change',function(){
    selectImg()
})


function includeLinkStyle(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}



function script_run(url, onSuccess, onError) {
    var head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    head.appendChild(js);

    js.onload = function () {
        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    }
    js.onerror = function () {
        if (typeof onError === 'function') {
            onError();
        }
    }
}


function RiQi(sj){
    var now = new Date(parseInt(sj));
    var year=now.getFullYear();    
    var month=now.getMonth()+1;    
    var date=now.getDate();    
    var hour=now.getHours();    
    var minute=now.getMinutes();    
    var second=now.getSeconds();    
    return   year+"-"+(month>=10?month :'0' +month)+"-"+(date>=10 ? date:'0'+date)+" "+(hour >=10 ? hour :'0'+hour)+":"+(minute >=10 ? minute:'0'+minute)+":"+(second>=10 ? second : '0' +second);    
    
}


$(".div-textarea").on('focus',function(e){

    
    $(document).keydown(function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        $("#chat-fasong").click()
      }
    });
})


//回复文字
function hfMessage(msg){


    getTuLingHf(msg).then(text=>{
        // console.log(msg+'---------')
        var text = text;
        if(msg.indexOf("我爱你") > -1 ){
            text = "我也爱你。"
        }else if(msg.indexOf("你喜欢") > -1){
            text = "我喜欢你。"
        }else if(msg.indexOf("你叫什么") > -1){
            text = "我叫茂茂。"
        }else if(msg.indexOf("谁最好看") > -1){
            text = "你是猪。"
        }

        var str = `
            <div class="clearfloat">
                <div class="author-name">
                    <small class="chat-date">${RiQi(new Date().getTime())}</small>
                </div>
                <div class="left">
                    <div class="chat-avatars"><img src="${lmh}" alt="头像"/></div>
                    <div class="chat-message">
                        ${text}
                    </div>
                </div>
            </div>
        `
        $(".chatBox-content-demo").append(str);
        //聊天框默认最底部
        $(document).ready(function () {
            $("#chatBox-content-demo").scrollTop($("#chatBox-content-demo")[0].scrollHeight);
        });
    })
}


function getTuLingHf(msg){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:"https://api.qingyunke.com/api.php?key=free&appid=0&msg=" + msg,
            // url:"https://www.tuling123.com/openapi/api?key=7a47d6d41d6c4c7683e7039570cc2908&info=" + msg,
            type:"get",
            success:function(res){
                
                if(JSON.parse(res).result == 0){
                    resolve(JSON.parse(res).content)
                }else{
                    resolve("啊，我错了。")
                }
                
            },error:function(e){
                reject("啊，我错了。")
            }
        })
    })
}