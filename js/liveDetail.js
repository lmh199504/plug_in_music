// console.log("中控台")



// includeLinkStyle("https://wstplug.oss-cn-beijing.aliyuncs.com/zbzs/plug-zhongkong/myCtrl/iconfont.css")
// function includeLinkStyle(url) {
//     var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.type = "text/css";
//     link.href = url;
//     document.getElementsByTagName("head")[0].appendChild(link);
// }


// function script_run(url, onSuccess, onError) {
//     var head = document.getElementsByTagName('head')[0],
//         js = document.createElement('script');

//     js.setAttribute('type', 'text/javascript');
//     js.setAttribute('src', url);

//     head.appendChild(js);

//     js.onload = function () {
//         if (typeof onSuccess === 'function') {
//             onSuccess();
//         }
//     }
//     js.onerror = function () {
//         if (typeof onError === 'function') {
//             onError();
//         }
//     }
// }


// var panel = `
// 	<div id="myapp">
// 		<myindex></myindex>
		
// 	</div>

// `


// $("#J_container .data-board").after(panel);



// setTimeout(function(){



// 	$("#myapp").on('load',function(){
// 		console.log("load")
// 	})
// 	var myindex = {
// 		template:`
// 			<div>
// 				<div style="padding:20px 10px 0px 10px;background:#fff;">
// 					<el-row :gutter="10">
// 						<el-col :span="4" @click.native="showDialog(item.id)" v-for="item in navItem" :key="item.name"><div class="mycard"><i :class="['iconfont', item.classStyle]"></i><p>{{item.name}}</p></div></el-col>
// 						<!--
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconpaihang"></i><p>排行榜</p></div></el-col>
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconxiazai"></i><p>视频下载</p></div></el-col>		
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconkefu"></i><p>智能客服</p></div></el-col>
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconheimingdan"></i><p>黑名单</p></div></el-col>
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myicongonggao"></i><p>公告</p></div></el-col>
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconyouhuiquan"></i><p>优惠券</p></div></el-col>
// 						<el-col :span="4"><div class="mycard"><i class="iconfont myiconshuju"></i><p>实时数据</p></div></el-col>
// 						-->
// 					</el-row>
// 				</div>

// 				<el-dialog
// 				  title="宝贝管理"
// 				  :visible.sync="bbdialogVisible"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <el-tabs v-model="bb_activeName" @tab-click="handleClick">
// 				    <el-tab-pane label="已上架" name="bb_first">
// 						<el-table
// 							height="550px"
						
// 							style="width: 100%">
							

// 							<!--

// 							<el-table-column
// 							    type="selection"
// 							    width="55">
// 						    </el-table-column>
// 							-->

// 							<el-table-column label="序号" width="50">
// 								<template slot-scope="scope">
// 									{{scope.row.goodsIndex}}
// 								</template>
// 							</el-table-column>
	
// 							<el-table-column
// 								label="宝贝">
// 								<template slot-scope="scope">
// 									<img :src="scope.row.goodsList[0].itemPic" alt="" style="width:60px;height:60px;"/>
// 								</template>
// 							</el-table-column>

// 							<el-table-column
// 								label="标题"
// 								prop="goodsList[0].itemName">
// 							</el-table-column>

// 							<el-table-column
// 								label="价格"
// 								prop="goodsList[0].itemPrice">
// 							</el-table-column>

// 							<el-table-column
// 								label="利益点"
// 								prop="goodsList[0].customizedItemRights">
// 								<template slot-scope="scope">
						
									
// 									<input type="text"  v-model="scope.row.goodsList[0].extendVal.customizedItemRights" class="el-input__inner" style="height:30px;margin-bottom:5px;"/>
// 									<el-button @click="changeRight(scope.$index, scope.row)" size="mini">修改</el-button>
// 								</template>

// 							</el-table-column>


// 							<el-table-column align="right" width="200">
// 								<template slot="header" slot-scope="scope">
// 									<el-input
// 									v-model="searchbb"
// 									size="mini"
// 									placeholder="输入关键字搜索"/>
// 								</template>
// 								<template slot-scope="scope">
// 									<el-button
// 									size="mini"
// 									@click="tanBb(scope.$index, scope.row)">单次</el-button>
// 									<el-button
// 									size="mini"
// 									type="danger"
// 									@click="timeTanBb(scope.$index, scope.row)">{{scope.row.time && bb_circle_timer? '停止' : '定时'}}</el-button>
								
