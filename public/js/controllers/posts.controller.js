(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('PostsCtrl', PostsCtrl);

  PostsCtrl.$inject = ['$http', 'postsFac', '$cookies'];

  function PostsCtrl($http, postsFac, $cookies) {
    this.posts = [];
    this.filterBy = '';
    this.sortBy = '-created_at';
    this.button = 'Cancel';
    this.mustLogInNew = '';
    this.success = '';
    this.topic = '0';

    for (const post of this.posts) {
      post.mustLogInVote = '';
    };

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.addPost = (postsForm) => {
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
      newPost.description = this.postsForm.description;
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
          this.postsForm.description = '';
          this.topic = '0';
          this.button = 'Close'
          this.success = 'Post created!'
          this.mustLogInNew = '';
          postsForm.$setPristine();
        })
        .catch((err) => {
          if (err.status === 401) {
            this.mustLogInNew = 'Must be logged in to use this feature.'
          }

          throw err;
        });
    };

    this.updatePostRatingUp = (post) => {
      postsFac.updatePostRating(post)
        .then((newRating) => {
          post.rating = newRating.rating
          post.mustLogInVote = '';
        })
        .catch((err) => {
          throw err;
        });
    };

    this.updatePostRatingDown = (post) => {
      postsFac.updatePostRating(post)
        .then((newRating) => {
          post.rating = newRating.rating
          post.mustLogInVote = '';
        })
        .catch((err) => {
          throw err;
        });
    };

    this.upVote = (post) => {
      if (!this.isLoggedIn()) {
        return post.mustLogInVote = 'Must be logged in to use this feature.';
      }
      post.rating += 1;
      this.updatePostRatingUp(post);
    };

    this.downVote = (post) => {
      if (!this.isLoggedIn()) {
        return post.mustLogInVote = 'Must be logged in to use this feature.';
      }
      post.rating -= 1;
      this.updatePostRatingDown(post);
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
