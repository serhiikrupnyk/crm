<template>
  <div class="app-main-layout">
    <SideBar v-model="toggleShowSidebar" />
    <NavBar @click="toggleShowSidebar = !toggleShowSidebar" />

    <main class="app-content" :class="{full: !toggleShowSidebar}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/app/NavBar";
import SideBar from "@/components/app/SideBar";

export default {
  name: 'MainLayout',
  data: () => ({
    toggleShowSidebar: true
  }),
  components: {SideBar, NavBar}
}
</script>