// 									<p>
// 										<input type="text"  placeholder="输入定时时间" v-model="scope.row.time" class="el-input__inner" style="height:30px;margin-bottom:5px;width:125px;"/>
// 									</p>
										
								
// 								</template>

// 							</el-table-column>


// 							<el-table-column label="绑定优惠券">
// 								<template slot-scope="scope">
// 									<span class="bindCoupon">优惠券</span>
// 								</template>
// 							</el-table-column>
// 						</el-table>
// 				    </el-tab-pane>
// 				    <el-tab-pane label="未上架" name="bb_second">
// 						<div style="">
// 							<el-row>
// 							  <el-button @click="yjdrDialog = true">一键导入</el-button>
// 							  <el-button type="primary" @click="pltj_Dialog = true">批量添加</el-button>
// 							  <el-button type="success" @click="pl_set_right">批量设置利益点</el-button>
// 							  <el-button type="info">删除选中</el-button>
// 							  <el-button type="warning">上架选中</el-button>
// 							</el-row>
// 						</div>
// 						<el-table
// 							height="550px"
						
// 							style="width: 100%;"
// 							@selection-change="wsj_select">
							
// 							<el-table-column
// 							    type="selection"
// 							    width="55">
// 						    </el-table-column>
			

// 							<el-table-column label="序号" width="50" type="index">
// 								<!--
// 								<template slot-scope="scope">
// 									{{scope.row.goodsIndex}}
// 								</template>
// 								-->
								
// 							</el-table-column>
	
// 							<el-table-column
// 								label="宝贝">
// 								<template slot-scope="scope">
// 									<img :src="'//gw.alicdn.com/tfscom/'+JSON.parse(scope.row.model).imgUrl" alt="" style="width:60px;height:60px;"/>
// 								</template>
// 							</el-table-column>

// 							<el-table-column
// 								label="标题"
// 								prop="JSON.parse(model).itemTitle">
// 								<template slot-scope="scope">
// 									<span>{{JSON.parse(scope.row.model).itemTitle}}</span>
// 								</template>
// 							</el-table-column>

// 							<el-table-column
// 								label="价格"
// 								prop="JSON.parse(model).itemPrice">

// 								<template slot-scope="scope">
// 									<span>{{JSON.parse(scope.row.model).itemPrice}}</span>
// 								</template>
// 							</el-table-column>

// 							<el-table-column
// 								label="上架"
// 								prop="right">
// 								<template slot-scope="scope">
						
									
// 									<input type="text" placeholder="设置利益点" v-model="scope.row.right" class="el-input__inner" style="height:30px;margin-bottom:5px;"/>
// 									<el-button @click="upItem(scope.$index, scope.row)" size="mini">上架</el-button>
// 								</template>

// 							</el-table-column>

// 							<!--
// 							<el-table-column align="right" width="200">
// 								<template slot="header" slot-scope="scope">
// 									<el-input
// 									v-model="searchbb"
// 									size="mini"
// 									placeholder="输入关键字搜索"/>
// 								</template>
// 								<template slot-scope="scope">
// 									<el-button
// 									size="mini"
// 									@click="tanBb(scope.$index, scope.row)">单次</el-button>
// 									<el-button
// 									size="mini"
// 									type="danger"
// 									@click="timeTanBb(scope.$index, scope.row)">{{scope.row.time && bb_circle_timer? '停止' : '定时'}}</el-button>
								
// 									<p>
// 										<input type="text"  placeholder="输入定时时间" v-model="scope.row.time" class="el-input__inner" style="height:30px;margin-bottom:5px;width:125px;"/>
// 									</p>
										
// 								</template>

// 							</el-table-column>
// 							-->

// 							<el-table-column label="绑定优惠券">
// 								<template slot-scope="scope">
// 									<span class="bindCoupon">优惠券</span>
// 								</template>
// 							</el-table-column>
// 						</el-table>
						

// 						<el-dialog 
// 							title="一键导入"
// 							:modal="false"
// 							top="40vh"
// 							:visible.sync="yjdrDialog"
// 							width="600px"
// 							>
// 							<div>
// 								<a class="btn btn-default" href="https://wstplug.oss-cn-beijing.aliyuncs.com/zbzs/plug-zhongkong/%E4%B8%87%E5%95%86%E5%A0%82%E5%AE%9D%E8%B4%9D%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5.xls" download='规范'>下载示例文件</a>
// 								<el-button @click="selectFile">选择文件</el-button>
// 								<input type="file" id="excel-file" style="display: none" @change="fileChange">
// 							</div>
// 							<span slot="footer" class="dialog-footer">
// 						    	<el-button @click="yjdrDialog = false">取 消</el-button>
// 						    	<el-button type="primary" @click="yjdrDialog = false">确 定</el-button>
// 						  	</span>
// 						</el-dialog>

