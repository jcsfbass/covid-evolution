describe('chart', function () {
    const chart = new Chart();

    describe('when mounted', function () {
        it('should render the chart based on received data', () => {
            spyOn(window, 'fetch').and.returnValue(new Promise(resolve => {
                resolve({
                    json() {
                        return {
                            'Countries': [
                                {
                                    'Country': 'Brazil',
                                    'TotalConfirmed': 2985,
                                    'TotalDeaths': 77,
                                    'TotalRecovered': 6
                                },
                                {
                                    'Country': 'Germany',
                                    'TotalConfirmed': 43938,
                                    'TotalDeaths': 267,
                                    'TotalRecovered': 5673
                                }
                            ]
                        };
                    }
                });
            }));

            expect(tui.chart.columnChart).not.toHaveBeenCalled();

            chart.mounted().then(() => {
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
                    {asymmetricMatch: actual => actual.chart.width === 100}
                );
            });
        });
    });
});
