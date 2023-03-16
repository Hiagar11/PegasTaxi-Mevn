<template>
    <ul class="nav my-1 ">
      <li class="nav-item me-auto rounded-2">
        <h5><i>Добро пожаловать, {{ user.name }} </i><b></b></h5>
      </li>
      <li class="nav-item ms-auto rounded-2">
        <router-link exact-active-class="active" class="nav-link btn btn-outline-secondary mx-1" to="/" exact>
          <car-info></car-info>
          Поездки
        </router-link>
      </li>
      <li class="nav-item rounded-2">
        <router-link exact-active-class="active" class="nav-link btn btn-outline-secondary mx-1" to="/admin" exact>
          <head-cog></head-cog>
          Админ
        </router-link>
      </li>
      <li class="nav-item rounded-2">
          <button class="nav-link btn btn-outline-secondary mx-1"
                  @click="$emit('logOut')"
          >
            <account-arrow-right-outline></account-arrow-right-outline>
            Выйти
          </button>
      </li>
    </ul>
</template>

<script>
import CarInfo from 'vue-material-design-icons/CarInfo'
import HeadCog from 'vue-material-design-icons/HeadCog'


import AccountArrowRightOutline from 'vue-material-design-icons/AccountArrowRightOutline'
import {mapStores} from "pinia";
import {useTokenStore} from "../../store/token.store";

export default {
  name: "TheHeader",
  components: {
    CarInfo,
    HeadCog,
    AccountArrowRightOutline
  },
  computed: {
    ...mapStores(useTokenStore),
    user() {
      return this.tokenStore.user
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>