// 						<el-dialog 
// 							title="批量添加"
// 							:modal="false"
// 							top="40vh"
// 							:visible.sync="pltj_Dialog"
// 							width="600px"
// 							>
// 							<div>
// 								<el-input type="textarea" v-model="pltj_text" style="height:150px;"></el-input>
// 							</div>
// 							<span slot="footer" class="dialog-footer">
// 						    	<el-button @click="pltj_Dialog = false">取 消</el-button>
// 						    	<el-button type="primary" @click="addPltj">确 定</el-button>
// 						  	</span>
// 						</el-dialog>
						
// 						<el-dialog 
// 							title="批量设置利益点"
// 							:modal="false"
// 							top="40vh"
// 							:visible.sync="pl_set_right_Dialog"
// 							width="600px">
// 							<div>
// 								<input type="text" placeholder="请输入"/>
// 							</div>
// 							<span slot="footer" class="dialog-footer">
// 						    	<el-button @click="pltj_Dialog = false">取 消</el-button>
// 						    	<el-button type="primary" @click="addPltj">确 定</el-button>
// 						  	</span>

// 						</el-dialog>
// 				    </el-tab-pane>

// 				  </el-tabs>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="bbdialogVisible = false">取 消</el-button>
// 				    <el-button type="primary" @click="bbdialogVisible = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>

// 				<el-dialog
// 				  title="排行榜"
// 				  :visible.sync="paihangDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="paihangDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="paihangDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>


// 				<el-dialog
// 				  title="视频下载"
// 				  :visible.sync="xiazaiDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="xiazaiDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="xiazaiDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>


// 				<el-dialog
// 				  title="智能客服"
// 				  :visible.sync="kefuDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="kefuDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="kefuDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>


// 				<el-dialog
// 				  title="黑名单"
// 				  :visible.sync="hmdDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="hmdDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="hmdDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>


// 				<el-dialog
// 				  title="公告"
// 				  :visible.sync="ggDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="ggDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="ggDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>
	
// 				<el-dialog
// 				  title="优惠券"
// 				  :visible.sync="yhqDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="yhqDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="yhqDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>

// 				<el-dialog
// 				  title="实时数据"
// 				  :visible.sync="realDialog"
// 				  width="1020px"
// 				  :before-close="handleClose">
// 				  <span>这是一段信息</span>
// 				  <span slot="footer" class="dialog-footer">
// 				    <el-button @click="realDialog = false">取 消</el-button>
// 				    <el-button type="primary" @click="realDialog = false">确 定</el-button>
// 				  </span>
// 				</el-dialog>

// 			</div>
// 		`,

// 		data(){
// 			return {

// 				zhuUid:'',
// 				parentId:'',
// 				bbdialogVisible:false,
// 				paihangDialog:false,
// 				xiazaiDialog:false,
// 				kefuDialog:false,
// 				hmdDialog:false,
// 				ggDialog:false,
// 				yhqDialog:false,
// 				realDialog:false,
// 				navItem:[
// 					{
// 						name:"宝贝管理",
// 						classStyle:"myiconshangpin",
// 						id:0,
// 					},{
// 						name:"排行榜",
// 						classStyle:"myiconpaihang",
// 						id:1
// 					},{
// 						name:"视频下载",
// 						classStyle:"myiconxiazai",
// 						id:2
// 					},{
// 						name:"智能客服",
// 						classStyle:"myiconkefu",
// 						id:3
// 					},{
// 						name:"黑名单",
// 						classStyle:"myiconheimingdan",
// 						id:4
// 					},{
// 						name:"公告",
// 						classStyle:"myicongonggao",
// 						id:5
// 					},{
// 						name:"优惠券",
// 						classStyle:"myiconyouhuiquan",
// 						id:6
// 					},{
// 						name:"实时数据",
// 						classStyle:"myiconshuju",
// 						id:7
// 					}
// 				],
// 				bb_activeName:'bb_first',
// 				searchbb:'',
// 				ysj_tableData:[],
// 				ysj_itemList:[],
// 				bb_circle_timer:null,
// 				yjdrDialog:false,
// 				wsj_bb_data:[],
// 				pltj_Dialog:false,
// 				pltj_text:'',
// 				pl_set_right_Dialog:false,
// 				multipleSelection:[] //未上架被选中的宝贝
// 			}
// 		},
// 		created(){
// 			this.zhuUid = getUrlParam($("div.ice-img.circle>img")[0].src, "userId") != null ? getUrlParam($("div.ice-img.circle>img")[0].src, "userId") : getUrlParam('?' + $("#tb-beacon-aplus").attr("exparams"), "userid")
// 			this.parentId = getUrlParms("id") != null ? getUrlParms("id") : getUrlParam($("#J_container > div > div > div.ice-layout-section.ice-layout-section-has-aside > div.ice-layout-main.main.main-style > div.next-row.next-row-justify-space-between > div.next-col.next-col-16 > div.data-board > div.t1 > a").attr("href"), 'feedId')
// 			this.getysj_tableData();
// 		},
// 		mounted(){
// 			console.log(this.zhuUid);
// 			this.getNoCommodityInfo();
// 		},
// 		methods:{
// 			handleClose(){
// 				this.bbdialogVisible = false;
// 				this.paihangDialog = false;
// 				this.xiazaiDialog = false;
// 				this.kefuDialog = false;
// 				this.hmdDialog = false;
// 				this.ggDialog = false;
// 				this.yhqDialog = false;
// 				this.realDialog = false;
// 			},

