describe('chart', function () {
    const chart = new Chart();

    describe('when mounted', function () {
        beforeAll(async () => {
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

            await chart.mounted();
        });

        it('should fetch summary from internal api', () => {
            expect(window.fetch).toHaveBeenCalledWith('/api/covid/summary');
        });

        it('should render chart just one time', () => expect(tui.chart.columnChart).toHaveBeenCalledTimes(1));

        it('should render the chart based on received data', () => expect(tui.chart.columnChart).toHaveBeenCalledWith(
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
        ));
    });
});
