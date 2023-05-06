import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingButton from './SettingButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = `#f54e4e`;
const green = `#4aec8c`;

function Timer() {

    const context = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);

    const [mode, setMode] = useState('work');

    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';

        const nextSeconds = (nextMode === 'work' ? context.workMinutes : context.breakMinutes) *60;
        
        setMode(nextMode);
        setSecondsLeft(nextSeconds);

        setMode(nextMode);
        modeRef.current = nextMode;
        
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        setSecondsLeft(context.workMinutes * 60)
    }

    useEffect( () => {
        initTimer();

        const interval = setInterval(() => {
            if(isPausedRef.current) {
                return;
            }
            if(secondsLeftRef.current === 0) {
               return switchMode()
            }

            tick();

        }, 1000);

        return() => clearInterval(interval);

    }, [context]);

    const totalSeconds = mode === 'work' ? context.workMinutes * 60 : context.breakMinutes * 60;
    const porcentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0' +seconds;

    return (
        <div>
            <CircularProgressbar value={porcentage} text={minutes + ':' + seconds} styles={buildStyles({ rotation: 0, 
            strokeLinecap:'', 
            textColor:'#fff',
            pathColor: mode === 'work' ? red : green,
            trailColor:'rgba(255,255,255,.2)'
        })}
            />
            <div style={{marginTop:'20px'}}>

                {isPaused ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false }} /> : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true }} />}
            
            </div>
            <div style={{marginTop:'20px'}}>
                <SettingButton onClick={() => context.setShowSettings(true)} />
            </div>
        </div>
    )
}
export default Timer;