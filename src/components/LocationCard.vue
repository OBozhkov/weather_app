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

		<h3 class="name-row">
			name: &nbsp;
			<span v-if="!isNameFieldVisible">{{ location.name }}</span>
			<button
				v-if="!isNameFieldVisible"
				class="btn-edit"
				@click="showNameField"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
					<path
						d="M7.127 22.562 0 24l1.438-7.128 5.689 5.69zm1.414-1.414L19.769 9.923l-5.69-5.692L2.852 15.458l5.689 5.69zM18.309 0l-2.816 2.817 5.691 5.691L24 5.689 18.309 0z"
						fill="grey"
					/>
				</svg>
			</button>
			<input
				v-if="isNameFieldVisible"
				type="text"
				:value="location.name"
				v-on:keyup.enter="updatelocationName"
			/>
		</h3>
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

		<p class="duration-display" :class="{ hidden: !isDurationVisible }">
			api call duration
			<strong>{{ location.api_call_duration }}</strong> ms
		</p>
	</div>
</template>

<script>
import tempChart from '@/components/tempChart.vue';
export default {
	name: 'LocationCard',
	components: { tempChart },
	props: {
		location: {
			type: Object,
			required: true
		},
		apiCallIndex: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			chartData: {},
			isDurationVisible: true,
			isNameFieldVisible: false
		};
	},
	watch: {
		apiCallIndex: function () {
			this.isDurationVisible = true;
			setTimeout(() => (this.isDurationVisible = false), 5000);
		}
	},
	methods: {
		removeLocation() {
			this.$emit('deleteLocation');
		},
		updatelocationName(event) {
			if (event.target.value !== this.location.name) {
				this.$emit('nameUpdate', event.target.value);
			}
			this.isNameFieldVisible = false;
		},
		showNameField() {
			this.isNameFieldVisible = true;
		}
	},
	mounted() {
		setTimeout(() => (this.isDurationVisible = false), 5000);
	}
};
</script>

<style lang="scss" scoped>
h3 {
	text-align: left;
	padding: 5px 20px;
	margin-bottom: 0;
	margin-top: 0;
}

.card {
	position: relative;
	border: 1px solid #000;
	border-radius: 5px;
	padding-top: 30px;

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

.btn-edit {
	border: none;
	background: none;
	margin-left: auto;
}
.duration-display {
	transition: all 0.5s;
	visibility: visible;
	opacity: 1;
	&.hidden {
		opacity: 0;
		visibility: visible;
	}
}
.name-row {
	padding: 5px 20px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-start;
}
</style>
