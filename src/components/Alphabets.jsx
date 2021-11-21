import React from 'react';
import './drag.css'
import { Stage, Layer, Text } from 'react-konva';
import { useEffect } from 'react';
// import fishSplash from './assets/sounds/fishSplash.wav'
import './NumberLineMove.css'
import sessionData from '../utils/sessionData';
import useImage from 'use-image';
import { min } from 'moment';

const RenderCharacter = ({ chObject, handleClick }) => {
    return (
        <Text
            text={chObject.ch}
            x={chObject.x}
            y={chObject.y}
            fontSize={30}
            fontStyle="bold"
            fontFamily='Calibri'
            fill="red"
            // I will use offset to set origin to the center of the image
            onClick={handleClick}
            onTouchStart={handleClick}
        />
    );
};

const Alphabets = (props) => {

    const [chSet, setChSet] = React.useState([
        { x: 0, y: 0, ch: 'O' },
        { x: 0, y: 0, ch: 'N' },
        { x: 0, y: 0, ch: 'E' },
        { x: 0, y: 0, ch: 'T' },
        { x: 0, y: 0, ch: 'W' },
        { x: 0, y: 0, ch: 'H' },
        { x: 0, y: 0, ch: 'R' },
        { x: 0, y: 0, ch: 'F' },
        { x: 0, y: 0, ch: 'U' },
        { x: 0, y: 0, ch: 'I' },
        { x: 0, y: 0, ch: 'V' },
        { x: 0, y: 0, ch: 'S' },
        { x: 0, y: 0, ch: 'X' },
        { x: 0, y: 0, ch: 'G' },
        { x: 0, y: 0, ch: 'Z' }])
    const [stageWidth, setStageWidth] = React.useState(300)
    const [stageHeight, setStageHeight] = React.useState(300)
    const [minDistance, setMinDistance] = React.useState(40)
    const [blanks, setBlanks] = React.useState(["?"])
    const [answer, setAnswer] = React.useState("")
    const container = React.useRef();
    const stageRef = React.useRef();

    const checkSize = () => {
        const width = container.current.offsetWidth;
        const height = container.current.offsetHeight;
        setMinDistance(height * 0.5)
        setStageWidth(width)
        setStageHeight(height)
    };
    const removeNthCharacter = (string, index) => {

        var tmp = string.split(''); // convert to an array
        tmp.splice(index, 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
        return tmp.join(''); // reconstruct the string
    }

    useEffect(() => {

        checkSize();

        window.addEventListener("resize", checkSize);
        // dragThis.current.addEventListener('touchmove', checkDrag);

        return () => {
            window.removeEventListener("resize", checkSize)
            // dragThis.current.removeEventListener("touchmove", checkDrag)
        }
    }, [])
    useEffect(() => {
        props.setAnswer(answer)
    }, [answer])
    useEffect(() => {

        let offsetx = 10
        let offsety = 10
        let newChSet = chSet.map((item) => {

            if (offsetx > (stageWidth - 10)) {
                offsetx = 10
                offsety += 40
            }
            let obj = {
                x: offsetx,
                y: offsety,
                ch: item.ch
            }
            offsetx += minDistance
            return (
                // {
                //     x: Math.random() * (stageWidth - 40) + 10,
                //     y: Math.random() * (stageHeight - 40) + 10,
                //     ch: item.ch
                // }
                obj
            )
        })
        setChSet(newChSet)

    }, [stageWidth, stageHeight])


    return (

        <div className="noselect parentDiv"  style={{display : "flex"}}>
            <div>
                <div className="dropBox"
                    ref={container}
                >
                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        ref={stageRef}
                    >
                        <Layer>
                            {chSet.map((chObject, index) => {
                                return <RenderCharacter chObject={chObject} handleClick={() => {
                                    let temp = [...blanks]
                                    temp[temp.length - 1] = chObject.ch
                                    setAnswer(answer + chObject.ch)
                                    temp.push("?")
                                    setBlanks(temp)
                                }} />
                            })}
                        </Layer>
                    </Stage>
                </div>
                <div style={{ display: "flex", maxWidth:"300px" }}>
                    {blanks.map((item, index) => {
                        return (
                            <h1 onClick={() => {
                                if (index == blanks.length - 1) return;
                                setBlanks(
                                    blanks.filter((itm, idx) => idx !== index)
                                )
                                setAnswer(removeNthCharacter(answer, index))
                            }}>
                                <u>{item}</u> &nbsp;
                            </h1>
                        )
                    })}
                </div>
            </div>
            <div>
                <button className="App-link" style={{marginLeft : "20px", marginBottom : "10vh"}}onClick={() => {
                    props.onClick()
                }}> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
            </div>
        </div >

    );
};

export default Alphabets;

