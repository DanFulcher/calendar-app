<template>
  <div class="field-row">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.field-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
