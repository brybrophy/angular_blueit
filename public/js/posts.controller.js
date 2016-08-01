(function() {
  'use strict';

  const app = angular.module('blueitApp');
  
  app.controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['$http'];

  function PostsCtrl($http) {
    this.addPost = () => {
      this.newPost = {};

      const postTitle = this.postsForm.postTitle.replace(/\w\S*/g,(txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      for (const post of this.posts) {
        if (post.title === postTitle) {

          return this.postsForm.postTitle = 'Post title already exists';
        }
      };

      const imgUrl = 'http://' + this.postsForm.imgUrl;

      this.newPost.id = this.posts[this.posts.length - 1].id + 1
      this.newPost.title = postTitle;
      this.newPost.image_url = imgUrl;
      this.newPost.rating = 0;
      this.newPost.created_at = new Date().getTime();

      this.posts.push(this.newPost);

      console.log(this.posts);
      this.postsForm.postTitle = '';
      this.postsForm.imgUrl = '';
      this.newPost = {};
    };

    this.upVote = (post) => {
      post.rating += 1;
    };

    this.downVote = (post) => {
      post.rating -= 1;
    };
  };
})();
