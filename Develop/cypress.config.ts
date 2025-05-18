import { defineConfig } from "cypress";
import codeCoverageTask from '@cypress/code-coverage/task';
import clientViteConfig from './client/vite.config';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: clientViteConfig,
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    supportFile: 'cypress/support/component.ts',
  },
});
