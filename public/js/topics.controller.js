(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('TopicsCtrl', TopicsCtrl);

  TopicsCtrl.$inject = ['$http'];

  function TopicsCtrl($http) {
    this.topics = [];

    this.addTopic = () => {
      this.newTopic = {};

      const topicName = this.topicsForm.topicName.replace(/\w\S*/g,(txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      for (const topic of this.topics) {
        if (topic.name === topicName) {

          return this.topicsForm.topicName = 'Topic already exists';
        }
      };

      this.newTopic.name = topicName;

      $http.post('/api/topics', this.newTopic)
        .then((res) => {
          this.topics.push(res.data);
        })
        .catch((err) => {
          throw err;
        });

      this.topicsForm.topicName = '';
      this.newTopic = {};
    };

    const activate = () => {
      $http.get('/api/topics')
        .then((res) => {
          this.topics = res.data;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };
})();
