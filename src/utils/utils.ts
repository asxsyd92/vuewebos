
class Utils {


    /* 获取随机数 方法 */
    random(min: number, max: number) {

        return Math.floor(Math.random() * (max - min)) + min;

    }

    //生成guid
    GenNonDuplicateID() {

   
            return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
       
        // return Number(
        //     Math.random()
        //     .toString()
        //     .substr(3, randomLength) + Date.now()
        // ).toString(36);
    }
    S4(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    TreeTtoList(da: Array<any>,data: Array<any>){
   

        da.forEach((item: any) => {
            if (item.children.length > 0) {
                this.TreeTtoList(item.children,data);
            }
            data.push(item);
          });
          return data;
    }

}

export default new Utils()