<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <el-button
      class="start-button"
      type="primary"
      @click="$router.push('/exercise')">
      开始练习
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .logo {
    width: 200px;
    height: 200px;
    margin-top: 15vh;
  }
  .start-button {
    margin-top: 20px;
  }
}
</style>
