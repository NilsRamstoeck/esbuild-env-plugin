import { readFile } from 'fs/promises';

/**
 * 
 * @returns import('esbuild').Plugin
 */
export const EnvPlugin = () => ({
  name: 'EnvPlugin',
  /**
   * 
   * @param {import('esbuild').PluginBuild} pluginBuild 
   */
  setup: (pluginBuild) => {
    pluginBuild.onLoad({ filter: /.*\.env$/ }, async (options) => {

      const file = await readFile(options.path).then(b => b.toString('utf8'));

      const enviroment = file
        .split(/\r?\n/) //lines
        .filter(s => !/^\s*$/.test(s)) //filter empty lines
        .filter(s => /.*?=.*/.test(s)) //filter invalid lines
        .filter(s => !/^#.*/.test(s)) //filter comments
        .map(line => line.split('=', 2)) //key-value pais
        .reduce((prev, [key, value]) => { prev[key] = value; return prev; }, {});

      const applyToProcessEnv = 'Object.entries(env).forEach(([key, value]) => process.env[key] = value);';

      const result = /*javascript*/`const env = ${JSON.stringify(enviroment)};${pluginBuild.initialOptions.platform == 'node' ? applyToProcessEnv : ''}export default env;`;
      return {
        contents: result
      };
    });

  }
});