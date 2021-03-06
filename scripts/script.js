SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const srcg = new SpeechRecognition();

/* 継続して認識する機能？ これを使うと今回やりたいことと噛み合わないので使わない false */
/* on、offを繰り返すほうが都合がよい　*/
srcg.continuous = false;

/* 認識途中の結果も扱う true*/
srcg.interimResults = true;

/* 日本語を認識する */
srcg.lang = 'ja-JP';
		
/* 定数にCSSのIdをもたせる */
const fi = document.getElementById('first');
const s = document.getElementById('second');
const t = document.getElementById('third');
const fo = document.getElementById('four');
const test = document.getElementById('test');

/* 文字の大きさを動的に変更するためのID */
const fics = document.getElementById('firstcharsize');		
const secs = document.getElementById('secondcharsize');		
const otcs = document.getElementById('otherscharsize');		

/* 文字の大きさをスライダーで動的に変更 */
function changeFontSize() {
	fi.style.fontSize = event.target.value + "em";
	test.style.fontSize = (event.target.value) -(0.1) + "em";
}
fics.addEventListener("input", changeFontSize);

function changeSeFontSize() {
	s.style.fontSize = event.target.value + "em";
}
secs.addEventListener("input", changeSeFontSize);

function changeOtFontSize() {
	t.style.fontSize = event.target.value + "em";
	fo.style.fontSize = event.target.value + "em";
}
otcs.addEventListener("input", changeOtFontSize);
/*  */


/* テキスト（字幕）の一時保存 */
var temptext = '';

/* 字幕をずらすタイミングを管理するif文に使うフラグ */
var change = false;

/* ブラウザで読み込むと自動的に文字起こしを開始 */
srcg.start();		
		
srcg.onresult = function(e) { /* この関数の中でいろいろする */
	/* 開発用〜 */
	srcg.addEventListener('soundstart', function() {
		console.log('Sound Start');
	});
	srcg.addEventListener('soundend', function() {
		console.log('Sound End');
	});
	srcg.addEventListener('speechstart', function() {
		console.log('Speech Start');
		change = true; /* 喋りを検出すると字幕をずらす　フラグ */
	});
	srcg.addEventListener('speechend', function() {
		console.log('Speech End');
	});
	/* 〜開発用 */
		
	/* 喋り終わったら　の処理　elseは喋り中 */
	if (e.results[0].isFinal ) {
		test.innerHTML = '';
		/* 今喋ったことを出力する*/
		fi.innerHTML = e.results[0][0].transcript;
		
		/* 最新の結果（今しゃべったこと）を強調する　CSSの値を変更する */
		fi.style.setProperty('font-style', 'normal', 'important');
		fi.style.setProperty('font-size', fi.style.fontSize, 'important');
		fi.style.setProperty('font-weight', 'bold', 'important');

		/* 今喋ったばかりのことを保存しておく*/
		/* 次に喋ったときに、今しゃべったことを２番めにもっていくため*/
		/* この実装だと、喋りだすとすぐに一番目が更新されるため、事前に保存する必要がある*/
		temptext = fi.innerHTML;		
	}
	else { /* 喋っているときに、リアルタイムで不完全な字幕をつける*/
		/* 字幕の表示*/
		//fi.innerHTML = e.results[0][0].transcript;
		fi.innerHTML = '';
		/* 喋っているときは、文字の見た目を変える（CSSの値を変えることで）*/
		var testTextSize = test.style.fontSize;
		test.style.setProperty('font-style', 'italic', 'important');
		test.style.setProperty('font-size', testTextSize, 'important');
		test.style.setProperty('font-weight', 'normal', 'important');



		/* 追加中〜 */
		test.innerHTML = '';
		var inter = '';
		for (var j = e.resultIndex; j < e.results.length; ++j) {
			inter = e.results[j][0].transcript;
			if (inter != test.innerHTML) {
				test.innerHTML += inter;
			}
		}	
		//test.innerHTML = inter;

		/* 〜追加中 */



			/* 喋りだしたら、字幕をずらす 変数changeをフラグとして使っている*/
			if (change) {
				/* 字幕をずらす*/
				fo.innerHTML = t.innerHTML;
				t.innerHTML = s.innerHTML;
				s.innerHTML = temptext; // さっき喋ったことを確定したときに、１番目をtemptextに保存したのでそれを使う
				/* 一番目（最新）の字幕の文字を強調する　（CSSの値を変更する）*/
				s.style.setProperty('font-style', 'normal', 'important');
				s.style.setProperty('font-size', s.style.fontSize, 'important');
				s.style.setProperty('font-weight', 'normal', 'important');
					
				/* フラグの調整*/
				change = false;
			}
	}
}	

/* 何度も認識する処理（止まったらすぐに開始される)*/
srcg.onend = () => {
	srcg.start();
};
