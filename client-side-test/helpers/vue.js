const mountSpy = jasmine.createSpy();

const Vue = {
    extend() {
        return class VueChild {
            constructor() {
                this.$mount = mountSpy;
            }
        }
    }
};