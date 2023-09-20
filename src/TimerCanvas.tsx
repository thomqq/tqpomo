
import React, { useEffect, useRef } from 'react';

interface TimerCanvasProps {
    width: number;
    height: number;
}

const TimerCanvas = ({ width, height }: TimerCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'rgb(200,0,0)';
                ctx.fillRect(10, 10, 50, 50);
                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                ctx.fillRect(30, 30, 50, 50);
                ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
                ctx.fillRect(40, 40, 50, 50);
            }
        }
    }, []);

    return <canvas ref={canvasRef} width={width} height={height} />;
}; 

export default TimerCanvas;