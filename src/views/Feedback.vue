<template>
    <div style="padding: 1px">
        <button
            class="alert alert-success"
            role="alert"
            v-if="showThankYou"
            @click="disableAlert()"
        >
            Thank you for giving feedback!
        </button>
        <div class="feedback-form">
            <h1>Feedback</h1>
            <textarea
                type="text"
                id="feedbackContent"
                v-model="feedbackContent"
            ></textarea>
            <button
                class="btn btn-primary button center_grid_item"
                @click="sendFeedback()"
            >
                Send feedback
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { feedback } from "@/models/blogModels";
import BaseService from "@/services/apiService";
import store from "@/store/index";

export default defineComponent({
    data() {
        return {
            feedbackContent: "",
            showThankYou: false,
            commentService: new BaseService<feedback>(
                "https://safe-forest-05923.herokuapp.com/feedback",
                store.state.user.jwt ? store.state.user.jwt : undefined
            ),
        };
    },
    methods: {
        async sendFeedback() {
            const feedback: feedback = {
                content: this.feedbackContent,
            };
            const result = await this.commentService.post(feedback);
            if (result.statusCode === 201) {
                this.showThankYou = true;
                this.feedbackContent = "";
            }
        },
        disableAlert() {
            this.showThankYou = false;
        },
    },
});
</script>

<style scoped>
.feedback-form {
    padding: 1px;
    width: 50vw;
    height: 50vh;
    margin-left: 25vw;
    margin-top: 25vh;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
}

.feedback-form > textarea {
    width: 90%;
    height: 60%;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 20px hsl(317 100% 54%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.feedback-form > button {
    margin-top: 40px;
    margin-bottom: 0px;
}

.feedback-form > h1 {
    padding: 10px;
}

.alert {
    width: 50vw;
    left: 25vw;
    top: 25vh;
    position: absolute;
}
</style>
