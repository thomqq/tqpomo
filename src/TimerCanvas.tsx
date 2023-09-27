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
    const [position, setPosition] = React.useState<position>({x: 30, y: 30});
    const [loading, setLoading] = React.useState<boolean>(false);
    //const [running, setRunning] = React.useState<boolean>(false);

    //to hold reference to animation frame with doesn't trigger rerender
    const animRef = useRef<number>(0);
    const running = useRef<boolean>(false);
    
    const anim = () => {
        console.log( "RR: " + running + " LL: " + loading + "animRef: " + animRef); 
        if(  running.current ) {
            setPosition( prevPosition => ({x: prevPosition.x + 1, y: prevPosition.y + 1}));
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
                ctx.fillStyle = 'rgb(200,0,0)';
                ctx.fillRect(position.x, position.y, 50, 50);
                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'; 
                ctx.fillRect(position.x + 20, position.y + 20, 50, 50);
                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                ctx.fillRect(position.x + 30, position.y + 30, 50, 50);
            }
        }
    }, [position])
    
    return ( <>
        <canvas ref={canvasRef} width={width} height={height} />
        <button onClick={
            () => {
                console.log('clicked');
                running.current = !running.current;
            }
        }>
            {running ? 'Stop' : 'Start'}
        </button>
    </>);
}; 

export default TimerCanvas;