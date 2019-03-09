<template>
  <div class="about">
    <h1>This is an about page</h1>
    <i>{{ user.username }}</i>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { State } from "vuex-class";
  import { IUserState } from "@/store/modules/user";

  @Component
  export default class About extends Vue {
    @State private user!: IUserState;

  }
</script>

<style scoped>

</style>
