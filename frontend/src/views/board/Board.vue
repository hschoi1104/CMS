<template>
	<v-container fluid>
		<div class="ma-3 pa-3">
			<v-data-iterator
				:items="posts"
				:items-per-page.sync="itemsPerPage"
				:page="page"
				:search="search"
				:sort-by="sortBy.toLowerCase()"
				:sort-desc="sortDesc"
				hide-default-footer
			>
				<template v-slot:header>
					<v-toolbar class="mb-1">
						<v-text-field
							v-model="search"
							clearable
							flat
							solo-inverted
							hide-details
							prepend-inner-icon="mdi-magnify"
							label="검색"
						></v-text-field>
						<template v-if="$vuetify.breakpoint.mdAndUp">
							<v-spacer></v-spacer>
							<v-btn @click="openWirteDialog" color="primary">
								게시글 작성
							</v-btn>
						</template>
					</v-toolbar>
				</template>

				<template v-slot:default="props">
					<v-row>
						<v-col
							v-for="item in props.items"
							:key="item._id"
							cols="12"
							sm="6"
							md="4"
							lg="6"
						>
							<v-card class="ma-3 pa-2">
								<v-row>
									<v-col cols="5">
										<v-img
											justify="center"
											align="center"
											:src="
												`https://user-images.githubusercontent.com/43382559/105813660-864fcb00-5ff3-11eb-8e3b-27291e8b3030.png`
											"
											:lazy-src="
												`https://picsum.photos/10/6?image=${1 * 5 + 10}`
											"
											aspect-ratio="1"
											class="grey lighten-2"
											max-height="250"
											max-width="250"
										>
											<template v-slot:placeholder>
												<v-row
													class="fill-height ma-0"
													align="center"
													justify="center"
												>
													<v-progress-circular
														indeterminate
														color="grey lighten-5"
													></v-progress-circular>
												</v-row>
											</template>
										</v-img>
									</v-col>
									<v-col cols="7">
										<v-toolbar flat class="display-1">
											{{ item.title }}
										</v-toolbar>
										<v-list dense>
											<v-list-item
												v-for="(key, index) in filteredKeys"
												:key="index"
											>
												<v-list-item-content v-if="key == 'author'">
													작성자
												</v-list-item-content>
												<v-list-item-content v-if="key == 'created'">
													작성일
												</v-list-item-content>
												<v-list-item-content v-if="key == 'modified'">
													최종수정일
												</v-list-item-content>
												<v-list-item-content v-if="key == 'content'">
													내용
												</v-list-item-content>
												<v-list-item-content class="align-end">
													{{ item[key.toLowerCase()] }}
												</v-list-item-content>
											</v-list-item>
										</v-list>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</template>

				<template v-slot:footer>
					<v-row class="mt-2" align="center" justify="center">
						<span class="grey--text">Items per page</span>
						<v-menu offset-y>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									dark
									text
									color="primary"
									class="ml-2"
									v-bind="attrs"
									v-on="on"
								>
									{{ itemsPerPage }}
									<v-icon>mdi-chevron-down</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item
									v-for="(number, index) in itemsPerPageArray"
									:key="index"
									@click="updateItemsPerPage(number)"
								>
									<v-list-item-title>{{ number }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>

						<v-spacer></v-spacer>

						<span
							class="mr-4
            grey--text"
						>
							Page {{ page }} of {{ numberOfPages }}
						</span>
						<v-btn
							fab
							dark
							color="blue darken-3"
							class="mr-1"
							@click="formerPage"
						>
							<v-icon>mdi-chevron-left</v-icon>
						</v-btn>
						<v-btn
							fab
							dark
							color="blue darken-3"
							class="ml-1"
							@click="nextPage"
						>
							<v-icon>mdi-chevron-right</v-icon>
						</v-btn>
					</v-row>
				</template>
			</v-data-iterator>
		</div>
		<template>
			<v-dialog v-model="post.dialog" persistent max-width="60%">
				<validation-observer ref="observer" v-slot="{ invalid }">
					<v-card>
						<v-card-title>
							<span class="display-1">게시글 작성</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12">
										<validation-provider
											v-slot="{ errors }"
											name="Title"
											:rules="{
												required: true,
												min: 2,
												max: 20,
											}"
										>
											<v-text-field
												v-model="post.title"
												:error-messages="errors"
												label="제목*"
												hint="제목을 입력해 주세요"
											></v-text-field>
										</validation-provider>
									</v-col>
									<v-col cols="12">
										<validation-provider
											v-slot="{ errors }"
											name="Content"
											:rules="{
												required: true,
												min: 2,
												max: 100,
											}"
										>
											<v-textarea
												v-model="post.content"
												:error-messages="errors"
												name="content"
												label="내용*"
												hint="내용을 작성해 주세요"
											></v-textarea>
										</validation-provider>
									</v-col>

									<v-col cols="12" sm="12">
										<div>
											<v-file-input
												chips
												multiple
												show-size
												counter
												label="파일을 선택해 주세요"
											></v-file-input>
										</div>
									</v-col>
								</v-row>
							</v-container>
							<small>*필수 작성 필드</small>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeWirteDialog">
								닫기
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								:disabled="invalid"
								@click="creatPost(post)"
							>
								작성
							</v-btn>
						</v-card-actions>
					</v-card>
				</validation-observer>
			</v-dialog>
		</template>
	</v-container>
