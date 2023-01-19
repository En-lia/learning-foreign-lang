<template>
  <button :class="buttonClasses">
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
  computed: {
    buttonClasses() {
      return [
        {
          active: this.active,
          button: true,
        },
      ];
    },
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px  solid #f9e7b9;
  background-color: #426072;
  color: #f9e7b9;
  cursor: pointer;

  &.active {
    background: #024065;
  }
}

</style>
