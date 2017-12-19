'use strict';
const Joi = require('joi');

const payloadValidator = Joi.object().keys({
	publicToken: Joi.string().required()
});

module.exports = { payloadValidator };
