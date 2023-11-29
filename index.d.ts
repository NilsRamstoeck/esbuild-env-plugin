declare module 'esbuild-env-plugin' {
  export const EnvPlugin: () => import('esbuild').Plugin;
}