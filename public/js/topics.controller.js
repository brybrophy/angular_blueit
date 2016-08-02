(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('TopicsCtrl', TopicsCtrl);

  TopicsCtrl.$inject = ['$http'];

  function TopicsCtrl($http) {
    this.sortBy = ' ';
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

      this.newTopic.id = this.topics[this.topics.length - 1].id + 1
      this.newTopic.name = topicName;

      this.topics.push(this.newTopic);

      const activate = () => {
        return $http.post('/api/topics', this.newTopic)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            throw err;
          });
      };

      activate();

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
