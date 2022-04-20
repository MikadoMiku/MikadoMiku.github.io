<template>
    <div style="padding: 1px">
        <div class="post-form">
            <h1>Post</h1>
            <label for="titleInput"><h2>Title</h2></label>
            <br />
            <input type="text" id="titleInput" v-model="postTitle" />
            <textarea
                type="text"
                id="postContent"
                v-model="postContent"
            ></textarea>
            <div class="button-container">
                <button
                    class="btn btn-primary button center_grid_item"
                    @click="createPost()"
                >
                    Create!
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { blogPost } from "@/models/blogModels";
import BaseService from "@/services/apiService";
import store from "@/store/index";

export default defineComponent({
    data() {
        return {
            postContent: "",
            postTitle: "",
            postService: new BaseService<blogPost>(
                "https://safe-forest-05923.herokuapp.com/blogpost",
                store.state.user.jwt ? store.state.user.jwt : undefined
            ),
        };
    },
    methods: {
        async createPost() {
            const newPost: blogPost = {
                title: this.postTitle,
                content: this.postContent,
                clicks: 0,
                createdBy: "",
                createdAt: new Date().toUTCString(),
            };
            const result = await this.postService.post(newPost);
            if (result.statusCode === 201) {
                this.postContent = "";
                this.postTitle = "";
                store.dispatch("loadBlogPosts");
            }
        },
    },
});
</script>

<style scoped>
.post-form {
    padding: 1px;
    width: 90vw;
    margin-left: 7vw;
    height: 95vh;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    overflow-y: hidden;
}

.post-form > textarea {
    width: 90%;
    height: 60%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 20px hsl(317 100% 54%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.button-container {
    margin-top: 40px;
}

.post-form > input {
    width: 90%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 30px;
}

.post-form > h1 {
    padding: 10px;
}
</style>
