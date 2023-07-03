<template>
	<div class="home">
		<input type="text" placeholder="Origin" ref="origin" />

		<img alt="Vue logo" src="../assets/logo.png" />

		<!-- <template v-for="item in this.coords">
			<span
				>{{ item.name }} {{ item.lat }} {{ item.long }}
				{{ item.loaded }}</span
			>
			<br />
		</template> -->

		<div>
			<div class="location-card-holder">
				<template v-for="(item, index) in coords">
					<LocationCard
						v-if="item.loaded"
						:location="item"
						:key="`Location-${item.lat}-${item.lon}`"
						@deleteLocation="removeLocation(index)"
					/>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import LocationCard from '@/components/LocationCard.vue';

export default {
	name: 'HomeView',
	components: {
		LocationCard
	},
	data() {
		return {
			loaded: false,
			coords: [
				{
					name: 'Sofia',
					lat: '42.70',
					long: '23.32',
					api_call_duration: 0,
					loaded: false
				},
				{
					name: 'Varna',
					lat: '43.22',
					long: '27.92',
					api_call_duration: 0,
					loaded: false
				}
			]
		};
	},
	watch: {
		coords() {
			this.getData();
		}
	},
	methods: {
		async getData() {
			console.log(this.coords);
			for (var i = this.coords.length - 1; i >= 0; i--) {
				const urlParams = `onecall?lat=${this.coords[i].lat}&lon=${this.coords[i].long}&units=metric&appid=52b44120ce8d0cfae8c39df0de976bf4`;

				await axios
					.get(urlParams)
					.then((response) => {
						console.log(response);
						// const item = {
						// 	...this.coords[i],
						// 	api_call_duration: response.duration,
						// 	tempData: response.data,
						// 	loaded: true
						// };
						// console.log(item);
						// this.coords[i] = item;

						this.coords[i].api_call_duration = response.duration;
						this.coords[i].tempData = response.data;
						this.coords[i].loaded = true;
						//return response;
					})
					.catch(() => {});
				//console.log(this.coords[i].name);

				// if (this.coords[i].name === undefined) {
				// 	await axios
				// 		.get({
				// 			url: '?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyCvb_AWfb4ElHlm6D3IlbJEWvRBaQxQOA0',
				// 			baseURL:
				// 				'http://maps.googleapis.com/maps/api/geocode/json'
				// 		})
				// 		.then((response) => {
				// 			//console.log(response);
				// 			this.coords[i].name[response.name];
				// 		})
				// 		.catch(() => {});
				// }
			}

			// set locations in localstorage
			//localStorage.setItem('names', JSON.stringify(names));
		},
		updateLocationsInStorage() {
			const sampleLocations = [];
			for (var i = this.coords.length - 1; i >= 0; i--) {
				sampleLocations.push({
					name: this.coords[i].name,
					lat: this.coords[i].lat,
					long: this.coords[i].long
				});
			}

			localStorage.setItem('locations', JSON.stringify(sampleLocations));
		},
		getLocationsFromStorage() {
			const storedLocations = JSON.parse(
				localStorage.getItem('locations')
			);
			if (storedLocations.length) {
				const locations = [];
				for (var i = storedLocations.length - 1; i >= 0; i--) {
					locations.push({
						name: storedLocations[i].name,
						lat: storedLocations[i].lat,
						long: storedLocations[i].long,
						api_call_duration: 0,
						loaded: false
					});
				}
				console.log(locations);

				this.coords = locations;
			}
		},
		removeLocation(index) {
			console.log(index);
			this.coords.splice(index, 1);

			this.updateLocationsInStorage();
		}
	},
	mounted() {
		// first check if there are stored locations in localstorage
		this.getLocationsFromStorage();

		this.getData();

		const google = window.google;
		const autocomplete = new google.maps.places.Autocomplete(
			this.$refs['origin']
		);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();

			const updatedCoords = this.coords;
			updatedCoords.push({
				name: place.name,
				lat: place.geometry.location.lat(),
				long: place.geometry.location.lng(),
				api_call_duration: 0,
				loaded: false
			});

			this.coords = updatedCoords;

			//this.getData();

			this.updateLocationsInStorage();
		});
	}
};
</script>

<style lang="scss">
.location-card-holder {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	.card {
		width: calc(33.33% - 30px);
		margin: 15px;
	}
}
</style>
