<template>
  <div class="row m-0">
    <div class="row m-0 bg-info text-end">
      <h4 class="px-5 py-2">Создание направления</h4>
    </div>
    <div class="row m-0 border">
      <form action="" @submit.prevent="submit">
        <input type="text" class="visually-hidden" v-model="form._id">
        <input type="text" v-model="form._id" class="visually-hidden">
        <div class="row m-0 my-3 align-items-center">
          <div class="col-3 ">
            <div class="input-group align-items-center">
              <label class="input-group-text p-1">Выберите цвет</label>
              <input type="color" class="form-control" v-model="form.color">
              <span
                  class="text-danger col-12"
                  v-for="error of v$.form.color.$errors"
                  :key="error.$uid"
              >
                  {{ rusMsg[error.$message] }}
                </span>
            </div>
          </div>
          <div class="col-5 ">
            <div class="input-group align-items-center">
              <label class="input-group-text">Название поездки</label>
              <input type="text" class="form-control" placeholder="Введите название" v-model="form.title">
              <span
                  class="text-danger col-12"
                  v-for="error of v$.form.title.$errors"
                  :key="error.$uid"
              >
                  {{ rusMsg[error.$message] }}
                </span>
            </div>
          </div>
          <div class="col-4 ">
            <div class="input-group align-items-center ">
              <label class="input-group-text">Направление</label>
              <select class="form-control text-center" v-model="form.direction">
                <option :value="''" disabled>Не выбрано</option>
                <option :value="item._id" v-for="item of inputDirection"
                        :key="item"
                >{{ item.title }}
                </option>
              </select>
              <span
                  class="text-danger col-12"
                  v-for="error of v$.form.direction.$errors"
                  :key="error.$uid"
              >
                  {{ rusMsg[error.$message] }}
                </span>
            </div>
          </div>
        </div>
        <div class="row m-0 my-3 align-items-center">
          <div class="col-5 ">
            <div class="input-group align-items-center position-relative">
              <label class="input-group-text">Локации</label>
              <input
                  type="text"
                  class="form-control"
                  v-model="inputLocation"
                  placeholder="Нажмите ENTER чтобы добавить"
                  @keydown.enter.prevent="addToField(inputLocation)"
              >
              <span
                  class="text-danger col-12"
                  v-for="error of v$.form.locations.$errors"
                  :key="error.$uid"
              >
                {{ rusMsg[error.$message] }}
              </span>
            </div>
          </div>
          <div class="col-7  border-start border-end border-dark overflow-hidden">
            <span class="rounded p-2 border-start"
                  v-for="item of form.locations"
                  :key="item"
            >{{ item }}
                   <delete-circle @click="deleteLocation(item)" class="delete" v-if="outputDrivers.length"/>
            </span>

          </div>
        </div>
        <div class="row m-0 my-3 align-items-center">
          <div class="col-5 ">
            <div class="input-group">
              <label class="input-group-text">Выбор водителей</label>
              <select name="" class="form-control text-center">
                <option value="" disabled selected>Не выбрано</option>
                <option
                    v-for="item of inputDrivers"
                    :key="item._id"
                    @click="addDrivers(item)"
                >{{ item.name }}
                </option>
              </select>
              <span
                  class="text-danger col-12"
                  v-for="error of v$.form.drivers.$errors"
                  :key="error.$uid"
              >
                  {{ rusMsg[error.$message] }}
                </span>
            </div>
          </div>
          <div class="col-7  border-start border-end border-dark overflow-hidden">
            <span class="rounded p-2 border-start"
                  v-for="item of outputDrivers"
                  :key="item._id"
            >{{ item.name }}
              <delete-circle @click="deleteDriver(item._id)" class="delete" v-if="outputDrivers.length"/>
            </span>
          </div>
        </div>
        <div class="row m-0 my-3">
          <div class="col-2 offset-8 ">
            <button type="button" @click="cleanForm" class="btn btn-outline-danger">Очистить</button>
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary" v-if="!form._id">Сохранить</button>
            <button type="submit" class="btn btn-success" v-else>Изменить</button>
          </div>
        </div>
      </form>
    </div>
  </div>
    <div class="row m-0 bg-info text-end">
      <h4 class="px-5 py-2">Текущие направления</h4>
    </div>
  <div class="row m-0">
    <table class="col-12 table-bordered table table-striped">
      <thead class="text-center">
      <tr>
        <th class="p-2">Цвет</th>
        <th>Направление</th>
        <th>Водители</th>
        <th>Локации</th>
        <th>Связано с:</th>
      </tr>
      </thead>
      <tbody>
      <tr
          class="text-center selectDirection"
          v-for="item of directionStore.getDirections"
          @click="insertToForm(item)"
          :key="item._id">
        <td class="p-2"> <sign-direction :style="{color: item.color}"/></td>
        <td> {{item.title}}</td>
        <td>
       <span
           class="px-1"
           v-for="driver of item.drivers"
           :key="driver"
       >
           {{ userStore.getUserNameById(driver) }}
         </span>
        </td>
        <td> <span
            class="px-1 border border-bottom-0 border-top-0"
            v-for="location of item.locations"
            :key="location"
        >
           {{ location }}
         </span></td>
        <td>
          <directions :style="{color:getRelatedDirectionById(item.direction).color }" />
          {{getRelatedDirectionById(item.direction).title}}
        </td>
        <td><sign-direction-remove @click.stop="deleteDirection(item._id)" class="delete"/></td>
      </tr>
      </tbody>
    </table>
  </div>



