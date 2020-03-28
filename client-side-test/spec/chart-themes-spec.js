describe('chart-themes', () => {
    it('should register main theme', () => expect(tui.chart.registerTheme).toHaveBeenCalledWith(
        'main-theme',
        {
            asymmetricMatch: actual => {
                let colors = actual.series.colors;

                return colors.length === 10 && colors.every(color => color.constructor === String);
            }
        }
    ));
});