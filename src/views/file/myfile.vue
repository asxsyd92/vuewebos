<template>
	<div>
		<div class="navigation-bar">
			<div class="forward-backward">
				<button type="button" class="backward flipy-y btn-xs k-btn btn" title="后退"></button>
				<button type="button" class="forward btn-xs k-btn btn" title="前进"></button>
			</div>
			<button type="button" class="home btn-xs k-btn btn" @click="synfile()" title="同步文件"></button>
			<button type="button" class="gotopre btn-xs k-btn btn" @click="backfile()" title="返回上级目录"></button>
			<div class="folder-navigation" id="folder-navigation"></div>
			<input type="text" class="navigation" id="navigation" style="display: none;">
		</div>
		<hr />
		<div class="alldom" id="all_folder">
			<ul id="divall">
				<li v-for="(item,index) in data" :key="index"  :title="item.name"
					@click="open(item)" :index="index">
					 <i v-if="item.icon!='mp4'" :class="showico(item)" v-bind:style="{color:setcolor(item)}"/>
					<img v-if="item.icon=='mp4'" :src="item.imgsrc" style="width: 100%; height: auto;"/>
					<input type="text" class="changename" :value="item.name" disabled="disabled">
				</li>
			</ul>
		</div>

		<div class="layui-row layui-col-space15 clearfix">
			<div id="filepage">

			</div>
		</div>

	</div>
</template>
<script>
	export default {
		name: "myfile",
		data() {
			return {
				data: [],
				laypage: null,
				count: 0,
				page: 1,
				limit: 15,
				key: "",
				parentid: ""
			}
		},
		mounted() {
			this.laypage = layui.laypage;
			this.getfile("d0");
		},
		methods: {
			getfile(key) {

				var m = this;
				m.$post(m.host + "/api/ctdisk/cffile", { key: key, page: m.page, limit: m.limit }).then(res => {


				}).catch(res => {
					m.data = res.data;
					if (m.data.length > 0) {
					if(m.data[0].icon=="folder"){
	          		     m.parentid = m.data[0].parentid==key?"d0":m.data[0].parentid;
						m.key = m.data[0].key;
				
				}
				
					}
					m.count = res.count;
					if (m.page > 0) { return; }
					m.laypage.render({
						elem: 'filepage' //注意，这里的 test1 是 ID，不用加 # 号
						, count: m.count //数据总数，从服务端得到
						, jump: function (obj, first) {

							m.page = obj.curr;  //改变当前页码
							m.limit = obj.limit;
							//首次不执行
							if (!first) {
								//do something
								m.getfile(key);
							}
						}
					});
				});
			}, open(item) {
				console.log(item);
				var m = this;
				if(item.icon=="folder"){
	            m.key = item.key;
				m.parentid = item.parentid;
				m.getfile(item.key);
				
				} else {
					window.open(item.weblink);
				}
			

			}, synfile() {
				var m = this;
				m.$post(m.host + "/api/ctdisk/synfile", { folder_id: m.key == "" ? "d0" : m.key }).then(res => {


				}).catch(res => {
					m.getfile(m.key);
				});
			}, backfile() {
				var m = this;
				if (m.parentid == "") {
					layer.msg("以是根目录", { icon: 2 });
				}
				m.getfile(m.parentid);

			}, showico(item) {
				var icon = "fa fa-file fa-5x";
				switch (item.icon) {
					case "folder": icon = "fa fa-file fa-5x"; break;
					case "mp4": icon = "fa fa-file-movie-o fa-5x"; break;
					case "pdf": icon = "fa fa-file-pdf-o fa-5x"; break;
					
				}
				
				return icon;
			},
			setcolor(item){
					var icon = "#ffe88c";
				switch (item.icon) {
					case "folder": icon = "#ffe88c"; break;
					case "mp4": icon = "rgb(30 144 255);"; break;
					case "pdf": icon = "rgb(11 16 238)"; break;
				}
				return icon;
			}
		
		}

	}
