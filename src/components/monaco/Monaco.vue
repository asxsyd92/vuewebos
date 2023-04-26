<template>
  <div   >
  <div class="monacoMask" :style="{ transform: show ? 'translateX(0)' : 'translateX(100%)' }"
    @click="emits('update:show', false)"></div>
  <div class='monacoContanier' :style="{ transform: show ? 'translateX(0)' : 'translateX(100%)' }">
    <div class="monacoTopBar">
      <div class="title">Monaco Editor</div>
      <div class="btn" @click="submit">
        <lay-icon type="layui-icon-ok" size="15px"></lay-icon>
        <span>提交</span>
      </div>
      <div class="btn" @click="emits('update:show', false)">
        <lay-icon type="layui-icon-close" size="15px" color="red"></lay-icon>
        <span style="color:red">关闭</span>
      </div>
    </div>
    <div ref="monacoRef" class="monacoRef"></div>
  </div>
</div>
</template>
<script lang="ts">
export default {
	name: "Monaco"

}
</script>
<script  lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserTypeScript from 'prettier/parser-typeScript';
import parserBabel from 'prettier/parser-babel';
import parserPostcss from 'prettier/parser-postcss';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  showSubmit: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['update:show', 'update:showSubmit', 'submit']);

const monacoRef = ref();
let editor;
onMounted(() => {
  nextTick(() => {
    import('monaco-themes/themes/Monokai.json')
      .then(data => {
        // @ts-ignore
        monaco.editor.defineTheme('monokai', data);
        monaco.editor.setTheme('monokai');
        editor = monaco.editor.create(monacoRef.value, {
          language: 'typescripte',
          value: `// 从左侧拖入或点选组件进行表单设计'`,
        })
      })
  })
})
onUnmounted(() => {
  editor.dispose()
})


const setValue = (language, val, parser = null) => {
  if (val === '' || val === '[]') {
    return;
  }
  if (!parser) {
    parser = language;
  }
  monaco.editor.setModelLanguage(editor.getModel(), language);

  const code = prettier.format(val, {
    parser: parser,
    plugins: [parserHtml, parserTypeScript, parserBabel, parserPostcss],
    semi: false, // 语句末尾打印分号
    singleQuote: true, // 使用单引号
    vueIndentScriptAndStyle: false, // 是否缩进 Vue 文件中的 script 和 style 标签
    useTabs: true,
    tabWidth: 4
  });
  editor.setValue(code)
  //setTimeout(() => { editor.trigger('anyString', 'editor.action.formatDocument'); }, 100);
}

const submit = () => {
  emits('submit', editor.getValue())
  emits('update:show', false)
  emits('update:showSubmit', false)
}
defineExpose({
  setValue
});
</script>
