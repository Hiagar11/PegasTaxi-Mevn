<template>
  <form action="" class="col-7 border m-2 p-2 d-flex flex-column"
        @submit.prevent="sendUserToServer"
        ref="form"
  >
    <h4>Добавить пользователя</h4>
    <input class="visually-hidden" type="text" name="id" v-model="form._id">
    <div class="input-group mb-3">
      <span class="input-group-text w-25">Логин</span>
      <input type="text"
             class="form-control"
             v-model="form.login"
      >
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text w-25">Пароль</span>
      <input
          type="text"
          class="form-control"
          v-model="form.password"
      >
    </div>
    <div class="input-group mb-3"
    >
      <span class="input-group-text w-25">Имя</span>
      <input
          type="text"
          class="form-control"
          :class="{'error': v$.form.name.$error}"
          v-model="form.name">
      <span class="errorMsg" v-if="v$.form.name.$error">{{ v$.form.name.required.$message }}</span>
    </div>
    <fieldset>
      <legend>Выберите его роль</legend>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               value="driver"
               id="driver"
               v-model="form.role">
        <label class="form-check-label" for="driver">
          driver
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               value="admin"
               id="admin"
               v-model="form.role"
        >
        <label class="form-check-label" for="admin">
          admin
        </label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Выберите его местоположение</legend>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               id="donetsk"
               value="donetsk"
               v-model="form.geo">
        <label class="form-check-label" for="donetsk">
          Донецкий
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               id="rostov"
               value="rostov"
               v-model="form.geo">
        <label class="form-check-label" for="rostov">
          Ростовский
        </label>
      </div>
    </fieldset>

    <div class="col-4 ms-auto">
      <button class="btn btn-outline-danger me-2"
              type="button"
              @click="clean"
      >
        Очистить
      </button>
      <button class="btn btn-primary"
              type="submit"
              v-if="!Object.keys(this.user).length"
      >
        Добавить
      </button>
      <button class="btn btn-success"
              type="submit"
              v-else
      >
        Изменить
      </button>
    </div>

  </form>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {setUser} from "../../utils/toServer.util";
import {nextTick} from "vue";
export default {
  name: "formUsersComponent",
  setup() {
    return {
      v$:useVuelidate()
    }
  },
  props: {
    user: {
      type: Object,
    }
  },
  data() {
    return {
      form: {
        _id: '',
        name: '',
        login: '',
        password: '',
        role: '',
        geo: '',
      }
    }
  },
  validations() {
    return {
      form: {
        _id: {},
        name: {required, $autoDirty: true},
        login: {},
        password: {},
        role: {},
        geo: {},
      }
    }
  },
  methods: {
    async sendUserToServer() {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        let response = await setUser(this.form);
        console.log(response)
      }
    },
    clean() {
      this.$emit('cleanForm');
      nextTick(() => {
        this.v$.$reset()
      })

    }
  },
  watch: {
    user(v) {
     this.form = v
    }
  }
}
</script>

<style scoped>
.errorMsg {
  display: flex;
  width: 100%;
  color: red;
  font-size: 16px;
  padding-left: 1em;
}
.error {
  background-color: rgba(200,0,0,0.1);
}
</style>