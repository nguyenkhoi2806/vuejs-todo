<script>
import Button from "@/components/Button.vue";

export default {
  name: "Login",
  components: {
    Button,
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
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border py-1.5 text-gray-900" />
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
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border py-1.5 text-gray-900" />
          </div>
        </div>

        <div>
          <Button>Sign in</Button>
        </div>
      </form>
    </div>
  </div>
</template>
