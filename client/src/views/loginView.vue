<template>
  <div class="row">
    <div class="col-6 border offset-3 mt-5">
      <form action=""
            class="p-4 d-flex flex-column"
            @submit.prevent="checkAuth"
            :class="{'was-validated': inValid}"
            novalidate
      >

        <div class="input-group">
          <span class="input-group-text w-25">Логин</span>
          <input v-model="login" type="text" class="form-control" name="login" required minlength="4">
          <div class="invalid-feedback">
            Введите логин. Минимум 4 символа.
          </div>
          <div class="valid-feedback">
            Логин есть!
          </div>
        </div>
        <div class="input-group mt-1">
          <span class="input-group-text w-25">Пароль</span>
          <input v-model="password" type="password" class="form-control" name="password" required  minlength="4">
          <div class="invalid-feedback">
            Пожалуйста, введите пароль. Минимум 4 символа.
          </div>
          <div class="valid-feedback">
            Пароль есть!
          </div>
        </div>
        <div class="form-check col-6 mt-2">
          <input class="form-check-input" v-model="save" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Запомнить меня
          </label>
        </div>
        <button type="submit"
              class="btn btn-outline-success ms-auto mt-2"
      >Войти</button>
    </form>
    </div>
  </div>
</template>

<script>
import {findUser} from "../../utils/user.toServer";
import {useTokenStore} from "../../store/token.store";
import {mapStores} from "pinia";

export default {
  name: "loginView",
  data() {
    return {
      password: '',
      login: '',
      save: false,
      inValid: false,
    }
  },
  computed: {
    ...mapStores(useTokenStore)
  },
  methods: {
    async checkAuth() {
      let response = await findUser(this.login, this.password);
      if (response.data.token) {
        let token = response.data.token;
        let user = response.data.user;
        this.tokenStore.setUserToken(token);
        this.tokenStore.setUserData(user);
        if (this.save) {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('userName', JSON.stringify(user));
        }
        this.$router.push('/')
      } else {
        this.inValid = true
      }
    }
  },

}
</script>

<style lang="scss" scoped>
</style>