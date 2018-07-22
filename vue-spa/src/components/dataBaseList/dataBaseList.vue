<template>
  <div class="addBD">
    <h5>Базы данных</h5>
    <form class="form-addDB row" @submit.prevent="creteDataBase">
      <div class="input-field col">
        <label for="inputNewDataBaseName">New data base name</label>
        <input v-model="nameNewDatadase" type="text" id="inputNewDataBaseName" class="form-control" required autofocus>
      </div>
      <button class="addbtm btn-floating btn-small col" type="submit">
        <i class="material-icons">add</i>
      </button>
      <br>
      <div class="input-field col " v-if="error.length !== 0">
        <div class="col l12">
           <span class="red-text">
            <strong>{{ error }}</strong>
           </span>
        </div>
      </div>
    </form>

      <table class="highlight">
        <thead>
        <tr>
          <th>Title</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="db in dataBases">
          <td>{{ db }}</td>
          <td><a @click.prevent.once="dropDataBase(db)" class="dropDB">Удалить</a></td>
        </tr>
        </tbody>
      </table>

  </div>
</template>

<script>

  import {DATABASES_CREATE, DROP_DATABASE} from '../../store/actions/databases'

  export default {
    name: "dataBaseList",
    data() {
      return {
        nameNewDatadase: '',
        dataBases: [],
        error: ''
      }
    },
    created() {
      this.getDataBases();
      //$('.addbtm').floatingActionButton();
    },
    methods: {
      async creteDataBase() {
        const err = await this.$store.dispatch(DATABASES_CREATE, this.nameNewDatadase)
        this.error = err.message

      },
      async getDataBases() {

        this.dataBases = this.$store.getters.getDataBasesList.map((item) => {
          return item.database
        });

      },
      async dropDataBase(db){
        const err = await this.$store.dispatch(DROP_DATABASE, db)
        this.error = err.message
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