</template>

<script>
import moment from 'moment';
import { required, max, min } from 'vee-validate/dist/rules';
import {
	extend,
	ValidationObserver,
	ValidationProvider,
	setInteractionMode,
} from 'vee-validate';
import { BoardService } from './../../service/board.service';

setInteractionMode('eager');

extend('required', {
	...required,
	message: '빈칸일 수 없습니다.',
});

extend('max', {
	...max,
	message: '{length}자 보다 길수 없습니다.',
});
extend('min', {
	...min,
	message: '{length}자 보다 길어야 합니다.',
});

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		return {
			itemsPerPageArray: [8, 16, 32, 64, 128],
			search: '',
			filter: {},
			sortDesc: true,
			page: 1,
			itemsPerPage: 8,
			posts: [],
			sortBy: 'Name',
			keys: ['author', 'created', 'modified', 'content'],
			dialog: false,
			post: {
				dialog: false,
				title: '',
				content: '',
				url: '',
			},
		};
	},
	async created() {
		await this.fetch();
		await this.dateformat();
	},
	computed: {
		numberOfPages() {
			return Math.ceil(this.posts.length / this.itemsPerPage);
		},
		filteredKeys() {
			return this.keys.filter(key => key !== 'Name');
		},
	},
	methods: {
		nextPage() {
			if (this.page + 1 <= this.numberOfPages) this.page += 1;
		},
		formerPage() {
			if (this.page - 1 >= 1) this.page -= 1;
		},
		updateItemsPerPage(number) {
			this.itemsPerPage = number;
		},
		async fetch() {
			try {
				const result = await this.$axiosResource.get('/board');
				this.posts = result.data.result;
			} catch (err) {
				this.posts = [];
			}
		},
		async dateformat() {
			this.posts.forEach(function(item) {
				item.created = moment(item.created).format(
					'YYYY년 MM월 DD일 mm분 ss초',
				);
				item.modified = moment(item.modified).format(
					'YYYY년 MM월 DD일 mm분 ss초',
				);
			});
		},
		openWirteDialog() {
			this.post.dialog = true;
		},
		closeWirteDialog() {
			this.post.dialog = false;
			this.post.title = '';
			this.post.content = '';
			this.post.url = '';
		},
		async creatPost(post) {
			await BoardService.createPost(post);
			this.closeWirteDialog();
			await this.fetch();
		},
	},
};
</script>
