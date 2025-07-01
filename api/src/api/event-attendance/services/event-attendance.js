'use strict';

/**
 * event-attendance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-attendance.event-attendance');
