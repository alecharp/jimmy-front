<template>
  <div class="flex">
    <section class="nav-space" :style="{ width: width(), minWidth: width() }"></section>
    <app-menu :style="{ width: width(), minWidth: width() }" :class="{expended: expended}"/>
    <div id="expansion" class="flex flex-column justify-center" @click="expend()">
      <font-awesome-icon icon="minus" :rotation="90" />
    </div>
    <div class="flex flex-grow-1 flex-column jimmy-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      AppMenu: () => import(/* webpackChunkName: 'App' */ 'components/AppMenu'),
    },
    data: () => ({expended: false}),
    methods: {
      expend: function() { this.expended = !this.expended },
      width: function() { return this.expended ? '280px' : '64px' },
    },
  }
</script>
