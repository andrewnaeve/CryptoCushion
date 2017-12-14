const ioc = require('electrolyte');

exports.register = (server, options, next) => {
  // Register routes now that jwt auth strategy has been registered
  return Promise.all([
    // ioc.create('activity/activity-routes'),
    // ioc.create('application/application-routes'),
    // ioc.create('artist/artist-routes'),
    // ioc.create('artist/artist-document-routes'),
    // ioc.create('artist/artist-information-routes'),
    // ioc.create('asset-request/asset-request-routes'),
    // ioc.create('asset-type/asset-type-routes'),
    // ioc.create('catering/catering-routes'),
    // ioc.create('contact/contact-routes'),
    // ioc.create('credential/credential-routes'),
    // ioc.create('credential-request/credential-request-routes'),
    // ioc.create('department/department-routes'),
    // ioc.create('department/department-settings-routes'),
    // ioc.create('event/event-routes'),
    // ioc.create('festival/festival-routes'),
    // ioc.create('file/file-routes'),
    // ioc.create('intern/intern-routes'),
    // ioc.create('issuance-method/issuance-method-routes'),
    // ioc.create('lodging/lodging-routes'),
    // ioc.create('media/media-routes'),
    // ioc.create('period/period-routes'),
    // ioc.create('promoter/promoter-routes'),
    // ioc.create('pulse/pulse-routes'),
    // ioc.create('report/report-routes'),
    // ioc.create('stage/stage-routes'),
    // ioc.create('transportation/transportation-routes'),
    // ioc.create('user/user-routes'),
    // ioc.create('zone/zone-routes'),
  ])
    .then(routeArrays => {
      server.route([{
        method: 'GET',
        path: '/health-check',
        handler: (req, reply) => reply('all good'),
      }]);
      routeArrays.forEach(routes => {
        server.route(routes);
      });
      next();
    })
}

exports.register.attributes = {
  name: 'routes',
  version: '0.0.1',
};