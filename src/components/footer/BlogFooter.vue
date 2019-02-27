<template>
  <el-footer>
      <p>BlogFooter</p>
  </el-footer>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ElFooter from 'element-ui/packages/footer/src/main.vue';

  @Component({
    components: {ElFooter}
  })
  export default class Footer extends Vue{

  }
</script>

<style scoped>

</style>
