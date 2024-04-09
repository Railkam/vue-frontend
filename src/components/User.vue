<template>
  <div>
    <h3>Новый заказ</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>Имя</label>
          <input type="text" class="form-control" v-model="name" />
        </fieldset>
        <fieldset class="form-group">
          <label>Адрес</label>
          <input type="text" class="form-control" v-model="adress" />
        </fieldset>
        <fieldset class="form-group">
          <label>Обща сумма</label>
          <input type="text" class="form-control" v-model="sum" />
        </fieldset>
        <fieldset class="form-group">
          <label>Дата</label>
          <input type="text" class="form-control" v-model="date" />
        </fieldset>
        <button class="btn btn-success" type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";

export default {
  name: "User",
  data() {
    return {
      name: "",
      adress: "",
      sum: "",
      date: "",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshUserDetails() {
      if(this.id!=-1){
      UserDataService.retrieveUser(this.id).then((res) => {
        this.name = res.data.name;
        this.adress = res.data.adress;
        this.sum = res.data.sum;
        this.date = res.data.date;
      });}
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      /*if (!this.name) {
        this.errors.push("Enter valid values");
      } else if (this.name.length < 5) {
        this.errors.push("Enter atleast 5 characters in First Name");
      }
      if (!this.adress) {
        this.errors.push("Enter valid values");
      } else if (this.adress.length < 5) {
        this.errors.push("Enter atleast 5 characters in Last Name");
      }
      if (this.errors.length === 0) {*/
        if (this.id == -1) {
          UserDataService.createUser({
            name: this.name,
            adress: this.adress,
            sum: this.sum,
            date: this.date,
          }).then(() => {
            this.$router.push("/");
          });
        } else {
          UserDataService.updateUser(this.id, {
            name: this.name,
            adress: this.adress,
            sum: this.sum,
            date: this.date,
          }).then(() => {
            this.$router.push("/");
          });
        }
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>