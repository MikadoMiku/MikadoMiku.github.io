<template>
    <div class="blog_container">
        <div class="blog_content_container">
            <h1 class="container_title">{{ this.$data.blogPost.title }}</h1>
            <div class="blog_content">
                <p>{{ this.$data.blogPost.content }}</p>
            </div>
        </div>
        <div class="blog_comment_container">
            <h1 class="container_title">comments</h1>
            <div class="blog_comment_list">
                <button
                    v-for="comment in comments"
                    :key="comment._id"
                    @click="activateComment()"
                    class="blog_comment"
                    :disabled="commentOptionClicked"
                >
                    <i
                        class="fa fa-gear"
                        @click="commentOptionClick(comment._id)"
                        v-if="
                            user.permissionLevel == 2 ||
                            (user.email == comment.createdBy &&
                                user.permissionLevel == 1)
                        "
                    ></i>
                    <p>{{ comment.content }}</p>
                    <BlogCommentOptions
                        @deleteComment="deleteComment(comment._id)"
                        @editComment="editComment(comment._id)"
                        v-if="commentOptionClicked === comment._id"
                    ></BlogCommentOptions>
                </button>
                <button
                    v-if="user.permissionLevel >= 1"
                    class="blog_comment Add_comment_button_content"
                    data-bs-toggle="modal"
                    data-bs-target="#addCommentModal"
                >
                    <p>+</p>
                </button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div
        class="modal fade"
        id="addCommentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <h1 style="margin-top: 20px">
                    What would you like to comment?
                </h1>
                <div class="modal-body">
                    <textarea
                        type="text"
                        id="commentContent"
                        v-model="commentBody"
                    ></textarea>
                </div>
                <div
                    style="
                        display: flex;
                        flex-direction: row-reverse;
                        margin-bottom: 15px;
                        margin-right: 20px;
                        column-gap: 5px;
                    "
                >
                    <button
                        @click="addComment()"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addCommentModal"
                    >
                        Add comment
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { blogComment, blogPost } from "@/models/blogModels";
import BaseService from "@/services/apiService";
import store from "@/store/index";
import { defineComponent } from "vue";
import BlogCommentOptions from "@/components/BlogCommentOptions.vue";
import { mapGetters } from "vuex";

export default defineComponent({
    name: "Blog",
    components: { BlogCommentOptions },
    mounted() {
        if (store.state.user.loggedIn && this.$route.params.blogJson) {
            this.$data.blogPost = JSON.parse(
                this.$route.params.blogJson as string
            ) as blogPost;
            this.fetchBlogComments();
        }
    },
    computed: {
        ...mapGetters({
            user: "getUser",
        }),
    },
    data() {
        return {
            commentService: new BaseService<blogComment>(
                "https://safe-forest-05923.herokuapp.com/blogComment",
                store.state.user.jwt ? store.state.user.jwt : undefined
            ),
            blogPost: {} as blogPost,
            comments: [] as blogComment[],
            addCommentClicked: false,
            commentOptionClicked: "",
            commentBody: "",
        };
    },
    methods: {
        async fetchBlogComments() {
            this.$data.comments = (
                await this.$data.commentService.getAll({
                    id: this.$data.blogPost._id!.toString(),
                    // id: "Miku",
                })
            ).data as blogComment[];
        },
        activateComment() {
            // Maybe make the buttons into a separate component with its own data for clickable actions. TODO!!
        },
        async addComment() {
            const newComment: blogComment = {
                content: this.commentBody,
                createdBy: this.user.email,
                createdAt: new Date().toUTCString(),
                postId: this.blogPost._id!.toString(),
            };
            const addedComment = (await this.commentService.post(newComment))
                .data as blogComment;
            if (addedComment) this.comments.push(addedComment);
        },
        activateCommentModal() {
            this.$data.addCommentClicked = !this.$data.addCommentClicked;
        },
        commentOptionClick(commentId: string) {
            this.$data.commentOptionClicked =
                this.$data.commentOptionClicked === commentId ? "" : commentId;
        },
        async deleteComment(commentId: string) {
            const deleteResult = await this.commentService.delete(commentId);
            if (deleteResult.statusCode === 201) {
                this.comments = this.comments.filter(
                    (c) => c._id?.toString() !== commentId
                );
            }
        },
    },
});
</script>

<style scoped>
.blog_container {
    display: grid;
    grid-auto-flow: column;
    column-gap: 60px;
    width: 90%;
    margin-left: 7.5%;
    grid-template-columns: 62% 35%;
    max-height: 100vh;
}

.blog_content_container {
    background-color: rgba(0, 0, 0, 0.7);
}

.blog_comment_container {
    background-color: rgba(0, 0, 0, 0.7);
}

.blog_content_container,
.blog_comment_container {
    border-radius: 20px;
    min-height: 100vh;
    max-height: 100vh;
    overflow: auto;
}

.blog_comment_container h1 {
    max-height: 10%;
    min-height: 10%;
}

.blog_content {
    min-height: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 40px;
    padding: 15px;
    box-shadow: 0 0 20px hsl(317 100% 54%);
}

/* Maybe on button click activate a modal for a bigger comment view? TODO*/
.blog_comment {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    min-height: 200px;
    max-height: 200px;
    max-width: 90%;
    min-width: 90%;
    margin-left: 5%;
    color: white;
    position: relative;
}

.blog_comment i {
    top: 0;
    left: 0;
    margin-top: 8px;
    margin-left: 8px;
    font-size: 25px;
    position: absolute;
}

.blog_comment:hover {
    box-shadow: 0 0 20px hsl(317 100% 54%);
}

.blog_content p {
    text-align: justify;
    font-size: 18px;
    white-space: pre-wrap;
}

.container_title {
    margin-top: 40px;
    margin-bottom: 50px;
}

.blog_comment_list {
    display: grid;
    row-gap: 20px;
    margin-top: -45px;
}

.comment_button_container {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 8px;
    margin-right: 8px;
}

.Add_comment_button_content {
    font-size: 800%;
}

.Add_comment_button_content:hover {
    color: hsl(317 100% 54%);
}

.modal-content {
    min-height: 80vh;
    min-width: 80vh;
    margin-left: calc(50% - (80vh / 2));
    background-image: url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    background-size: cover;
    box-shadow: 0 0 50px hsl(317 100% 54%);
    border-radius: 20px;
}

.modal-body {
    display: grid;
}

.modal-body textarea {
    background-color: rgba(0, 0, 0, 0.7);
    color: White;
    font-size: 20px;
}

/* ------------------------------ scroll */

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
