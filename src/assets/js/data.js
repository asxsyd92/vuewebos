export default   { data:[{
    icon: "fa fa-edit",
    name: "输入框",
    id: "1",
    type: "input",
    data: {
        id: "1",
        "col": "layui-col-md12",
        "label": "标题2",
        "type": "text",
        "name": "name2",
        "autocomplete": "off",
        "placeholder": "placeholder",
        "inputclass": "layui-input",
        "disabled": "false",
        "showtext": "false",
        "value": "",
        "data": [],
        "input": []
    }
}, {
    icon: "fa fa-dot-circle-o",
    name: "单选框",
    id: "2",
    type: "radio",
    data: {
        id: "2",
        "col": "layui-col-md12",
        "label": "单选框",
        "type": "radio",
        "name": "name",
        "autocomplete": "off",
        "placeholder": "placeholder",
        "inputclass": "layui-input",
        "value": "",
        "data": "",

        "disabled": "false",
        "showtext": "false",
        "input": [{
            value: "1",
            title: "男",
            checked: true,
            disabled: false
        }, {
            value: "2",
            title: "女",
            checked: false,
            disabled: false
        }

        ],
    }
},
{
    icon: "fa fa-edit",
    name: "复选框",
    id: "3", type: "checkbox",
    data: {
        id: "3",
        "col": "layui-col-md12",
        "label": "复选框",
        "type": "text",
        "name": "name2",
        "autocomplete": "off",
        "placeholder": "placeholder",
        "inputclass": "layui-input",
        "disabled": "false",
        "showtext": "false",
        "required":"false",
        "value": "",
        "data": [],
        "input": [
            {"name":"checkbox1",value:"男"},
            {"name":"checkbox2",value:"女"},
        ]
    }
},
{
    icon: "fa fa-edit",
    name: "文本域",
    id: "4", type: "textarea",
    data: {
        id: "4",
        "col": "layui-col-md12",
        "label": "文本域",
        "type": "text",
        "name": "name2",
        "autocomplete": "off",
        "placeholder": "placeholder",
        "inputclass": "layui-input",
        "disabled": "false",
        "showtext": "false",
        "required":"false",
        "display": "block",
        "value": "",
        "data": [],
        "input": []
    }
}
    ,
{
    icon: "fa fa-edit",
    name: "富文本",
    id: "5", type: "ueditor",
    data: {
        id: "5",
        "col": "layui-col-md12",
        "label": "富文本",
        "type": "text",
        "name": "name2",
        "autocomplete": "off",
        "placeholder": "placeholder",
        "inputclass": "layui-input",
        "disabled": "false",
        "showtext": "false",
        "required":"false",
        "display": "block",
        "value": "",
        "data": [],
        "input": []
    }
},{
    icon: "fa fa-edit",
    name: "下拉选择",
    id: "6", type: "select",
    data: {
        id: "6",
        "col": "layui-col-md12",
        "label": "下拉选择",
        "type": "text",
        "name": "select",
        "autocomplete": "off",
        "placeholder": "{'title':'男',value:'1'},{'title':'测试',value:'2'}",
        "inputclass": "layui-input",
        "disabled": "false",
        "showtext": "false",
        "required":"false",
        "value": "",
        "data": [],
        "input": [
            {"title":"男",value:"1"},
            {"title":"女",value:"2"},
        ]
    }
},
],from:{}
}
