
import UsersComponent from './components/UsersComponent.js';
import LoginComponent from './components/LoginComponent.js';
import AdminComponent from './components/AdminComponent.js';
import UserHomeComponent from './components/UserHomeComponent.js';

let router = new VueRouter({

  routes: [
      { path: '/', redirect: { name: "login"} },
      { path: '/login', name: "login", component: LoginComponent },
      { path: '/users', name: 'users', component: UsersComponent },
      { path: '/userhome', name: "home", component: UserHomeComponent, props: true },
      { path: '/admin', name: 'admin', component: AdminComponent }
  ]
});

const vm = new Vue({
 
  data: {
    authenticated: false,
    administrator: false,

    genericMessage: "hello from the parent",

    mockAccount: {
      username: "user",
      password: "password"
    },

    user: [],

    //currentUser: {},

    toastmessage: "Login failed!"
  },

  created: function() {
    // do a session check and set authenticated to true if the session still exists
    // if the cached user exists, then just navigate to their user home page

    // the localstorage session will persist until logout

    if (localStorage.getItem("cachedUser")) {
      let user = JSON.parse(localStorage.getItem("cachedUser"));
      this.authenticated = true;

      this.$router.push({ name: "home", params: { currentuser: user }});
    }

    // NOTE -> change this on login to localstorate session instead
    
  },

  methods: {
    setAuthenticated(status, data) {
      this.authenticated = status;
      this.user = data;
    },

    logout() {
      this.$router.push({ path: "/login" });
      this.authenticated = false;        
    }
  },

  router: router
}).$mount("#app");

router.beforeEach((to, from, next) => {
  console.log('router guard fired!', to, from, vm.authenticated);

  if (vm.authenticated == false) {
    next("/login");
  } else {
    next();
  }
});