// 			handleClick(){
// 				console.log("tab切换")
// 			},
// 			showDialog(id){
// 				console.log(id)

// 				if(id == 0){
// 					this.bbdialogVisible = true;
// 				}else if(id == 1){
// 					this.paihangDialog = true;
// 				}else if(id == 2){
// 					this.xiazaiDialog = true;
// 				}else if(id == 3){
// 					this.kefuDialog = true;
// 				}else if(id == 4){
// 					this.hmdDialog = true;
// 				}else if(id == 5){
// 					this.ggDialog = true;
// 				}else if(id == 6){
// 					this.yhqDialog = true;
// 				}else if(id == 7){
// 					this.realDialog = true;
// 				}
				
// 			},
// 			tanBb(index,row){
// 				// console.log(row)
// 				var that = this;

				
// 				this.goodsShelves(row.goodsList[0],row.goodsList[0].extendVal.customizedItemRights,1);

// 			},
// 			//获取优惠券
// 			getCoupon(){

// 			},
			
// 			//上架宝贝 // 修改利益点
// 			goodsShelves(good_detail,right,type){

// 				/* type == 1 上架宝贝
// 				   type == 2 修改利益点
				   
// 				*/ 

// 				var that = this;
// 				var draft = {
//                     "feedType": "502",
//                     "roomType": 0,
//                     "nodes": [
//                         {
//                             "type": "picItem",
//                             "path": "//gw.alicdn.com/tfscom/" + good_detail.itemPic,
//                             "content": good_detail.itemName,
//                             "bizId": good_detail.itemId,
//                             "right": right == null ? "" : right
//                         }
//                     ],
//                     "parentId": that.parentId,
//                     "feedId": ""
//                 }
//                 draft = JSON.stringify(draft)
//                 draft = encodeURIComponent(draft);
//                 var data = {
//                     _input_charset: "utf-8",
//                     _tb_token_: $.cookie("_tb_token_"),
//                     draft: draft
//                 }

//                 axios.get("https://liveplatform.taobao.com/live/action.do?api=publish_content_feed",{
//                 	params:data
//                 }).then(response=>{
//                 	if(response.data.msgInfo == "成功" ){
                		
//                 		that.$message({
//                 			type:"success",
//                 			offset:300,
//                 			message:type == 1 ? "弹宝贝成功" : type == 2 ? "修改利益点成功" : "上架成功"
//                 		})
//                 		if(type == 2){

//                 			that.getysj_tableData()
//                 		}

//                 	}else{
//                 		that.$message({
//                 			type:"error",
//                 			offset:300,
//                 			message:response.data.msgInfo
//                 		})
//                 	}
//                 })

// 			},

// 			timeTanBb(index,row,event){
// 				var that = this;
// 				var event = event || window.event;
				
// 				clearInterval(this.bb_circle_timer);
			
// 				var that = this;
// 				var time = row.time
// 				console.log(row)
// 				if(time == undefined || time == '' || isNaN(time)){
// 					this.$message({
// 						type:"warning",
// 						message:"请输入时间间隔",
// 						offset:300
// 					})

// 					return
// 				}





// 				if(event.path[0].innerText == "定时"){

// 					localStorage.setItem('lmh_'+that.parentId,JSON.stringify({
// 						itemId:row.goodsList[0].itemId,
// 						time:time
// 					}))
// 					this.bb_circle_timer = setInterval(()=>{
// 						row.time --
						
