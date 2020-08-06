<template>
  <div class="timeField">
    <label>{{label}}</label>
    <div class="timeField__fields">
      <input
        :placeholder="this.placeholder"
        type="number"
        max="23"
        :value="this.hour"
        @input="hourChanged"
      />
      <input
        type="number"
        max="59"
        :value="this.minute"
        @input="minChanged"
      />
      <select :value="this.ampm" @input="ampmChanged" >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    label: String,
    placeholder: String,
    val: Object,
  },
  data() {
    return {
      hour: '',
      minute: '00',
      ampm: 'am',
    };
  },
  methods: {
    hourChanged(e) {
      this.hour = e.target.value;
      this.$emit('hourChanged', this.hour);
    },
    minChanged(e) {
      this.minute = e.target.value;
      this.$emit('minChanged', this.minute);
    },
    ampmChanged(e) {
      this.ampm = e.target.value;
      this.$emit('ampmChanged', this.ampm);
    },
  },
};
</script>

<style lang="scss" scoped>
.timeField {
  display: flex;
  flex-direction: column;
  width: 45%;
  &__fields {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    input {
      width: 40%;
      border: none;
      border-bottom: 1px solid #f1f1f1;
      padding: 10px 0;
      outline: none;
      font-size: 18px;
      margin-bottom: 20px;
    }
    select {
      width: 20%;
      appearance: none;
      border:none;
      outline: none;
      border-bottom: 1px solid #f1f1f1;
      padding: 10px 0;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  label {
    font-size: 21px;
  }
}
</style>
