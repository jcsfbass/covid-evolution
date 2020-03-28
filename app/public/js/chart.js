const Chart = Vue.extend({
    data() {
        return {
            chart: tui.chart
        }
    },
    methods: {
        getDataFrom(summary) {
            return summary
                .sort((firstCountry, secondCountry) => secondCountry.totalConfirmed - firstCountry.totalConfirmed)
                .map(country => new Object({
                    countryNames: [country.name],
                    totalConfirmed: [country.totalConfirmed],
                    totalDeaths: [country.totalDeaths],
                    totalRecovered: [country.totalRecovered]
                }))
                .reduce((accumulator, currentValue) => {
                    const reducedData = {};
                    for (let property in accumulator) {
                        reducedData[property] = accumulator[property].concat(currentValue[property]);
                    }

                    return reducedData;
                });
        },
        renderChart(data) {
            this.chart.columnChart(
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
        }
    },
    async mounted() {
        const response = await fetch('/api/covid/summary');
        const json = await response.json();

        const data = this.getDataFrom(json);
        return this.renderChart(data);
    }
});