// 						if(row.time<=0){
// 							this.goodsShelves(row.goodsList[0],row.goodsList[0].extendVal.customizedItemRights,1);
// 							row.time = time;
// 						}
// 					},1000)

// 					console.log("定时");
					
// 				}else{
// 					clearInterval(this.bb_circle_timer);
// 					this.bb_circle_timer = null;
// 					row.time = '';
// 					localStorage.removeItem('lmh_'+that.parentId)
// 					console.log("停止")
// 				}
		
// 			},
// 			tellMeClick(){
// 				console.log('click')
// 			},

// 			changeRight(index,row){
// 				this.goodsShelves(row.goodsList[0],row.goodsList[0].extendVal.customizedItemRights,2)
// 			},
// 			//获取直播间的商品
// 			getysj_tableData(){
//    				var that = this;
//                 var draft = {
//                     "liveId": that.parentId,
//                     "creatorId": that.zhuUid,
//                     "n": 400,
//                     "groupNum": 0
//                 }
//                 var key = $.cookie("_m_h5_tk").split("_")[0];
//                 var t = new Date().getTime();
//                 var sign = hex_md5(key + "&" + t + "&12574478&" + JSON.stringify(draft));
//                 var params = {
//                     jsv: "2.5.0",
//                     appKey: 12574478,
//                     t: t,
//                     sign: sign,
//                     api: "mtop.mediaplatform.video.livedetail.itemlist.withpagination",
//                     v: "3.0",
//                     AntiCreep: true,
//                     AntiFlood: true,
//                     ecode: 1,
//                     H5Request: true,
//                     data: JSON.stringify(draft)
//                 };

//                 axios.get("https://h5api.m.taobao.com/h5/mtop.mediaplatform.video.livedetail.itemlist.withpagination/3.0/",{
//                 	params:params
//                 }).then(response=>{
//                 	that.ysj_tableData = response.data.data.itemList;

//                 	var localItem = JSON.parse(localStorage.getItem('lmh_'+that.parentId));

//                 	if(localItem != null){
// 	                	for(let i = 0;i<that.ysj_tableData.length;i++){
// 	                		if(that.ysj_tableData[i].goodsList[0].itemId == localItem.itemId){
// 	                			// that.ysj_tableData[i].time = localItem.time;
// 	                			that.$set(that.ysj_tableData[i],'time',localItem.time)
// 	                			that.bb_circle_timer = setInterval(()=>{
// 									that.ysj_tableData[i].time --

// 									if(that.ysj_tableData[i].time<=0){
// 										this.goodsShelves(that.ysj_tableData[i].goodsList[0],that.ysj_tableData[i].goodsList[0].extendVal.customizedItemRights,1);
// 										that.ysj_tableData[i].time = localItem.time;
// 									}
// 								},1000)

// 	                		}
// 	                	}
//                 	}

//                 })
// 			},
// 			fileChange(e){	
// 				var that = this;
// 				var dataArray = null
//                 var obj = {}
//                 var data = []
//                 var files = e.target.files;
//                 console.log(files)
//                 var fileReader = new FileReader();
//                 fileReader.onload = function (ev) {
//                    that.yjdrDialog = false;
//                 	console.log(ev)
//                     try {
//                         var data = ev.target.result,
//                             workbook = XLSX.read(data, {
//                                 type: 'binary'
//                             }), // 以二进制流方式读取得到整份excel表格对象
//                             persons = []; // 存储获取到的数据
//                     } catch (e) {
//                     	console.log(e)
//                         return;
//                     }

//                     // 表格的表格范围，可用于判断表头是否数量是否正确
//                     var fromTo = '';
//                     // 遍历每张表读取
//                     for (var sheet in workbook.Sheets) {
//                         if (workbook.Sheets.hasOwnProperty(sheet)) {
//                             fromTo = workbook.Sheets[sheet]['!ref'];
//                             persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
//                             break; // 如果只取第一张表，就取消注释这行
//                         }
//                     }
//                     dataArray = persons

//                     console.log(dataArray)
//                     that.getCommodityInfoAsync(dataArray,dataArray.length,0)


//                     // getNoCommodityInfo(localBbKey)
                    
//                     $("#excel-file").val("");

//                 };

//                 fileReader.readAsBinaryString(files[0]);

// 			},
// 			//异步循环获取商品
//             getCommodityInfoAsync(dataArray,length,i){
//             	var that = this;
//                 //子账号
//                 var uid = getUrlParam('?' + $("#tb-beacon-aplus").attr("exparams"), "userid") != null ? getUrlParam('?' + $("#tb-beacon-aplus").attr("exparams"), "userid") : getUrlParam($("div.ice-img.circle>img")[0].src, "userId")
//                 if(i == length){
           