</template>
<script>
import {useVuelidate} from '@vuelidate/core'
import {minLength, required} from '@vuelidate/validators'
import {useUserStore} from "../../store/users.store";
import {useDirectionStore} from "../../store/directions.store";
import {mapStores} from "pinia";
import DeleteCircle from 'vue-material-design-icons/DeleteCircle';
import SignDirection from 'vue-material-design-icons/SignDirection';
import Directions from 'vue-material-design-icons/Directions';
import SignDirectionRemove from 'vue-material-design-icons/SignDirectionRemove';
import {deleteDirectionDb} from "../../utils/direction.toServer";
import {nextTick} from "vue";

export default {
  name: 'adminRedactorDirectionComponent',
  components: {
    DeleteCircle,
    SignDirection,
    Directions,
    SignDirectionRemove
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      form: {
        _id: undefined,
        color: '',
        title: '',
        direction: '',
        drivers: [],
        locations: [],
      },
      inputLocation: '',
      inputDrivers: '',
      outputDrivers: [],
      inputDirection: '',
      rusMsg: {
        'Value is required': "Поле является обязательным",
        'This field should be at least 5 characters long': 'Минимум 4 символа',
        'This field should be at least 2 characters long': 'Минимум 2 символа'
      }
    }
  },
  validations() {
    return {
      form: {
        _id: {},
        color: {required},
        title: {required, minLength: minLength(2)},
        direction: {},
        drivers: {required},
        locations: {required, $autoDirty: true},
      }
    }
  },
  computed: {
    ...mapStores(useUserStore, useDirectionStore),
  },
  methods: {
    async submit() {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
       const res = await this.directionStore.addDirection(this.form);
        alert(res)
      }
      this.cleanForm()
    },
    cleanForm() {
      this.form = {
        _id: undefined,
        color: '',
        title: '',
        direction: '',
        drivers: [],
        locations: [],
      };
      this.outputDrivers = [];
      nextTick(() => {
        this.v$.$reset()
      })
    },
    deleteDriver(id) {
      this.form.drivers = this.form.drivers.filter(item => item !== id);
      this.outputDrivers = this.outputDrivers.filter(item => item._id !== id);
      this.inputDrivers.push( this.userStore.getUsersInfoById(id) );
    },
    deleteLocation(location) {
      this.form.locations = this.form.locations.filter(item => item !== location)
    },
    async deleteDirection(id) {
      const response = await deleteDirectionDb(id)
      if (response.data) {
        this.directionStore.deleteDirectionStore(id);
      } else {
        alert('Проблемы на сервере, не удалось удалить')
      }
    },
    insertToForm(direction) {
      this.form = direction;
      this.outputDrivers = direction.drivers.map(item => {
        return {name: this.userStore.getUserNameById(item), _id: item}
      });
    },
    addToField(location) {
      this.form.locations.push(location);
      this.inputLocation = '';
    },
    addDrivers(driver) {
      this.outputDrivers.push({name: driver.name, _id: driver._id});
      this.form.drivers.push(driver._id);
      this.inputDrivers = this.inputDrivers.filter(item => item !== driver);
    },
    getRelatedDirectionById(id) {
      return this.directionStore.getRelatedDirection(id)
    },
    getColorRelatedDirection(id) {
      return this.directionStore.getColorRelatedDirection(id)
    }
  },
  mounted() {
    this.inputDrivers = this.userStore.getUsers.filter(item => !item.geo)
    this.inputDirection = this.directionStore.getDirections
  }
}
</script>
<style lang="scss">
.selectDirection{
  &:hover {
    cursor: pointer;
    background-color: rgba(1,1,1,0.2);
  }
}
.delete {
  &:hover{
    cursor: pointer;
    color: darkred;
  }
}
</style>