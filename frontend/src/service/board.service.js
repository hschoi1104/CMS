import axiosResource from './axios.resource';

export class BoardService {
	static createPost = async post => {
		try {
			const result = await axiosResource.post('/board', {
				title: post.title,
				content: post.content,
				url: post.url,
				author: 'hschoi1104',
			});
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
