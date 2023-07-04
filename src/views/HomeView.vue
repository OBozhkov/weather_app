<template>
	<div class="home">
		<div class="top-bar">
			<input type="text" placeholder="Choose location" ref="origin" />
		</div>

		<div>
			<div class="location-card-holder">
				<template v-for="(item, index) in coords">
					<LocationCard
						v-if="item.loaded"
						:location="item"
						:key="`Location-${item.lat}-${item.lon}`"
						:apiCallIndex="apiCallIndex"
						@deleteLocation="removeLocation(index)"
						@nameUpdate="
							(data) => updateLocationName({ index, data })
						"
					/>
				</template>

				<h1 v-if="!coords.length">Choose Location</h1>
			</div>
		</div>
	</div>
</template>

<script>
import LocationCard from '@/components/LocationCard.vue';

export default {
	name: 'HomeView',
	components: {
		LocationCard
	},
	data() {
		return {
			apiCallIndex: 0,
			loaded: false,
			coords: [
				// {
				// 	name: 'Sofia',
				// 	lat: '42.70',
				// 	long: '23.32',
				// 	api_call_duration: 0,
				// 	loaded: false
				// },
				// {
				// 	name: 'Varna',
				// 	lat: '43.22',
				// 	long: '27.92',
				// 	api_call_duration: 0,
				// 	loaded: false
				// }
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
			this.apiCallIndex++;
			console.log(this.coords);
			for (var i = this.coords.length - 1; i >= 0; i--) {
				const urlParams = `onecall?lat=${this.coords[i].lat}&lon=${this.coords[i].long}&units=metric&appid=52b44120ce8d0cfae8c39df0de976bf4`;

				await axios
					.get(urlParams)
					.then((response) => {
						//console.log(response);

						this.coords[i].api_call_duration = response.duration;
						this.coords[i].tempData = response.data;
						this.coords[i].loaded = true;
					})
					.catch(() => {});
			}
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
			if (storedLocations && storedLocations.length) {
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

				this.coords = locations;
			}
		},
		removeLocation(index) {
			console.log(index);
			this.coords.splice(index, 1);

			this.updateLocationsInStorage();
		},
		updateLocationName(data) {
			console.log(data);
			const localStorageItems = JSON.parse(
				localStorage.getItem('locations')
			);

			const oldName = this.coords[data.index].name;
			const indexOfOldName = localStorageItems.findIndex(
				(item) => item.name === oldName
			);

			localStorageItems[indexOfOldName].name = data.data;
			this.coords[data.index].name = data.data;

			localStorage.setItem(
				'locations',
				JSON.stringify(localStorageItems)
			);
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
			this.updateLocationsInStorage();
			this.$refs['origin'].value = '';
		});

		setInterval(
			function () {
				this.getData();
			}.bind(this),
			60000
		);
	}
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	display: block;
	width: 100%;
}
.location-card-holder {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	.card {
		width: calc(33.33% - 30px);
		margin: 15px;
	}
}
.top-bar {
	padding: 10px;

	input {
		width: 100%;
		max-width: 300px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
}
</style>
