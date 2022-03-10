var recog = new SpeechRecognitioin(); 
const txt = document.getElementById("txt");

recog.continuous = true;
recog.lang = 'ja-JP';
recog.intermiResults = true;
recog.maxAlternatives = 1;

recog.onsoundstart = function() {
	console.log('some sound is detected');
}

btn.addEventListener("click", () => {
	recog.start();
	console.log('Speech!');
});

recog.onresult = function(event) {
	txt.innerHTML = event.results[0][0].transcript;
	console.log('event.results[0][0])';
}