//                     that.getNoCommodityInfo('localBbKey')

//                     $("#excel-file").val("");
//                     $("input[name=wst_bb_text]").val("")

//                     var dataArrYhq = JSON.parse(localStorage.getItem('localBbYhqKey'));

                    
//                     // $.ajax({
//                     //     url: "https://plug.zhubozhushou.com/TaobaoInteraction/syc/saveCouponBind.do",
//                     //     type: "post",
//                     //     // async:false,
//                     //     data: {
//                     //         uid: parseInt(uid),
//                     //         data: JSON.stringify(dataArrYhq)
//                     //     }, success: function () {

//                     //     }, error: function () {
//                     //         wstAlert("同步数据失败，请联系客服", 2)
//                     //     }
//                     // })

//                     var serverDateArr = localStorage.getItem('localBbKey')

//                     // $.ajax({
//                     //     url: "https://plug.zhubozhushou.com/TaobaoInteraction/syc/saveGoods.do",   //将新的数据保存到服务器
//                     //     data: {
//                     //         uid: parseInt(uid),
//                     //         data: serverDateArr
//                     //     },
//                     //     // async:false,
//                     //     type: "post",
//                     //     success: function () {

//                     //     }, error: function () {
//                     //         wstAlert("同步数据失败，请联系客服", 2)
//                     //     }
//                     // })
//                 }else{
//                     // dataArray[j].宝贝链接, localBbKey, dataArray[j].利益点
//                     console.log('正在导入第'+(i+1)+'个商品')
                    

//                     var right = dataArray[i].利益点

//                     var good_detail
//                     var goodurl = encodeURIComponent(dataArray[i].宝贝链接);
//                     var t = new Date().getTime();
//                     var msg = ''


//                     $.ajax({
//                         type: "get",
//                         url: 'https://liveplatform.taobao.com/live/action.do?api=item_getItem&url=' + goodurl + '&_=' + t,
//                         // async: false,
//                         success: function (response) {
//                             if (!JSON.parse(response).success) {
                  
//                                 that.$message({
//                                 	type:"error",
//                                 	message:"第"+(i+1)+'个商品导入失败',
//                                 	offset:300
//                                 })
//                                 msg = 'error'

//                                 return  that.getCommodityInfoAsync(dataArray,length,i+1)
//                             }
//                             var model = JSON.parse(response).model


//                             var serverDateArr = JSON.parse(localStorage.getItem('lmh_bb_'+that.zhuUid))
//                             // if (serverDateArr == null&& sessionStorage.getItem('isAvailable') != 1) {
//                             //     $.ajax({
//                             //         url: "https://plug.zhubozhushou.com/TaobaoInteraction/syc/selectGoods.do",
//                             //         async: false,
//                             //         timeout:3000,
//                             //         data: {
//                             //             uid: parseInt(uid)
//                             //         },
//                             //         type: "post",
//                             //         success: function (res) {
//                             //             serverDateArr = res;
//                             //             localStorage.setItem(localBbKey, JSON.stringify(serverDateArr))
//                             //         }
//                             //     })

//                             // }

//                             if (serverDateArr == null) {
//                                 serverDateArr = []
//                             }
//                             if (right != null || right != "") {
//                                 var data = {
//                                     model: JSON.stringify(model),
//                                     right: right
//                                 }
//                             } else {
//                                 var data = {
//                                     model: JSON.stringify(model),

//                                 }
//                             }
//                             serverDateArr.push(data)

//                             localStorage.setItem('lmh_bb_'+that.zhuUid, JSON.stringify(serverDateArr))


//                             var itemIdExcel = getUrlParam(dataArray[i].宝贝链接, "id")
//                             var vals = dataArray[i].优惠券

//                             if (vals != undefined && vals != "") {
                                
//                                 var activity_id = getUrlParam(vals, "activity_id") || getUrlParam(vals, "activityId") || getUrlParam(vals, "activityid");
//                                 var seller_id = getUrlParam(vals, "seller_id") || getUrlParam(vals, "sellerId") || getUrlParam(vals, "sellerid");
          
