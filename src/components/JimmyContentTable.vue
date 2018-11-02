<!--
  - Copyright 2018 Jimmy, Adrien Lecharpentier and others
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

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
