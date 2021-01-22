function getNonceStr() {
	const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k',
		'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	]
	let ranDomStr = '';
	for (let i = 0; i < 20; i++) {
		ranDomStr += arr[Math.floor(Math.random() * 16)]
	}
	return ranDomStr;
}

function openWebView(url, title) {
	let view = plus.webview.create(url, 'pay', {
		'titleNView': {
			'style': 'transparent',
			'backgroundColor': '#fff',
			'titleText': title,
			'titleColor': '#333',
			progress: {
				color: '#08BF30'
			},
			buttons: [{
				type: 'close',
				float: 'left',
				background: '#000',
				onclick: clickButton
			}]
		}
	});

	view.addEventListener('titleUpdate', function() {
		view.show();
	});

	function clickButton() {
		uni.$emit('web_close', true)
		plus.webview.close(view, 'fade-out', 250, 'auto');
	};
}
export {
	getNonceStr,
	openWebView
};
