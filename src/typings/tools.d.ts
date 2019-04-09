/**
 * 引入部分第三方库的时候需要额外声明文件
 *
 * 栗子: 比如说我想引入mavon-editor,虽然已经在本地安装，
 * 但是typescript还是提示找不到模块。原因是typescript是从node_modules/@types目录下去找模块声明，
 * 有些库并没有提供typescript的声明文件，所以就需要自己去添加
 */
declare module 'mavon-editor/src/mavon-editor.vue' {
  export const mavonEditor: any;
}

declare module 'mavon-editor';
