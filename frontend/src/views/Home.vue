<template>
	<v-container class="fill-height" fluid>
		<v-row justify="center">
			<v-card flat class="transparent" style="z-index:2;">
				<v-row>
					<v-col cols="5" sm="12" md="5">
						<v-img
							icon
							left
							src="./../assets/ccms_logo.png"
							height="500px"
							width="500px"
						></v-img>
					</v-col>
					<v-col
						class="d-flex align-center"
						cols="7"
						sm="12"
						md="7"
						justify="center"
					>
						<v-row class="ma-3 pa-3">
							<v-card-title class="font-weight-bold display-3">
								CCMS
							</v-card-title>
							<v-card-text class=" display-2 text--disabled">
								Cloud Contents Management System</v-card-text
							>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-row>
		<div class="bg_bottomleft"></div>
		<div class="bg_topright"></div>
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
<style>
.bg_bottomleft {
	background-image: url('../assets/auth_background.png');
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 60%;
	height: 60%;
	background-size: contain;
	z-index: 1;
}
.bg_topright {
	background-image: url('../assets/auth_background.png');
	position: fixed;
	top: 0px;
	right: 0px;
	width: 60%;
	height: 60%;
	background-size: contain;
	z-index: 1;
	transform: rotate(180deg);
}
</style>
