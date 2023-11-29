# esbuild-env-plugin

A plugin that enables importing .env files. If the build platform is 'node', variables will be added to `process.env`

## Installation

You can install the `esbuild-env-plugin` package using npm or yarn:

```bash
npm install esbuild-env-plugin --save-dev
```

or

```bash
yarn add esbuild-env-plugin --dev
```

## Usage

To use the `esbuild-env-plugin`, follow these steps:

1. Import the plugin at the top of your esbuild configuration file:

```ts
const { EnvPlugin } = require('esbuild-env-plugin'); // OR
import { EnvPlugin } from 'esbuild-env-plugin';
```

1. Add the plugin to your esbuild configuration:

```ts
const buildContext = await context({
  entryPoints: ['./index.ts'],
  plugins: [EnvPlugin()],
  outdir: './dist',
  bundle: true,
  format: 'esm',
  platform: 'node',
  tsconfig: './tsconfig.json',
  logLevel: 'info'
});
```

1. In your code, you can now import .env files as object:

```ts
//Import worker. It is important to include the file ending, otherwise its imported as module not as worker
import env from './example.env';

env.MY_VAR // or if platform is node
process.env.MY_VAR

```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NilsRamstoeck/esbuild-env-plugin/blob/master/LICENSE) file for details.
