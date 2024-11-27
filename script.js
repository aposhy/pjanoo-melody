let isMelodyPlaying = false;
let isMelody2Playing = false;
let isDrumsPlaying = false;
let isChordsPlaying = false;
let isBassPlaying = false;
let melodyPart = null;
let melody2Part = null;
let drumPart = null;
let chordPart = null;
let bassPart = null;

document.getElementById('playMelodyButton').addEventListener('click', async () => {
    if (!isMelodyPlaying) {
        await Tone.start();
        Tone.Transport.bpm.value = 240;
        playMainMelody();
        isMelodyPlaying = true;
        toggleButtons('melody');
    }
});

document.getElementById('stopMelodyButton').addEventListener('click', () => {
    if (isMelodyPlaying) {
        melodyPart.stop();
        isMelodyPlaying = false;
        toggleButtons('melody');
    }
});

document.getElementById('playMelody2Button').addEventListener('click', async () => {
    if (!isMelody2Playing) {
        await Tone.start();
        playMelody2();
        isMelody2Playing = true;
        toggleButtons('melody2');
    }
});

document.getElementById('stopMelody2Button').addEventListener('click', () => {
    if (isMelody2Playing) {
        melody2Part.stop();
        isMelody2Playing = false;
        toggleButtons('melody2');
    }
});

document.getElementById('playDrumsButton').addEventListener('click', async () => {
    if (!isDrumsPlaying) {
        await Tone.start();
        playDrums();
        isDrumsPlaying = true;
        toggleButtons('drums');
    }
});

document.getElementById('stopDrumsButton').addEventListener('click', () => {
    if (isDrumsPlaying) {
        drumPart.stop();
        isDrumsPlaying = false;
        toggleButtons('drums');
    }
});

document.getElementById('playChordsButton').addEventListener('click', async () => {
    if (!isChordsPlaying) {
        await Tone.start();
        playChords();
        isChordsPlaying = true;
        toggleButtons('chords');
    }
});

document.getElementById('stopChordsButton').addEventListener('click', () => {
    if (isChordsPlaying) {
        chordPart.stop();
        isChordsPlaying = false;
        toggleButtons('chords');
    }
});

document.getElementById('playBassButton').addEventListener('click', async () => {
    if (!isBassPlaying) {
        await Tone.start();
        playBass();
        isBassPlaying = true;
        toggleButtons('bass');
    }
});

document.getElementById('stopBassButton').addEventListener('click', () => {
    if (isBassPlaying) {
        bassPart.stop();
        isBassPlaying = false;
        toggleButtons('bass');
    }
});

