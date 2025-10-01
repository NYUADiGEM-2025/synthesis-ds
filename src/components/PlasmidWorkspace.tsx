import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CDSOption } from "@/types/central-dogma";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlasmidWorkspaceProps {
  selectedCDS: CDSOption[];
  onCDSSelect: (cds: CDSOption) => void;
  onClearCDS: (index?: number) => void;
  isSimulating: boolean;
  draggingCDS: CDSOption | null;
}

export function PlasmidWorkspace({ selectedCDS, onCDSSelect, onClearCDS, isSimulating, draggingCDS }: PlasmidWorkspaceProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Collision detection for labels
  const labelPositions = useMemo(() => {
    if (selectedCDS.length === 0) return [];

    const centerX = 250;
    const centerY = 250;
    const radius = 180;
    const labelDistance = 75; // Distance from circle edge to label
    const minLabelSpacing = 35; // Minimum vertical spacing between labels

    // Calculate initial positions
    const startAngle = 70;
    const angleSpacing = 260 / Math.max(1, selectedCDS.length);
    
    const positions = selectedCDS.map((cds, index) => {
      const angle = startAngle + (index * angleSpacing);
      const arcLength = 50;
      const labelAngle = angle + arcLength / 2;
      const labelAngleRad = (labelAngle * Math.PI) / 180;
      
      const labelRadius = radius + labelDistance;
      const x = centerX + labelRadius * Math.cos(labelAngleRad);
      const y = centerY + labelRadius * Math.sin(labelAngleRad);
      
      const textAnchor = labelAngle > 90 && labelAngle < 270 ? "end" : "start";
      
      return {
        x,
        y: y,
        originalY: y,
        angle: labelAngle,
        labelAngleRad,
        textAnchor,
        cds,
        index,
        arcAngle: angle,
        arcLength
      };
    });

    // Sort by y position for collision detection
    positions.sort((a, b) => a.y - b.y);

    // Apply collision avoidance - push overlapping labels apart
    for (let i = 1; i < positions.length; i++) {
      const current = positions[i];
      const previous = positions[i - 1];
      
      const gap = current.y - previous.y;
      if (gap < minLabelSpacing) {
        current.y = previous.y + minLabelSpacing;
      }
    }

    // Ensure labels don't go beyond bounds (with padding)
    const minY = 40;
    const maxY = 460;
    
    // Adjust if out of bounds
    positions.forEach(pos => {
      if (pos.y < minY) pos.y = minY;
      if (pos.y > maxY) pos.y = maxY;
    });

    // Re-sort by original index
    positions.sort((a, b) => a.index - b.index);

    return positions;
  }, [selectedCDS]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingCDS && selectedCDS.length < 4) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (draggingCDS && selectedCDS.length < 4 && !selectedCDS.find(cds => cds.id === draggingCDS.id)) {
      onCDSSelect(draggingCDS);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-foreground">Plasmid Workspace</CardTitle>
        <p className="text-sm text-muted-foreground">pSB1C3 BioBrick Plasmid</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* Circular Plasmid Backbone */}
        <div 
          ref={dropZoneRef}
          className={cn(
            "relative transition-all duration-300",
            isDragOver && "scale-105"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg width="620" height="620" viewBox="0 0 500 500" className="drop-shadow-lg max-w-full lg:max-w-[560px] xl:max-w-[620px]">
            {/* Circular backbone - thin gray ring */}
            <circle
              cx="250"
              cy="250"
              r="180"
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.4)"
              strokeWidth="6"
              className={cn(
                "transition-all duration-300",
                isDragOver && "stroke-primary/60 animate-pulse"
              )}
            />
            
            {/* CDS Arc segments positioned around the circle */}
            {labelPositions.map((pos) => {
              const { cds, index, arcAngle, arcLength, labelAngleRad, textAnchor, x: labelX, y: labelY } = pos;
              
              // Calculate arc path
              const centerX = 250;
              const centerY = 250;
              const radius = 180;
              
              const angleRad = (arcAngle * Math.PI) / 180;
              const endAngleRad = ((arcAngle + arcLength) * Math.PI) / 180;
              
              const startX = centerX + radius * Math.cos(angleRad);
              const startY = centerY + radius * Math.sin(angleRad);
              const endX = centerX + radius * Math.cos(endAngleRad);
              const endY = centerY + radius * Math.sin(endAngleRad);
              
              // Connection point on the arc (middle of arc)
              const arcMidAngleRad = ((arcAngle + arcLength / 2) * Math.PI) / 180;
              const connX = centerX + radius * Math.cos(arcMidAngleRad);
              const connY = centerY + radius * Math.sin(arcMidAngleRad);
              
              // Label dimensions
              const labelWidth = 60;
              const labelHeight = 24;
              const padding = 4;
              
              return (
                <g key={`${cds.id}-${index}`} className="animate-scale-in">
                  {/* Arc segment */}
                  <path
                    d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
                    fill="none"
                    stroke={cds.color}
                    strokeWidth="22"
                    strokeLinecap="round"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      filter: `drop-shadow(0 0 6px ${cds.color}40)`
                    }}
                    onClick={() => !isSimulating && onClearCDS(index)}
                  />
                  
                  {/* Leader line from arc to label */}
                  <line
                    x1={connX}
                    y1={connY}
                    x2={labelX + (textAnchor === "end" ? -padding : padding)}
                    y2={labelY}
                    stroke="hsl(var(--muted-foreground) / 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  
                  {/* Label background with tooltip */}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g className="cursor-help">
                          <rect
                            x={textAnchor === "end" ? labelX - labelWidth - padding : labelX + padding}
                            y={labelY - labelHeight / 2}
                            width={labelWidth}
                            height={labelHeight}
                            fill="hsl(var(--background) / 0.95)"
                            rx="6"
                            stroke={cds.color}
                            strokeWidth="1.5"
                            className="transition-all hover:stroke-2"
                          />
                          <text
                            x={textAnchor === "end" ? labelX - labelWidth / 2 - padding : labelX + labelWidth / 2 + padding}
                            y={labelY + 1}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xs font-semibold pointer-events-none select-none"
                            style={{ fill: cds.color }}
                          >
                            {cds.name}
                          </text>
                        </g>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="bg-popover text-popover-foreground border-border"
                      >
                        <p className="font-medium">{cds.fullName}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click arc to remove</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </g>
              );
            })}
            
            {/* Origin of Replication arc at top */}
            {selectedCDS.length > 0 && (
              <g>
                <path
                  d={`M ${250 + 180 * Math.cos(-30 * Math.PI / 180)} ${250 + 180 * Math.sin(-30 * Math.PI / 180)} A 180 180 0 0 1 ${250 + 180 * Math.cos(30 * Math.PI / 180)} ${250 + 180 * Math.sin(30 * Math.PI / 180)}`}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="22"
                  strokeLinecap="round"
                  style={{ 
                    filter: `drop-shadow(0 0 6px #8b5cf640)`
                  }}
                />
                
                {/* Origin of Replication label with tooltip */}
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g className="cursor-help">
                        <line
                          x1={250 + 180 * Math.cos(0)}
                          y1={250 + 180 * Math.sin(0)}
                          x2={250 + 240}
                          y2={250 - 80}
                          stroke="hsl(var(--muted-foreground) / 0.4)"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                        <rect
                          x={250 + 245}
                          y={250 - 92}
                          width="45"
                          height="24"
                          fill="hsl(var(--background) / 0.95)"
                          rx="6"
                          stroke="#8b5cf6"
                          strokeWidth="1.5"
                          className="transition-all hover:stroke-2"
                        />
                        <text
                          x={250 + 267.5}
                          y={250 - 79}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-semibold pointer-events-none select-none"
                          fill="#8b5cf6"
                        >
                          ORI
                        </text>
                      </g>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-popover text-popover-foreground border-border"
                    >
                      <p className="font-medium">Origin of Replication</p>
                      <p className="text-xs text-muted-foreground mt-1">Required for plasmid replication</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </g>
            )}
            
            {/* Drag feedback overlay */}
            {isDragOver && selectedCDS.length < 4 && (
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="hsl(var(--primary) / 0.1)"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeDasharray="15,8"
                className="animate-pulse"
              />
            )}
          </svg>
          
          {/* Center instructions */}
          {selectedCDS.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 bg-background/90 rounded-lg p-4 backdrop-blur-sm border border-border">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  isDragOver ? "text-primary" : "text-muted-foreground"
                )}>
                  {isDragOver ? "Drop CDS Here!" : "Drag CDS to Plasmid"}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  pSB1C3 BioBrick Plasmid
                </p>
              </div>
            </div>
          )}
          
          {/* Center plasmid info when CDS are present */}
          {selectedCDS.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-bold text-muted-foreground">pSB1C3 Plasmid</p>
              </div>
            </div>
          )}
        </div>
        
        {/* CDS Information Panel */}
        {selectedCDS.length > 0 && (
          <div className="text-center space-y-4 animate-fade-in max-w-md">
            <div className="grid grid-cols-1 gap-2">
              {selectedCDS.map((cds, index) => (
                <div key={`${cds.id}-${index}`} className="flex items-center justify-between p-2 rounded-lg bg-accent/30 border border-border">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: cds.color }}
                    />
                    <span className="font-medium text-sm">{cds.fullName}</span>
                  </div>
                  {!isSimulating && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => onClearCDS(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Clear all button */}
            {!isSimulating && selectedCDS.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onClearCDS()}
              >
                Clear All CDS
              </Button>
            )}
          </div>
        )}
        
        {/* Status indicator */}
        <div className="text-center">
          {selectedCDS.length > 0 ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Ready for Simulation</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Drag and drop a CDS to begin
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}