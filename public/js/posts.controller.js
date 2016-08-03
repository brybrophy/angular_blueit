(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['$http', 'postsFac'];

  function PostsCtrl($http, postsFac) {
    this.posts = [];
    this.sortBy = '';

    this.addPost = () => {
      const newPost = {};

      const regEx = /^http/g;
      let imgUrl;

      const postTitle = this.postsForm.postTitle.replace(/\w\S*/g,(txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      for (const post of this.posts) {
        if (post.title === postTitle) {

          return this.postsForm.postTitle = 'Post title already exists';
        }
      };

      if (!regEx.test(this.postsForm.imgUrl)) {
        imgUrl = 'http://' + this.postsForm.imgUrl;
      }

      else {
        imgUrl = this.postsForm.imgUrl;
      }

      newPost.title = postTitle;
      newPost.description = this.postsForm.postDescription
      newPost.imageUrl = imgUrl;
      newPost.rating = 0;
      newPost.userId = 1;
      newPost.topicId = this.topic;
      newPost.created_at = new Date();


      postsFac.addPost(newPost)
        .then((post) => {
          this.posts.push(post);
          this.postsForm.postTitle = '';
          this.postsForm.imgUrl = '';
        })
        .catch((err) => {
          throw err;
        });
    };

    this.upVote = (post) => {
      post.rating += 1;
    };

    this.downVote = (post) => {
      post.rating -= 1;
    };

    const activate = () => {
      postsFac.getAllPosts()
        .then((posts) => {
          this.posts = posts.map((post) => {
            return Object.assign(post, {
              created_at: new Date(post.created_at).getTime(),
              updated_at: new Date(post.updated_at).getTime()
            });
          })
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };
})();
