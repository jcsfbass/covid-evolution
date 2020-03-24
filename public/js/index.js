new Vue({
    el: '#app',
    methods: {
        getDataFrom(summary) {
            return summary['Countries']
                .sort((firstCountry, secondCountry) => secondCountry['TotalConfirmed'] - firstCountry['TotalConfirmed'])
                .map(country => new Object({
                    countryNames: [country['Country']],
                    totalConfirmed: [country['TotalConfirmed']],
                    totalDeaths: [country['TotalDeaths']],
                    totalRecovered: [country['TotalRecovered']]
                }))
                .reduce((accumulator, currentValue) => {
                    const reducedData = {};
                    for (let property in accumulator) {
                        reducedData[property] = accumulator[property].concat(currentValue[property]);
                    }

                    return reducedData;
                });
        }
    },
    mounted() {
        fetch('https://api.covid19api.com/summary')
            .then(response => response.json())
            .then(summary => {
                const data = this.getDataFrom(summary);

                tui.chart.columnChart(
                    this.$el,
                    {
                        categories: data.countryNames,
                        series: [
                            {
                                name: 'Total Confirmed',
                                data: data.totalConfirmed
                            },
                            {
                                name: 'Total Deaths',
                                data: data.totalDeaths
                            },
                            {
                                name: 'Total Recovered',
                                data: data.totalRecovered
                            }
                        ]
                    },
                    {
                        chart: {
                            width: data.countryNames.length * 50,
                            height: 850,
                            title: 'Coronavirus - COVID-19',
                            format: '1,000'
                        },
                        yAxis: {title: 'Number of people'},
                        xAxis: {title: 'Country'},
                        legend: {align: 'left'},
                        series: {allowSelect: true},
                        theme: 'main-theme'
                    });
            });
    }
});