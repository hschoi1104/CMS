import Vue from 'vue';
import VueRouter from 'vue-router';
import { UserService } from './../service/user.service';
import store from './../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('../views/user/Signup.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/user/Login.vue'),
		meta: { unauthorized: true },
	},
	{
		path: '/user/manage/auth',
		name: 'manageAuth',
		component: () => import('../views/user/AuthManage.vue'),
	},
	{
		path: '/arobject',
		name: 'arobject',
		component: () => import('../views/arObject/ArObject.vue'),
	},
	{
		path: '/files/:key',
		name: 'download',
		component: () => import('../views/arObject/Download.vue'),
		meta: { unauthorized: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (store.state.accessToken === null) {
		try {
			const result = await UserService.refreshToken();
			await store.dispatch('RefreshToken', result);
		} catch (err) {
			alert('로그인 해주세요');
			return next('/login');
		}
	}
	if (
		to.matched.some(record => record.meta.unauthorized) ||
		store.state.accessToken
	) {
		return next();
	}
	alert('로그인 해주세요');
	return next('/login');
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default router;
