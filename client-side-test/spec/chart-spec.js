describe('chart', function () {
    const chart = new Chart();

    describe('when mounted', function () {
        it('should render the chart based on received data', async () => {
            spyOn(window, 'fetch').and.returnValue(new Promise(resolve => {
                resolve({
                    json() {
                        return [
                            {
                                name: 'Brazil',
                                totalConfirmed: 2985,
                                totalDeaths: 77,
                                totalRecovered: 6
                            },
                            {
                                name: 'Germany',
                                totalConfirmed: 43938,
                                totalDeaths: 267,
                                totalRecovered: 5673
                            }
                        ];
                    }
                });
            }));

            expect(tui.chart.columnChart).not.toHaveBeenCalled();

            await chart.mounted();

            expect(tui.chart.columnChart).toHaveBeenCalled();
            expect(tui.chart.columnChart).toHaveBeenCalledTimes(1);
            expect(tui.chart.columnChart).toHaveBeenCalledWith(
                'DOM element',
                jasmine.objectContaining({
                    categories: ['Germany', 'Brazil'],
                    series: [
                        {
                            name: 'Total Confirmed',
                            data: [43938, 2985]
                        },
                        {
                            name: 'Total Deaths',
                            data: [267, 77]
                        },
                        {
                            name: 'Total Recovered',
                            data: [5673, 6]
                        }
                    ]
                }),
                {asymmetricMatch: actual => actual.chart.width === 100 && actual.theme === 'main-theme'}
            );
        });
    });
});
