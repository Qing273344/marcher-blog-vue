<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { UserModule } from "@/store/modules/UserStore";

  @Component ({

  })
  export default class App extends Vue {

    // 初始化 storeModule
    create() {
      UserModule;
    }

  }

</script>


<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  // 去除body默认边距
  body {
    margin: 0;
    padding: 0;
  }
</style>
