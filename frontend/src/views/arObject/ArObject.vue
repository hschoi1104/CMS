<template>
	<v-container class="fill-height" fluid>
		<v-row class="fill-height">
			<v-col cols="12" md="12" class="ma-0 pa-0 fill-height">
				<v-card tile minHeight="100%" color="#E0E0E0">
					<template>
						<v-container align="center">
							<v-data-iterator
								:items="filteredItems"
								:items-per-page.sync="itemsPerPage"
								:page.sync="page"
								:search="search"
								:sort-by="sortBy.toLowerCase()"
								hide-default-footer
							>
								<template v-slot:header>
									<v-toolbar color="white" class="mb-1">
										<v-text-field
											v-model="search"
											clearable
											flat
											solo-inverted
											hide-details
											prepend-inner-icon="mdi-magnify"
											label="Search"
										></v-text-field>
										<template v-if="$vuetify.breakpoint.mdAndUp">
											<v-spacer></v-spacer>
											<v-select
												v-model="sortBy"
												flat
												solo-inverted
												hide-details
												:items="categorys"
												prepend-inner-icon="mdi-magnify"
												label="Sort by"
											></v-select>
										</template>
										<template v-if="$vuetify.breakpoint.mdAndUp">
											<v-spacer></v-spacer>
											<v-btn
												rounded
												dark
												color="#426dad"
												@click="openDialog('create')"
											>
												오브젝트 업로드
											</v-btn>
										</template>
									</v-toolbar>
								</template>

								<template v-slot:default="props">
									<v-row>
										<v-col
											v-for="item in props.items"
											:key="item.name"
											cols="12"
											sm="6"
											md="6"
											lg="4"
										>
											<v-card
												class="ma-3 pa-2"
												@click="readPost(item.objectId)"
											>
												<v-row>
													<v-col cols="5">
														<v-img
															v-if="item.s3Info === ''"
															justify="center"
															align="center"
															src="@/assets/object.png"
															aspect-ratio="1"
															class="grey lighten-2"
															max-height="100%"
															max-width="100%"
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
														<v-img
															v-if="item.s3Info !== ''"
															justify="center"
															align="center"
															:src="getImgUrl(item)"
															aspect-ratio="1"
															class="grey lighten-2"
															max-height="100%"
															max-width="100%"
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
														<v-card-title>
															No.{{ item.objectId }} {{ item.name }}
														</v-card-title>
														<v-card-subtitle>
															{{ item.content }}
														</v-card-subtitle>
														<v-row class="caption ml-1">
															<v-col cols="3">
																카테고리
															</v-col>
															<v-col cols="9">
																{{ item.category }}
															</v-col>
														</v-row>
														<v-row class="caption  ml-1">
															<v-col cols="3">
																첨부파일
															</v-col>
															<v-col cols="9">
																<v-chip
																	v-for="file in item.s3Info"
																	:key="file.originalname"
																	class="ma-2"
																	x-small
																>
																	<div v-if="file.originalname.length < 10">
																		{{ file.originalname }}
																	</div>
																	<div v-else>
																		{{
																			file.originalname.substring(0, 4) +
																				'..' +
																				file.originalname.substring(
																					file.originalname.length - 4,
																					file.originalname.length,
																				)
																		}}
																	</div>
																</v-chip>
															</v-col>
														</v-row>
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
						</v-container>
					</template>
				</v-card>
			</v-col>
		</v-row>
		<template>
			<v-dialog v-model="dialog.read" persistent max-width="60%">
				<v-card>
					<v-card-title>
						<span class="display-1 pa-7"
							>#{{ post.objectId }} {{ post.name }}</span
						>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="ma-3">
						<v-container>
							<v-row class="ma-1">
								<v-col cols="5">
									<v-img
										v-if="getImgUrl(post) === ''"
										justify="center"
										align="center"
										src="@/assets/object.png"
										aspect-ratio="1"
										class="grey lighten-2"
										max-height="100%"
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
									<v-img
										v-if="getImgUrl(post) !== ''"
										justify="center"
										align="center"
										:src="getImgUrl(post)"
										aspect-ratio="1"
										class="grey lighten-2"
										max-height="100%"
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
								<v-col cols="7" class="pa-10">
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.modifiedManager"
											readonly
											label="작성자"
										></v-text-field>
									</v-row>
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.created"
											readonly
											label="생성일"
										></v-text-field>
									</v-row>
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.modified"
											label="수정일"
											readonly
										></v-text-field>
									</v-row>
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.category"
											readonly
											label="카테고리"
										></v-text-field>
									</v-row>
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.downloadCount"
											readonly
											label="다운로드 수"
										></v-text-field>
									</v-row>
									<v-row>
										<v-textarea
											filled
											rounded
											dense
											v-model="post.content"
											readonly
											label="내용"
										></v-textarea>
									</v-row>
								</v-col>
							</v-row>
							<v-row class="ma-3">
								<span class="display-5">다운로드 링크</span>
								<v-spacer></v-spacer>
								<v-btn
									v-if="shortUrl.key == ''"
									rounded
									color="#426dad"
									class="subtitle-1 white--text "
									@click.prevent="createShortUrl(post.objectId)"
									><v-card-text>링크 발급하기</v-card-text></v-btn
								>
							</v-row>
							<v-row class="ma-3">
								<span class="display-5">첨부파일</span>
								<v-spacer></v-spacer>
								<v-btn
									rounded
									color="#426dad"
									class="subtitle-1 white--text"
									@click.prevent="downloadItems(post.s3Info)"
									><v-card-text>전체 다운로드</v-card-text></v-btn
								>
							</v-row>
							<v-row>
								<v-col cols="12" sm="12">
									<v-chip
										v-for="file in post.s3Info"
										:key="file.originalname"
										class="ma-2"
										@click.prevent="downloadItems([...file])"
									>
										{{ file.originalname }}
									</v-chip>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions class="pa-10">
						<v-btn
							rounded
							color="#C62828"
							class="subtitle-1 white--text font-weight-bold"
							@click="deletePost(post.objectId)"
						>
							삭제
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn
							rounded
							color="#426dad"
							class="subtitle-1 white--text font-weight-bold"
							@click="openDialog('update')"
						>
							수정
						</v-btn>
						<v-btn
							rounded
							color="#426dad"
							class="subtitle-1 white--text font-weight-bold"
							@click="closeDialog()"
						>
							닫기
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
		<template>
			<v-dialog v-model="dialog.update" persistent max-width="60%">
				<v-card>
					<v-card-title>
						<span class="display-1 pa-7">AR Object 수정</span>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="ma-3">
						<v-container>
							<v-row class="ma-1">
								<v-col cols="5">
									<v-img
										v-if="getImgUrl(post) === ''"
										justify="center"
										align="center"
										src="@/assets/object.png"
										aspect-ratio="1"
										class="grey lighten-2"
										max-height="100%"
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
									<v-img
										v-if="getImgUrl(post) !== ''"
										justify="center"
										align="center"
										:src="getImgUrl(post)"
										aspect-ratio="1"
										class="grey lighten-2"
										max-height="100%"
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
								<v-col cols="7" class="pa-10">
									<v-row>
										<v-text-field
											filled
											rounded
											dense
											v-model="post.name"
											label="오브젝트명"
										></v-text-field>
									</v-row>
									<v-row>
										<v-combobox
											filled
											rounded
											dense
											v-model="post.category"
											label="카테고리"
											:items="categorys"
										></v-combobox>
									</v-row>
									<v-row>
										<v-textarea
											filled
											rounded
											dense
											v-model="post.content"
											name="content"
											label="내용"
										></v-textarea>
									</v-row>
								</v-col>
							</v-row>
							<v-row class="ma-3">
								<span class="display-5">첨부파일</span>
								<v-spacer></v-spacer>
								<span class="error-text">첨부파일은 수정이 불가능 합니다.</span>
							</v-row>
							<v-row>
								<v-col cols="12" sm="12">
									<v-chip
										v-for="file in post.s3Info"
										:key="file.originalname"
										class="ma-2"
										@click.prevent="downloadItems([...file])"
									>
										{{ file.originalname }}
									</v-chip>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions class="pa-10">
						<v-spacer></v-spacer>
						<v-btn
							rounded
							color="#426dad"
							class="subtitle-1 white--text font-weight-bold"
							@click="updatePost(post)"
						>
							수정
						</v-btn>
						<v-btn
							rounded
							color="#426dad"
							class="subtitle-1 white--text font-weight-bold"
							@click="closeDialog()"
						>
							취소
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
		<template>
			<v-dialog v-model="dialog.create" persistent max-width="60%">
				<v-form>
					<v-card>
						<v-card-title>
							<span class="display-1 pa-7">AR Object 업로드</span>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text class="ma-3">
							<v-container class="pa-10">
								<v-row>
									<v-col cols="12">
										<v-row>
											<v-text-field
												filled
												rounded
												dense
												v-model="post.name"
												label="오브젝트명"
											></v-text-field>
										</v-row>
										<v-row>
											<v-combobox
												filled
												rounded
												dense
												v-model="post.category"
												:items="categorys"
												:hint="'새로운 카테고리는 타이핑 하세요'"
												:persistent-hint="ture"
												label="카테고리"
											></v-combobox>
										</v-row>
										<v-row>
											<v-textarea
												filled
												rounded
												dense
												v-model="post.content"
												name="content"
												label="내용"
											></v-textarea>
										</v-row>
									</v-col>
								</v-row>
								<v-row>
									<span class="display-5">첨부파일</span>
								</v-row>
								<v-row>
									<v-file-input
										v-model="post.file"
										counter
										multiple
										show-size
										truncate-length="15"
									></v-file-input>
								</v-row>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								v-on:click.prevent="createPost()"
								color="blue darken-1"
								text
							>
								생성
							</v-btn>
							<v-btn color="blue darken-1" text @click="closeDialog()">
								취소
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-dialog>
		</template>
	</v-container>
