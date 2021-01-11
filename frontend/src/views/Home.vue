<template>
	<v-container class="fill-height text-center">
		<!-- <v-text>Home PAGE</v-text> -->
		<p>asdadfs</p>
		<p>{{ accessToken }}</p>
	</v-container>
</template>

<script>
export default {
	name: 'Home',
	computed: {
		accessToken() {
			return this.$store.state.accessToken;
		},
	},
};
</script>
