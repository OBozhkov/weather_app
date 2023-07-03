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
	// Chart as ChartJS,
	// Title,
	// Tooltip,
	// Legend,
	// BarElement,
	// CategoryScale,
	// LinearScale
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
	// Title,
	// Tooltip,
	// Legend,
	// BarElement,
	// CategoryScale,
	// LinearScale
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
		//chartData: { type: Object }
	},
	// watch: {
	// 	chartData: function (newVal, oldVal) {
	// 		// watch it
	// 		console.log('Prop changed: ', newVal, ' | was: ', oldVal);
	// 	}
	// },

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
						// scaleLabel: {
						// 	display: true,
						// 	labelString: '1k = 1000'
						// }
					}
				}
			}
		};
	},
	mounted() {
		console.log(typeof this.dataChart);
	}
};
</script>

<style lang="css" scoped></style>
