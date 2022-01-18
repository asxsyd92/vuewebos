<template>
<div>
  <div class="navigation-bar">
	<div class="forward-backward">
		<button type="button" class="backward flipy-y btn-xs k-btn btn"
			title="后退"></button>
		<button type="button" class="forward btn-xs k-btn btn" title="前进"></button>
	</div>
	<button type="button" class="home btn-xs k-btn btn" title="返回根目录"></button>
	<button type="button" class="gotopre btn-xs k-btn btn" title="返回上级目录"></button>
	<div class="folder-navigation" id="folder-navigation"></div>
	<input type="text" class="navigation" id="navigation"
		style="display: none;">
</div>
<hr />
<div class="alldom" id="all_folder">
	<ul id="divall"><li class="folder" title="123" index="0"><input type="text" class="changename" value="123" data-id="2" data-last-value="123" disabled="disabled"></li><li class="folder" title="新文件夹" index="1"><input type="text" class="changename" value="新文件夹" data-id="13" data-last-value="新文件夹" disabled="disabled"></li><li class="folder" title="新文件夹[1]" index="2"><input type="text" class="changename" value="新文件夹[1]" data-id="14" disabled="disabled" data-last-value="新文件夹[1]"></li><li class="folder" title="新文件夹[2]" index="3"><input type="text" class="changename" value="新文件夹[2]" data-id="10" disabled="disabled" data-last-value="新文件夹[2]"></li><li class="folder" title="新文件夹[3]" index="4"><input type="text" class="changename" value="新文件夹[3]" data-id="11" disabled="disabled" data-last-value="新文件夹[3]"></li><li class="folder" title="新文件夹[4]" index="5"><input type="text" class="changename" value="新文件夹[4]" data-id="17" disabled="disabled" data-last-value="新文件夹[4]"></li><li class="file other-filetype" title="功能.txt" index="6"><input type="text" class="changename" value="功能" data-id="15" data-filetype="txt" disabled="disabled" data-last-value="功能.txt"></li><li class="file xlsx" title="案例.xlsx" index="7"><input type="text" class="changename" value="案例" data-id="12" data-filetype="xlsx" disabled="disabled" data-last-value="案例.xlsx"></li></ul>
</div>



</div>
</template>
<script>
export default {
  
}
</script>
 <style scoped  lang="less">


.alldom {
	height:70%;
}
.alldom ul {
	padding:0;
	list-style:none;
}
.folder {
//	background:url(../images/213125.png) center top no-repeat;
}
.doc,.docx {
//	background:url(../images/DOC_File_Extension.png) center top no-repeat;
}
.pdf {
//	background:url(../images/PDF_File_Extension.png) center top no-repeat;
}
.xls,.xlsx {
	//background:url(../images/XLS_File_Extension.png) center top no-repeat;
}
.other-filetype {
	//background:url(../images/file.png) center top no-repeat;
}
.alldom ul li {
	overflow:hidden;
	width:100px;
	height:115px;
	float:left;
	margin-left:55px;
	border:1px solid #fff;
	position:relative;
	transition:all 0.2s ease-in 0.1s;
	white-space:nowrap;
	text-overflow:ellipsis
}
.alldom ul li.focus {
	background-color:#69a9da;
	border:1px solid #a7aae3;
}
.alldom ul li:hover {
	background-color:#69a9ba;
	border:1px solid #a7aae3;
}
input.changename {
	position:absolute;
	border-radius:0px;
	left:-25px;
	bottom:10px;
	overflow:hidden;
	width:98px;
	height:20px;
	color:#595c5f;
	line-height:20px;
	text-align:center;
	font-size:12px;
	z-index:0;
	border:0;
	border-radius:8px;
	transition:all 0.2s ease-in 0.1s;
	margin-left:25px;
	background:none;
}
input.changename:hover {
	background:none;
	color:#F33;
}
input.changename:focus {
	background-color:#fff;
}
.info-bar {
	height:65px;
}
.info-icon {
	width:60px;
	height:90%;
	display:inline-block;
	background-size:cover;
}
.info-detail {
	display:inline-block;
	height:90%;
	width:90%;
	margin-left:10px;
}
.detail-form .detail-field {
	float:left;
	width:300px;
}
.detail-field2 {
	font-size:large;
	margin-left:10px;
}
.detail-var {
	margin-right:10px;
}
.navigation-bar .home {
	width:24px;
	height:24px;
	//background-image:url(../images/blue_home.png);
	background-repeat:no-repeat;
	background-size:cover;
	margin:0 3px;
	position:relative;
	display:inline-block;
}
.navigation-bar .home:hover {
	background-color:#69a9da;
}
.navigation-bar .gotopre {
	width:24px;
	height:24px;
	//background-image:url(../images/return.png);
	background-repeat:no-repeat;
	background-size:cover;
	margin:0 3px;
	position:relative;
	display:inline-block;
	background-color:ghostwhite;
}
.navigation-bar .gotopre:hover {
	background-color:#0ce2ea;
}
.folder-navigation .foldername {
	cursor:pointer;
	text-decoration:none;
}
.folder-navigation .triangle {
	width:8px;
	margin:0 5px 3px 5px;
}
.navigation-bar .folder-navigation {
	height:20px;
	position:relative;
	display:inline-block;
	margin-left:50px;
}
.navigation-bar .forward-backward {
	width:67px;
	display:inline-block;
}
.navigation-bar .forward-backward .backward {
//	background-image:url(../images/forward.png);
	background-repeat:no-repeat;
	background-size:contain;
	margin:0 3px;
	border:0;
	width:24px;
	height:24px;
	background-color:#1da71d;
}
.navigation-bar .forward-backward .backward:hover,.navigation-bar .forward-backward .backward:focus {
	background-color:#2493ab;
}
.navigation-bar .forward-backward .forward {
	//background-image:url(../images/forward.png);
	background-repeat:no-repeat;
	background-size:contain;
	margin:0 3px;
	border:0;
	width:24px;
	height:24px;
	background-color:#1da71d;
}
.navigation-bar .forward-backward .forward:hover,.navigation-bar .forward-backward .forward:focus {
	background-color:#2493ab;
}
.flipy-x {
	-moz-transform:scaleY(-1);
	-webkit-transform:scaleY(-1);
	-o-transform:scaleY(-1);
	transform:scaleY(-1);
	filter:FlipV;
}
.flipy-y {
	-moz-transform:scaleX(-1);
	-webkit-transform:scaleX(-1);
	-o-transform:scaleX(-1);
	transform:scaleX(-1);
	filter:FlipH;
}
</style>
