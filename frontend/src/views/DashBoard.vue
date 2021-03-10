<template>
	<v-container class="fill-height" fluid>
		<v-row class="fill-height">
			<v-col cols="4" md="4" class="ma-0 pa-0 fill-height">
				<v-card class="pa-10 fill-height" tile>
					<v-row>
						<v-card-text class="ma-3 display-1 font-weight-bold">
							| 서비스 사용량
						</v-card-text>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-card tile class="ma-12">
								<v-row>
									<v-col cols="6">
										<v-card-title class="title font-wieght-bold">
											객체 다운로드 요청 수
										</v-card-title>
									</v-col>
									<v-col cols="6">
										<v-card-title class="title font-wieght-bold">
											{{ this.usage.download }} 회 / 10000 회
										</v-card-title>
									</v-col>
								</v-row>

								<v-sheet
									color="#426dad"
									elevation="12"
									height="50"
									:width="(this.usage.download / 10000) * 100"
								></v-sheet>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-card tile class="ma-12">
								<v-row>
									<v-col cols="6">
										<v-card-title class="title font-wieght-bold">
											사용 용량
										</v-card-title>
									</v-col>
									<v-col cols="6">
										<v-card-title class="title font-wieght-bold">
											{{ (this.usage.storage / 1e6).toFixed(3) }} MB / 10 GB
										</v-card-title>
									</v-col>
								</v-row>

								<v-sheet
									color="#426dad"
									elevation="12"
									height="50"
									:width="(this.usage.storage / 1e6 / 10000) * 100"
								></v-sheet>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="8" md="8" class="ma-0 pa-0 fill-height">
				<v-card class="pa-10 fill-height" tile color="#E0E0E0">
					<v-row>
						<v-card-title class="ma-3 display-1 font-weight-bold">
							| 오브젝트 사용량
						</v-card-title>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-card tile minHeight="100%" color="#E0E0E0" elevation="0">
								<template>
									<v-container align="center">
										<v-data-iterator
											:items="filteredItems"
											:items-per-page.sync="itemsPerPage"
											:page.sync="page"
											:search="search"
											:sort-by="sortBy.toLowerCase()"
											hide-default-footer
											class="fill-height"
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
														lg="6"
													>
														<v-card
															align="center"
															class="mt-4 mx-auto"
															max-width="550"
														>
															<v-sheet
																class="v-sheet--offset mx-auto"
																color="#426dad"
																elevation="5"
																max-width="calc(100% - 32px)"
															>
																<v-sparkline
																	:labels="labels"
																	:value="item.logs"
																	color="white"
																	line-width="2"
																	padding="20"
																></v-sparkline>
																<v-row class="align-center">
																	<v-col
																		v-for="(ele, index) in item.logs"
																		:key="index"
																		class="white--text caption"
																	>
																		{{ ele == 0 ? '' : ele }}
																	</v-col>
																</v-row>
															</v-sheet>

															<v-card-text class="pt-4">
																<div class="title font-weight-bold mb-2">
																	No.{{ item.objectId }} {{ item.name }}
																</div>

																<v-divider class="my-2"></v-divider>

																<span class="caption grey--text title-1">{{
																	item.content
																}}</span>
															</v-card-text>
														</v-card>
													</v-col>
												</v-row>
											</template>

											<template v-slot:footer>
												<v-row class="mt-2" align="center" justify="center">
													<span class="grey--text">페이지당 항목 수</span>
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
																<v-list-item-title>{{
																	number
																}}</v-list-item-title>
															</v-list-item>
														</v-list>
													</v-menu>

													<v-spacer></v-spacer>

													<span
														class="mr-4
            grey--text"
													>
														{{ numberOfPages }} 페이지 중 {{ page }} 페이지
													</span>
													<v-btn
														fab
														dark
														color="#426dad"
														class="mr-1"
														@click="formerPage"
													>
														<v-icon>mdi-chevron-left</v-icon>
													</v-btn>
													<v-btn
														fab
														dark
														color="#426dad"
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
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { ArObjectService } from './../service/arObject.service';
import { ObjectLogService } from './../service/objectLog.service';
import { MeterService } from './../service/meter.service';
import moment from 'moment';

export default {
	name: 'dashboard',
	data: function() {
		return {
			itemsPerPageArray: [4, 8, 16, 32, 50, 100],
			search: '',
			filter: {},
			page: 1,
			itemsPerPage: 4,
			sortBy: '전체 카테고리',
			items: [],
			categorys: [],
			updateCategorys: [],
			wid: '80%',
			labels: [],
			fetching: false,
			usage: {
				download: 0,
				storage: 0,
			},
		};
	},
	async created() {
		await this.fetch();
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
		async getLabel() {
			//  labels
			for (let i = 6; i >= 0; i--) {
				this.labels.push(
					moment(new Date())
						.subtract(i, 'day')
						.format('YYYY-MM-DD'),
				);
			}
		},
		async getLogsData() {
			for (let element of this.items) {
				let logMap = new Map();
				const logs = await ObjectLogService.getObjectLog(
					element.objectId,
					'2021-03-01',
					'2021-03-10',
				);
				for (let element of logs.data.result.created) {
					const date = moment(element).format('YYYY-MM-DD');
					if (logMap.has(date)) logMap.set(date, logMap.get(date) + 1);
					else logMap.set(date, 1);
				}
				element.logMap = logMap;
			}
		},
		async createLogValue() {
			this.items.forEach(element => {
				element.logs = [];
				console.log(typeof element.logMap);
				for (let ele of this.labels) {
					if (element.logMap.size > 0 && element.logMap.has(ele)) {
						element.logs.push(element.logMap.get(ele));
					} else {
						element.logs.push(0);
					}
				}
			});
		},
		async getUsage() {
			this.usage.download = await MeterService.getDownload(
				moment().year(),
				moment().month() + 1,
			);
			this.usage.storage = await MeterService.getStorage();
		},
		async fetch() {
			this.fetching = false;
			this.items = await ArObjectService.readArObjects();

			//sparkline 데이터
			await this.getLabel()
				.then(await this.getLogsData())
				.then(await this.createLogValue());

			//category
			let categorys = this.items.map(ele => {
				return ele.category;
			});
			this.categorys = [...new Set(categorys)];
			this.categorys.push('전체 카테고리');

			//usage
			this.getUsage();

			this.fetching = true;
		},
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
};
</script>
