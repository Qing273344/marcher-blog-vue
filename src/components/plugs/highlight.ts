/**
 * markdown高亮插件 => highlight.js
 * 使用Vue自定义指令方式
 *
  * @param markdown高亮插件
 */
import Vue from 'vue'
import Hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';

Vue.directive('highlight', function (el: HTMLElement) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    Hljs.highlightBlock(block);
  });
});

// const highlight = {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function(el: HTMLElement) {
//     // 聚焦元素
//     const blocks = el.querySelectorAll('pre code');
//     blocks.forEach((block: any) => {
//       Hljs.highlightBlock(block);
//     });
//   }
// };
//
// export default highlight;
