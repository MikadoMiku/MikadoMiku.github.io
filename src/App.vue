<template>
    <Menu v-if="user.loggedIn"></Menu>
    <Login v-if="!user.loggedIn"></Login>
    <router-view v-if="user.loggedIn" />
</template>

<script lang="ts">
import Menu from "@/components/Menu.vue";
import { mapGetters } from "vuex";
import Login from "./views/Login.vue";

export default {
    components: { Menu, Login },
    computed: {
        ...mapGetters({
            user: "getUser",
        }),
    },
};
</script>

<style>
body {
    background-color: #0e0b16 !important; /* fallback for old browsers */
    background-image: url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    background-size: cover;
    width: 100%;
    height: 100%;
}

html,body {
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}
</style>
