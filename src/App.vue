<template>
    <div class="main">
      <Enter></Enter>
      <router-view></router-view>
    </div>
</template>

<script>
  import Enter from './components/enter/index'
  export default {
    components: { Enter }
  }
</script>

<style lang="less">
.main{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
