<template>
  <div>
    <div class="page-title">
      <h3>Recording history</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <PreLoader v-if="loading" />
    <p v-else-if="!records.length" class="center">You have not created any record. <router-link to="/record">Add record.</router-link></p>
    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "UserHistory",
  data: () => ({
    loading: true,
    categories: [],
    records: []
  }),
  async mounted() {
    //this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome'
      }
    })

    this.loading = false
  },
  components: {HistoryTable}
}
</script>
