import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CDSOption } from "@/types/central-dogma";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface PlasmidWorkspaceProps {
  selectedCDS: CDSOption | null;
  onCDSSelect: (cds: CDSOption) => void;
  onClearCDS: () => void;
  isSimulating: boolean;
  draggingCDS: CDSOption | null;
}

export function PlasmidWorkspace({ selectedCDS, onCDSSelect, onClearCDS, isSimulating, draggingCDS }: PlasmidWorkspaceProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingCDS && !selectedCDS) {
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
    
    if (draggingCDS && !selectedCDS) {
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
          <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
            {/* Circular backbone */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              className={cn(
                "transition-all duration-300",
                selectedCDS && "stroke-primary/80",
                isDragOver && "stroke-primary animate-pulse"
              )}
            />
            
            {/* Origin of Replication (ORI) marker */}
            <g>
              <circle
                cx="150"
                cy="30"
                r="6"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--foreground))"
                strokeWidth="2"
              />
              <text
                x="150"
                y="20"
                textAnchor="middle"
                className="fill-muted-foreground text-xs font-medium"
              >
                ORI
              </text>
            </g>
            
            {/* CDS Arrow (when selected) */}
            {selectedCDS && (
              <g className="animate-scale-in">
                {/* Arrow path - positioned at top right */}
                <path
                  d="M 200 80 L 240 100 L 230 110 L 200 95 L 170 110 L 180 100 Z"
                  fill={selectedCDS.color}
                  stroke="white"
                  strokeWidth="2"
                  className="drop-shadow-md"
                  style={{ 
                    filter: `drop-shadow(0 0 8px ${selectedCDS.color}60)`
                  }}
                />
                {/* CDS label */}
                <text
                  x="205"
                  y="70"
                  textAnchor="middle"
                  className="fill-foreground text-xs font-bold"
                >
                  {selectedCDS.name}
                </text>
              </g>
            )}
            
            {/* Drag feedback overlay */}
            {isDragOver && !selectedCDS && (
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="hsl(var(--primary) / 0.1)"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
            )}
          </svg>
          
          {/* Center instructions */}
          {!selectedCDS && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 bg-background/80 rounded-lg p-4 backdrop-blur-sm">
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
        </div>
        
        {/* CDS Information Panel */}
        {selectedCDS && (
          <div className="text-center space-y-3 animate-fade-in">
            <div>
              <h3 className="font-semibold text-foreground text-lg">{selectedCDS.fullName}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">{selectedCDS.description}</p>
            </div>
            
            {/* Remove button */}
            {!isSimulating && (
              <Button
                variant="destructive"
                size="sm"
                className="mt-4"
                onClick={onClearCDS}
              >
                <X className="h-4 w-4 mr-1" />
                Remove CDS
              </Button>
            )}
          </div>
        )}
        
        {/* Status indicator */}
        <div className="text-center">
          {selectedCDS ? (
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