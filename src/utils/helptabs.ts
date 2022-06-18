
class HelpTabs {
 //这是页面中关闭   
close(appStore: any,path:any,router:any) {
debugger;
  appStore.tabs = appStore.tabs.filter((ele:any) => ele.id != path);
  var i=appStore.tabs.length-1 
  if(i>0){
    var id=appStore.tabs[i].id;
     router.push(id); 
     appStore.current=id;
     var t=top as any;
     var tablose=t.document.getElementsByClassName("layui-icon layui-icon-close layui-unselect layui-tab-close") as any;
     if(tablose.length>0){
      tablose[i].click();
     }
  }
     
}
}

export default new HelpTabs()