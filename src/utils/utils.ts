
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

    //   debounce(fn:any, delay:any) {
    //     var timer:any;
    //     return function () {
    //       var context = this;
    //       var args = arguments;
    //       clearTimeout(timer);
    //       timer = setTimeout(function () {
    //         fn.apply(context, args);
    //       }, delay);
    //     };
    //   }
      /**
       * @param {date} time 需要转换的时间
       * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
       */
       formatTime(time:any, fmt:any) {
        if (!time) return '';
        else {
          const date = new Date(time);
          const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds(),
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
          for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                  ? o[k]
                  : ('00' + o[k]).substr(('' + o[k]).length)
              );
            }
          }
          return fmt;
        }
      }
      

}

export default new Utils()