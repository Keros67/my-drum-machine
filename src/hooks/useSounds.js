import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import Crash from 'assets/sounds/Crash.wav';
import Hat from 'assets/sounds/Hat.wav';
import Loud from 'assets/sounds/Loud.wav';
import Mid from 'assets/sounds/Mid.wav';


export default function useSounds() {
    const mySampler = useRef(null);

const [isCrashPlayed, isCrashPlayedChange] = useState(false);
const [isHatPlayed, isHatPlayedChange] = useState(false);
const [isLoudPlayed, isLoudPlayedChange] = useState(false);
const [isMidPlayed, isMidPlayedChange] = useState(false);
    
    useEffect(() => {
        const sampler = new Tone.Sampler({
            C4: Crash,
            "D#4": Hat,
            "F#4": Loud,
            A4: Mid,
    }).toDestination();

    Tone.loaded().then(() => {
        mySampler.current = sampler;
    });
}, []);

function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], 4)
}

function handleKeyDown({key}) {
    switch(key){
        case"a":
            isCrashPlayedChange(true);
            window.setTimeout(() =>isCrashPlayedChange(false), 300);
            soundPlay("C4");
            break;
        case"z":
            isHatPlayedChange(true);
            window.setTimeout(() =>isHatPlayedChange(false), 300);
            soundPlay("D#4");
            break;
        case"e":
            isLoudPlayedChange(true);
            window.setTimeout(() =>isLoudPlayedChange(false), 300);
            soundPlay("F#4");
            break;
        case"r":
            isMidPlayedChange(true);
            window.setTimeout(() =>isMidPlayedChange(false), 300);
            soundPlay("A4");
            break;
        default:
            break;
    }
}

useEffect(()=>{
    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    }
}, []);

function handleSamplerChange(note, file) {
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL);
    mySampler.current.add(note, buffer, ()=>alert("Sample successfully changed"));

}

const buttonsList = [
    {soundPlay: ()=> soundPlay("C4"),
     isPlayed: isCrashPlayed,
     id: "crash",
     handleSamplerChange: (e) => handleSamplerChange("C4", e.target.files[0]),
    },
    {soundPlay: ()=> soundPlay("D#4"),
     isPlayed: isHatPlayed,
     id: "hat",
     handleSamplerChange: (e) => handleSamplerChange("D#4", e.target.files[0]),
    }, 
    {soundPlay: ()=> soundPlay("F#4"),
     isPlayed: isLoudPlayed,
     id: "loud",
     handleSamplerChange: (e) => handleSamplerChange("F#4", e.target.files[0]),
    },
    {soundPlay: ()=> soundPlay("A4"),
     isPlayed: isMidPlayed,
     id: "mid",
     handleSamplerChange: (e) => handleSamplerChange("A4", e.target.files[0]),
    },
];
    
return{buttonsList};
}