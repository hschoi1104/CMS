<template>
	<div>
		<v-app-bar color="#2F5FD2" class="white--text">
			<v-toolbar-title> <strong>동화 히어로 CMS</strong></v-toolbar-title>

			<v-spacer></v-spacer>

			<v-row>
				<router-link to="/object/upload" class="link_white"
					>오브젝트 업로드</router-link
				>
			</v-row>
			<v-row>
				<router-link to="/object/manage" class="link_white"
					>오브젝트 관리</router-link
				>
			</v-row>
			<v-row>
				<router-link to="/signUp" class="link_white">회원가입</router-link>
			</v-row>
			<v-row>
				<router-link to="/login" class="link_white">로그인</router-link>
			</v-row>
		</v-app-bar>
	</div>
</template>
