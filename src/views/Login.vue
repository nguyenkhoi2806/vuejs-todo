<script>
import Button from "@/components/Button.vue";

export default {
  name: "Login",
  components: {
    Button,
  },
  data() {
    return {
      username: "",
      password: "",
      error: null,
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;

      if (!this.username || !this.password) {
        this.error = "Please enter both username and password.";
        return;
      }

      this.loading = true;

      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.status === 401) {
          const errorText = await response.text();
          throw new Error(errorText || "Invalid username or password.");
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Login failed");
        }

        const data = await response.json();
        this.$router.push({ name: "home" });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div class="mt-2">
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="block w-full rounded-md border py-1.5 text-gray-900 px-2" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border py-1.5 text-gray-900 px-2" />
          </div>
        </div>

        <div>
          <Button :disabled="loading">Sign in</Button>
        </div>

        <div v-if="error" class="mt-2 text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>
