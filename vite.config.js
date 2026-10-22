import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Changed from '@vitejs/react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/', 
})
