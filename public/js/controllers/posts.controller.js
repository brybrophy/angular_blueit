(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['$http', 'postsFac'];

  function PostsCtrl($http, postsFac) {
    this.posts = [];
    this.filterBy = '';
    this.sortBy = '-rating';

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

    this.updatePostRating = (post) => {
      postsFac.updatePostRating(post)
        .then((newRating) => {
          post.rating = newRating.rating
        })
        .catch((err) => {
          throw err;
        });
    };

    this.upVote = (post) => {
      post.rating += 1;
      this.updatePostRating(post);
    };

    this.downVote = (post) => {
      post.rating -= 1;
      this.updatePostRating(post);
    };

    const activate = () => {
      postsFac.getAllPosts()
        .then((posts) => {
          this.posts = posts;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };
})();