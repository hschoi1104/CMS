<template>
	<div class="ma-3 pa-3">
		<v-data-iterator :items="users" hide-default-footer>
			<template v-slot:default="props">
				<v-row>
					<v-col
						v-for="user in props.items"
						:key="user.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card>
							<v-card-title class="subheading font-weight-bold">
								{{ user.name }}
							</v-card-title>

							<v-divider></v-divider>

							<v-list dense>
								<v-list-item>
									<v-list-item-content>ID:</v-list-item-content>
									<v-list-item-content class="align-end">
										{{ user.id }}
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</template>
		</v-data-iterator>
	</div>
</template>
<script>
import { UserService } from './../../service/user.service';
export default {
	name: 'AuthManage',
	data: function() {
		return {
			itemsPerPage: 4,
			users: [],
		};
	},
	async created() {
		this.users = await UserService.getUsers();
	},
	methods: {
		async fetch() {},
	},
};
</script>
