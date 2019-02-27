<template>
  <div class="home">

    <BlogHead></BlogHead>
    <!--<router-view></router-view>-->
    <BlogMain></BlogMain>
    <Footer></Footer>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import BlogHead from "@/components/header/BlogHead.vue";
  import BlogMain from '@/components/main/BlogMain.vue';
  import Footer from "@/components/footer/BlogFooter.vue";

  @Component({
    components: {
      BlogHead, BlogMain, Footer,
    },
  })
  export default class Home extends Vue {

  }

</script>


<style scoped lang="scss">

</style>
