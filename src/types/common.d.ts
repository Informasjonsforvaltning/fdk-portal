export type Actions<T extends { [key: string]: (...args: any) => any }> = {
  [K in keyof T]: ReturnType<T[K]>;
}[keyof T];
