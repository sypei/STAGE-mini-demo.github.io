function formantsToVowel (f1, f2) {
    // if (f1.freq < 200) return "f1 too low";
    if (f1.db < 0.3 && f2.db < 0.3) return ".";
  
    if (f1.freq > 200 && f1.freq < 500 && 
        f2.freq > 4000 && f2.freq < 5000) {
        return "i";
    }
    if (f1.freq > 250 && f1.freq < 600 && 
        f2.freq > 2500 && f2.freq < 3000 && f2.db > 0.3) {
            return "e";
    }   
    if (f1.freq > 400 && f1.freq < 600 && 
        f2.freq < 1600 && f2.db < 0.2) {
       return "u";
    }
    if (f2.freq > 3000 && f2.freq < 4000 && f2.db < 0.3) {
        return "o";
    }
    if (f1.freq > 400 && f1.freq < 600 && 
        f2.freq > 1500 && f2.freq < 1600) {
    return "a";
    }
    return ".";
  }