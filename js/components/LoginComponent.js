export default {
    template: `
      <div class="container">
        <div class="form">
          <div id="login">   
            <h1>Welcome Back To Roku!</h1>
            <p>Sign in to flashback to the era you love best!</p>
            <form action="/" method="post">
             <div class="field-wrap">
                <label class="sr-only" for="inlineFormInputName">Name</label>
                <input v-model="input.username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>
              </div>
              <div class="field-wrap">
                <label class="sr-only" for="inlineFormPassword">Name</label>
                <input v-model="input.password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
               </div>
              <p class="forgot"><a href="#">Forgot Password?</a></p>
              <button v-on:click.prevent="login()" type="submit" class="button button-block">Go!</button>
          </form>
        </div>
      </div>
</div>
     `,
 
     data() {
         return {
             input: {
                 username: "",
                 password: ""
             },

         }
     },
 
     methods: {
         login() {
            //console.log(this.$parent.mockAccount.username);
 
            if(this.input.username != "" && this.input.password != "") {
            // fetch the user from the DB
            // generate the form data
            let formData = new FormData();

             formData.append("username", this.input.username);
             formData.append("password", this.input.password);

             let url = `./admin/scripts/admin_login.php`;
 
             fetch(url, {
                    method: 'POST',
                    body: formData
                })
                 .then(res => res.json())
                 .then(data => {
                    if (typeof data != "object") { // means that we're not getting a user object back
                        console.warn(data);
                        console.error("authentication failed, please try again");
                        this.$emit("autherror", data);
                    } else {
                        this.$emit("authenticated", true, data[0]);
                        this.$router.replace({ name: "users" });
                    }
                })
             .catch(function(error) { 
                 console.log(error);
             });
        } else {
                 console.log("A username and password must be present");
            }
        }
    }
 }