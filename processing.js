window.onload = function () {
    
    "use strict";
    var paths = document.getElementsByTagName('path');
    var visualizer = document.getElementById('visualizer');
    var mask = visualizer.getElementById('mask');
    var h = document.getElementsByTagName('h1')[0];
    var f1 = document.getElementsByTagName('h2')[0];
    var f2 = document.getElementsByTagName('h2')[1];
    var vowel = document.getElementsByTagName('h2')[2];
    var path;

    var soundAllowed = function (stream) {
        window.persistAudioStream = stream;
        h.setAttribute('style', 'opacity: 0;');
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource( stream );
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        // var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        var frequencyArray = new Uint8Array(1024);
        analyser.smoothingTimeConstant = 0.7;
        analyser.fftSize = 2048;

        var formants = [];

        
        visualizer.setAttribute('viewBox', '0 0 255 255');

        function indexToFrequency (i) {
            return i * audioContent.sampleRate / analyser.fftSize;
            
        }
        function valueToPercent (value) {
            return value / 256;;
        }
        
        for (var i = 0 ; i < 255; i++) {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-dasharray', '4,1');
            mask.appendChild(path);
        }
        var doDraw = function () {
            requestAnimationFrame(doDraw);
            analyser.getByteFrequencyData(frequencyArray);
            formants = extractFormants(frequencyArray, indexToFrequency, valueToPercent);
            f1.innerHTML = "f1: "+Math.round(formants[0].freq);
            f2.innerHTML = "f2: "+Math.round(formants[1].freq);
            vowel.innerHTML = formantsToVowel(formants[0],formants[1]);
            
          	var adjustedLength;
            for (var i = 0 ; i < 255; i++) {
              	adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
                paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
            }

        }
        console.log(analyser.frequencyBinCount);
        doDraw();
        
    }

    var soundNotAllowed = function (error) {
        h.innerHTML = "You must allow the use of your microphone.";
        console.log(error);
    }
    navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

};