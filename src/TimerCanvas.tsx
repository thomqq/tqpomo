import React, { useEffect, useRef } from 'react';

interface TimerCanvasProps {
    width: number;
    height: number;
}

type position = {
    x: number;
    y: number;
}

const TimerCanvas = ({ width, height }: TimerCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //add state for position
    const [loading, setLoading] = React.useState<boolean>(false);
    const [currTime, setTime] = React.useState<number>(Date.now());
    const [buttonText, setButtonText] = React.useState<string>("Start");

    //to hold reference to animation frame with doesn't trigger rerender
    const animRef = useRef<number>(0);
    const running = useRef<boolean>(false);
    const prevTime = useRef<number>(Date.now());
    
    const anim = (time : number) => {
        console.log( "RR: " + running.current + " LL: " + loading + "animRef: " + animRef);
        if (running.current) {
            setTime(Date.now());
        } else {
            prevTime.current = Date.now();
        }
        animRef.current =  requestAnimationFrame(anim);
    }

    useEffect(() => {
        console.log('start anim');
        animRef.current = requestAnimationFrame(anim);
        setLoading(true)
        return () => {
            setLoading(false)
            cancelAnimationFrame(animRef.current) ;
        }   
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText( Math.round((currTime - prevTime.current) / 1000 ).toString(), 10, 50);
            }
        }
    }, [currTime])
    
    return ( <>
        <canvas ref={canvasRef} width={width} height={height} />
        <button onClick={
            () => {
                console.log('clicked');
                running.current = !running.current;
                setButtonText(running.current ? "Stop" : "Start");
            }
        }>
            {buttonText}
        </button>
    </>);
}; 

export default TimerCanvas;