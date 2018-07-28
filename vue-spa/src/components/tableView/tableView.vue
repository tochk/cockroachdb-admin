<template>
  <div class="tableView">
    <h5>База данных: {{dbName}}</h5>
    <h5>Таблица: {{tableName}}</h5>
    <div>
      <select class="countSelect" v-model="limit" @change="getTableData()">
        <option value="25" disabled selected>Количество записей на странице</option>
        <option value="25" >25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">Показать все</option>
      </select>
      <label>Materialize Select</label>
    </div>
    <table class="highlight" v-if="error.length === 0">
      <thead>
      <tr>
        <th v-for="title in tableTitles">{{title}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="data in tableData">
        <td v-for="title in tableTitles">{{data[title]}}</td>
      </tr>
      </tbody>
    </table>
    <div class="error" v-else>{{error}}</div>
  </div>

</template>

<script>
  import {SET_CURRENT_DATABASE} from '../../store/actions/databases'
  import {SET_CARRENT_TABLE, TABLE_DATA_REQUEST} from '../../store/actions/tabledata'

  export default {
    name: "tableView",
    props: ['tableName', 'dbName'],
    data() {
      return {
        tableData: [],
        tableTitles: [],
        error: "",
        limit:25,
        offset:0
        // dbName: this.dbName,
        // tableName: this.tableName,
      }
    },
    created() {
      this.getTableData();

    },
    mounted() {
      $(document).ready(function () {
        $('.countSelect').formSelect();
      });
    },
    watch: {
      '$route'() {
        this.getTableData();
      }
    },
    methods: {
      async getTableData() {
        this.$store.commit(SET_CURRENT_DATABASE, this.dbName)
        this.$store.commit(SET_CARRENT_TABLE, this.tableName)
        let payload;
        if (this.limit != "all" ) {
          payload =  {
            'db': this.$store.getters.getCurrentDataBasesName,
            'offset': this.offset,
            'limit': parseInt(this.limit)
          }
        } else {
          payload =  {
            'db': this.$store.getters.getCurrentDataBasesName,
          }
        }
        const err = await this.$store.dispatch(TABLE_DATA_REQUEST, payload)
        if (!(err instanceof Error)) {
          this.tableData = this.$store.getters.getCurrentTableData
          this.tableTitles = Object.keys(this.tableData[0])
          this.error = ''
          //console.log(err)
        } else {
          this.error = "Пустая база"
          // console.log(err)
        }

      },
      // addTitles(){
      //   for (let title in this.tableData[0]) {
      //     this.tableTitles.push(title)
      //   }
      //   console.log(this.tableTitles)
      // }
    }

  }
</script>

<style lang="scss">
  .tableView {
    min-height: 90%;
    min-width: 90%;
    display: block;
    position: relative;
  }
</style>
