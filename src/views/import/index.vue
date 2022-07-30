<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
export default {
  methods: {
    onSuccess(content) {
      console.log('content', content)
    }
  }
}
</script>

<style>

</style>
