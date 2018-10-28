<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="headerField(header)">
        <p>{{ headerLabel(header) }}</p>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item[itemsKey]" :class="{clickable: !!action}" @click.once="act(item)">
      <td v-for="header in headers" :key="headerField(header)">
        <p>{{ item[headerField(header)] }}</p>
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
      itemsKey: {required: false, type: String, default: 'id',},
      action: {required: false, type: Function, default: 'null',}
    },
    methods: {
      headerLabel: header => typeof(header) === 'object' ? header.label : capitalize(header),
      headerField: header => typeof(header) === 'object' ? header.field : header,
      act: function(item) {
        if(!!this.action) this.action(item)
      },
    },
  }
</script>
