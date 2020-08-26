<template>
  <div class="timeField">
    <label>{{label}}</label>
    <div class="timeField__fields">
      <select :value="this.hour" @input="hourChanged" >
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
      </select>
      <select :value="this.minute" @input="minChanged" >
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
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
      hour: this.placeholder,
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
