/**
 * 引入部分第三方库的时候需要额外声明文件
 *
 * 栗子: 比如说我想引入mavon-editor,虽然已经在本地安装，
 * 但是 typescript 还是提示找不到模块。原因是 typescript 是从 node_modules/@types 目录下去找模块声明，
 * 有些库并没有提供 typescript 的声明文件，所以就需要自己去添加
 */
declare module 'mavon-editor/src/mavon-editor.vue' {
  export const mavonEditor: any;
}

declare module 'mavon-editor';
