<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <PreLoader v-if="loading" />
    <p v-else-if="!categories.length" class="center">You have not created any category. <router-link to="/categories">Add category.</router-link></p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
          >{{ category.title }}</option>
        </select>
        <label>Select a category</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Amount</label>
        <span v-if="$v.amount.$dirty && !$v.amount.minValue" class="helper-text invalid">Minimum value {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Description</label>
        <span v-if="$v.description.$dirty && !$v.description.required" class="helper-text invalid">Input description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: "UserRecord",
  data: () => ({
    categories: [],
    category: null,
    loading: true,
    select: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      // eslint-disable-next-line
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy
    }
  }
}
</script>
