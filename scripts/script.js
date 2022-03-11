SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
		const srcg = new SpeechRecognition();

		/* 継続して認識する機能？ これを使うと今回やりたいことと噛み合わないので使わない false */
		/* on、offを繰り返すほうが都合がよい　*/
		srcg.continuous = false;

		/* 認識途中の結果も扱う */
		srcg.interimResults = true;

		/* 日本語を認識する */
		srcg.lang = 'ja-JP';
		
		/* Id周り */
		/* スタート・ストップボタンはあとで実装する */
		const on = document.getElementById('on');
		const off = document.getElementById('off');
	/*	const btn = document.getElementById('btn');*/
	/*	const content = document.getElementById('content'); */
		const fi = document.getElementById('first');
		const s = document.getElementById('second');
		const t = document.getElementById('third');
		const fo = document.getElementById('four');
		const temp = document.getElementById('temp');	
		/* 開発用 */
		const test = document.getElementById('test');
		var stopspeech = 0; /* 喋り終わる直前のものも追加されてしまうのを防ぎたい */

		/* ブラウザで読み込むと自動的に文字起こしを開始 */
		srcg.start();		
		
		/*あとで消す（下でif m==2のためにつかっているが、意味がなかった） */
		var m = 2;

/*		var a_text = event.results[0][0].transcript
		a_text = text.innerHTML;
*/

		let final = '';
		srcg.onresult = function(e) { /* この関数の中でいろいろする？ */
		/*	srcg.stop();*/
			/* 認識中の結果をリアルタイムで表示するための処理（パソコンでタイプすると文字が次々に出てくる感じ */
			let itim = '';
			/* ループ処理 だけどいらなくね？ 
			for (var i = e.resultIndex; i < e.results.length; ++i) {
				let transcript = e.results[i][0].transcript;
				if (e.results[i].isFinal) {
					final += transcript;
				} else {
					itim = transcript;
					test.innerHTML = itim;
				}
			}
			*/
			
			srcg.addEventListener('soundstart', function() {
				console.log('Sound Start');
			});
			srcg.addEventListener('soundend', function() {
				console.log('Sound End');
			});
			srcg.addEventListener('speechstart', function() {
				console.log('Speech Start');
								});
			srcg.addEventListener('speechend', function() {
				console.log('Speech End');
			});
			/* 追加中 */ /*
			srcg.addEventListener('soundstart', event => function() {
			fo.innerHTML = t.innerHTML;
			t.innerHTML = s.innerHTML;
			s.innerHTML = fi.innerHTML;
			});		
			srcg.addEventListener('soundstart', function() {
				console.log('Sound Start');
			});
			srcg.addEventListener('soundend', function() {
				console.log('Sound End');
			});
			srcg.addEventListener('speechstart', function() {
				console.log('Speech Start');
			});
			srcg.addEventListener('speechend', function() {
				console.log('Speech End');
			});
		*/	/*	追加中	*/			
			test.innerHTML = e.results[0][0].transcript; // 確定　使う
	//		temp.innerHTML = e.results[0][0].transcript; // お試し
			var f1 = document.getElementById('first');
			/* test.innerHTML = e.results[0][0].transcript */

			/* 認識が確定したら結果を出力 */
			/* 根っこの部分　基本的に触らない */
			if (e.results[0].isFinal ) {
				var autotext = e.results[0][0].transcript
				console.log(e);
				console.log(autotext);
			/*	content.innerHTML += '<div>' + autotext + '</div>';*/
				
				//first.style.font-style = "normal";
				//f1.style.font-style = "normal";
			//	if (m == 2) { /* このifはいらないのであとで消す */
					/* 字幕の出し方（下が最新、上が古い）*/
					fo.innerHTML = t.innerHTML;
					t.innerHTML = s.innerHTML;
					s.innerHTML = fi.innerHTML;
			//		fi.innerHTML = autotext;
			//	} 
			
				fi.innerHTML = e.results[0][0].transcript; // お試し
			}
			else { /* おためし　*/
				//first.style.font-style = "italic";
				fi.innerHTML = e.results[0][0].transcript;
			}
	}	

		/* 何度も認識する（止まったらすぐに開始される)*/
		srcg.onend = () => {
			srcg.start();
		};

/* 音声認識スタート・ストップボタン（未実装）
on.addEventListener('click' function() {
	srcg.start();	
});


off.addEventListener('click' function() {
	srcg.stop();	
});
*/

