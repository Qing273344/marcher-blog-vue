<template>
  <el-header>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <router-link :to="{name:'aboutLink'}">关于</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link :to="{name:'loginLink'}">Login</router-link>
      </el-menu-item>
    </el-menu>

  </el-header>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import ElHeader from 'element-ui/packages/header/src/main.vue';

  @Component({
    components: {
      ElHeader
    }
  })
  export default class BlogHead extends Vue {
    data() {
      return {
        activeIndex: "1",
      };
    }
  }
</script>


<style scoped>

</style>
