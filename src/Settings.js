import ReactSlider from "react-slider";
import './slider.css';
import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import BackButton from "./BackButton";

function Settings(props) {
    const context = useContext(SettingsContext);
    return(
        <div style={{textAlign:'left'}}>
            <label>Work: {context.workMinutes}:00</label>
            <ReactSlider 
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={context.workMinutes}
                onChange={newValue => context.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label>Break: {context.breakMinutes}:00</label>
            <ReactSlider 
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={context.breakMinutes}
                onChange={newValue => context.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
            <BackButton onClick={() => context.setShowSettings(false)} />
            </div>
        </div>
    )
}
export default  Settings;