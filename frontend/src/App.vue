<template>
	<v-app>
		<Header />
		<v-container class="fill-screen">
			<router-view />
		</v-container>
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
