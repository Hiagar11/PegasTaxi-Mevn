<template>
  <div class="row p-0 m-0">
    <div class="col-12 p-2 pe-5 bg-info text-end">
      <h4>Изменение пользователей</h4>
    </div>
    <form-users-component
        :user="user"
        @cleanForm="cleanForm"
    >
    </form-users-component>
    <div class="col-4 border p-2 m-2">
      <h5 class="text-center">Список пользователей:</h5>
      <ul class="list-unstyled overflow-scroll" v-if="users.length">
        <li
            v-for="user of users"
            :key="user"
            class="user text-center m-2 p-1"
            @click="selectUser(user)"
        >
          {{user}}
        </li>
      </ul>
      <div class="d-flex justify-content-center" v-else>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import formUsersComponent from "@/components/formUsersComponent";
import {usersFromDb, getUser} from "../../utils/toServer.util";
export default {
  components: {
    formUsersComponent
  },
  data() {
    return {
      users: [],
      user: {}
    }
  },
  name: "adminRedactorDriversComponent",
  methods: {
    async takeUsers() {
      this.users = await usersFromDb();
    },
    async selectUser(name) {
      this.user =await getUser(name)
    },
    cleanForm() {
      this.user = {}
    }
  },
  mounted() {
    this.takeUsers()
  }
}
</script>

<style scoped lang="scss">
.user {
  &:hover {
    background-color: gray;
    cursor: pointer;
  }
}
</style>