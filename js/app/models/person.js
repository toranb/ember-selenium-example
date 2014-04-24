import AjaxMixin from 'js/mixins/ajax';

var Person = Ember.Object.extend({
    firstName: '',
    lastName: '',
    fullName: function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');
        return firstName + ' ' + lastName;
    }.property('firstName', 'lastName')
});

Person.reopenClass(AjaxMixin, {
    people: [],
    add: function(hash) {
        var person = Person.create(hash);
        this.people.pushObject(person);
    },
    remove: function(person) {
        this.people.removeObject(person);
    },
    find: function() {
        this.xhr("/api/people", "GET").then(function(response) {
            response.forEach(function(hash) {
                var person = Person.create(hash);
                Ember.run(Person.people, Person.people.pushObject, person);
            });
        });
        return this.people;
    }
});

export default Person;
