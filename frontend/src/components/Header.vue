<template>
	<div>
		<v-app-bar color="#2F5FD2" class="white--text">
			<v-toolbar-title> <strong>동화 히어로 CMS</strong></v-toolbar-title>

			<v-spacer></v-spacer>

			<v-row>
				<v-card flat color="#2F5FD2" @click="$router.push('/object/upload')">
					<v-card-text class="white--text">오브젝트 업로드</v-card-text></v-card
				>
			</v-row>
			<v-row>
				<v-card flat color="#2F5FD2" @click="$router.push('/object/manage')">
					<v-card-text class="white--text">오브젝트 관리</v-card-text></v-card
				>
			</v-row>
			<v-row>
				<v-card flat color="#2F5FD2" @click="$router.push('/signup')">
					<v-card-text class="white--text">회원가입</v-card-text></v-card
				>
			</v-row>
			<v-row>
				<v-card flat color="#2F5FD2" @click="$router.push('/login')">
					<v-card-text class="white--text">로그인</v-card-text></v-card
				>
			</v-row>
		</v-app-bar>
	</div>
</template>
<script>
export default {
	name: 'Home',
	methods: {
		routerPush() {
			this.$router.push('/signup');
		},
	},
};
</script>
