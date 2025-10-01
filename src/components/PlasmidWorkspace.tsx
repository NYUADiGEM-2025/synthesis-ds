import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CDSOption } from "@/types/central-dogma";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

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
          <svg width="380" height="380" viewBox="0 0 380 380" className="drop-shadow-lg">
            {/* Circular backbone - thin gray ring */}
            <circle
              cx="190"
              cy="190"
              r="140"
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.4)"
              strokeWidth="6"
              className={cn(
                "transition-all duration-300",
                isDragOver && "stroke-primary/60 animate-pulse"
              )}
            />
            
            {/* CDS Arc segments positioned around the circle */}
            {selectedCDS.map((cds, index) => {
              // Calculate position around the circle
              const startAngle = 30; // Start angle
              const angleSpacing = 300 / Math.max(1, selectedCDS.length); // Spread across 300 degrees
              const angle = startAngle + (index * angleSpacing);
              const arcLength = 60; // Length of each arc in degrees
              const angleRad = (angle * Math.PI) / 180;
              const endAngleRad = ((angle + arcLength) * Math.PI) / 180;
              
              // Position for arc
              const centerX = 190;
              const centerY = 190;
              const radius = 140;
              
              // Calculate arc path
              const startX = centerX + radius * Math.cos(angleRad);
              const startY = centerY + radius * Math.sin(angleRad);
              const endX = centerX + radius * Math.cos(endAngleRad);
              const endY = centerY + radius * Math.sin(endAngleRad);
              
              // Label position (outside the circle)
              const labelAngle = angle + arcLength / 2;
              const labelAngleRad = (labelAngle * Math.PI) / 180;
              const labelRadius = radius + 45;
              const labelX = centerX + labelRadius * Math.cos(labelAngleRad);
              const labelY = centerY + labelRadius * Math.sin(labelAngleRad);
              
              // Text anchor based on position
              const textAnchor = labelAngle > 90 && labelAngle < 270 ? "end" : "start";
              
              return (
                <g key={`${cds.id}-${index}`} className="animate-scale-in">
                  {/* Arc segment */}
                  <path
                    d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
                    fill="none"
                    stroke={cds.color}
                    strokeWidth="18"
                    strokeLinecap="round"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      filter: `drop-shadow(0 0 6px ${cds.color}40)`
                    }}
                    onClick={() => !isSimulating && onClearCDS(index)}
                  />
                  
                  {/* CDS label outside the circle */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    className="fill-foreground text-sm font-medium pointer-events-none"
                    style={{ color: cds.color }}
                  >
                    {cds.name} gene
                  </text>
                </g>
              );
            })}
            
            {/* Origin of Replication arc at top */}
            {selectedCDS.length > 0 && (
              <g>
                <path
                  d={`M ${190 + 140 * Math.cos(-30 * Math.PI / 180)} ${190 + 140 * Math.sin(-30 * Math.PI / 180)} A 140 140 0 0 1 ${190 + 140 * Math.cos(30 * Math.PI / 180)} ${190 + 140 * Math.sin(30 * Math.PI / 180)}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="18"
                  strokeLinecap="round"
                  style={{ 
                    filter: `drop-shadow(0 0 6px #ef444440)`
                  }}
                />
                <text
                  x="280"
                  y="90"
                  textAnchor="start"
                  className="fill-[#ef4444] text-sm font-medium"
                >
                  Origin of
                </text>
                <text
                  x="280"
                  y="105"
                  textAnchor="start"
                  className="fill-[#ef4444] text-sm font-medium"
                >
                  replication
                </text>
              </g>
            )}
            
            {/* Drag feedback overlay */}
            {isDragOver && selectedCDS.length < 4 && (
              <circle
                cx="190"
                cy="190"
                r="140"
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
                <p className="text-lg font-bold text-muted-foreground">pSB1C3 Plasmid</p>
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