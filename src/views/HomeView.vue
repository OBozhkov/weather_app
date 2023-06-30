<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	name: 'HomeView',
	components: {
		HelloWorld
	},
	data() {
		return {
			coords: [
				{ name: 'Sofia', lat: '42.70', long: '23.32' },
				{ name: 'Varna', lat: '43.22', long: '27.92' }
			]
		};
	},
	methods: {
		async getData() {
			for (var i = this.coords.length - 1; i >= 0; i--) {
				await axios
					.get(
						`?latitude=${this.coords[i].lat}&longitude=${this.coords[i].long}&hourly=temperature_2m`
					)
					.then((response) => {
						console.log(response);

						return response;
					})
					.catch(() => {});
			}
		}
	},
	mounted() {
		this.getData();
	}
};
</script>
