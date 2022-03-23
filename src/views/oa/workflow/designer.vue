<template>
    <div>
流程设计

</div>
    
</template>



<style>

</style>

<script>
import Raphael from 'raphael';
// import m from '@/assets/js/m.js';
export default {
    data(){
        return{
            wf_json:null,
            wf_id : "",
            id:"",
            wf_steps : [],
            wf_conns : [],
            wf_texts : [],

             tempArrPath: [], //临时连线
        mouseX: 0,
        mouseY: 0,
        wf_id: "",//当前流程ID
        links_tables_fields: [],//当前流程的所有连接所有表和字段
        wf_json: [],
        wf_r: null, //画板对象
        wf_steps: [], //步骤数组
        wf_texts: [], //文本数组
        wf_conns: [], //连线数组
        wf_option: "", //当前操作
        wf_focusObj: null, //当前焦点对象
        wf_width: 108, //步骤宽度
        wf_height: 50, //步骤高度
        wf_rect: 8, //圆角大小
        wf_designer: true, //是否是设计模式(查看流程图时不帮定双击事件）
        wf_connColor: "#898a89", //连线的常规颜色
        wf_nodeBorderColor: "#587aa9", //节点边框颜色
        wf_noteColor: "#efeff0", //节点填充颜色
        wf_stepDefaultName: "新步骤",//默认步骤名称
        }
        
    },        watch: {
            '$route'(to, from) { //监听路由是否变化

                if (to.fullPath.indexOf("showfrom") > 0) {
                    this.init();
                }

            }
            },
    mounted(){
        var m=this;
         m.init();
         console.log("designer");

    //随着节点位置的改变动态改变箭头
    Raphael.fn.drawArr = function (obj) {
        if (!obj || !obj.obj1) {
            return;
        }

        if (!obj.obj2) {
            var point1 = m.getStartEnd(obj.obj1, obj.obj2);
            var path2 = m.getArr(point1.start.x, point1.start.y, m.mouseX, m.mouseY, 7);
            for (var i = 0; i < m.tempArrPath.length; i++) {
                m.tempArrPath[i].arrPath.remove();
            }
            m.tempArrPath = [];
            obj.arrPath = this.path(path2);
            obj.arrPath.attr({ "stroke-width": 1.7, "stroke": m.wf_connColor, "fill": m.wf_connColor });
            m.tempArrPath.push(obj);
            return;
        }

        var point = m.getStartEnd(obj.obj1, obj.obj2);
        var path1 = m.getArr(point.start.x, point.start.y, point.end.x, point.end.y, 7);
        try {
            if (obj.arrPath) {
                obj.arrPath.attr({ path: path1 });
            }
            else {
                obj.arrPath = this.path(path1);
                obj.arrPath.attr({ "stroke-width": 1.7, "stroke": m.wf_connColor, "fill": m.wf_connColor, "x": point.start.x, "y": point.start.y, "x1": point.end.x, "y1": point.end.y });
                if (m.wf_designer) {
                    obj.arrPath.click(m.connClick);
                    obj.arrPath.dblclick(m.connSetting);
                    obj.arrPath.id = obj.id;
                    obj.arrPath.fromid = obj.obj1.id;
                    obj.arrPath.toid = obj.obj2.id;
                }
            }
        } catch (e) { console.log(e) }
        return obj;
    };
    //删除数组中元素
    Array.prototype.remove = function (n) {
        if (isNaN(n) || n > this.length) { return false; }
        this.splice(n, 1);
    }
        m.wf_r = Raphael("flowdiv", $(window).width(), $(window).height() - 28);
   
    m. wf_r.customAttributes.type1 = function () { };
     m. wf_r.customAttributes.fromid = function () { };
     m. wf_r.customAttributes.toid = function () { };

   
   },
    methods:{
        init(){
            var m=this;
     console.log("designer");
        var id= m.$route.query.id;
        if(id!=null&&id!=undefined&&id!=""){
            m.openFlow1(id);
        }
        },
        openFlow1(){
            var m=this;
              m.$post(m.host + "/api/workflow/GetJSON", {flowid: m.$route.query.id},"正在加载流程信息").then(res => {
        

            }).catch(res => {
                m.reloadFlow(res);
    
            });
       


        },
           reloadFlow (json) {
                var m=this;
            if (!json || !json.id || layui.$.trim(json.id) == "") return false;
            m. wf_json= json;
            m.wf_id = m.wf_json.id;
            //m.wf_r.clear();
            m.wf_steps = [];
            m.wf_conns = [];
            m.wf_texts = [];
            var steps = m.wf_json.steps;
            if (steps && steps.length > 0) {
                for (var i = 0; i < steps.length; i++) {
           
                        m.addStep(steps[i].position.x, steps[i].position.y, steps[i].name, steps[i].id, false, steps[i].type);

            
               }
            }
            var lines = m.wf_json.lines;
            if (lines && lines.length > 0) {
                for (var i = 0; i < lines.length; i++) {
                    m.connObj({ id: lines[i].id, obj1: m.wf_r.getById(lines[i].from), obj2: m.wf_r.getById(lines[i].to) }, false, lines[i].text);
                }
            }

            //初始化数据连接
           m.initLinks_Tables_Fields(m.wf_json.databases);
        },    //添加步骤
        addStep (x, y, text, id, addToJSON, type1, bordercolor, bgcolor) {
              var m=this;
            var guid = m.getGuid();
            var xy = m.getNewXY();
            x = x || xy.x;
            y = y || xy.y;
            text = text || m.wf_stepDefaultName;
            id = id || guid;
            var rect = m.wf_r.rect(x, y, m.wf_width, m.wf_height, m.wf_rect);
            rect.attr({ "fill": bgcolor || m.wf_noteColor, "stroke": bordercolor || m.wf_nodeBorderColor, "stroke-width": 1.4, "cursor": "default" });
            rect.id = id;
            rect.type1 = type1 ? type1 : "normal";
            rect.drag(m.move, m.dragger, m.up);
            if (m.wf_designer) {
                rect.click(m.click);
                if ("normal" == rect.type1) {
                    rect.dblclick(m.stepSetting);
                }
                else if ("subflow" == rect.type1) {
                    rect.dblclick(m.subflowSetting);
                }
            }
            m.wf_steps.push(rect);

            var text2 = text.length > 8 ? text.substr(0, 7) + "..." : text;
            var text1 = m.wf_r.text(x + 52, y + 25, text2);
            text1.attr({ "font-size": "12px" });
            if (text.length > 8) text1.attr({ "title": text });
            text1.id = "text_" + id;
            text1.type1 = "text";
            m.wf_texts.push(text1);

            if (addToJSON == undefined || addToJSON == null) addToJSON = true;
            if (addToJSON) {
                var step = {};
                step.id = guid;
                step.type = type1 ? type1 : "normal";
                step.name = text;
                step.position = { x: x, y: y, width: m.wf_width, height: m.wf_height };
                if (rect.type1 === "normal") {
                    step.opinionDisplay = "";
                    step.expiredPrompt = "";
                    step.signatureType = "";
                    step.workTime = "";
                    step.limitTime = "";
                    step.otherTime = "";
                    step.archives = "";
                    step.archivesParams = "";
                    step.note = "";
                    step.behavior = {
                        flowType: "",
                        runSelect: "",
                        handlerType: "",
                        selectRange: "",
                        handlerStep: "",
                        valueField: "",
                        defaultHandler: "",
                        hanlderModel: "",
                        backModel: "",
                        backStep: "",
                        backType: "",
                        percentage: ""
                    };
                    step.forms = [];
                    step.buttons = [];
                    step.fieldStatus = [];
                    step.event = {
                        submitBefore: "",
                        submitAfter: "",
                        backBefore: "",
                        backAfter: ""
                    };
                }
                else if (rect.type1 === "subflow") {
                    step.flowid = "";
                    step.handler = "";
                    step.strategy = 0;
                }
                m.addStep1(step);
            }
        },
             getGuid() {
            return Raphael.createUUID().toLowerCase();
        },//改变节点样式
           //得到新步骤的XY
        getNewXY: function () {
              var m=this;
            var x = 10, y = 50;
            if (m.wf_steps.length > 0) {
                var step = m.wf_steps[m.wf_steps.length - 1];
                x = parseInt(step.attr("x")) + 170;
                y = parseInt(step.attr("y"));
                if (x > m.wf_r.width - m.wf_width) {
                    x = 10;
                    y = y + 100;
                }

                if (y > m.wf_r.height - m.wf_height) {
                    y = m.wf_r.height - m.wf_height;
                }
            }
            return { x: x, y: y };
        },
        //添加连线
        addConn () {
              var m=this;
            if (!m.wf_focusObj || !m.isStepObj(m.wf_focusObj)) {
                layer.alert('请选择要连接的步骤', {
                    title: '温馨提示'


                }); return false;
          
            }
            m.wf_option = "line";
            document.body.onmousemove = m.mouseMove;
            document.body.onmousedown = function () {
                for (var i = 0; i < m.tempArrPath.length; i++) {
                    m.tempArrPath[i].arrPath.remove();
                }
                m.tempArrPath = [];
                document.body.onmousemove = null;
            };
        },
         mouseMove: function (ev) {
               var m=this;
            ev = ev || window.event;
            var mousePos = m.mouseCoords(ev);
            m.mouseX = mousePos.x;
            m.mouseY = mousePos.y;
            var obj = { obj1: m.wf_focusObj, obj2: null };
            m.wf_r.drawArr(obj);
        }, mouseCoords: function (ev) {
            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        },
        //连接对象
        connObj: function (obj, addToJSON, title) {
              var m=this;
            if (addToJSON == undefined || addToJSON == null) addToJSON = true;
            if (m.isLine(obj)) {
                var newline = m.wf_r.drawArr(obj);
                m.wf_conns.push(newline);
                if (addToJSON) {
                    var line = {};
                    line.id = obj.id;
                    line.text = title || "";
                    line.from = obj.obj1.id;
                    line.to = obj.obj2.id;
                    line.customMethod = "";
                    line.sql = "";
                    line.noaccordMsg = "";
                    m.addLine(line);
                }
                else {
                    m.setLineText(obj.id, title);
                }
            }
        },//单击事件执行相关操作
        click: function () {
              var m=this;
            var o = this;
            switch (m.wf_option) {
                case "line":
                    var obj = { id: m.getGuid(), obj1: m.wf_focusObj, obj2: o };
                    m.connObj(obj);
                    break;
                default:
                    m.changeStyle(o);
                    break;
            }
            m.wf_option = "";
            m.wf_focusObj = this;
        },//连线单击事件
        connClick: function () {
              var m=this;
            for (var i = 0; i < m.wf_conns.length; i++) {
                if (m.wf_conns[i].arrPath === this) {

                    m.wf_conns[i].arrPath.attr({ "stroke": "#db0f14", "fill": "#db0f14" });
                }
                else {
                    m.wf_conns[i].arrPath.attr({ "stroke": m.wf_connColor, "fill": m.wf_connColor });
                }
            }
            for (var i = 0; i < m.wf_steps.length; i++) {
                m.wf_steps[i].attr("fill", "#efeff0");
                m.wf_steps[i].attr("stroke", "#23508e");
            }

            m.wf_focusObj = this;
        },//判断一个节点与另一个节点之间是否可以连线
        isLine: function (obj) {
              var m=this;
            if (!obj || !obj.obj1 || !obj.obj2) {
                return false;
            }
            if (obj.obj1 === obj.obj2) {
                return false;
            }
            if (!m.isStepObj(obj.obj1) || !m.isStepObj(obj.obj2)) {
                return false;
            }
            for (var i = 0; i < m.wf_conns.length; i++) {
                if (obj.obj1 === obj.obj2 || (m.wf_conns[i].obj1 === obj.obj1 && m.wf_conns[i].obj2 === obj.obj2)) {
                    return false;
                }
            }
            return true;
        },//判断一个对象是否是步骤对象
        isStepObj: function (obj) {
              var m=this;
            return obj && obj.type1 && (obj.type1.toString() == "normal" || obj.type1.toString() == "subflow");
        },//得到XML DOM
        getXmlDoc: function () {
              var m=this;
            var xmlDoc = RoadUI.Core.getXmlDoc();
            xmlDoc.async = false;
            return xmlDoc
        },//得到GUID
   
        changeStyle: function (obj) {
              var m=this;
            if (!obj) {
                return;
            }
            for (var i = 0; i < m.wf_steps.length; i++) {
                if (m.wf_steps[i].id == obj.id) {
                    m.wf_steps[i].attr("fill", m.wf_noteColor);
                    m.wf_steps[i].attr("stroke", "#cc0000");
                }
                else {
                    m.wf_steps[i].attr("fill", m.wf_noteColor);
                    m.wf_steps[i].attr("stroke", m.wf_nodeBorderColor);
                }
            }

            for (var i = 0; i < m.wf_conns.length; i++) {
                if (m.wf_conns[i].arrPath) {
                    m.wf_conns[i].arrPath.attr({ "stroke": m.wf_connColor, "fill": m.wf_connColor });
                }
            }
            //obj.animate({ }, 500);
        },//拖动节点开始时的事件
        dragger: function () {
              var m=this;
            this.ox = this.attr("x");
            this.oy = this.attr("y");
            m.changeStyle(this);
        },
        //拖动事件
        move: function (dx, dy) {
              var m=this;
            var x = this.ox + dx;
            var y = this.oy + dy;

            if (x < 0) {
                x = 0;
            }
            else if (x > m.wf_r.width - m.wf_width) {
                x = m.wf_r.width - m.wf_width;
            }

            if (y < 0) {
                y = 0;
            }
            else if (y > m.wf_r.height - m.wf_height) {
                y = m.wf_r.height - m.wf_height;
            }
            this.attr("x", x);
            this.attr("y", y);
            if (this.id) {
                var text = m.wf_r.getById('text_' + this.id);
                if (text) {
                    text.attr("x", x + 52);
                    text.attr("y", y + 25);
                }
            }
            for (var j = m.wf_conns.length; j--;) {
                if (m.wf_conns[j].obj1.id == this.id || m.wf_conns[j].obj2.id == this.id) {
                    for (var n = 0; n < m.wf_json.lines.length; n++) {
                        if (m.wf_json.lines[n].id == m.wf_conns[j].arrPath.id) {
                            m.setLineText(m.wf_json.lines[n].id, m.wf_json.lines[n].text);
                            break;
                        }
                    }
                    m.wf_r.drawArr(m.wf_conns[j]);
                }
            }
            m.wf_r.safari();
        },//拖动结束后的事件
        up: function () {
              var m=this;
            m.changeStyle(this);
            //记录移动后的位置
            if (m.isStepObj(this)) {
                var bbox = this.getBBox();
                if (bbox) {
                    var steps = m.wf_json.steps;
                    if (steps && steps.length > 0) {
                        for (var i = 0; i < steps.length; i++) {
                            if (steps[i].id == this.id) {
                                steps[i].position = { "x": bbox.x, "y": bbox.y, "width": bbox.width, "height": bbox.height };
                                break;
                            }
                        }
                    }
                }
            }
        }, getStartEnd: function (obj1, obj2) {
              var m=this;
            var bb1 = obj1 ? obj1.getBBox() : null;
            var bb2 = obj2 ? obj2.getBBox() : null;
            var p = [
                { x: bb1.x + bb1.width / 2, y: bb1.y - 1 },
                { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1 },
                { x: bb1.x - 1, y: bb1.y + bb1.height / 2 },
                { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2 },
                bb2 ? { x: bb2.x + bb2.width / 2, y: bb2.y - 1 } : {},
                bb2 ? { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1 } : {},
                bb2 ? { x: bb2.x - 1, y: bb2.y + bb2.height / 2 } : {},
                bb2 ? { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2 } : {}
            ];
            var d = {}, dis = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 4; j < 8; j++) {
                    var dx = Math.abs(p[i].x - p[j].x),
                        dy = Math.abs(p[i].y - p[j].y);
                    if (
                        (i == j - 4) ||
                        (((i != 3 && j != 6) || p[i].x < p[j].x) &&
                            ((i != 2 && j != 7) || p[i].x > p[j].x) &&
                            ((i != 0 && j != 5) || p[i].y > p[j].y) &&
                            ((i != 1 && j != 4) || p[i].y < p[j].y))
                    ) {
                        dis.push(dx + dy);
                        d[dis[dis.length - 1]] = [i, j];
                    }
                }
            }
            if (dis.length == 0) {
                var res = [0, 4];
            } else {
                res = d[Math.min.apply(Math, dis)];
            }
            var result = {};
            result.start = {};
            result.end = {};
            result.start.x = p[res[0]].x;
            result.start.y = p[res[0]].y;
            result.end.x = p[res[1]].x;
            result.end.y = p[res[1]].y;
            return result;
        },

        getArr: function (x1, y1, x2, y2, size) {

            var angle = Raphael.angle(x1, y1, x2, y2);
            var a45 = Raphael.rad(angle - 28);
            var a45m = Raphael.rad(angle + 28);
            var x2a = x2 + Math.cos(a45) * size;
            var y2a = y2 + Math.sin(a45) * size;
            var x2b = x2 + Math.cos(a45m) * size;
            var y2b = y2 + Math.sin(a45m) * size;
            return ["M", x1, y1, "L", x2, y2, "M", x2, y2, "L", x2b, y2b, "L", x2a, y2a, "z"].join(",");
        },
        initwf: function () {
              var m=this;
            m.wf_json = {};
            m.wf_steps = new Array();
            m.wf_texts = new Array();
            m.wf_conns = new Array();
            m.wf_r.clear();
        }, removeArray: function (array, n) {
            if (isNaN(n) || n > array.length) { return false; }
            array.splice(n, 1);
        },//得到一连接的所有表
        getTables: function () {
              var m=this;
            var tables = [];$.ajaxSettings.async = false;
            common.post("/api/workflow/GetTable_SqlServer",{},function(json){
            for (var i = 0; i < json.length; i++) {
                        tables.push(json[i]);
                    }
            })
            $.ajaxSettings.async = true;
            return tables;
        },//得到一个表所有字段
        getFields: function (table) {
              var m=this;
            var fields = [];
            $.ajaxSettings.async = false;
            common.post("/api/workflow/GetFields?table=" + table,{},function(json){
                    for (var i = 0; i < json.length; i++)
                    {
                       fields.push(json[i]);
                    }
            })
            $.ajaxSettings.async = true;
            return fields;
        },//载入当前数据连接的所有表和字段
        initLinks_Tables_Fields: function (databases) {
              var m=this;
            if (!databases || databases.length == 0) {
                return;
            }
            m.links_tables_fields = [];
            for (var i = 0; i < databases.length; i++) {
                var fields = m.getFields(databases[i].table);
                for (var k = 0; k < fields.length; k++) {
                    m. links_tables_fields.push({ link: '', linkName:'', table:'', field: fields[k].f_name, fieldNote: fields[k].value });
                }
            }
        },
        //添加步骤
        addStep1: function (step) {
              var m=this;
            if (!step) return;
            if (!m.wf_json.steps) m.wf_json.steps = [];
            var isup = false;
            for (var i = 0; i < m.wf_json.steps.length; i++) {
                if (m.wf_json.steps[i].id == step.id) {
                    m.wf_json.steps[i] = step;
                    isup = true;
                }
            }
            if (!isup) {
                m.wf_json.steps.push(step);
            }
        },//添加线
        addLine: function (line) {
              var m=this;
            if (!line || !line.from || !line.to) return;
            if (!m.wf_json.lines) m.wf_json.lines = [];
            var isup = false;
            for (var i = 0; i < m.wf_json.lines.length; i++) {
                if (m.wf_json.lines[i].id == line.id) {
                    m.wf_json.lines[i] = line;
                    isup = true;
                }
            }
            if (!isup) {
                m.wf_json.lines.push(line);
            }
            m.setLineText(line.id, line.text);
        },//根据当前JSON重载入流程
     
        deleteStep: function (stepid) {
              var m=this;
            var steps = m.wf_json.steps;
            if (steps && steps.length > 0) {
                for (var i = 0; i < steps.length; i++) {
                    if (steps[i].id == stepid) {
                        m.removeArray(steps, i);
                    }
                }
            }
        },//从json中删除线
        deleteLine: function (lineid, textid) {
              var m=this;
            var lines = m.wf_json.lines;
            if (lines && lines.length > 0) {
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].id == lineid) {
                        m.removeArray(lines, i);
                    }
                }
            }
            if (textid) {
                if (m.wf_texts && m.wf_texts.length > 0) {
                    for (var i = 0; i < m.wf_texts.length; i++) {

                        if (m.wf_texts[i].id == "line_" + textid) {
                            m.wf_texts[i].remove();
                        }
                    }
                }
            }
        },
        //步骤属性设置
        stepSetting: function () {
              var m=this;
            stepSettingid = this.id;
   
            var bbox = this.getBBox();
            //var url = top.rootdir + "/Platform/mDesigner/Set_Step.aspx?appid=" + appid + "&id=" + this.id + "&x=" + bbox.x + "&y=" + bbox.y + "&width=" + bbox.width + "&height=" + bbox.height;
            //dialog.open({ title: "步骤参数设置", width: 700, height: 400, url: url, openerid: iframeid, resize: false });
            _setflowindex = layer.open({
                type: 1, shade: 0.7, title: '步骤参数设置',
                area: ['80%', '80%'],
                content: $('#setstep')[0].innerHTML //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                , success: function (layero) {
                   //设置隐藏的坐标
                    $("#_x").val(bbox.x);
                    $("#_y").val(bbox.y);
                    $("#_width").val(bbox.width);
                    $("#_height").val(bbox.height);
                    setflows();

                }, cancel: function () {
                    //右上角关闭回调
                   // $("#setstep").hide();
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        },//子流程设置
        subflowSetting: function () {
              var m=this;
            var bbox = this.getBBox();
            var url = top.rootdir + "/Platform/mDesigner/Set_SubFlow.aspx?id=" + this.id + "&x=" + bbox.x + "&y=" + bbox.y + "&width=" + bbox.width + "&height=" + bbox.height;
            dialog.open({ title: "子流程步骤参数设置", width: 700, height: 400, url: url, resize: false });
        },
        //流转条件设置
        connSetting: function () {
            var url = top.rootdir + "/Platform/mDesigner/Set_Line.aspx?appid=" + appid + "&id=" + this.id + "&from=" + this.fromid + "&to=" + this.toid;
            dialog.open({ title: "流转条件设置", width: 700, height: 400, url: url, openerid: iframeid, resize: false });
        },
        //流程属性设置
        flowAttrSetting: function (isAdd) {
              var m=this;
            _addindex = layer.open({
                type: 1, shade: 0.7, title: '流程属性设置',
                area: ['80%', '80%'],
                content: $('#flowadd')[0].innerHTML //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                , success: function (layero) {
                    flowadd();

                }, cancel: function () {
                    //右上角关闭回调
                    $("#flowadd").hide();
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });

        },
       
        saveFlow: function (op) {
              var m=this;
            if (!m.wf_json) {
                layer.alert('未设置流程', {
                    title: '温馨提示'


                }); return false;
       
            }
            else if (!m.wf_json.id || $.trim(m.wf_json.id) == "") {
                layer.alert('请先新建或打开流程', {
                    title: '温馨提示'


                }); return false;
            
            }
            else if (!m.wf_json.name || $.trim(m.wf_json.name) == "") {
                layer.alert('流程名称不能为空', {
                    title: '温馨提示'


                }); return false;
              
            }

            if (op == "delete") {
                var iis = layer.confirm('您真的要删除该流程吗', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    var title = "";
                    if (op == "save") title = "保存流程";
                    else if (op == "install") title = "安装流程";
                    else if (op == "uninstall") title = "卸载流程";
                    else if (op == "delete") title = "删除流程";
                    // var url = "flowid=" + wf_json.id + "&op=" + (op || "save");
                    var json = JSON.stringify(m.wf_json);
                    $.ajaxSettings.async = false;
                    common.post('/api/workflow/Save'+ op,{json: json},function(txt){

                                                     if(txt.success){
                                 window.history.back();
                             }else{
                                layer.alert(txt.msg);
                             }
                    },function(error){

                        layer.alert("网络错误");
                    });
                    $.ajaxSettings.async = true;
                    layer.close(iis);
                }, function () {
                    layer.close(iis);
                    return false;
                });
            } else {
                var json = JSON.stringify(m.wf_json);$.ajaxSettings.async = false;
                common.post("/api/workflow/Save",{json: json, op: op },function (txt) {
if(txt.success){
    layer.alert("保存成功!");
    window.location.href = "mList.html";  
}else{
    layer.alert(txt.msg);
}

                })
                $.ajaxSettings.async = true;
            
            }

        }
        ,
        //新建流程
        addFlow: function () {
              var m=this;
            m.flowAttrSetting(1);
        },//另存为
        saveAs: function () {
            if (!m.wf_json || !m.wf_json.id || $.trim(m.wf_json.id) == "") {
                layer.alert('请先新建或打开一个流程', {
                    title: '温馨提示'


                }); return false;
        
            }
            var url = top.rootdir + "/Platform/mDesigner/SaveAs.aspx?appid=" + appid + "&flowid=" + m.wf_json.id;
            dialog.open({ title: "流程另存为", width: 600, height: 230, url: url, openerid: iframeid, resize: false });
        },
         addSubFlow: function () {
            m.addStep(null, null, "子流程步骤", null, null, "subflow", null, null)
        },//复制当前选中步骤
        copyStep: function () {
              var m=this;
            if (m.wf_focusObj === null || !m.isStepObj(m.wf_focusObj)) {
                layer.alert('请选择要复制的步骤', {
                    title: '温馨提示'


                });
                return;
          
            }
            var json = null;
            var text = "";
            var id = m.getGuid();
            if (m.wf_json && m.wf_json.steps) {
                for (var i = 0; i < m.wf_json.steps.length; i++) {
                    if (m.wf_json.steps[i].id == m.wf_focusObj.id) {
                        json = m.wf_json.steps[i];
                        json.id = id;
                        text = json.name;
                        json.name = text;
                        break;
                    }
                }
            }
            m.addStep(undefined, undefined, text, id, false);
        },//设置步骤文本
        setStepText: function (id, txt) {
              var m=this;
            var stepText = m.wf_r.getById("text_" + id);
            if (stepText != null) {
                if (txt.length > 8) {
                    stepText.attr({ "title": txt });
                    txt = txt.substr(0, 7) + "...";
                }
                stepText.attr({ "text": txt });
            }
        },
        setLineText: function (id, txt) {
              var m=this;
            var line;
            for (var i = 0; i < m.wf_conns.length; i++) {
                if (m.wf_conns[i].id == id) {
                    line = m.wf_conns[i];
                    break;
                }
            }
            if (!line) {
                return;
            }
            var bbox = line.arrPath.getBBox();
            var txt_x = (bbox.x + bbox.x2) / 2;
            var txt_y = (bbox.y + bbox.y2) / 2;

            var lineText = m.wf_r.getById("line_" + id);
            if (lineText != null) {
                if (!txt) {
                    lineText.remove();
                }
                else {
                    lineText.attr("x", txt_x);
                    lineText.attr("y", txt_y);
                    lineText.attr("text", txt || "");
                }
                return;
            }

            if (txt) {
                var textObj = m.wf_r.text(txt_x, txt_y, txt);
                textObj.type1 = "line";
                textObj.id = "line_" + id;
                m.wf_texts.push(textObj);
            }
            //line.arrPath.attr("title", txt);
        },
        //删除当前焦点及其附属对象
        removeObj: function () {
              var m=this;
            if (m.wf_focusObj === null) {
                layer.alert('请选择要删除的对象', {
                    title: '温馨提示'


                });
                return false;

            }

            var iis = layer.confirm('您真的要删除选定对象吗', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                if (m.isStepObj(m.wf_focusObj))//如果选中的是步骤
                {
                    if (m.wf_focusObj.id) {
                        for (var i = 0; i < m.wf_texts.length; i++) {
                            if (m.wf_texts[i].id == "text_" + m.wf_focusObj.id) {
                                m.wf_texts.remove(i);
                                var text = m.wf_r.getById("text_" + m.wf_focusObj.id);
                                if (text) text.remove();
                            }
                        }
                    }
                    var deleteConnIndex = new Array();
                    for (var j = 0; j < m.wf_conns.length; j++) {

                        if (m.wf_conns[j].arrPath && (m.wf_conns[j].obj1.id == m.wf_focusObj.id || m.wf_conns[j].obj2.id == m.wf_focusObj.id)) {
                            m.deleteLine(m.wf_conns[j].id, m.wf_conns[j].arrPath.id);
                            deleteConnIndex.push(j);
                            m.wf_conns[j].arrPath.remove();
                        }
                    }
                    for (var m = deleteConnIndex.length; m--;) {
                        m.wf_conns.remove(deleteConnIndex[m]);
                    }
                    deleteConnIndex = new Array();

                    for (var k = 0; k < m.wf_steps.length; k++) {
                        if (m.wf_steps[k].id == m.wf_focusObj.id) {
                            m.wf_steps.remove(k);
                            m.deleteStep(m.wf_focusObj.id);
                        }
                    }
                    m.wf_focusObj.remove();
                    layer.close(iis);
                }
                else//如果选中的是线
                {
                    for (var j = 0; j < m.wf_conns.length; j++) {
                        if (m.wf_conns[j].arrPath && m.wf_conns[j].arrPath.id == m.wf_focusObj.id) {
                            m.deleteLine(m.wf_conns[j].id, m.wf_conns[j].arrPath.id);
                            m.wf_conns.remove(j);
                        }
                    }
                    m.wf_focusObj.remove();
                    layer.close(iis);
                }
            }, function () {
                layer.close(iis);
                return false;
            });

        }
       
    }
}
</script>
<style>

</style>