</template>

<script>
import moment from 'moment';

import { ArObjectService } from './../../service/arObject.service';
import { ShortUrlService } from './../../service/shortUrl.service';

export default {
	data() {
		return {
			itemsPerPageArray: [8, 16, 32, 50, 100],
			search: '',
			filter: {},
			page: 1,
			itemsPerPage: 8,
			sortBy: '전체 카테고리',
			items: [],
			categorys: [],
			updateCategorys: [],
			dialog: {
				create: false,
				read: false,
				update: false,
			},
			post: [{ s3Info: '' }],
			shortUrl: {
				key: '',
				link: '',
				api: '',
			},
		};
	},
	async created() {
		await this.fetch();
	},
	computed: {
		numberOfPages() {
			return Math.ceil(this.items.length / this.itemsPerPage);
		},
		filteredItems() {
			if (this.sortBy == '전체 카테고리') return this.items;
			else return this.items.filter(item => item.category === this.sortBy);
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
			this.items = await ArObjectService.readArObjects();
			let categorys = this.items.map(ele => {
				return ele.category;
			});

			this.categorys = [...new Set(categorys)];
			this.categorys.push('전체 카테고리');
		},
		async readPost(objectId) {
			this.post = await ArObjectService.readArObject(objectId);
			this.post.created = moment(this.post.created).format(
				'YY년 MM월 DD일 HH:MM:SS',
			);
			this.post.modified = moment(this.post.modified).format(
				'YY년 MM월 DD일 HH:MM:SS',
			);
			this.dialog.read = true;
		},
		closeDialog() {
			this.post = new Object();
			this.dialog.read = false;
			this.dialog.create = false;
			this.dialog.update = false;
		},
		async createPost() {
			const formData = new FormData();
			formData.append('name', this.post.name);
			formData.append('modifiedManager', 'hschoi1104');
			for (let file of this.post.file) {
				formData.append('image', file, file.name);
			}
			formData.append('content', this.post.content);
			formData.append('category', this.post.category);
			formData.append('modified', new Date());
			await ArObjectService.createArObject(formData);
			this.closeDialog();
			await this.fetch();
		},
		async deletePost(objectId) {
			await ArObjectService.deleteArObject(objectId);
			this.closeDialog();
			await this.fetch();
		},
		async updatePost(post) {
			await ArObjectService.updateArObject(post);
			this.closeDialog();
			await this.fetch();
		},
		openDialog(option) {
			this.dialog.create = false;
			this.dialog.read = false;
			this.dialog.update = false;
			if (option === 'create') this.dialog.create = true;
			if (option === 'update') this.dialog.update = true;
			if (option === 'read') this.dialog.read = true;
		},
		async downloadItems(files) {
			files.forEach(file => {
				ArObjectService.downloadArObject(file);
			});
		},
		getImgUrl(post) {
			if (post.s3Info !== undefined) return post.s3Info[0].location;
			else return '';
		},
		async createShortUrl(objectId) {
			await ShortUrlService.createShortUrl(objectId);
		},
	},
};
</script>
