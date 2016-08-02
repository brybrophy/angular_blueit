(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['$http', '$scope'];

  function PostsCtrl($http) {
    this.posts = [];
    this.sortBy = '';

    this.addPost = () => {
      this.newPost = {};
      console.log(this.topic);

      const postTitle = this.postsForm.postTitle.replace(/\w\S*/g,(txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      for (const post of this.posts) {
        if (post.title === postTitle) {

          return this.postsForm.postTitle = 'Post title already exists';
        }
      };

      const imgUrl = this.postsForm.imgUrl;

      this.newPost.title = postTitle;
      this.newPost.description = this.postsForm.postDescription
      this.newPost.imageUrl = imgUrl;
      this.newPost.rating = 0;
      this.newPost.userId = 1;
      this.newPost.topicId = this.topic;
      this.newPost.created_at = new Date();

      console.log(this.newPost);

      const activate = () => {
        return $http.post('/api/posts', this.newPost)
        .then((res) => {
          this.posts.push(res.data[0]);
          $scope.apply();
        })
        .catch((err) => {
          throw err;
        });
      };

      activate();

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

    const activate = () => {
      $http.get('/api/posts')
      .then((res) => {
        this.posts = res.data.map((post) => {
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