//                                 t = new Date().getTime();
//                                 var data = {
//                                     "uuid": activity_id,
//                                     "sellerId": seller_id,
//                                     "queryShop": true,
//                                     "originalSellerId": "",
//                                     "marketPlace": ""
//                                 }
//                                 var sign = hex_md5(key + "&" + t + "&12574478&" + JSON.stringify(data));
//                                 var params = {
//                                     jsv: "2.3.22",
//                                     appKey: 12574478,
//                                     t: t,
//                                     sign: sign,
//                                     api: "mtop.taobao.couponMtopReadService.findShopBonusActivitys",
//                                     v: "3.0",
//                                     AntiCreep: true,
//                                     AntiFlood: true,
//                                     ecode: 1,
//                                     H5Request: true,
//                                     data: JSON.stringify(data)
//                                 };
//                                 $.ajax({
//                                     type: "get",
//                                     url: "https://acs.m.taobao.com/h5/mtop.taobao.couponmtopreadservice.findshopbonusactivitys/3.0/",
//                                     data: params,
//                                     // async: false,
//                                     xhrFields: {
//                                         withCredentials: true
//                                     },
//                                     success: function (res) {
//                                         if (res.data.module == undefined && sessionStorage.getItem('isAvailable') != 1) {
//                                             var obj = {
//                                                 coupons_url: vals
//                                             }
//                                             $.ajax({
//                                                 // url: "https://zb.dataokezs.com/home/plug/get_coupons_data",
//                                                 url: "https://plug.zhubozhushou.com/TaobaoInteraction/convertCouponData.do",
//                                                 type: "post",
//                                                 data: {
//                                                     des_data: jm(JSON.stringify(obj))
//                                                 },
//                                                 success: function (data_y) {
//                                                     var res_y = data_y
//                                                     if (res_y.data == undefined) {
//                                                         if (vals != '') {
//                                                         	that.$message({
//                                                         		type:"error",
//                                                         		message:"获取第"+(i+1)+"优惠券信息失败，请核对优惠券链接",
//                                                         		offset:300
//                                                         	})
//                                                             // console.log("获取第"+(i+1)+"优惠券信息失败，请核对优惠券链接", 0)
//                                                         }
//                                                         msg = ''
//                                                         return that.getCommodityInfoAsync(dataArray,length,i+1)
//                                                     }
//                                                     msg = res_y.data
//                                                     return that.getCommodityInfoAsync(dataArray,length,i+1)
//                                                 }
//                                             })
//                                         } else {
//                                             var model = res.data.module[0]
//                                             msg = model

//                                             var yhqInfo = model

//                                             //从服务器获取保存的优惠券
//                                             var dataArrYhq = null //JSON.parse(localStorage.getItem(localBbYhqKey))
//                                             dataArrYhq = JSON.parse(localStorage.getItem('lmh_yhq_'+that.zhuUid));
//                                             // if (dataArrYhq == null&& sessionStorage.getItem('isAvailable') != 1) {
//                                             //     $.ajax({
//                                             //         url: "https://plug.zhubozhushou.com/TaobaoInteraction/syc/selectCouponBind.do",
//                                             //         type: "post",
//                                             //         async: false,
//                                             //         timeout:3000,
//                                             //         data: {
//                                             //             uid: parseInt(uid),
//                                             //         }, success: function (response) {
//                                             //             dataArrYhq = response;
//                                             //             localStorage.setItem(localBbYhqKey, JSON.stringify(dataArrYhq))
//                                             //         }

//                                             //     })
//                                             // }


//                                             if (yhqInfo.discount == null || yhqInfo.discount == "") {
                                                
//                                                 return that.getCommodityInfoAsync(dataArray,length,i+1)
//                                             }
//                                             if (dataArrYhq != null && dataArrYhq.length != 0) {
//                                                 var likeItem = false
//                                                 for (let i = 0; i < dataArrYhq.length; i++) {

//                                                     if (itemIdExcel == dataArrYhq[i].itemId) {
//                                                         if (vals == '' || vals == undefined) {

//                                                         } else {
//                                                             likeItem = true
//                                                             dataArrYhq[i].link = vals
//                                                             dataArrYhq[i].text = "￥" + yhqInfo.discount / 100

//                                                             localStorage.setItem(localBbYhqKey, JSON.stringify(dataArrYhq))
                                                            

                                                            
//                                                         }
//                                                         break
//                                                     }
//                                                 }
//                                                 if (likeItem) {
//                                                     // console.log('绑定了')
//                                                     return that.getCommodityInfoAsync(dataArray,length,i+1)
//                                                     // continue
//                                                 }
//                                             }
//                                             var data = {
//                                                 itemId: itemIdExcel,
//                                                 link: vals,
//                                                 text: "￥" + yhqInfo.discount / 100
//                                             }
//                                             if (dataArrYhq == null) {
//                                                 dataArrYhq = []
//                                             }
//                                             if (dataArrYhq.length > 99) {
//                                                 dataArrYhq.shift()
//                                             }
//                                             dataArrYhq.push(data)


