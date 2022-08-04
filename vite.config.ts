import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [  vue()],
  server: {
    cors: true,
    open: true,
    proxy: {
      '/api': {
          target: 'http://127.0.0.1:89',   //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
}
})



