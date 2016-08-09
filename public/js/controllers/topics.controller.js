(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('TopicsCtrl', TopicsCtrl);

  TopicsCtrl.$inject = ['topicsFac', '$cookies'];

  function TopicsCtrl(topicsFac, $cookies) {
    this.topics = [];
    this.filterBy = '';
    this.pleaseLogin = '';
    this.alreadyThere = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.addTopic = (topicsForm) => {
      this.newTopic = {};

      const topicName = this.topicsForm.topicName.replace(/\w\S*/g,(txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      for (const topic of this.topics) {
        if (topic.name === topicName) {
          this.topicsForm.topicName = '';
          topicsForm.$setPristine();

          return this.alreadyThere =  'Topic already exists';
        }
      };

      this.alreadyThere = '';
      this.newTopic.name = topicName;

      topicsFac.addTopic(this.newTopic)
        .then((topic) => {
          this.pleaseLogin = '';
          this.topics.push(topic)
        })
        .catch((err) => {
          if (err.status === 401) {
            this.pleaseLogin = 'Please login to use this feature';
          }

          throw err;
        });

      this.topicsForm.topicName = '';
      this.newTopic = {};
      topicsForm.$setPristine();
      topicsForm.$setUntouched();
    };

    const activate = () => {
      topicsFac.getTopics()
        .then((topics) => {
          this.topics = topics;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };
})();
