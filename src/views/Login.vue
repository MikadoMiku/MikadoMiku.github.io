<template>
    <div class="parent">
        <div class="alert alert-danger" role="alert" v-if="credentialException">
            Problem matching either email or password!
            <br />
            Try again!
        </div>
        <div class="login_form login_form_grid">
            <h1>Access the blog</h1>
            <div>
                <label class="label" for="email_field">Email</label>
                <input
                    type="text"
                    class="center_grid_item"
                    id="email_field"
                    v-model="email"
                />
            </div>
            <div>
                <label class="label" for="password_field">Password</label>
                <input
                    type="password"
                    class="center_grid_item"
                    id="password_field"
                    v-model="password"
                />
            </div>
            <button
                class="btn btn-primary button center_grid_item"
                @click="login()"
            >
                LOGIN
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import AccountService from "@/services/identityService";
import store from "@/store/index";
import { defineComponent } from "vue";

export default defineComponent({
    name: "Login",
    data() {
        return {
            service: new AccountService(
                "https://safe-forest-05923.herokuapp.com/identity/login"
            ),
            email: "",
            password: "",
            credentialException: false,
        };
    },
    components: {},
    methods: {
        async login() {
            const token = await this.service.login(this.email, this.password);
            if (token.statusCode >= 200 && token.statusCode < 300) {
                store.dispatch("setJwtToken", token.data);
                await store.dispatch("loadBlogPosts");
                store.dispatch("logIn");
                this.credentialException = false;
            } else {
                this.credentialException = true;
            }
            this.$router.push("Home");
        },
    },
});
</script>

<style scoped>
.parent {
    /*This is required for some reason so the entire app section wont be moved downard from margin-top*/
    padding-top: 1px;
}

.alert {
    position: absolute;
    width: 100%;
}

.login_form {
    height: 500px;
    width: 500px;
    margin-top: calc(50% - 750px);
    margin-left: calc(50% - 250px);
    /* border: 5px solid red; */
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
}

.login_form_grid {
    display: grid;
    grid-template-rows: 100px 50px;
    row-gap: 30px;
}

.login_form button {
    color: white;
    width: 90%;
    margin-top: 90px;
}

.login_form input {
    width: 90%;
    font-size: 30px;
}

input:focus {
    outline: none !important;
    border: 1px solid hsl(317 100% 54%);
    box-shadow: 0 0 20px hsl(317 100% 54%);
}

.center_grid_item {
    justify-self: center;
    border-radius: 20px;
    height: 50px;
}

.label {
    font-weight: bold;
    font-size: 20px;
}
</style>
