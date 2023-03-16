<template>
  <div class="overflow-hidden wrapper row bg-light border-bottom p-0 m-0 align-items-start pt-2"
       :style="{height: currentHeight + 'vh'}"
       @click.right.prevent="toggleChangeComponent">
      <component
          :item="item"
          :is="currentComponent"
          @closing="closing"
      >
        <template #btnDelete>

            <button
                type="button"
                class="delete btn btn-danger"
                @click="deleteEmit(item._id)"
            >
              <delete-btn v-if="!spinner"></delete-btn>
              <div class="spinner-border" role="status" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>

        </template>
      </component>

  </div>
</template>

<script>
import TripsItem from "@/components/tripsWrapperItem";
import TripsForm from "@/components/formComponent";
import deleteBtn from 'vue-material-design-icons/Delete'

export default {
  name: "TripsItemWrapper",
  components: {
    TripsForm,
    TripsItem,
    deleteBtn
  },
  props: {
    item: {
      require: true,
      type: Object,
    },
    index: {
      type: Number,
    },
    spinner: {
      type: Boolean,
    }
  },
  emits: ['deleteOne', 'closing'],
  data() {
    return {
      isToggle: true,
      currentComponent: 'TripsItem',
      currentHeight: 7,
      heightProportions: 4,
    }
  },
  methods: {
    toggleChangeComponent() {
      this.isToggle = ! this.isToggle;
      this.currentComponent = this.isToggle ? 'TripsItem' : 'TripsForm';
      this.currentComponent === 'TripsItem' ?
           this.heightDown() : this.heightUp()
    },
    heightUp() {
      this.currentHeight = this.currentHeight * this.heightProportions
    },
    heightDown() {
      this.currentHeight = this.currentHeight / this.heightProportions
    },
    closing() {
      this.toggleChangeComponent()
    },
    deleteEmit(id) {
      this.$emit('deleteOne', id);
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 7vh;
  transition: height 0.4s ease-out;
  &:hover {
    background-color: rgba(1,1,1,0.03) !important;
  }
}

</style>