<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select v-model="current" ref="select">
            <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>Select a category</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Name</label>
          <span v-if="$v.title.$dirty && !$v.title.required" class="helper-text invalid">Input name</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Limit</label>
          <span v-if="$v.limit.$dirty && !$v.limit.minValue" class="helper-text invalid">Minimum value {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    // eslint-disable-next-line
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Category updated successfully')
        this.$emit('updated', categoryData)
      } catch (e) {
        // eslint-disable-next-line
      }
    }
  },
  watch: {
    current(value) {
      const {title, limit} = this.categories.find(category => category.id === value)
      this.title = title
      this.limit = limit
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  }
}
</script>

<style scoped>

</style>
