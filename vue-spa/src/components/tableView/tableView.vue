<template>
  <div class="tableView">
    <h5>База данных: {{dbName}}</h5>
    <h5>Таблица: {{tableName}}</h5>
    <router-link
      :key=""
      :to="{name: 'showIndex', params: {tableName: tableName, dbName:dbName}}"
      class="link">
      get index
    </router-link>
    <a>get schema</a><br>
    <a>custom query</a><br>
    <div>
      <select class="countSelect" v-model="limit" @change="getTableData()">
        <option value="25" disabled selected>Количество записей на странице</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">Показать все</option>
      </select>
      <label>Materialize Select</label>
      <ul class="pagination" v-if="limit != 'all' && limit <= count">
        <li :class="(offset === 0) ? 'disabled' : 'paginate-item'">
          <a @click="()=>{if (offset !== 0) {offset-=parseInt(limit); getTableData();}}">
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        <li :class="offset === 0 ? 'active' : 'paginate-item'" v-if="(offset/limit)<1">
          <a @click="offset=0; getTableData()">1</a>
        </li>
        <li :class="offset === i*limit ? 'active' : 'paginate-item'"
            v-for="i in parseInt((count-limit)/limit) + 1" v-if="i > (offset/limit) - 1  && i < (offset/limit) + 6">
          <a @click="offset=i*limit; getTableData()" v-if="limit < count">{{i+1}}</a>
        </li>
        <li :class="((count - offset ) < limit) ? 'disabled' : 'paginate-item'">
          <a @click="() => {if ((count - offset ) > limit) {offset+=parseInt(limit); getTableData()}} ">
            <i class="material-icons">chevron_right</i>
          </a></li>
      </ul>
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
        count: '',
        limit: 25,
        offset: 0
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
        if (this.limit != "all") {
          payload = {
            'db': this.$store.getters.getCurrentDataBasesName,
            'offset': this.offset,
            'limit': parseInt(this.limit)
          }
        } else {
          payload = {
            'db': this.$store.getters.getCurrentDataBasesName,
          }
        }
        const err = await this.$store.dispatch(TABLE_DATA_REQUEST, payload)
        this.count = err.count
        if (!(err instanceof Error) && err.count !== 0) {
          this.tableData = this.$store.getters.getCurrentTableData
          this.tableTitles = Object.keys(this.tableData[0])
          this.error = ''
        } else {
          this.error = "Пустая таблица"
        }

      },
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

  .paginate-item {
    cursor: pointer;
  }
</style>
