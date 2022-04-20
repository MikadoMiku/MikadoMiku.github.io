<template>
    <div class="blogList">
        <a
            ><i
                class="fa fa-gear"
                @click="postOptionClick()"
                v-if="
                    user.permissionLevel == 2 && user.email === 'admin@blog.com'
                "
            ></i>
        </a>
        <button
            class="listItem"
            v-for="blog in blogPosts"
            :key="blog._id"
            @click="routeToBlog(blog)"
            :disabled="buttonsDisabled"
        >
            <h1>{{ blog.title }}</h1>
            <BlogCommentOptions
                @deleteComment="deletePost(blog._id)"
                @editComment="editPost(blog._id)"
                v-if="postOptionClicked"
            ></BlogCommentOptions>
        </button>
    </div>
</template>

<script lang="ts">
import { blogPost } from "@/models/blogModels";
import BaseService from "@/services/apiService";
import store from "@/store";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import BlogCommentOptions from "@/components/BlogCommentOptions.vue";

export default defineComponent({
    name: "PostList",
    props: {
        blogPosts: [],
    },
    components: { BlogCommentOptions },
    data() {
        return {
            postOptionClicked: false,
            buttonsDisabled: false,
            postService: new BaseService<blogPost>(
                "https://safe-forest-05923.herokuapp.com/blogPost",
                store.state.user.jwt ? store.state.user.jwt : undefined
            ),
        };
    },
    computed: {
        ...mapGetters({
            user: "getUser",
        }),
    },
    methods: {
        routeToBlog(blog: blogPost) {
            const blogJson = JSON.stringify(blog);
            this.$router.push({ name: "Blog", params: { blogJson: blogJson } });
        },
        async deletePost(postId: string) {
            const deleteResult = await this.postService.delete(postId);
            if (deleteResult.statusCode === 201) {
                this.$emit("deletedPost", postId);
            }
        },
        postOptionClick() {
            this.postOptionClicked = !this.postOptionClicked;
            this.disableButtons();
        },
        disableButtons() {
            this.buttonsDisabled = !this.buttonsDisabled;
        },
    },
});
</script>

<style scoped>
.blogList {
    display: grid;
    height: 100vh;
    width: 70%;
    margin-left: 30%;
    overflow: auto;
    border-radius: 20px;
    grid-row-gap: 5px;
    align-content: start;
}
.listItem {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    min-height: 200px;
    max-height: 200px;
    max-width: 90%;
    min-width: 90%;
    margin-left: 30px;
    outline: none;
    color: white;
}

.listItem:hover {
    background-color: rgba(0, 0, 0, 0.6);
    outline: none !important;
    border: 1px solid hsl(317 100% 54%);
    box-shadow: 0 0 20px hsl(317 100% 54%);
    outline: none;
}

a {
    top: 0;
    right: 0;
    margin-top: 15px;
    margin-right: 15px;
    font-size: 25px;
    position: absolute;
    z-index: 1000;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
