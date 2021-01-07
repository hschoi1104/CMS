<template>
	<v-app>
		<Header />

		<div class="d-flex justify-center align-center" style="height: 100%">
			<router-view />
		</div>
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
