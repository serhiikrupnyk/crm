<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <PreLoader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
            v-if="categories.length"
            :key="categories.length + updateCount"
            :categories="categories"
            @updated="updateCategory"
        />
        <p v-else class="center">You have not created any category</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "UserCategories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  components: {CategoryEdit, CategoryCreate}
}
</script>

