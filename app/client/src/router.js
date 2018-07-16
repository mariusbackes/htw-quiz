import Vue from 'vue'
import Router from 'vue-router'
import Login from "./pages/Login.vue"
import Home from "./pages/Home.vue"
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home }
];

export const router = new VueRouter({
  routes
});