function playMainMelody() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const melody = [
        { time: '0:0', note: 'Bb4', duration: '8n' },
        { time: '0:1', note: 'Bb4', duration: '8n' },
        { time: '0:2', note: 'A4', duration: '8n' },
        { time: '0:3', note: 'A4', duration: '8n' },
        { time: '1:0', note: 'G4', duration: '8n' },
        { time: '1:2', note: 'G4', duration: '8n' },
        { time: '1:3', note: 'G4', duration: '8n' },
    ];

    const melodyWithOctave = melody.map(note => ({
        ...note,
        note: Tone.Frequency(note.note).transpose(12).toNote()
    }));

    const combinedMelody = melody.concat(melodyWithOctave);

    melodyPart = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
    }, combinedMelody);

    melodyPart.loop = true;
    melodyPart.loopEnd = '2:0';
    melodyPart.start(0);
    Tone.Transport.start();
}
function playMelody2() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const melody2 = [
        { time: '0:0', note: 'C5', duration: '16n' },
        { time: '0:0.5', note: 'D5', duration: '16n' },
        { time: '0:1', note: 'F5', duration: '16n' },
        { time: '0:1.5', note: 'C5', duration: '16n' },
        { time: '0:2', note: 'D5', duration: '16n' },
        { time: '0:2.5', note: 'F5', duration: '16n' },
        { time: '0:3', note: 'C5', duration: '16n' },
        { time: '0:3.5', note: 'D5', duration: '16n' },
        { time: '1:0', note: 'G5', duration: '16n' },
    ];

    melody2Part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note.note, note.duration, time);
    }, melody2);

    melody2Part.loop = true;
    melody2Part.loopEnd = '2:0';
    melody2Part.start(0);
    Tone.Transport.start();
}
function playDrums() {
    const kick = new Tone.MembraneSynth().toDestination();
    const snare = new Tone.NoiseSynth({ noise: { type: 'white' } }).toDestination();
    const clap = new Tone.MetalSynth({ frequency: 200 }).toDestination();

    const drumSequence = [
        { time: '0:0', instrument: 'kick' },
        { time: '0:2', instrument: 'kick' },
        { time: '1:0', instrument: 'kick' },
        { time: '1:2', instrument: 'kick' },
        { time: '0:2', instrument: 'snare' },
        { time: '1:2', instrument: 'snare' },
        { time: '0:1', instrument: 'clap' },
        { time: '1:3', instrument: 'clap' },
    ];
    drumPart = new Tone.Part((time, step) => {
        if (step.instrument === 'kick') kick.triggerAttackRelease('C1', '8n', time);
        if (step.instrument === 'snare') snare.triggerAttackRelease('16n', time);
        if (step.instrument === 'clap') clap.triggerAttackRelease('8n', time);
    }, drumSequence);
    drumPart.loop = true;
    drumPart.loopEnd = '2:0';
    drumPart.start(0);
    Tone.Transport.start();
}
function playChords() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    const chords = [
        { time: '0:0', notes: ['G3', 'Bb3', 'D4'] },
        { time: '0:2', notes: ['F3', 'A3', 'C4'] },
        { time: '1:0', notes: ['Eb3', 'G3', 'Bb3'] },
        { time: '1:2', notes: ['F3', 'A3', 'C4'] },
        { time: '2:0', notes: ['C3', 'Eb3', 'G3'] },
        { time: '2:2', notes: ['D3', 'F3', 'A3'] },
        { time: '3:0', notes: ['Eb3', 'G3', 'Bb3'] },
        { time: '3:2', notes: ['F3', 'A3', 'C4'] },
        { time: '4:0', notes: ['G3', 'Bb3', 'D4'] },
    ];

    chordPart = new Tone.Part((time, chord) => {
        synth.triggerAttackRelease(chord.notes, '1n', time);
    }, chords);
    chordPart.loop = true;
    chordPart.loopEnd = '4:0';
    chordPart.start(0);
    Tone.Transport.start();
}
function playBass() {
    const bassSynth = new Tone.MonoSynth({
        oscillator: { type: 'square' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.6, release: 0.8 }
    }).toDestination();

    const bassline = [
        { time: '0:0', note: 'C1', duration: '2n' },
        { time: '0:2', note: 'F1', duration: '2n' },
        { time: '1:0', note: 'G1', duration: '2n' },
        { time: '1:2', note: 'C1', duration: '2n' },
    ];

    bassPart = new Tone.Part((time, note) => {
        bassSynth.triggerAttackRelease(note.note, note.duration, time);
    }, bassline);

    bassPart.loop = true;
    bassPart.loopEnd = '2:0';
    bassPart.start(0);
    Tone.Transport.start();
}

function toggleButtons(type) {
    const playButton = document.getElementById(type === 'melody' ? 'playMelodyButton' : 
                                               type === 'melody2' ? 'playMelody2Button' : 
                                               type === 'drums' ? 'playDrumsButton' : 
                                               type === 'chords' ? 'playChordsButton' : 
                                               type === 'bass' ? 'playBassButton' : '');
    const stopButton = document.getElementById(type === 'melody' ? 'stopMelodyButton' : 
                                                type === 'melody2' ? 'stopMelody2Button' : 
                                                type === 'drums' ? 'stopDrumsButton' : 
                                                type === 'chords' ? 'stopChordsButton' : 
                                                type === 'bass' ? 'stopBassButton' : '');

    playButton.style.display = type === 'melody' && isMelodyPlaying || 
                               type === 'melody2' && isMelody2Playing || 
                               type === 'drums' && isDrumsPlaying || 
                               type === 'chords' && isChordsPlaying || 
                               type === 'bass' && isBassPlaying 
                               ? 'none' : 'inline-block';
    stopButton.style.display = type === 'melody' && isMelodyPlaying || 
                               type === 'melody2' && isMelody2Playing || 
                               type === 'drums' && isDrumsPlaying || 
                               type === 'chords' && isChordsPlaying || 
                               type === 'bass' && isBassPlaying 
                               ? 'inline-block' : 'none';
}
