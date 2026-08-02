import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to https://<user>.github.io/<repo>/ set base to '/<repo>/'.
// For a user page (https://<user>.github.io/) leave base as '/'.
export default defineConfig({
  base: '/OCEAN/',
  plugins: [react()],
})
