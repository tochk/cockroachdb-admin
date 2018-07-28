<template>
  <div class="addBD">
    <h5>{{name}}</h5>
    <table class="highlight">
      <thead>
      <tr>
        <th>Title</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tl in tablesList">
        <td>
          <router-link
            :key="tl"
            :to="{name: 'tableView', params: {tableName: tl, dbName:name}}"
            class="link">
            {{ tl }}
          </router-link>
        </td>
        <td><a class="dropDB">
          <!--@click="removeTable(tl)"-->
          Удалить</a></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

  import {TABLES_REQUEST, SET_CURRENT_DATABASE, TABLE_DROP} from '../../store/actions/databases'

  export default {
    name: "tablesList",
    props: {
      db: {
        type: Object,
        default: function () {
          return {
            name: "",
            tables: []
          }
        }
      }
    },
    watch: {
      '$route'() {
        this.getTables();
      }
    },
    data() {
      return {
        name: document.location.pathname.substr(4),
        tablesList: this.db.tables,
        error: ''
      }
    },
    created() {
      this.getTables();
      //$('.addbtm').floatingActionButton();
    },
    methods: {
      async getTables() {
        this.name = document.location.pathname.substr(4)
        this.$store.commit(SET_CURRENT_DATABASE, document.location.pathname.substr(4))
        const err = await this.$store.dispatch(TABLES_REQUEST)
        this.tablesList = this.$store.getters.getCurrentDataBasesTableList
      },
      async removeTable(tableName) {
        this.name = document.location.pathname.substr(4)
        this.$store.commit(SET_CURRENT_DATABASE, document.location.pathname.substr(4))
        const err = await this.$store.dispatch(TABLE_DROP, tableName)
        this.tablesList = this.$store.getters.getCurrentDataBasesTableList
      },
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

  .dropDB {
    cursor: pointer;
  }
</style>
