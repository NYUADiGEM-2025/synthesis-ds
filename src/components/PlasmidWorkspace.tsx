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
          <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-lg">
            {/* Circular backbone - thicker */}
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="16"
              className={cn(
                "transition-all duration-300",
                selectedCDS.length > 0 && "stroke-primary/80",
                isDragOver && "stroke-primary animate-pulse"
              )}
            />
            
            {/* Origin of Replication (ORI) marker */}
            <g>
              <circle
                cx="160"
                cy="40"
                r="8"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
              />
              <text
                x="160"
                y="28"
                textAnchor="middle"
                className="fill-muted-foreground text-sm font-bold"
              >
                ORI
              </text>
            </g>
            
            {/* CDS Arrows positioned around the circle */}
            {selectedCDS.map((cds, index) => {
              // Calculate position around the circle (avoiding ORI at top)
              const startAngle = 45; // Start at 45 degrees to avoid ORI
              const angleSpacing = 270 / Math.max(1, selectedCDS.length - 1); // Spread across 270 degrees
              const angle = selectedCDS.length === 1 ? 135 : startAngle + (index * angleSpacing);
              const angleRad = (angle * Math.PI) / 180;
              
              // Position on the circle circumference
              const centerX = 160;
              const centerY = 160;
              const radius = 120;
              const x = centerX + radius * Math.cos(angleRad);
              const y = centerY + radius * Math.sin(angleRad);
              
              // Arrow direction (tangent to circle)
              const tangentAngle = angle + 90;
              const arrowLength = 30;
              const arrowWidth = 12;
              
              return (
                <g key={`${cds.id}-${index}`} className="animate-scale-in">
                  {/* Arrow body */}
                  <path
                    d={`M ${x - arrowLength/2 * Math.cos((tangentAngle * Math.PI) / 180)} ${y - arrowLength/2 * Math.sin((tangentAngle * Math.PI) / 180)}
                        L ${x + arrowLength/2 * Math.cos((tangentAngle * Math.PI) / 180)} ${y + arrowLength/2 * Math.sin((tangentAngle * Math.PI) / 180)}
                        L ${x + (arrowLength/2 - 8) * Math.cos((tangentAngle * Math.PI) / 180) + arrowWidth/2 * Math.cos(((tangentAngle + 90) * Math.PI) / 180)} ${y + (arrowLength/2 - 8) * Math.sin((tangentAngle * Math.PI) / 180) + arrowWidth/2 * Math.sin(((tangentAngle + 90) * Math.PI) / 180)}
                        L ${x + arrowLength/2 * Math.cos((tangentAngle * Math.PI) / 180) + 8 * Math.cos((tangentAngle * Math.PI) / 180)} ${y + arrowLength/2 * Math.sin((tangentAngle * Math.PI) / 180) + 8 * Math.sin((tangentAngle * Math.PI) / 180)}
                        L ${x + (arrowLength/2 - 8) * Math.cos((tangentAngle * Math.PI) / 180) - arrowWidth/2 * Math.cos(((tangentAngle + 90) * Math.PI) / 180)} ${y + (arrowLength/2 - 8) * Math.sin((tangentAngle * Math.PI) / 180) - arrowWidth/2 * Math.sin(((tangentAngle + 90) * Math.PI) / 180)}
                        L ${x - arrowLength/2 * Math.cos((tangentAngle * Math.PI) / 180) - arrowWidth/2 * Math.cos(((tangentAngle + 90) * Math.PI) / 180)} ${y - arrowLength/2 * Math.sin((tangentAngle * Math.PI) / 180) - arrowWidth/2 * Math.sin(((tangentAngle + 90) * Math.PI) / 180)}
                        L ${x - arrowLength/2 * Math.cos((tangentAngle * Math.PI) / 180) + arrowWidth/2 * Math.cos(((tangentAngle + 90) * Math.PI) / 180)} ${y - arrowLength/2 * Math.sin((tangentAngle * Math.PI) / 180) + arrowWidth/2 * Math.sin(((tangentAngle + 90) * Math.PI) / 180)}
                        Z`}
                    fill={cds.color}
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-md cursor-pointer hover:opacity-80"
                    style={{ 
                      filter: `drop-shadow(0 0 8px ${cds.color}60)`
                    }}
                    onClick={() => !isSimulating && onClearCDS(index)}
                  />
                  
                  {/* CDS label */}
                  <text
                    x={x - 25 * Math.cos((tangentAngle * Math.PI) / 180)}
                    y={y - 25 * Math.sin((tangentAngle * Math.PI) / 180)}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-bold pointer-events-none"
                  >
                    {cds.name}
                  </text>
                </g>
              );
            })}
            
            {/* Drag feedback overlay */}
            {isDragOver && selectedCDS.length < 4 && (
              <circle
                cx="160"
                cy="160"
                r="120"
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
              <div className="text-center space-y-1 bg-background/90 rounded-full p-3 backdrop-blur-sm border border-border/50">
                <p className="text-xs font-bold text-foreground">pSB1C3</p>
                <p className="text-xs text-muted-foreground">{selectedCDS.length} CDS</p>
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