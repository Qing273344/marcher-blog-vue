<template>
  <div class="blog-admin-content">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class BlogAdminContent extends Vue {

  }
</script>

<style scoped>
  .blog-admin-content {
    position: absolute;
    left: 200px;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
