
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
  
import jsconfigPaths from 'vite-jsconfig-paths'
import { qrcode } from 'vite-plugin-qrcode';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), qrcode()],
  server: {
    port: 4000
  }
})
 