import { createStore } from "vuex";
import { blogPost, blogComment } from "@/models/blogModels";
import BaseService from "@/services/apiService";
import jsonwebtoken from "jsonwebtoken";

interface userInfo {
    loggedIn: boolean;
    permissionLevel: number;
    jwt?: string;
    email: string;
}

export default createStore({
    state: {
        user: {
            loggedIn: false,
            permissionLevel: 0,
            email: "",
        } as userInfo,
        blogPosts: [] as blogPost[],
        blogComments: [] as blogComment[],
    },
    mutations: {
        setUserToken(context, token: string) {
            context.user.jwt = token;
        },
        logUserIn(context) {
            context.user.loggedIn = true;
        },
        logUserOut(context) {
            context.user.loggedIn = false;
        },
        setBlogPosts(context, blogPosts) {
            context.blogPosts = blogPosts;
        },
        setUserInfo(context, info) {
            context.user.email = info.email;
            context.user.permissionLevel = info.permissionLevel;
        },
        deletePost(context, postId) {
            context.blogPosts = context.blogPosts.filter(
                (p) => p._id?.toString() !== postId
            );
        },
    },
    actions: {
        setJwtToken(context, token: string) {
            const userInfo = jsonwebtoken.decode(token)
                ? jsonwebtoken.decode(token)
                : "";
            context.commit("setUserInfo", userInfo);
            context.commit("setUserToken", token);
        },
        logIn(context) {
            context.commit("logUserIn");
        },
        logOut(context) {
            context.commit("logUserOut");
        },
        async loadBlogPosts(context) {
            const service = new BaseService<blogPost>(
                "https://safe-forest-05923.herokuapp.com/blogPost/",
                context.state.user.jwt ? context.state.user.jwt : undefined
            );
            const blogPosts = (await (
                await service.getAll()
            ).data) as blogPost[];
            context.commit("setBlogPosts", blogPosts);
        },
        updatePostList(context, postId) {
            context.commit("deletePost", postId);
        },
    },
    modules: {},
    getters: {
        getUser(state) {
            return state.user;
        },
    },
});
