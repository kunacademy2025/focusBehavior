'use strict';

/**
 * training-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::training-schedule.training-schedule');
