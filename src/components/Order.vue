<template>
  <div>
    <h3>Детали заказа</h3>
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
          <label>Номер позиции</label>
          <input type="text" class="form-control" v-model="id" />
        </fieldset>
        <fieldset class="form-group">
          <label>Серийный номер</label>
          <input type="text" class="form-control" v-model="number" />
        </fieldset>
        <fieldset class="form-group">
          <label>Название товара</label>
          <input type="text" class="form-control" v-model="name" />
        </fieldset>
        <fieldset class="form-group">
          <label>Количество</label>
          <input type="text" class="form-control" v-model="quantity" />
        </fieldset>
        <button class="btn btn-success" type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>
<script>

import UserDataService from "../service/UserDataService";

export default {
  name: "Order",
  data() {
    return {
      id: "",
      number: "",
      name: "",
      quantity: "",
      errors: [],
    };
  },
  computed: {
    id1() {
      return this.$route.params.id1;
    },
        id2() {
      return this.$route.params.id2;
    },
  },
  methods: {

   refreshOrderDetails() {
      if(this.id2!=-1) {
      UserDataService.retrieveOrder(this.id1,this.id2).then((res) => {
       res.data.forEach(element => {
        
        this.id = element.id;
        this.number = element.number;
       this.name =  element.name;
        this.quantity = element.quantity;
       });

       
  
      });}
    },
     validateAndSubmit(e) {
     e.preventDefault();
    this.errors = [];
    /*  if (!this.name) {
        this.errors.push("Enter valid values");
      } else if (this.name.length < 5) {
        this.errors.push("Enter atleast 5 characters in First Name");
      }
      if (!this.number) {
        this.errors.push("Enter valid values");
      } else if (this.nuber.length < 5) {
        this.errors.push("Enter atleast 5 characters in Last Name");
      }*/
      /*if (this.errors.length === 0) {*/
       if(this.id2==-1)
       {
          UserDataService.addOrder(this.id1, {
            id: this.id,
            number: this.number,
            name  : this.name,
            quantity: this.quantity,
          }).then(() => {
            this.$router.push("/customer/orders");
          })
       } 
       else {
          UserDataService.updateOrder(this.id1,this.id2, {
            id: this.id,
            number: this.number,
            name  : this.name,
            quantity: this.quantity,
          }).then(() => {
            this.$router.push("/customer/orders");
          })
        }
        
      
    },
  },
    created() {
    this.refreshOrderDetails();
  },
};
</script>