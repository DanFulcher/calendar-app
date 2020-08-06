<template>
  <div class="field">
    <label>{{label}}:</label>
    <input :placeholder="placeholder" :value="this.val" @input="onChange" />
    <p v-if="this.showError" class="error">{{this.errorMessage}}</p>
  </div>
</template>

<script>

export default {
  props: {
    label: String,
    placeholder: String,
    val: String,
    valChanged: Function,
    showError: Boolean,
    errorMessage: String,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onChange(event) {
      this.value = event.target.value;
      this.$emit('valChanged', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  label {
    font-size: 21px;
  }
  input {
    border: none;
    border-bottom: 1px solid #f1f1f1;
    padding: 10px 0;
    outline: none;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .error {
    font-size: 12px;
    color: #ff1111;
    margin-top: -10px;
  }
}
</style>
