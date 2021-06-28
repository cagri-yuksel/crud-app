<template>
  <div class="container">
    <div class="row g-2 d-flex justify-content-center mt-2">
      <div class="card d-flex mt-5">
        <div
          class="
            card-body
            d-flex
            justify-content-center
            flex-column
            align-items-center
          "
          v-show="showTextarea"
        >
          <p class="card-text" v-show="!showTextarea">
            <i
              class="fas fa-plus fa-3x"
              @click="showTextarea = !showTextarea"
              style="cursor: pointer"
            >
            </i>
          </p>
          <p class="card-text" v-show="!showTextarea">Add Posts</p>
        </div>
        <div class="form-floating m-3" v-show="showTextarea">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="empty"
            v-model="textArea.title"
          />
          <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating m-2" v-show="showTextarea">
          <textarea
            class="form-control "
            placeholder="Empty"
            style="height: 150px"
            id="floatingtTextarea"
            v-model="textArea.post"
          ></textarea><label for="floatingtTextarea">Post</label>
          <button @click="addPost" class="btn btn-primary m-2">Add</button>
          <button @click="cancelPost" class="btn btn-danger m-2">cancel</button>
          
        </div>
      </div>
      <div
        class="col-lg-6 col-sm-12"
        v-for="i in posts"
        :key="i.id"
        v-show="posts.length > 0"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" v-show="!i.showText">{{ i.title }}</h5>
            <div class="form-floating mb-3" v-show="i.showText">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="empty"
                v-model="backupEdit.title"
              />
              <label for="floatingInput">Title</label>
            </div>
            <p class="card-text" v-show="!i.showText">
              {{ i.post }}
            </p>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Empty"
                id="textarea"
                v-show="i.showText"
                v-model="backupEdit.post"
              ></textarea>
              <label for="textarea" v-show="i.showText"> Edit </label>
            </div>
            <button @click="deleteItem(i)" class="btn btn-danger m-2">
              Delete Post
            </button>
            <button
              @click="cancelEdit(i)"
              v-show="i.showText"
              class="btn btn-danger m-2"
            >
              cancel
            </button>
            <button
              @click="updatePost()"
              v-show="i.showText"
              class="btn btn-success m-2"
            >
              Update post
            </button>
            <button
              @click="editPost(i)"
              v-show="!i.showText"
              class="btn btn-success m-2"
            >
              Edit post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      backupEdit: {
        _id: null,
        ownerId: null,
        post: null,
        title: null,
      },
      backupEditOn: false,
      posts: null,
      showTextarea: false,
      textArea: {
        title: "",
        post: "",
      },
    };
  },
  methods: {
    show(i) {
      i.showText = !i.showText;
      console.log(i.showText);
    },
    cancelPost() {
      if (this.textArea.title.length > 0 || this.textArea.post.length > 0) {
        if (confirm("Unsaved changes")) {
          this.showTextarea = false;
          this.textArea = {
            title: "",
            post: "",
          };
        } else {
          this.showTextarea = true;
        }
      } else {
        this.showTextarea = false;
        this.textArea = {
          title: "",
          post: "",
        };
      }
    },
    editPost(i) {
      if (this.backupEditOn === false) {
        this.backupEditOn = true;
        i.showText = !i.showText;
        this.backupEdit = {
          _id: i._id,
          ownerId: i.ownerId,
          post: i.post,
          title: i.title,
        };
      } else {
        alert("Please finish your edit before.");
      }

      console.log(this.backupEdit);
    },
    cancelEdit(i) {
      this.backupEditOn = false;
      i.showText = !i.showText;
    },
    addPost() {
      axios
        .post("http://localhost:9999/api/addPost", {
          headers: {
            authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          title: this.textArea.title,
          post: this.textArea.post,
        })
        .then((res) => {
          console.log(res.data);
          this.posts.push(res.data);
          this.showTextarea = false;
          this.textArea = {
            title: "",
            post: "",
          };
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    deleteItem(i) {
      axios
        .delete("http://localhost:9999/api/deletePost", {
          headers: {
            authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            _id: i._id,
          },
        })
        .then((res) => {
          var fposts = this.posts.filter(function (f) {
            return i._id.indexOf(f._id) == -1;
          });
          this.posts = fposts;
          console.log(res);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    updatePost() {
      const replacement = {
        title: this.backupEdit.title,
        post: this.backupEdit.post,
        ownerId: this.backupEdit.ownerId,
        _id: this.backupEdit._id,
      };
      console.log(replacement);
      axios
        .put("http://localhost:9999/api/updatePost", {
          headers: {
            authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          item: replacement,
        })
        .then((res) => {
          console.log(res);
          this.backupEditOn = false;
          this.getPosts();
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },
    getPosts() {
      if (localStorage.getItem("token").length >= 0) {
        axios
          .get("http://localhost:9999/api/posts", {
            headers: {
              authorization: localStorage.getItem("token"),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            this.posts = res.data;
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (localStorage.username.length < 0 || localStorage.username !== "undefined") {
         this.$store.dispatch("setCurrentUser", localStorage.getItem("username"));
      }
   
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style>
</style>