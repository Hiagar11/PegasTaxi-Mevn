<template>
  <div class="container-fluid">
    <div class="row">
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
  </div>
</template>

<script>
import navigationLinks from "@/components/navigationLinks";
import {setUserToken} from "../../store/user.store";

export default {
  name: "layoutComponent",
  components: {
    navigationLinks,
  },
  data() {
    return{
      selectedComponent: undefined
    }
  },
  methods: {
    logOut() {
      window.localStorage.clear();
      this.$router.push('/login')
      setUserToken("")
    },
    selectComponent(name) {
      this.selectedComponent = name
    }
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
  max-height: 93vh;
}

</style>