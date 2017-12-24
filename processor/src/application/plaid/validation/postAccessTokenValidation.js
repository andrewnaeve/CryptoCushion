'use strict';
const Joi = require('joi');

const payloadValidator = Joi.object({
	publicToken: Joi.string().required()
});

module.exports = { payloadValidator };
