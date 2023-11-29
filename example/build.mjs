import { EnvPlugin } from '../EnvPlugin.mjs';
import { context } from 'esbuild';

const WATCH = process.argv.includes('--watch');

const buildContext = await context({
  entryPoints: ['./index.ts'],
  plugins: [EnvPlugin()],
  outdir: './dist',
  bundle: true,
  minify: !!WATCH,
  format: 'esm',
  platform: 'node',
  define: WATCH ? undefined : {
    'process.env.NODE_ENV': "'production'",
  },
  tsconfig: '../tsconfig.json',
  logLevel: 'info'
});

buildContext.rebuild();

if (WATCH) {
  buildContext.watch();
}
else buildContext.dispose();
