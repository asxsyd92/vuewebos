
import { useAppStore } from "../store/app";
class HelpTabs {
    service;
    constructor() {
       this. service = useAppStore();  
 
   
}
close(path: string,route:any) {
    debugger;
    this.service.tabs = this.service.tabs.filter((ele:any) => ele.id != path);
    var i=this.service.tabs .length-1 
    if(i>0){
      var id=this.service.tabs [i].id;
      route.push(id); 
    }
     
}
}

export default new HelpTabs()