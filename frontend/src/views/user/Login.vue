<template>
	<v-container class="fill-height" fluid>
		<v-row class="fill-height">
			<v-col cols="12" md="7" class="d-flex ma-0 pa-0 fill-screen">
				<v-row align="center" justify="center">
					<v-col cols="12" sm="6" md="7">
						<v-card flat>
							<v-row>
								<v-col>
									<v-img
										icon
										left
										src="./../../assets/ccms_logo.png"
										height="350px"
										width="350px"
									></v-img>
								</v-col>
								<v-col class="d-flex align-center">
									<v-card-text align="center" class=" display-1 text--disabled"
										>Cloud Contents Management System</v-card-text
									>
								</v-col>
							</v-row>
						</v-card>
						<v-card flat style="z-index:2;" class="transparent">
							<v-toolbar flat>
								<v-toolbar-title class="ma-9 display-1 font-weight-bold">
									로그인
								</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<v-text-field
									filled
									rounded
									dense
									label="아이디"
									name="login"
									prepend-icon="fas fa-user"
									type="text"
									v-model="user.id"
									:error="!!errorMsg"
								/>

								<v-text-field
									filled
									rounded
									dense
									id="password"
									label="비밀번호"
									name="password"
									prepend-icon="fas fa-lock"
									type="password"
									v-model="user.password"
									:error="!!errorMsg"
									:error-messages="errorMsg"
								/>
							</v-card-text>
							<v-card-actions>
								<v-spacer />
								<v-btn
									rounded
									@click="$router.push('/signup')"
									color="#426dad"
									class="subtitle-1 white--text font-weight-bold"
								>
									회원가입
								</v-btn>
								<v-btn
									@click="onLogin"
									rounded
									color="#426dad"
									class="subtitle-1 white--text font-weight-bold"
								>
									로그인
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
				<div class="bg"></div>
			</v-col>
			<v-col cols="5" md="5" class="ma-0 pa-0 fill-height">
				<v-card class="d-flex align-end" color="#426dad" tile minHeight="100%">
					<span class="pa-2 white--text title font-weight-bold"
						>CCMS | Cloud Contents Management System</span
					>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'login',
	data: function() {
		return {
			user: {
				id: '',
				password: '',
			},
			errorMsg: '',
		};
	},
	methods: {
		async onLogin() {
			if (!this.user.id) {
				this.errorMsg = '아이디를 입력하세요.';
				return;
			}
			if (!this.user.password) {
				this.errorMsg = '비밀번호를 입력하세요.';
				return;
			}
			try {
				const { id, password } = this.user;
				await this.$store.dispatch('Login', { id, password });

				return this.$router.push('/');
			} catch (error) {
				this.errorMsg = '로그인 실패';
			}
		},
	},
};
</script>
<style>
.bg {
	background-image: url('../../assets/auth_background.png');
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 35%;
	height: 35%;
	background-size: contain;
	z-index: 1;
}
</style>
