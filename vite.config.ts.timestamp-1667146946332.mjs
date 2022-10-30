// vite.config.ts
import react from "file:///home/localwork/personal/react_nasa_api_rover_photos/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///home/localwork/personal/react_nasa_api_rover_photos/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/home/localwork/personal/react_nasa_api_rover_photos";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "./src") }]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup/tests.ts",
    css: false,
    deps: {
      fallbackCJS: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sb2NhbHdvcmsvcGVyc29uYWwvcmVhY3RfbmFzYV9hcGlfcm92ZXJfcGhvdG9zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9sb2NhbHdvcmsvcGVyc29uYWwvcmVhY3RfbmFzYV9hcGlfcm92ZXJfcGhvdG9zL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2xvY2Fsd29yay9wZXJzb25hbC9yZWFjdF9uYXNhX2FwaV9yb3Zlcl9waG90b3Mvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5cblxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW3sgZmluZDogXCJAXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpIH1dLFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIHNldHVwRmlsZXM6IFwiLi9zcmMvc2V0dXAvdGVzdHMudHNcIixcbiAgICBjc3M6IGZhbHNlLFxuICAgIGRlcHM6IHtcbiAgICAgIGZhbGxiYWNrQ0pTOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFMN0IsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxPQUFPLEVBQUUsQ0FBQztBQUFBLEVBQ3RFO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
