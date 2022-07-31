<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.dirty && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">Email field must not be empty</small>
        <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Please enter a valid email</small>
      </div>
      <div class="input-field">
        <input
            @input="passwordInputHandler"
            id="password"
            type="password"
            v-model.trim="password"
            v-on:focus="isFocusedPasswordInput = true"
            v-on:blur="isFocusedPasswordInput = false"
            :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.dirty && !$v.password.minLength) }"
        >
        <label for="password">Password</label>
        <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">Enter password</small>
        <ul v-if="isFocusedPasswordInput || password" class="card-panel collection">
          <li class="collection-item">
            <label>
              <input type="checkbox" class="filled-in" :checked="$v.password.containsUppercase && password" @click.prevent />
              <span>Password contains uppercase characters</span>
            </label>
          </li>
          <li class="collection-item">
            <label>
              <input type="checkbox" class="filled-in" :checked="$v.password.containsLowercase && password" @click.prevent />
              <span>Password contains lowercase characters</span>
            </label>
          </li>
          <li class="collection-item">
            <label>
              <input type="checkbox" class="filled-in" :checked="$v.password.containsNumber && password" @click.prevent />
              <span>Password contains numbers</span>
            </label>
          </li>
          <li class="collection-item">
            <label>
              <input type="checkbox" class="filled-in" :checked="$v.password.containsSpecial && password" @click.prevent />
              <span>Password contains special characters</span>
            </label>
          </li>
          <li class="collection-item">
            <label>
              <input type="checkbox" class="filled-in" :checked="$v.password.minLength && password" @click.prevent />
              <span>The password must be at least 8 characters long</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Sign in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from "vuelidate/lib/validators"

export default {
  name: "SignIn",
  data: () => ({
    email: '',
    password: '',
    isFocusedPasswordInput: false,
    rules: {
      isUppercase: new RegExp('[A-Z]'),
      isLowercase: new RegExp('[a-z]'),
      isNumber: new RegExp('[0-9]'),
      isSpecial: new RegExp('[#?!@$%^&*-]')
    }
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase: function(value) {
        return value ? this.rules.isUppercase.test(value) : true;
      },
      containsLowercase: function(value) {
        return value ? this.rules.isLowercase.test(value) : true;
      },
      containsNumber: function(value) {
        return value ? this.rules.isNumber.test(value) : true;
      },
      containsSpecial: function(value) {
        return value ? this.rules.isSpecial.test(value) : true
      }
    }
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      console.log(formData)

      this.$router.push('/')
    },
    passwordInputHandler() {
      console.log(this.$v.password.containsUppercase)
    },
    readOnlyCheckBox() {
      return false
    }
  }
}
</script>
