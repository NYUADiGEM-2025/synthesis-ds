import { useEffect, useRef, useState } from "react";
import { CDSOption, SimulationState } from "@/types/central-dogma";

interface AnimationCanvasProps {
  selectedCDS: CDSOption | null;
  simulationState: SimulationState;
  onStepComplete: () => void;
}

export function AnimationCanvas({ selectedCDS, simulationState, onStepComplete }: AnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !simulationState.isActive || simulationState.isPaused) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    let startTime = Date.now();
    const stepDuration = 3000; // 3 seconds per step

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / stepDuration, 1);
      
      setAnimationProgress(progress);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw current animation step
      drawAnimationStep(ctx, simulationState.currentStep, progress, selectedCDS);
      
      if (progress >= 1) {
        // Step complete, move to next step
        onStepComplete();
        startTime = Date.now();
      }
      
      if (simulationState.isActive && !simulationState.isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [simulationState.isActive, simulationState.isPaused, simulationState.currentStep, selectedCDS, onStepComplete]);

  const drawAnimationStep = (
    ctx: CanvasRenderingContext2D, 
    step: number, 
    progress: number, 
    cds: CDSOption | null
  ) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Set up common drawing parameters
    ctx.lineWidth = 3;
    
    switch (step) {
      case 0: // DNA Setup
        drawDNAHelix(ctx, width, height, progress);
        break;
      case 1: // DNA Unwinding
        drawDNAUnwinding(ctx, width, height, progress);
        break;
      case 2: // RNA Polymerase Binding
        drawDNAUnwinding(ctx, width, height, 1);
        drawRNAPolymerase(ctx, width, height, progress);
        break;
      case 3: // Transcription
        drawDNAUnwinding(ctx, width, height, 1);
        drawTranscription(ctx, width, height, progress);
        break;
      case 4: // mRNA Formation
        drawDNAHelix(ctx, width, height, 1);
        drawmRNA(ctx, width, height, progress);
        break;
      case 5: // Ribosome Binding
        drawmRNA(ctx, width, height, 1);
        drawRibosome(ctx, width, height, progress);
        break;
      case 6: // tRNA Recruitment
        drawmRNA(ctx, width, height, 1);
        drawRibosome(ctx, width, height, 1);
        drawTRNA(ctx, width, height, progress);
        break;
      case 7: // Protein Synthesis
        drawmRNA(ctx, width, height, 1);
        drawRibosome(ctx, width, height, 1);
        drawProteinSynthesis(ctx, width, height, progress);
        break;
      case 8: // Protein Folding
        drawProteinFolding(ctx, width, height, progress, cds);
        break;
      case 9: // Protein Complete
        drawFinalProtein(ctx, width, height, progress, cds);
        break;
    }
  };

  const drawDNAHelix = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.strokeStyle = '#006D77'; // Caribbean Current
    
    const centerY = height / 2;
    const amplitude = 20;
    const frequency = 0.02;
    const maxX = width * progress;
    
    // Draw two intertwined strands
    ctx.beginPath();
    for (let x = 0; x < maxX; x += 2) {
      const y1 = centerY + amplitude * Math.sin(frequency * x);
      const y2 = centerY + amplitude * Math.sin(frequency * x + Math.PI);
      
      if (x === 0) {
        ctx.moveTo(x, y1);
      } else {
        ctx.lineTo(x, y1);
      }
    }
    ctx.stroke();
    
    ctx.beginPath();
    for (let x = 0; x < maxX; x += 2) {
      const y2 = centerY + amplitude * Math.sin(frequency * x + Math.PI);
      
      if (x === 0) {
        ctx.moveTo(x, y2);
      } else {
        ctx.lineTo(x, y2);
      }
    }
    ctx.stroke();
  };

  const drawDNAUnwinding = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.strokeStyle = '#006D77';
    
    const centerY = height / 2;
    const maxSeparation = 40 * progress;
    
    // Upper strand
    ctx.beginPath();
    ctx.moveTo(0, centerY - maxSeparation);
    ctx.lineTo(width, centerY - maxSeparation);
    ctx.stroke();
    
    // Lower strand
    ctx.beginPath();
    ctx.moveTo(0, centerY + maxSeparation);
    ctx.lineTo(width, centerY + maxSeparation);
    ctx.stroke();
  };

  const drawRNAPolymerase = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.fillStyle = '#83C5BE'; // Tiffany Blue
    
    const x = 50 + (width * 0.2 * progress);
    const y = height / 2;
    
    // Draw elliptical polymerase
    ctx.beginPath();
    ctx.ellipse(x, y, 30, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawTranscription = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    // Draw RNA polymerase moving
    ctx.fillStyle = '#83C5BE';
    const polymeraseX = 50 + (width * 0.6 * progress);
    const centerY = height / 2;
    
    ctx.beginPath();
    ctx.ellipse(polymeraseX, centerY, 30, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw nascent mRNA
    ctx.strokeStyle = '#E6FFB0'; // Mindaro
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, centerY);
    ctx.lineTo(polymeraseX, centerY - 30);
    ctx.stroke();
  };

  const drawmRNA = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.strokeStyle = '#E6FFB0'; // Mindaro
    ctx.lineWidth = 4;
    
    const startY = height / 2 - 30;
    const endX = width * 0.8 * progress;
    
    ctx.beginPath();
    ctx.moveTo(50, startY);
    ctx.lineTo(endX, startY);
    ctx.stroke();
  };

  const drawRibosome = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.fillStyle = '#FFDDD2'; // Pale Dogwood
    
    const ribosomeX = width * 0.3 + (width * 0.2 * progress);
    const ribosomeY = height / 2 - 30;
    
    // Large subunit
    ctx.beginPath();
    ctx.arc(ribosomeX, ribosomeY - 15, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Small subunit
    ctx.beginPath();
    ctx.arc(ribosomeX, ribosomeY + 15, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawTRNA = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    ctx.fillStyle = '#83C5BE';
    
    const ribosomeX = width * 0.5;
    const ribosomeY = height / 2 - 30;
    
    // Draw multiple tRNA molecules approaching
    for (let i = 0; i < 3; i++) {
      const tRNAX = ribosomeX + 100 - (100 * progress) + (i * 30);
      const tRNAY = ribosomeY + (i * 20);
      
      if (tRNAX > ribosomeX - 50) {
        // tRNA body
        ctx.beginPath();
        ctx.arc(tRNAX, tRNAY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Amino acid
        ctx.fillStyle = '#006D77';
        ctx.beginPath();
        ctx.arc(tRNAX - 12, tRNAY - 12, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#83C5BE';
      }
    }
  };

  const drawProteinSynthesis = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    const ribosomeX = width * 0.5;
    const ribosomeY = height / 2 - 30;
    
    // Growing protein chain
    ctx.strokeStyle = selectedCDS?.color || '#006D77';
    ctx.lineWidth = 6;
    
    const chainLength = 80 * progress;
    ctx.beginPath();
    ctx.moveTo(ribosomeX + 30, ribosomeY);
    ctx.lineTo(ribosomeX + 30 + chainLength, ribosomeY + 40);
    ctx.stroke();
  };

  const drawProteinFolding = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number, cds: CDSOption | null) => {
    const proteinX = width * 0.7;
    const proteinY = height / 2;
    
    ctx.strokeStyle = cds?.color || '#006D77';
    ctx.lineWidth = 6;
    
    // Draw folding protein with curves
    ctx.beginPath();
    const foldProgress = progress;
    
    // Create a curved folding pattern
    for (let i = 0; i < foldProgress * 10; i++) {
      const angle = (i / 10) * Math.PI * 4;
      const radius = 30 - (i * 2);
      const x = proteinX + radius * Math.cos(angle);
      const y = proteinY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  const drawFinalProtein = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number, cds: CDSOption | null) => {
    const proteinX = width * 0.7;
    const proteinY = height / 2;
    
    // Draw completed folded protein
    ctx.fillStyle = cds?.color || '#006D77';
    
    // Add glow effect
    ctx.shadowColor = cds?.color || '#006D77';
    ctx.shadowBlur = 20 * progress;
    
    ctx.beginPath();
    ctx.arc(proteinX, proteinY, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full bg-background"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
}