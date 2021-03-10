<template>
	<div>
		<v-container>
			<v-app-bar class="transparent" height="100" absolute>
				<v-card flat class="transparent" @click="$router.push('/')">
					<v-row align="center" justify="center">
						<v-col cols="12">
							<v-img
								icon
								right
								height="100px"
								width="100px"
								src="./../assets/ccms_logo.png"
							>
							</v-img>
						</v-col>
					</v-row>
				</v-card>
				<v-spacer></v-spacer>

				<v-row class="justify-end">
					<v-card v-if="loginCheck" flat @click="$router.push('/dashboard')">
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>대시보드</v-card-text
						>
					</v-card>
					<v-card
						v-if="loginCheck"
						flat
						@click="$router.push('/user/manage/auth')"
					>
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>권한 관리</v-card-text
						>
					</v-card>
					<v-card v-if="loginCheck" flat @click="Push('/arobject')">
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>오브젝트 관리</v-card-text
						>
					</v-card>
					<v-card v-if="!loginCheck" flat @click="Push('/signup')">
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>회원가입</v-card-text
						>
					</v-card>

					<v-card v-if="!loginCheck" flat @click="Push('/login')">
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>로그인</v-card-text
						>
					</v-card>
					<v-card v-if="loginCheck" flat @click="Logout">
						<v-card-text class="#BDBDBD-text headline font-weight-medium"
							>로그아웃</v-card-text
						>
					</v-card>
				</v-row>
			</v-app-bar>
		</v-container>
	</div>
</template>
<script>
export default {
	name: 'Header',
	methods: {
		Logout() {
			this.$store.dispatch('Logout');
		},
		Push(to) {
			this.$router.push(to).catch(() => {});
		},
	},
	computed: {
		loginCheck() {
			return this.$store.state.accessToken;
		},
	},
};
</script>
