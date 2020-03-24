const theme = {
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};
tui.chart.registerTheme('covid-theme', theme);

new Vue({
    el: '#app',
    data: {},
    mounted() {
        fetch('https://api.covid19api.com/summary')
            .then(response => response.json())
            .then(summary => {
                const result = summary['Countries']
                    .sort((firstCountry, secondCountry) => secondCountry['TotalConfirmed'] - firstCountry['TotalConfirmed'])
                    .map(country => new Object({
                        countryNames: [country['Country']],
                        totalConfirmed: [country['TotalConfirmed']],
                        totalDeaths: [country['TotalDeaths']],
                        totalRecovered: [country['TotalRecovered']]
                    }))
                    .reduce((accumulator, currentValue) => new Object({
                        countryNames: accumulator.countryNames.concat(currentValue.countryNames),
                        totalConfirmed: accumulator.totalConfirmed.concat(currentValue.totalConfirmed),
                        totalDeaths: accumulator.totalDeaths.concat(currentValue.totalDeaths),
                        totalRecovered: accumulator.totalRecovered.concat(currentValue.totalRecovered)
                    }));

                tui.chart.columnChart(
                    this.$el,
                    {
                        categories: result.countryNames,
                        series: [
                            {
                                name: 'Total Confirmed',
                                data: result.totalConfirmed
                            },
                            {
                                name: 'Total Deaths',
                                data: result.totalDeaths
                            },
                            {
                                name: 'Total Recovered',
                                data: result.totalRecovered
                            }
                        ]
                    },
                    {
                        chart: {
                            width: result.countryNames.length * 50,
                            height: 850,
                            title: 'Coronavirus - COVID-19',
                            format: '1,000'
                        },
                        yAxis: {
                            title: 'Number of people'
                        },
                        xAxis: {
                            title: 'Country'
                        },
                        legend: {
                            align: 'left'
                        },
                        series: {
                            allowSelect: true
                        },
                        theme: 'covid-theme'
                    });
            });
    }
});