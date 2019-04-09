<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo">
      <img src="@/assets/img/logo.png" width="140" alt="">
    </div>
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  data() {
    return {
    }
  },
  created() {
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style  lang="scss" scoped>
  .hideSidebar .logo img {
    margin-left: 6px;
  }
  .logo {
    background-color: rgb(48, 65, 86);
    text-align: center;
    img {
      margin: 20px auto;
      display: inline-block;
    }
  }
</style>
