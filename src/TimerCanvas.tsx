
import React, { useEffect, useLayoutEffect, useRef } from 'react';

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
    const [running, setRunning] = React.useState<boolean>(false);


    useLayoutEffect(() => {
        const anim = () => {
            setPosition( prevPosition => ({x: prevPosition.x + 1, y: prevPosition.y + 1}));
            requestAnimationFrame(anim);
        }
        let animiId = requestAnimationFrame(anim)
        console.log('useLayoutEffect');
        setRunning(true);
        return () => cancelAnimationFrame(animiId)     
    }, [running]);
    
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
    return <canvas ref={canvasRef} width={width} height={height} />;
}; 

export default TimerCanvas;