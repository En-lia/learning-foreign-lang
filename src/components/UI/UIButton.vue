<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UIButton',
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>
.button {
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px  solid #f9e7b9;
  background-color: #426072;
  color: #f9e7b9;
  cursor: pointer;
}

</style>
