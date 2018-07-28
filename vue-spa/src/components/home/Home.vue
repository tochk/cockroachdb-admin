<template lang="html">
  <div>
    <header>
      <navBar></navBar>
    </header>
    <main>
      <aside class="sidebar">
        <router-link :to="{name: 'dataBaseList'}">Добавить базу</router-link>
        <ul class="dblist">
          <li v-for="(db, index) in dataBases">
            <div class="name">
              <div @click.prevent.once="getTablses(db.name, index)"
                   @click.prevent='() => {
                   if (db.showed) db.showed = false
                   else db.showed = true
                   }'
                   class="slist">
                <i class="large material-icons">{{db.showed ? 'remove' : 'add_box'}}</i>
              </div>
              <router-link
                :key="db.name"
                :to="{ name: 'tableList', params: { dbName: db.name, db:db } }"
                class="link"> {{ db.name }}
              </router-link>
            </div>
            <ul class="table-lists" v-if="db.showed">
              <li v-for="table in db.tables" >
                <router-link
                  :key="table"
                  :to="{name: 'tableView', params: {tableName: table, dbName:db.name }}"
                  class="link">
                {{ table }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <!--<router-link-->
        <!--v-for="post in posts"-->
        <!--active-class="is-active"-->
        <!--class="link"-->
        <!--:key="post.id"-->
        <!--:to="{ name: 'post', params: { id: post.id } }">-->
        <!--{{post.id}}. {{post.title}}-->
        <!--</router-link>-->

      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import NavBar from '../navigation/navBar.vue'
  import {TABLES_REQUEST, SET_CURRENT_DATABASE} from '../../store/actions/databases'
  import Vue from 'vue'


  export default {
    data() {
      return {
        nameNewDatadase: '',
        dataBases: [{'name': '', 'tables': [], 'showed': false}],
        tables: [],
        statusNewDBFirm: false,
      }
    },
    created() {
      this.getDataBases();
    },
    methods: {
      async getDataBases() {
        this.dataBases = this.$store.getters.getDataBasesList.map((item) => {
          return {'name': item.database, 'tables': [], 'showed': false}
        });
        // console.log(typeof this.dataBases)
      },
      async getTablses(e, index) {
        this.$store.commit(SET_CURRENT_DATABASE, e.trim())
        // console.log(this.$store.getters.getCurrentDataBasesName)
        const err = await this.$store.dispatch(TABLES_REQUEST)
        const newDBList = {'name': e.trim(), 'tables': this.$store.getters.getCurrentDataBasesTableList, 'showed': true}
        Vue.set(this.dataBases, index, newDBList)


      }
    },
    components: {NavBar},
  }
</script>

<style lang="scss">
  .content{
    overflow: scroll;
  }
  .greeting {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  .dblist {
    .slist {
      display: inline-block;
      cursor: pointer;
      i {
        font-size: 25px;
      }
    }
    li{
      display: block;
    }

    .link {
      display: inline-block;
      cursor: pointer;
      vertical-align: top;
      margin-left: 10px;
      font-size: 20px;
      line-height: 25px;
    }
    .table-lists li {
      display: block;
      position: relative;
    }
  }
</style>
