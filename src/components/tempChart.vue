<template>
	<LineChartGenerator
		v-if="this.dataChart"
		id="my-chart-id"
		:options="chartOptions"
		:data="this.dataChart"
	/>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement
} from 'chart.js';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement
);

export default {
	name: 'tempChart',
	components: { LineChartGenerator },
	props: {
		dataChart: { type: Object }
	},
	data() {
		return {
			chartOptions: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: false,
						ticks: {
							callback: function (label, index, labels) {
								return `${parseFloat(label).toFixed(2)}°`;
							}
						}
					}
				}
			}
		};
	},
	mounted() {}
};
</script>

<style lang="scss" scoped></style>
