<template>
    <PostList v-bind:blogPosts="blogPosts" @deletedPost="removePost"></PostList>
</template>

<script lang="ts">
import { blogPost } from "@/models/blogModels";
import { defineComponent } from "vue";
import store from "@/store/index";
import PostList from "@/components/PostList.vue";

export default defineComponent({
    name: "Home",

    async mounted() {
        // await store.dispatch("loadBlogPosts");
        this.$data.blogPosts = store.state.blogPosts;
    },
    data() {
        return {
            blogPosts: [] as blogPost[],
        };
    },
    components: { PostList },
    methods: {
        removePost(postId: string) {
            this.blogPosts = this.blogPosts.filter(
                (p) => p._id?.toString() !== postId
            );
            store.dispatch("updatePostList", postId)
        },
    },
});
</script>

<style scoped>
.home {
    display: grid;
}
</style>
