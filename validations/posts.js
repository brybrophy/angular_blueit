'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .max(63)
      .label('Title')
      .trim()
      .required(),
    imageUrl: Joi.string()
      .label('Image url')
      .trim()
      .required(),
    description: Joi.string()
      .label('Description')
      .trim()
      .required(),
    topicId: Joi.number()
      .required()
  }
};

module.exports.patch = {
  body: {
    title: Joi.string()
      .max(63)
      .label('Title')
      .trim()
      .required(),
    image_url: Joi.string()
      .label('Image url')
      .trim()
      .required(),
    description: Joi.string()
      .label('Description')
      .trim()
      .required(),
    id: Joi.number()
      .required(),
    topic_id: Joi.number()
      .required(),
    user_id: Joi.number()
      .required(),
    created_at: Joi.number()
      .required(),
    updated_at: Joi.number()
      .required(),
    rating: Joi.number()
      .label('Rating')
      .required()
  }
};
