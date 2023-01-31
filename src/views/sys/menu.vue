<template>
  <div>

    <vxe-table show-overflow ref="xTable" :tree-config="{ children: 'children' }" :loading="options.loading"
      :data="options.data" :column-config="{ isCurrent: true, isHover: true }"
      :row-config="{ isCurrent: true, isHover: true }">
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>


        <vxe-form>

          <vxe-form-item>
            <template #default>
              <vxe-button type="a_add" status="primary" content="新增"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>

      </template>

      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="title" title="标题" tree-node></vxe-column>
      <vxe-column field="tag" title="访问地址"></vxe-column>
      <vxe-column field="color" title="颜色"></vxe-column>
      <vxe-column field="icon" title="图标"></vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <vxe-button icon="fa fa fa-pencil fa-fw" title="查看" circle @click="editRowEvent(row)"></vxe-button>
          <vxe-button icon="fa fa-plus-square-o" title="添加" circle @click="addRowEvent(row)"></vxe-button>
          <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
    <vxe-pager perfect @page-change="pageChange" :current-page="options.page.current" :page-size="options.page.limit"
      :total="options.page.total" :page-sizes="[10, 20, 100, 200, 500]"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">

    </vxe-pager>



    <lay-layer move="true" :btn="menubtn" :closeBtn="false" :area="['50%', '80%']" :shadeClose="false" @submit="submit"
      title="新增→修改" v-model="menuvisible">
      <div class="laymodle">
        <lay-form :model="menumodel">
          <lay-form-item label="标题" prop="title">
            <lay-input v-model="menumodel.title"></lay-input>
          </lay-form-item>
          <lay-form-item label="颜色" prop="color">
            <lay-color-picker v-model="menumodel.color"></lay-color-picker>

          </lay-form-item>
          <lay-form-item label="图标" prop="icon">
            <lay-icon-picker v-model="menumodel.icon" type="layui-icon-face-smile" page showSearch></lay-icon-picker>
          </lay-form-item>

          <lay-form-item label="路径" prop="tag">
            <lay-input v-model="menumodel.tag"></lay-input>
          </lay-form-item>
          <lay-form-item label="id" prop="id" style="display:none">
            <lay-input v-model="menumodel.id"></lay-input>
          </lay-form-item>
          <lay-form-item label="父级目录" prop="parentid">
            <lay-select v-model="menumodel.parentid" :items="parentlist"></lay-select>


          </lay-form-item>
          <lay-form-item label="参数" prop="params">
            <lay-input v-model="menumodel.params"></lay-input>
          </lay-form-item>
          <lay-form-item label="菜单类型" prop="type">
            <lay-radio v-model="menumodel.type" name="type" value="0">手机端</lay-radio>
            <lay-radio v-model="menumodel.type" name="type" value="1">电脑端</lay-radio>
          </lay-form-item>

          <lay-form-item label="排序" prop="sort">
            <lay-input-number v-model="menumodel.sort" position="right"></lay-input-number>

          </lay-form-item>

        </lay-form>


      </div>
    </lay-layer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import http from '../../api/http';

import utils from "../../utils/utils";
import { layer } from '@layui/layer-vue'
import { VxeTableInstance, VxeTableListeners, VXETable } from 'vxe-table'
const xGrid = ref<VxeTableInstance>();
const parentlist = ref([]) as any;
const menumodel = ref({
  title: "",
  tag: "",
  id: "",
  icon: "",
  color: "",
  params: "",
  roleid: "",
  extend: "",
  parentid: '',
  sort: 1,
  type: 0
}) as any;
const menuvisible = ref(false);
const options = reactive({
  loading: false,
  page: {
    total: 0,
    limit: 10,
    current: 1,
  },
  toolbarConfig: {
    export: true,
    print: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons'
    }
  },

  data: [],
}) as any;
const changemenuvisible = function () {
  menuvisible.value = !menuvisible.value
}
const pageChange = ({ currentPage, pageSize }: any) => {

  if (options.page) {
    options.page.current = currentPage
    options.page.limit = pageSize
  }
  findList()
}

const edit = function ({ data }: any) {
  changemenuvisible();
  console.log("编辑数据:" + JSON.stringify(data))
}

const removeRowEvent = async (row: any) => {
  const type = await VXETable.modal.confirm('您确定要删除该数据?')
  if (type === 'confirm') {
    http.post("/api/users/delMenu", { data: JSON.stringify(row) }).then(res => {
      if (res.success) {
        layer.msg(res.msg, { icon: 1, time: 1000 });
        findList();
      } else {
        layer.msg(res.msg, { icon: 2, time: 1000 });
      }
    }).catch(resp => {
      layer.msg("网络错误", { icon: 2, time: 1000 });
    });

  }

}
const addRowEvent = (row: any) => {
  menumodel.value.id = "00000000-0000-0000-0000-000000000000";
  menumodel.value.color = "#009688";
  menumodel.value.roleid = row.roleid;
  menumodel.value.parentid = row.id;
  menumodel.value.type = 1 + "";
  menumodel.value.sort = 0;
  menuvisible.value = true;
}
const editRowEvent = (row: any) => {
  menumodel.value.color = "#009688";
  menumodel.value.title = row.title;
  menumodel.value.tag = row.tag;
  menumodel.value.id = row.id;
  menumodel.value.icon = row.icon;
  menumodel.value.type = row.type + "";
  menumodel.value.params = row.params;
  menumodel.value.roleid = row.roleid;
  menumodel.value.parentid = row.parentid;
  menumodel.value.sort = row.sort;
  menuvisible.value = true;
}
const submit = () => {
  console.log(menumodel);
  http.post("/api/users/ddMenu", { data: JSON.stringify(menumodel.value) }).then(res => {
    if (res.success) {
      layer.msg(res.msg, { icon: 1, time: 1000 });
      menuvisible.value = false;
      // findList();

    } else {
      layer.msg(res.msg, { icon: 2, time: 1000 });
    }
  }).catch(resp => {
    layer.msg("网络错误", { icon: 2, time: 1000 });
  });
}

const menubtn = [
  {
    text: "确认",
    callback: () => {
      submit();
    },
  },
  {
    text: "取消",
    callback: () => {
      menuvisible.value = false;
    },
  },
];

const findList = () => {

  var page: any, limt: any;

  page = options.page.current;
  limt = options.page.limit;
  options.loading = true;
  http.post("/api/users/getMenuList", { id: '00000000-0000-0000-0000-000000000000', page: page, limit: limt }).then(res => {
    options.loading = false;

    if (res.success) {

      options.data = res.data;
      parentlist.value = utils.TreeTtoList(res.data, []);
      parentlist.value.push({ label: "根目录", value: '00000000-0000-0000-0000-000000000000' });
      
      parentlist.value.forEach((item: any) => {
        var o = new Object() as any;
        o.label = item.title;
        o.value = item.id;
        parentlist.value.push(o);
      });
      options.page.total = res.count;

    }
  });

}

findList();
</script>