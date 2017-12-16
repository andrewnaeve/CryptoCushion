// import { axios } from 'axios';
// var

// const endpoint = process.env.ENDPOINT;

// export const handler = Plaid.create({
// 	clientName: 'bitCushion',
// 	env: 'sandbox',
// 	key: process.env.PLAID_PUBLIC_KEY,
// 	product: ['transactions'],
// 	onSuccess: function(public_token, metadata) {
// 		axios
// 			.post(`${endpoing}/get_access_token`, {
// 				public_token: public_token
// 			})
// 			.then(response => {
// 				console.log('response from post:', response);
// 			});
// 	}
// });
