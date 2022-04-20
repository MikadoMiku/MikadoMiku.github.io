<template>
    <div class="d-flex flex-column flex-shrink-0 bg-light vh-100 hover-opacity">
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li class="nav-item">
                <router-link
                    class="nav-link active py-3 border-bottom neon-pink"
                    to="/home"
                >
                    <i class="fa fa-home"></i> <small>Home</small>
                </router-link>
            </li>
            <li>
                <router-link
                    to="/About"
                    class="nav-link py-3 border-bottom neon-pink"
                >
                    About
                </router-link>
            </li>
            <li v-if="user.permissionLevel == 2">
                <router-link
                    to="/Post"
                    class="nav-link py-3 border-bottom neon-pink"
                >
                    Post
                </router-link>
            </li>
            <li>
                <router-link
                    to="/Feedback"
                    class="nav-link py-3 border-bottom neon-pink"
                >
                    Feedback
                </router-link>
            </li>
                        <li>
                <router-link
                    to="/WIP"
                    class="nav-link py-3 border-bottom neon-pink"
                >
                    WIP
                </router-link>
            </li>
        </ul>
        <div class="dropdown border-top">
            <a
                href="#"
                class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i style="color: white" class="fa fa-user fa-lg"></i>
            </a>
            <ul
                class="dropdown-menu text-small shadow dropdown-css"
                aria-labelledby="dropdownUser3"
            >
                <li>
                    <hr class="dropdown-divider" />
                </li>
                <li v-if="user.loggedIn">
                    <router-link @click="logOut()" to="/home" class="dropdown-item neon-pink">
                        Log out
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import store from "@/store/index"
export default {
    // data for getting logged in data from the store. By this data show the login/logout links!
    computed: {
        ...mapGetters({
            user: "getUser",
        }),
    },
    methods: {
        logOut(): void {
            store.dispatch("logOut")
        }
    }
};
</script>

<style scoped>
.neon-pink {
    color: hsl(317 100% 54%) !important;
    font-weight: bold;
}

.hover-opacity {
    opacity: 70% !important;
    background-color: black !important;
    width: 100px;
    position: absolute;
}

.dropdown-css {
    opacity: 70%;
    background-color: black !important;
}
.nav-link {
    border-radius: 5px !important;
    transition: all 0.5s;
    width: 100px;
    display: flex;
    flex-direction: column;
}

.nav-link small {
    font-size: 12px;
}

.nav-link:hover {
    background-color: #52525240 !important;
}

.nav-link .fa {
    transition: all 1s;
    font-size: 20px;
}

.nav-link:hover .fa {
    transform: rotate(360deg);
}
</style>
