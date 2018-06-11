<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      canvas: null
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
  },
  methods: {
    getContext() {
      return this.context
    },
    onResize(){
      if(this.canvas == null) return
      this.canvas.width = this.canvas.parentElement.clientWidth
      this.canvas.height = this.canvas.parentElement.clientHeight
      this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>

<style>

</style>
