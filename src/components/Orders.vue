<template>
    <div class="container">
      <h3>Детали заказа</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Номер позиции</th>
              <th>Серийный номер</th>
              <th>Название товара</th>
              <th>Количество</th>
              <th>ID заказа</th>
              <th>Обновить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" v-bind:key="order.id" >
              <td>{{ order.id }}</td>
              <td>{{ order.number }}</td>
              <td>{{ order.name }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.customer.id}}</td>
               <td>
              <button class="btn btn-info" v-on:click="updateOrder(order.customer.id, order.id)">
                  Обновить
                </button>
              </td>
              <td>
               <button class="btn btn-danger" v-on:click="deleteOrder(order.customer.id, order.id)">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <button class="btn btn-dark" v-on:click="getCustomers()">Заказчики</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import UserDataService from "../service/UserDataService";
  
  export default {
    name: "Orders",
    data() {
      return {
        orders: [],
        message: "",
      };
    },
    methods: {
      refreshOrders() {
        UserDataService.retrieveAllOrders().then((res) => {
          this.orders = res.data;
        
        });
      },
       updateOrder(custId, orderId) {
         this.$router.push(`/customer/${custId}/orders/${orderId}`);
      },
      deleteOrder(custId, orderId) {
        UserDataService.deleteOrder(custId, orderId).then(() => {
          this.refreshOrders();
        });
      },
      getCustomers() {
        this.$router.push("/");
      },
    },
    created() {
      this.refreshOrders();
    },
  };
  </script>