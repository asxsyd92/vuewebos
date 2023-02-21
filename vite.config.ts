import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { LayuiVueResolver } from "unplugin-layui-vue-resolver";

const excludeComponents = ['LightIcon','DarkIcon']

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [
        LayuiVueResolver(),
      ],
    }),
  
    
  
    Components({
      resolvers: [
        LayuiVueResolver({
          resolveIcons: true,
          exclude: excludeComponents
        }),
      ],
    }),
    vue(),
  ],
  server: {
    cors: true,
    open: true,
    host: '0.0.0.0',
    port: 8991,
    proxy: {
      '/v1/api': {
          target: 'http://127.0.0.1:89',   //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, 'api')
      },
      '/asxsyd92upload': {
        target: 'http://asxsyd92.com',   //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
    }
    }
}
});