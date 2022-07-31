<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
        tag="li"
        v-for="link in links"
        :key="link.url"
        :to="link.url"
        :exact="link.exact"
        active-class="active"
    >
      <a href="#" class="waves-effect waves-green pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "SideBar",
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Account', url: '/', exact: true},
      {title: 'History', url: '/history'},
      {title: 'Planning', url: '/planning'},
      {title: 'New record', url: '/record'},
      {title: 'Categories', url: '/categories'}
    ]
  })
}
</script>
