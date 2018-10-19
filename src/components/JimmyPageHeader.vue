<template>
  <header class="flex items-center padding-4 jimmy-header">
    <h1 v-if="!!title">{{ title }}</h1>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'PageHeader',
    props: {
      title: {required: false, type: String},
    },
  }
</script>
