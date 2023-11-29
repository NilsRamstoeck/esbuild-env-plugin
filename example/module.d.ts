//This is to give us correct typings when using the plugin and importing a file

declare module '*.env' {
  const content: Record<string, string>;
  export default content;
}
