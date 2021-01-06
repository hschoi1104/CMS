<template>
	<v-app>
		<Header />
		<router-view />
		<Footer />
	</v-app>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
	name: 'App',

	components: {
		Footer,
	},

	data: () => ({
		//
	}),
};
</script>
