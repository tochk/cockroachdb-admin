<template>
  <div class="tableView">
    <h5>Индексы табицы: {{tableName}} из базы данных: {{dbName}}</h5>
    <div>{{index}}</div>
  </div>
</template>

<script>
  import request from '../../utils/request'

  export default {
    name: "showIndex",
    props: ['tableName', 'dbName'],
    data() {
      return {
        index: {}
      }
    },
    watch: {
      '$route'() {
        this.getIndex();
      }
    },
    created() {
      this.getIndex();
    },
    methods: {
      async getIndex() {
        this.index = await request(`api/indexes/`,
          {'token': localStorage.getItem('user-token'), 'database': this.dbName, 'table': this.tableName},
          (res) => {
            return res
          },
          (err) => {
            return err
          }
        );
        console.log(this.index)
      }
    }
  }
</script>

<style scoped>
  .tableView {
    min-height: 90%;
    min-width: 90%;
    display: block;
    position: relative;
  }
</style>
