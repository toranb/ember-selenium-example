var PromiseMixin = Ember.Object.create({
    promise: function(url, type, hash) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
          hash.success = function(json) {
            return Ember.run(null, resolve, json);
          };
          hash.error = function(json) {
            if (json && json.then) {
              json.then = null;
            }
            return Ember.run(null, reject, json);
          };
          $.ajax(hash);
        });
    }
});

export default PromiseMixin;
