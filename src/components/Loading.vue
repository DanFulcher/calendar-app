<template>
  <svg class="loading-spinner">
    <circle
      :cx="circlePositions[index] && circlePositions[index].x"
      :cy="circlePositions[index] && circlePositions[index].y"
      :r="item.radius"
      fill="#fff"
      :opacity="item.opacity"
      v-for="(item, index) in circles"
      :key="index"/>
  </svg>
</template>

<script>
const CENTER_X = 15;
const CENTER_Y = 15;
const RADIUS = 7;

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function positionOnCircle(radius, angle, center) {
  return {
    x: center.x + (radius * Math.cos(toRadians(angle))),
    y: center.y + (radius * Math.sin(toRadians(angle))),
  };
}

function calculatePositions(component) {
  const angleIncrement = 360 / component.circles.length;
  const positions = {};
  component.circles.forEach((circle, index) => {
    positions[index] = positionOnCircle(
      RADIUS,
      angleIncrement * index,
      { x: CENTER_X, y: CENTER_Y },
    );
  });
  return positions;
}

export default {
  data() {
    return {
      circles: [
        { opacity: 1, radius: 0 },
        { opacity: 0.9, radius: 0 },
        { opacity: 0.8, radius: 0 },
        { opacity: 0.7, radius: 0 },
        { opacity: 0.6, radius: 0 },
        { opacity: 0.5, radius: 0 },
        { opacity: 0.4, radius: 0 },
        { opacity: 0.3, radius: 0 },
        { opacity: 0.2, radius: 0 },
      ],
      counter: 0,
      interval: null,
    };
  },
  computed: {
    circlePositions: calculatePositions,
  },
  created() {
    this.interval = setInterval(() => {
      this.counter += 1;
      this.circles = this.circles.map((item, index) => ({
        ...item,
        radius: (this.counter + index) % 4,
      }));
    }, 100);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
.loading-spinner {
  width: 30px;
  height: 30px;
}
</style>
