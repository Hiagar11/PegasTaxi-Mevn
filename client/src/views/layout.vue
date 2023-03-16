<template>
  <div class="container-fluid">
    <div v-if="isLoadStores" class="row ">
      <aside class="col-3 aside border-end border-dark">
        <router-view name="aside"
                     @selectComponent="selectComponent"
        >
        </router-view>
      </aside>
      <div class="col-9 wrapper">
        <div class="row flex-column">
          <nav class="border-bottom border-dark">
            <navigation-links
                @logOut="logOut"
            >
            </navigation-links>
          </nav>
          <main class="w-100 p-0 m-0">
            <router-view
                name="main"
                :selectedComponent="selectedComponent"
            ></router-view>
          </main>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5" v-else>
      <div class="spinner-grow text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import navigationLinks from "@/components/navigationLinks";
import {useDirectionStore} from "../../store/directions.store";
import {mapStores} from "pinia";
import {useUserStore} from "../../store/users.store";

export default {
  name: "layoutComponent",
  components: {
    navigationLinks,
  },
  data() {
    return{
      selectedComponent: undefined,
      isLoadStores: false,
    }
  },
  computed: {
    ...mapStores(useDirectionStore, useUserStore)
  },
  methods: {
    logOut() {
      window.localStorage.clear();
      this.tokenStore.setUserToken("");
      this.$router.push('/login');
    },
    selectComponent(name) {
      this.selectedComponent = name
    },
    async loadStores() {
      await this.directionStore.loadDirectionsFromDB()
      await this.userStore.loadUsersFromDB()
      return true
    }
  },
  mounted() {
   this.loadStores().then(res => {
     if (res) {
       this.isLoadStores = true;
     }
   })
  }
}
</script>

<style scoped>
.aside, .wrapper {
  min-height: 100vh;
}

nav {
  min-height: 7vh;
}

main {
  min-height: 93vh;
}

</style>