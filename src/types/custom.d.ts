// In custom.d.ts or another .d.ts file
declare module '*.xlsx' {
  const content: any;
  export default content;
}