</script>
<style scoped lang="less">
	.alldom {
		height: 70%;
	}

	.alldom ul {
		padding: 0;
		list-style: none;
	}


	.alldom ul li {
		text-align: center;
		overflow: hidden;
		width: 100px;
		height: 115px;
		float: left;
	margin: 10px;
		border: 1px solid #fff;
		position: relative;
		transition: all 0.2s ease-in 0.1s;
		white-space: nowrap;
		text-overflow: ellipsis
	}

	.alldom ul li.focus {
		background-color: #69a9da;
		border: 1px solid #a7aae3;
	}

	.alldom ul li:hover {
		background-color: #1890ff;
		border: 1px solid #a7aae3;
	}

	input.changename {
		position: absolute;
		border-radius: 0px;
		left: -25px;
		bottom: 10px;
		overflow: hidden;
		width: 98px;
		height: 20px;
		color: #595c5f;
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		z-index: 0;
		border: 0;
		border-radius: 8px;
		transition: all 0.2s ease-in 0.1s;
		margin-left: 25px;
		background: none;
	}

	input.changename:hover {
		background: none;
		color: #F33;
	}

	input.changename:focus {
		background-color: #fff;
	}

	.info-bar {
		height: 65px;
	}

	.info-icon {
		width: 60px;
		height: 90%;
		display: inline-block;
		background-size: cover;
	}

	.info-detail {
		display: inline-block;
		height: 90%;
		width: 90%;
		margin-left: 10px;
	}

	.detail-form .detail-field {
		float: left;
		width: 300px;
	}

	.detail-field2 {
		font-size: large;
		margin-left: 10px;
	}

	.detail-var {
		margin-right: 10px;
	}

	.navigation-bar .home {
		width: 24px;
		height: 24px;
		//background-image:url(../images/blue_home.png);
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0 3px;
		position: relative;
		display: inline-block;
	}

	.navigation-bar .home:hover {
		background-color: #69a9da;
	}

	.navigation-bar .gotopre {
		width: 24px;
		height: 24px;
		background-image: url(../../assets/images/return.png);
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0 3px;
		position: relative;
		display: inline-block;
		background-color: ghostwhite;
	}

	.navigation-bar .gotopre:hover {
		background-color: #0ce2ea;
	}

	.folder-navigation .foldername {
		cursor: pointer;
		text-decoration: none;
	}

	.folder-navigation .triangle {
		width: 8px;
		margin: 0 5px 3px 5px;
	}

	.navigation-bar .folder-navigation {
		height: 20px;
		position: relative;
		display: inline-block;
		margin-left: 50px;
	}

	.navigation-bar .forward-backward {
		width: 67px;
		display: inline-block;
	}

	.navigation-bar .forward-backward .backward {
		background-image: url(../../assets/images/forward.png);
		background-repeat: no-repeat;
		background-size: contain;
		margin: 0 3px;
		border: 0;
		width: 24px;
		height: 24px;
		background-color: #1da71d;
	}

	.navigation-bar .forward-backward .backward:hover,
	.navigation-bar .forward-backward .backward:focus {
		background-color: #2493ab;
	}

	.navigation-bar .forward-backward .forward {
		background-image: url(../../assets/images/forward.png);
		background-repeat: no-repeat;
		background-size: contain;
		margin: 0 3px;
		border: 0;
		width: 24px;
		height: 24px;
		background-color: #1da71d;
	}

	.navigation-bar .forward-backward .forward:hover,
	.navigation-bar .forward-backward .forward:focus {
		background-color: #2493ab;
	}

	.flipy-x {
		-moz-transform: scaleY(-1);
		-webkit-transform: scaleY(-1);
		-o-transform: scaleY(-1);
		transform: scaleY(-1);
		filter: FlipV;
	}

	.flipy-y {
		-moz-transform: scaleX(-1);
		-webkit-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		transform: scaleX(-1);
		filter: FlipH;
	}
</style>