<template>
  <div class="blog-admin-main">

    <BlogAdminMenu></BlogAdminMenu>
    <BlogAdminContent></BlogAdminContent>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BlogAdminMenu from '@/views/adminMenu/BlogAdminMenu.vue';
  import BlogAdminContent from '@/views/adminContent/BlogAdminContent.vue';

  @Component({
    components: {
      BlogAdminMenu, BlogAdminContent,
    }
  })
  export default class BlogAdminMain extends Vue {

  }
</script>

<style lang="scss" scoped>
  .blog-admin-main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    bottom: 0;
  }

</style>
