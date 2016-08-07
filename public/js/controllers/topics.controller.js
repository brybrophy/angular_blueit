(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('TopicsCtrl', TopicsCtrl);

  TopicsCtrl.$inject = ['topicsFac'];

  function TopicsCtrl(topicsFac) {
    this.topics = [];

    this.addTopic = (topicsForm) => {
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

      topicsFac.addTopic(this.newTopic)
        .then((topic) => {
          this.topics.push(topic)
        })
        .catch((err) => {
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
