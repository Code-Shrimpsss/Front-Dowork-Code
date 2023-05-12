console.log(1);
setTimeout(() => {
	console.log(2);

	setTimeout(() => {
		console.log(3);
	});

	new Promise((reslove) => {
		console.log(4);
		reslove();
	})
		.then(() => {
			console.log(5);
		})
		.then(console.log(6));
});

new Promise((reslove) => {
	console.log(7);
	reslove();
}).then(() => {
	setTimeout(() => {
		new Promise((reslove) => {
			console.log(8);
		}).then(() => {
			console.log(9);
		});
	});
});

console.log(10);
