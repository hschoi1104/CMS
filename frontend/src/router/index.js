import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/object/manage',
		name: 'objectManage',
		component: () =>
			import(
				/* webpackChunkName: "objectManage" */ '../views/object/Manage.vue'
			),
	},
	{
		path: '/object/upload',
		component: () =>
			import(
				/* webpackChunkName: "objectUpload" */ '../views/object/Upload.vue'
			),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () =>
			import(/* webpackChunkName: "signup" */ '../views/user/Signup.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/user/Login.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
