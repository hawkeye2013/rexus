<template>
  <div class="h-full flex overflow-y-none">
    <LeftNav />
    <slot />
  </div>
</template>

<script>
import LeftNav from '@/components/Nav/LeftNav.vue';

export default {
  name: 'Layout',
  components: {
    LeftNav,
  },
};
</script>

<style></style>
