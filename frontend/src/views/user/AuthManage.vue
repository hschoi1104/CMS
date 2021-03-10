<template>
	<v-container class="fill-height" fluid>
		<v-row class="fill-height">
			<v-col cols="4" md="4" class="ma-0 pa-0 fill-height">
				<v-card class="mt-3" elevation="0" minHeight="100%">
					<v-row>
						<v-col cols="12">
							<v-card-text class="ma-15 display-1 font-weight-bold"
								>| 권한관리</v-card-text
							>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="8" md="8" class="ma-0 pa-0 fill-height">
				<v-card class="mt-3" tile minHeight="100%" color="#E0E0E0">
					<v-row class="fill-height">
						<v-col cols="12">
							<v-data-iterator
								class="pa-15 fill-height"
								:items="users"
								hide-default-footer
							>
								<template v-slot:default="props">
									<v-row>
										<v-col
											v-for="user in props.items"
											:key="user.id"
											cols="12"
											sm="12"
											md="6"
											lg="6"
										>
											<v-card class="ma-5 pa-4">
												<v-card-title>
													<v-row align="center">
														<v-col class="font-weight-bold display-1" cols="7">
															{{ user.name }}
														</v-col>
														<v-col cols="5" class="text-right" justify="end">
															{{ user.id }}</v-col
														>
													</v-row>
												</v-card-title>
												<v-divider></v-divider>

												<v-card-actions>
													<v-list-item class="grow">
														<v-list-item-content>
															<v-list-item-title>관리자 권한</v-list-item-title>
														</v-list-item-content>

														<v-row align="center" justify="end">
															<v-switch
																inset
																:disabled="managerCount == 1 && user.isManager"
																v-model="user.isManager"
																@click="updateAuth(user)"
															></v-switch>
														</v-row>
													</v-list-item>
												</v-card-actions>
											</v-card>
										</v-col>
									</v-row>
								</template>
							</v-data-iterator>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
			{{ snackbar.text }}
			<v-btn text @click="snackbar.show = false">
				닫기
			</v-btn>
		</v-snackbar>
	</v-container>
</template>
<script>
import { UserService } from './../../service/user.service';
export default {
	name: 'AuthManage',
	data: function() {
		return {
			itemsPerPage: 4,
			users: [],
			snackbar: {
				show: false,
				text: '',
				color: '',
			},
		};
	},
	async created() {
		await this.fetch();
	},
	methods: {
		async fetch() {
			this.users = await UserService.getUsers();
		},
		async updateAuth(user) {
			await this.$axiosAuth.patch(`/user/${user.id}`, {
				isManager: user.isManager,
			});
			await this.fetch();
		},
	},
	computed: {
		managerCount() {
			let cnt = 0;
			this.users.forEach(element => {
				if (element.isManager) cnt++;
			});
			return cnt;
		},
	},
};
</script>
