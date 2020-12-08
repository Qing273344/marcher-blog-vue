/**
 * markdown高亮插件 => Highlight.js
 * 使用Vue自定义指令方式
 *
  * @param markdown高亮插件
 */
import Vue from 'vue';
import Hljs from 'highlight.js';
// import 'highlight.js/styles/googlecode.css';
import 'highlight.js/styles/kimbie.light.css';

const Highlight: any = Vue.directive('highlight', function (el: HTMLElement) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    Hljs.highlightBlock(block);
  });
});

export default Highlight;
