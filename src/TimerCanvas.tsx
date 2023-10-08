import React, { useEffect, useRef } from 'react';

interface TimerCanvasProps {
    width: number;
    height: number;
}

const TimerCanvas = ({ width, height }: TimerCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //add state for position
    const [runningTime, setRunningTime] = React.useState<number>(0);
    const [buttonText, setButtonText] = React.useState<string>("Start");

    //to hold reference to animation frame with doesn't trigger rerender
    const animRef = useRef<number>(0);
    const running = useRef<boolean>(false);
    const prevTime = useRef<number>(0);
    const startTime = useRef<number>(0);
    const loading = useRef<boolean>(false);
    
    const anim = (time : number) => {
        let now = Date.now();

        if( loading.current === true) {
            if( prevTime.current === 0) {
                prevTime.current = now;
                startTime.current = now;
            }

            let delta = now - prevTime.current;

            if (running.current) {
                setRunningTime( prev => prev === 0 ? now : prev + delta);
            } 
            prevTime.current = now;
        }
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
                //console.log("runningTime: " + runningTime + " prevTime: " + prevTime.current + " startTime: " + startTime.current);
                ctx.fillText( Math.round((runningTime - startTime.current) / 1000 ).toString(), 10, 50);
            }
        }
    }, [runningTime])
    
    return ( <>
        <canvas ref={canvasRef} width={width} height={height} />
        <button onClick={
            () => {
                running.current = !running.current;
                if( loading.current === false) {
                    loading.current = true;
                }
                setButtonText(running.current ? "Stop" : "Start");
            }
        }>
            {buttonText}
        </button>
    </>);
}; 

export default TimerCanvas;