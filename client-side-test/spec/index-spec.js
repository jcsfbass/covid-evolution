describe('index', () => {

    it('should mount chart in the #app element', () => expect(mountSpy).toHaveBeenCalledWith('#app'));

    it('should mount just one time', () => expect(mountSpy).toHaveBeenCalledTimes(1));
});
