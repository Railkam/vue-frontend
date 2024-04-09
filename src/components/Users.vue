<template>
    <div class="container">
      <p style="color: rgb(2, 68, 112); font-size: 20px;"> Текущая дата: {{date}}</p>
      <h3>Заказы</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>ID заказа</th>
              <th>Имя</th>
              <th>Адресс</th>
              <th>Общая сумма</th>
              <th>Дата</th>
              <th>Обновить</th>
              <th>Удалить</th>
              <th>Добавить детали заказа</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" v-bind:key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.adress }}</td>
              <td>{{ user.sum }}</td>
              <td>{{ user.date }}</td>
              <td>
              <button class="btn btn-info" v-on:click="updateUser(user.id)">
                  Обновить
                </button>
              </td>
              <td>
               <button class="btn btn-danger" v-on:click="deleteUser(user.id)">
                  Удалить
                </button>
              </td>
              <td>
               <button class="btn btn-info" v-on:click="addOrder(user.id)">
                  Добавить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <button class="btn btn-dark" v-on:click="addUser()">Новый заказ</button>&nbsp;&nbsp;&nbsp;
          <button class="btn btn-dark" v-on:click="getOrders()">Детали заказа</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import UserDataService from "../service/UserDataService";
  
  export default {
    name: "Users",
    data() {
      return {
        users: [],
        message: "",
        date:"",
      };
    },
    methods: {
      refreshUsers() {
        UserDataService.retrieveAllUsers().then((res) => {
          this.users = res.data;
        });
        UserDataService.retrieveGetDate().then((res2) => {
          this.date = res2.data;
        });
      },
      addUser() {
        this.$router.push(`/customer/-1`);
      },
      updateUser(id) {
        this.$router.push(`/customer/${id}`);
      },
      addOrder(id) {
        this.$router.push(`/customer/${id}/orders/-1`);
      },
      deleteUser(id) {
        UserDataService.deleteUser(id).then(() => {
          this.refreshUsers();
        });
      },
      getOrders() {
        this.$router.push(`/customer/orders`);
      },
    },
    created() {
      this.refreshUsers();
    },
  };
  </script>