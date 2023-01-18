<template>
  <div>
    <LessonCard/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LessonCard from '@/components/LessonСard.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    LessonCard,
  },
  computed: {
    currentLanguage() {
      return 'english';
    },
  },
});
</script>

<style lang="scss">

</style>
