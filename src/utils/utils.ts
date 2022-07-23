
class Utils {


    /* 获取随机数 方法 */
    random(min: number, max: number) {

        return Math.floor(Math.random() * (max - min)) + min;

    }

    //生成guid
    GenNonDuplicateID(randomLength:any) {
        return Number(
            Math.random()
            .toString()
            .substr(3, randomLength) + Date.now()
        ).toString(36);
    }

}

export default new Utils()