<template>
  <div class="grey darken-2 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$message(messages[fbError.code] || 'Something went wrong')
    }
  }
}
</script>
