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
      <ul class="list-unstyled overflow-auto" v-if="users.length">
        <li
            v-for="user of users"
            :key="user"
            class="user d-flex align-items-center justify-content-center m-2 p-1"
            @click="selectUser(user.name)"
        >
          <span class="ms-3">
            <account-cowboy-hat-outline v-if="user.geo" :style="{color:getColor(user.geo), opacity: 0.5}" />
          </span>
          <span class="ms-2">
            {{ user.name }}
          </span>
          <button class="ms-auto me-3 btn"
                  @click.stop="deleteUser(user._id)"
          >
            <account-remove style="color: darkred"/>
          </button>
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
import AccountRemove from 'vue-material-design-icons/AccountRemove'
import {mapStores} from "pinia";
import {useUserStore} from "../../store/users.store";
import {useDirectionStore} from "../../store/directions.store";
import AccountCowboyHatOutline from 'vue-material-design-icons/AccountCowboyHatOutline'

export default {
  components: {
    formUsersComponent,
    AccountRemove,
    AccountCowboyHatOutline
  },
  data() {
    return {
      users: [],
      user: {}
    }
  },
  name: "adminRedactorDriversComponent",
  computed: {
    ...mapStores(useUserStore, useDirectionStore)
  },
  methods: {
    takeUsers() {
      this.users = this.userStore.getUsers;
    },
    selectUser(name) {
      this.user = this.userStore.getUser(name)[0];
    },
    cleanForm() {
      this.user = {}
    },
    async deleteUser(_id) {
      if (confirm('Вы уверены, что хотите удалить пользователя?')) {
        const res = await this.userStore.deleteUsersToStore(_id)
        alert(res.msg)
      }
    },
    getColor(_id) {
      return this.directionStore.getColorByIdDirection(_id);
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
    background-color: rgba(1,1,1,0.1);
    cursor: pointer;
  }
}
</style>