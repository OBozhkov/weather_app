<template>
	<div class="card">
		<button @click="removeLocation" class="btn-delete">
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
				<path
					d="M13 3a1 1 0 0 0-1.014 1H6a1 1 0 1 0 0 2h18a1 1 0 1 0
				0-2h-5.986A1 1 0 0 0 17 3h-4zM6 8v16a2 2 0 0 0 2 2h14a2 2 0 0 0
				2-2V8H6z"
					fill="#ff0000"
				/>
			</svg>
		</button>
		<h3>name {{ location.name }}</h3>
		<h3>Coords lat {{ location.lat }}</h3>
		<h3>Coords lng {{ location.long }}</h3>

		<tempChart
			v-if="this.location.loaded"
			:dataChart="{
				labels: [
					`${new Date(
						this.location.tempData.hourly[0].dt * 1000
					).getHours()}:00 `,
					`${new Date(
						this.location.tempData.hourly[1].dt * 1000
					).getHours()}:00`,
					`${new Date(
						this.location.tempData.hourly[2].dt * 1000
					).getHours()}:00`,
					`${new Date(
						this.location.tempData.hourly[3].dt * 1000
					).getHours()}:00`
				],
				datasets: [
					{
						label: 'Temperature',
						data: [
							this.location?.tempData?.hourly[0].temp,
							this.location?.tempData?.hourly[1].temp,
							this.location?.tempData?.hourly[2].temp,
							this.location?.tempData?.hourly[3].temp
						]
					}
				]
			}"
		></tempChart>

		<p>
			Temperature after 12h will be -
			<strong> {{ this.location?.tempData?.hourly[11].temp }}° </strong>
		</p>

		<p>
			api call duration
			<strong>{{ location.api_call_duration }}</strong> ms
		</p>

		<!-- {{ location.tempData }} -->
	</div>
</template>

<script>
import tempChart from '@/components/tempChart.vue';
export default {
	name: 'LocationCard',
	components: { tempChart },
	props: {
		location: {
			type: Object
		}
	},
	data() {
		return {
			loaded: false,
			chartData: {}
			// chartData: {
			// 	labels: ['January', 'February', 'March'],
			// 	datasets: [{ data: [40, 20, 12] }]
			// },
		};
	},
	methods: {
		removeLocation() {
			console.log('child');
			this.$emit('deleteLocation');
		}
	},
	mounted() {
		console.log(this.location);
		console.log(this.location.tempData);
		console.log(this.location.tempData.hourly[0]);
		// this.loaded = true;
		this.chartData.labels = [
			new Date(this.location?.tempData?.hourly[0].dt * 1000),
			new Date(this.location?.tempData?.hourly[1].dt * 1000),
			new Date(this.location?.tempData?.hourly[2].dt * 1000),
			new Date(this.location?.tempData?.hourly[3].dt * 1000)
		];
		this.chartData.datasets = [
			{
				data: [
					this.location?.tempData?.hourly[0].temp,
					this.location?.tempData?.hourly[1].temp,
					this.location?.tempData?.hourly[2].temp,
					this.location?.tempData?.hourly[3].temp
				]
			}
		];
	}
};
</script>

<style lang="scss" scoped>
.card {
	position: relative;
	border: 1px solid #000;
	border-radius: 5px;

	.btn-delete {
		position: absolute;
		top: 0;
		right: 0;
		background: none;
		border-radius: 0;
		border: none;
		cursor: pointer;
	}
}
</style>
