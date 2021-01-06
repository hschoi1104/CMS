<template>
	<v-app>
		<Header />
		<router-view />
		<Footer />
	</v-app>
</template>

<script>
export default {
	name: 'App',

	components: {
		Header: () => import('./components/Header'),
		Footer: () => import('./components/Footer'),
	},

	data: () => ({
		//
	}),
};
</script>
