export default Ember.Route.extend({
  notifications: [],
  setupController: function (controller) {
    controller.set('notifications', this.get('notifications'));
    this._super.apply(this, arguments);
  },
  actions: {
    logoutUser: function () {
      this.get('session.auth').logout();
      this.transitionTo('login');
    },
    notify: function (type, message, options) {

      options = options || {};

      var notifications = this.get('notifications'),
          notification = Ember.Object.create({
            className: 'wy-tray-item' + (type ? '-' + type : ''),
            message: message
          });

      if (options.icon) {
        notification.set('iconClass', 'icon icon-' + options.icon);
      }

      notifications.pushObject(notification);

      setTimeout(function () {
        notification.set('state', 'on');
      }, 10);

      setTimeout(function () {
        notification.set('state', null);
      }.bind(this), 4500);

      setTimeout(function () {
        notifications.removeObject(notification);
      }.bind(this), 5000);

    }
  }
});
