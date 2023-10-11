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

    const anim = (time : number) => {
        let now = Date.now();

        if( prevTime.current === 0) {
            prevTime.current = now;
        }

        let delta = now - prevTime.current;

        console.log("delta: " + delta + "time: " + time);

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
                let base = 60; //60 sec = whole circle
                let x = canvas.width / 2;
                let y = canvas.height / 2;

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(x, y, x - 3, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = "#c82124"; //red
                ctx.beginPath();
                ctx.arc(x, y, x - 4, - Math.PI / 2 , Math.PI * (sec * 2 / base - 0.5));
                ctx.lineTo(x, y)
                ctx.fill();
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