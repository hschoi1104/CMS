<template>
	<!-- <v-container class="fill-height" fluid>
		<v-row
			v-if="timerCount > 0"
			class="display-1"
			align="center"
			justify="center"
		>
			{{ timerCount }}초 뒤 다운로드가 시작됩니다.
		</v-row>
		<v-row v-if="timerCount == 0" align="center" justify="center">
			"done!"
		</v-row>
	</v-container> -->
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
						<v-card flat>
							<v-row
								v-if="timerCount > 0"
								class="display-1"
								align="center"
								justify="center"
							>
								{{ timerCount }}초 뒤 다운로드가 시작됩니다.
							</v-row>
							<v-row
								v-if="timerCount == 0"
								class="display-1"
								align="center"
								justify="center"
							>
								다운로드가 곧 시작됩니다.
							</v-row>
						</v-card>
					</v-col>
				</v-row>
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
import { ArObjectService } from './../../service/arObject.service';
import { ShortUrlService } from './../../service/shortUrl.service';
import { ObjectLogService } from './../../service/objectLog.service';
export default {
	name: 'download',
	data() {
		return {
			timerCount: 5,
			s3Info: {},
			keyInfo: {},
			files: {},
		};
	},
	async created() {
		const keyInfo = await ShortUrlService.readShortUrl(this.$route.params.key);
		const objectInfo = await ArObjectService.readArObject(keyInfo[0].objectId);
		await ObjectLogService.createObjectLog(keyInfo[0].objectId);
		this.files = objectInfo.s3Info;
	},
	method: {},
	watch: {
		timerCount: {
			handler(value) {
				if (value > 0) {
					setTimeout(() => {
						this.timerCount--;
					}, 1000);
				} else {
					this.files.forEach(file => {
						ArObjectService.downloadArObject(file);
					});
				}
			},
			immediate: true, // This ensures the watcher is triggered upon creation
		},
	},
};
</script>
