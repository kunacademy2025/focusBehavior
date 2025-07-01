'use strict';

/**
 * event-booking service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-booking.event-booking');
