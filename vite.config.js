import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:                    resolve(__dirname, 'index.html'),
        services:                resolve(__dirname, 'services/index.html'),
        'security-measures':     resolve(__dirname, '7-security-measures/index.html'),
        'fl-statutes':           resolve(__dirname, 'fl-statutes/index.html'),
        'implementing-cpted':    resolve(__dirname, 'implementing-cpted/index.html'),
        'about-us':              resolve(__dirname, 'about-us/index.html'),
        'contact-us':            resolve(__dirname, 'contact-us/index.html'),
      }
    }
  }
})
