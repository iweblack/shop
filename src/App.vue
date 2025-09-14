<template>
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import axios from 'axios'; // Import axios directly
import { useCookies } from '@vueuse/integrations/useCookies'
import env from "./env"; // Assuming env is still needed for axios baseURL

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const cookies = useCookies();

    onMounted(() => {
      // Ensure axios baseURL is set if not already set globally
      if (!axios.defaults.baseURL) {
        axios.defaults.baseURL = env.baseURL;
      }
      if (!axios.defaults.timeout) {
        axios.defaults.timeout = 10000;
      }

      store.dispatch('saveUserName', cookies.get('username'));
      store.dispatch('saveToken', cookies.get('token'));
      store.dispatch('saveUid', cookies.get('uid'));

      if (store.state.token) {
        axios.get('/carts/').then((res) => {
          store.dispatch('saveCartNums', res.data.total);
        });
      }
    });

    // Methods are not directly in setup, but can be defined if needed for template
    // For this component, no methods are exposed to the template.
  }
}
</script>

<style lang="scss">
@import "assets/scss/reset";
</style>
