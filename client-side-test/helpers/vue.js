const mountSpy = jasmine.createSpy('mount');

const Vue = {
    extend(options) {
        return class VueChild {
            constructor() {
                this.$el = 'DOM element';
                this.$mount = mountSpy;
                Object.assign(this, options);
                Object.assign(this, options.data());
                Object.assign(this, options.methods);
            }
        }
    }
};