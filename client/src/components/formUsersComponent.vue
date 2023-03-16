<template>
  <form action="" class="col-7 border m-2 p-2 d-flex flex-column"
        @submit.prevent="submitUser"
        ref="form"
        autocomplete="off"
  >
    <h4>Добавить пользователя</h4>
    <input class="visually-hidden" type="text" name="id" v-model="form._id">
    <div class="input-group mb-3">
      <span class="input-group-text w-25">Логин</span>
      <input type="text"
             class="form-control"
             v-model="form.login"
             :class="{'error': v$.form.login.$error}"
      >
      <span
          class="col-12 text-danger"
          v-for="error of v$.form.login.$errors"
          :key="error.$uid"
      >
        {{rusMsg[error.$message]}}
      </span>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text w-25">Пароль</span>
      <input
          type="password"
          class="form-control"
          :class="{'error': v$.form.password.$error}"
          v-model="form.password"
      >
      <span
          class="col-12 text-danger"
          v-for="error of v$.form.password.$errors"
          :key="error.$uid"
      >
        {{rusMsg[error.$message]}}
      </span>
       </div>
    <div class="input-group mb-3"
    >
      <span class="input-group-text w-25">Имя</span>
      <input
          type="text"
          class="form-control"
          :class="{'error': v$.form.name.$error}"
          v-model="form.name">
      <span
          class="col-12 text-danger"
          v-for="error of v$.form.name.$errors"
          :key="error.$uid"
      >
        {{rusMsg[error.$message]}}
      </span>
    </div>
    <fieldset>
      <legend>Выберите его роль</legend>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               value="driver"
               id="driver"
               :class="{'error': v$.form.role.$error}"
               v-model="form.role">
        <label class="form-check-label" for="driver">
          driver
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input"
               type="radio"
               value="admin"
               :class="{'error': v$.form.role.$error}"
               id="admin"
               v-model="form.role"
        >
        <label class="form-check-label" for="admin">
          admin
        </label>
      </div>
    </fieldset>
    <span
        class="col-12 text-danger"
        v-for="error of v$.form.role.$errors"
        :key="error.$uid"
    >
        {{rusMsg[error.$message]}}
      </span>
    <div class="col ms-auto">
      <span class="me-2 text-danger">{{this.response}}</span>
      <button class="btn btn-outline-danger me-2"
              type="button"
              @click="clean"
      >
        Очистить
      </button>
      <button class="btn btn-primary"
              type="submit"
              v-if="this.form._id === undefined"
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
import { required, minLength, maxLength } from '@vuelidate/validators'
import {nextTick} from "vue";
import {mapStores} from "pinia";
import {useUserStore} from "../../store/users.store";
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
        _id: undefined,
        name: '',
        login: '',
        password: '',
        role: '',
        geo: '',
      },
      response: '',
      rusMsg: {
        'Value is required': "Поле является обязательным",
        'This field should be at least 5 characters long': 'Минимум 5 символов',
        'The maximum length allowed is 20': "Максимум 20 символов",
        'This field should be at least 2 characters long': 'Минимум 2 символов'
      }
    }
  },
  validations() {
    return {
      form: {
        _id: {},
        name: {required, $autoDirty: true, minLength: minLength(2), maxLength: maxLength(20)},
        login: {required, $autoDirty: true, minLength: minLength(2), maxLength: maxLength(20)},
        password: {required, minLength: minLength(5),$autoDirty: true, maxLength: maxLength(20)},
        role: {required, $autoDirty: true},
        geo: {},
      }
    }
  },
  methods: {
    async submitUser() {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const response = await this.userStore.addUsersToStore(this.form, this.method);
        alert(response)
        this.clean()
      }
    },
    clean() {
      this.$emit('cleanForm');
      this.response = ''

      nextTick(() => {
        this.v$.$reset()
      })

    }
  },
  computed: {
    ...mapStores(useUserStore),
    method() {
      return this.form._id === undefined ? 'post' : 'put'
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