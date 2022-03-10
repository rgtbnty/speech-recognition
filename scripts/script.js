SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
		const speech = new SpeechRecognition();
		speech.interimResults = true;
		speech.lang = 'ja-JP';
		
	/*	const btn = document.getElementById('btn');*/
	/*	const content = document.getElementById('content'); */
		const fi = document.getElementById('first');
		const s = document.getElementById('second');
		const t = document.getElementById('third');
		const fo = document.getElementById('four');
		
		const test = document.getElementById('test');
/*
		btn.addEventListener('click', function() {
		*/	speech.start(); /*
		});
		*/		

		var m = 2;

/*		var a_text = event.results[0][0].transcript
		a_text = text.innerHTML;
*/
		let final = '';
		speech.onresult = function(e) {
		/*	speech.stop();*/
			let itim = '';
			for (var i = e.resultIndex; i < e.results.length; ++i) {
				let transcript = e.results[i][0].transcript;
				if (e.results[i].isFinal) {
					final += transcript;
				} else {
					itim = transcript;
					test.innerHTML = itim;
				}
			}
			
			/* test.innerHTML = e.results[0][0].transcript */

			if (e.results[0].isFinal) {
				var autotext = e.results[0][0].transcript
				console.log(e);
				console.log(autotext);
			/*	content.innerHTML += '<div>' + autotext + '</div>';*/
				
				if (m == 2) {
					fo.innerHTML = t.innerHTML;
					t.innerHTML = s.innerHTML;
					s.innerHTML = fi.innerHTML;
					fi.innerHTML = autotext;
				}
			}
	}	

		speech.onend = () => {
			speech.start();
		};