//                                             localStorage.setItem('lmh_yhq_'+that.zhuUid, JSON.stringify(dataArrYhq))

//                                             return that.getCommodityInfoAsync(dataArray,length,i+1)


//                                         }
//                                     }
//                                     , error: function (res) {
//                                         msg = model
//                                         if (vals != '') {
//                                         	this.$message({
//                                         		type:"error",
//                                         		message:"获取第"+(i+1)+"优惠券信息失败，请核对优惠券链接",
//                                         		offset:300,
//                                         	})
//                                             // console.log("获取第"+(i+1)+"优惠券信息失败，请核对优惠券链接", 0)
//                                         }
//                                     }
//                                 });
//                             }else{
//                             	that.$message({
//                             		type:"success",
//                             		message:'第'+(i+1)+'个商品导入成功',
//                             		offset:300
//                             	})
//                                 return that.getCommodityInfoAsync(dataArray,length,i+1)
//                             }



                            
//                             // return msg


//                             // var yhqInfo = bBVouchersInfoBack(dataArray[i].优惠券)






                            


                            

                            
//                         }
//                     });
//                 }
//             },
//             //未上架商品的信息
//             getNoCommodityInfo(){
//             	console.log("666")
//             	var that = this;
//             	var arr = localStorage.getItem('lmh_bb_'+that.zhuUid);
//             	if(arr != null){
//             		that.wsj_bb_data = JSON.parse(arr)
//             		console.log(that.wsj_bb_data)
//             	}
//             },
//             //未上架的宝贝上架
//             upItem(index,row){
//             	this.wsj_bb_data.splice(index,1);
//             	console.log(row)
//             	localStorage.setItem("lmh_bb_"+this.zhuUid,JSON.stringify(this.wsj_bb_data));
//             	var obj = {
//             		itemPic:"//gw.alicdn.com/tfscom/"+JSON.parse(row.model).imgUrl,
//             		itemName:JSON.parse(row.model).itemTitle,
//             		itemId:JSON.parse(row.model).itemId,
//             	}
//             	this.goodsShelves(obj,row.right,3)
//             },
// 			selectFile(){
// 				$("#excel-file").click();
// 			},
// 			addPltj(){

// 				if(this.pltj_text == ''){
// 					this.$message({
// 						type:"warning",
// 						message:"请添加链接",
// 						offset:300
// 					})

// 				}else{
// 					console.log(this.pltj_text)



// 					var vals = this.pltj_text
 
//                     var arrVals = vals.split('https://')
//                     var infoState = ''
//                     arrVals.splice(arrVals.indexOf(''), 1);



//                     // console.log(arrVals.length)
//                     for (var i = 0; i < arrVals.length; i++) {
//                         arrVals[i] = {'宝贝链接':"https://" + arrVals[i]}
//                     }
//                     //正在导入宝贝数据，请稍等...
   
//                     this.getCommodityInfoAsync(arrVals,arrVals.length,0)
//                     this.pltj_Dialog = false;
//                     this.pltj_text = "";
// 				}
// 				console.log("pltj")
// 			},
// 			wsj_select(val){
// 				this.multipleSelection = val;
// 				console.log(this.multipleSelection)
// 			},
// 			pl_set_right(){
// 				console.log("批量设置利益点")
// 			}
// 		}
// 	}


// 	includeLinkStyle("https://unpkg.com/element-ui/lib/theme-chalk/index.css")


// 	// 在使用element-ui的时候  发现使用饿了么自带的布局 el-row  el-col时，如果想添加点击事件的时候，点击事件失效  @click失效。
// 	// 经过查证，发现可以使用方法 @click.native代替@click即可
// 	var vm = new Vue({
// 		el:"#myapp",
// 		data:{
			
// 		},
// 		created(){
			
// 		},
// 		mounted(){

// 		},
// 		methods:{
// 			tellMeClick(){
// 				console.log('click')
// 			}
// 		},
// 		computed:{

// 		},
// 		components:{
// 			'myindex':myindex
// 		},
// 		filters:{

// 		}
// 	})
// },1000)

// function getUrlParam(url, name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var param = url.split("?");
//     try {
//         var r = param[1].match(reg);
//     } catch (e) {
//         return null
//     }
//     if (r != null) return unescape(r[2]);
//     return null;
// }



// function getUrlParms(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null)
//         return unescape(r[2]);
//     return null;
// }






