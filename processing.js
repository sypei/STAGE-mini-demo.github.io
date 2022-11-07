window.onload = function () {
    "use strict";
    var paths = document.getElementsByTagName('path');
    var visualizer = document.getElementById('visualizer');
    var mask = visualizer.getElementById('mask');
    var h = document.getElementsByTagName('h1')[0];
    var f1 = document.getElementsByTagName('h2')[0];
    var f2 = document.getElementsByTagName('h2')[1];
    var path;
    
    var soundAllowed = function (stream) {
        window.persistAudioStream = stream;
        h.setAttribute('style', 'opacity: 0;');
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource( stream );
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        analyser.fftSize = 1024;

        var extractFormants = require("./extractFormants");
        var formants = [];

        var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
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
            f1.innerHTML = Math.round(formants[0].freq);
            f2.innerHTML = Math.round(formants[1].freq);
          	var adjustedLength;
            for (var i = 0 ; i < 255; i++) {
              	adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
                paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
            }

        }
        doDraw();
    }

    var soundNotAllowed = function (error) {
        h.innerHTML = "You must allow the use of your microphone.";
        console.log(error);
    }
    navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

};