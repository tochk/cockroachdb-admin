<template>
  <div class="addBD">
    <h5>{{db.name}}</h5>
    <table class="highlight">
      <thead>
      <tr>
        <th>Title</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tl in db.tables">
        <td>{{ tl }}</td>
        <td><a  class="dropDB">Удалить</a></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

  import {TABLES_REQUEST, SET_CURRENT_DATABASE, DATABASES_CREATE, DROP_DATABASE} from '../../store/actions/databases'

  export default {
    name: "tablesList",
    props:["db"],
    data() {
      return {

        error: ''
      }
    },
    created() {
      this.getTables();
      //$('.addbtm').floatingActionButton();
    },
    methods: {
      async getTables() {
      },
      getTablses() {

      }
    },
  }
</script>

<style lang="scss">
  .addBD {
    min-height: 90%;
    min-width: 90%;
    display: block;
    position: relative;
    top: 65px;
    .form-addDB {
      float: left;
      .addbtm {
        margin-top: 20px;
        padding: 0;
      }
    }
  }
  .dropDB{
    cursor: pointer;
  }
</style>
