<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="header">
        <p>{{ cap(header) }}</p>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item[itemsKey]" :class="{clickable: !!action}" @click.once="act(item)">
      <td v-for="header in headers" :key="header">
        <p>{{ item[header] }}</p>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import capitalize from 'lodash/capitalize'

  export default {
    name: 'ContentTable',
    props: {
      headers: {required: true, type: Array,},
      items: {required: true, type: Array,},
      itemsKey: {required: false, type: String, default: 'id'},
      action: {required: false, type: Function}
    },
    methods: {
      cap: capitalize,
      act: function(item) {
        if(!!this.action) this.action(item)
      },
    },
  }
</script>
