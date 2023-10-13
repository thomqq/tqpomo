import React, { useEffect, useRef } from 'react';

type item = {
    sec: number;
    color: string;
}

type TimerCanvasProps = {
    width: number,
    height: number,
    items: item[],
}


const TimerCanvas = ({ width, height, items }: TimerCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //add state for position
    const [runningTime, setRunningTime] = React.useState<number>(0);
    const [buttonText, setButtonText] = React.useState<string>("Start");

    //to hold reference to animation frame with doesn't trigger rerender
    const animRef = useRef<number>(0);
    const running = useRef<boolean>(false);
    const prevTime = useRef<number>(0);

    const lastItemPosition = useRef<number>(0);

    const anim = (time : number) => {
        let now = Date.now();

        if( prevTime.current === 0) {
            prevTime.current = now;
        }

        let delta = now - prevTime.current;

        //console.log("delta: " + delta + "time: " + time);

        if (running.current) {
            setRunningTime( prev => prev + delta);
        } 
        prevTime.current = now;
        
        animRef.current =  requestAnimationFrame(anim);
    }

    useEffect(() => {
        animRef.current = requestAnimationFrame(anim);
        return () => {
            cancelAnimationFrame(animRef.current) ;
        }   
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let sec = Math.round((runningTime) / 1000 );
                let base = sumAllSec( items ); //sec = whole circle
                let x = canvas.width / 2;
                let y = canvas.height / 2;

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(x, y, x - 3, 0, 2 * Math.PI);
                ctx.stroke();

                let currItemPosion = calcItemPosition(sec, items);
                let secs = 0;
                for( let i = 0 ; i < currItemPosion; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = items[i].color;
                    ctx.arc(x, y, x - 4, Math.PI * (secs * 2 / base - 0.5) , Math.PI * ((secs + items[i].sec) * 2 / base - 0.5));
                    ctx.lineTo(x, y)
                    ctx.fill();
                    secs += items[i].sec;                   
                }
                
                let i = currItemPosion;
                if( i < items.length) {
                    ctx.beginPath();
                    ctx.fillStyle = items[i].color;
                    ctx.arc(x, y, x - 4, Math.PI * (secs * 2 / base - 0.5) , Math.PI * (sec * 2 / base - 0.5));
                    ctx.lineTo(x, y)
                    ctx.fill();
                }

                lastItemPosition.current = currItemPosion;
            }
        }
    }, [runningTime])
    
    return ( <>
        <canvas ref={canvasRef} width={width} height={height} />
        <br/>
        <button onClick={
            () => {
                running.current = !running.current;
                setButtonText(running.current ? "Stop" :  prevTime.current === 0 ? "Start" : "Continue");
            }
        }>
            {buttonText}
        </button>
    </>);
}; 

export default TimerCanvas;

function sumAllSec(items: item[]) {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i].sec;
    }
    return sum;
}

function calcItemPosition(sec: number, items: item[]) {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i].sec;
        if (sum >= sec) {
            return i;
        }
    }
    return items.length;
}

