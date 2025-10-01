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
            {selectedCDS.map((cds, index) => {
              // Calculate position around the circle
              const startAngle = 70; // Start angle (avoiding top area for ORI)
              const angleSpacing = 260 / Math.max(1, selectedCDS.length); // Spread across 260 degrees
              const angle = startAngle + (index * angleSpacing);
              const arcLength = 50; // Length of each arc in degrees
              const angleRad = (angle * Math.PI) / 180;
              const endAngleRad = ((angle + arcLength) * Math.PI) / 180;
              
              // Position for arc
              const centerX = 250;
              const centerY = 250;
              const radius = 180;
              
              // Calculate arc path
              const startX = centerX + radius * Math.cos(angleRad);
              const startY = centerY + radius * Math.sin(angleRad);
              const endX = centerX + radius * Math.cos(endAngleRad);
              const endY = centerY + radius * Math.sin(endAngleRad);
              
              // Label position - improved positioning for all angles
              const labelAngle = angle + arcLength / 2;
              const labelAngleRad = (labelAngle * Math.PI) / 180;
              
              // Calculate if label is on left or right side of circle
              const isLeftSide = labelAngle > 90 && labelAngle < 270;
              
              // Position labels further out with alternating distances to avoid overlap
              const baseLabelRadius = radius + 75;
              const labelRadius = baseLabelRadius + (index % 2) * 15;
              
              // Calculate label position
              let labelX = centerX + labelRadius * Math.cos(labelAngleRad);
              let labelY = centerY + labelRadius * Math.sin(labelAngleRad);
              
              // Text anchor based on position
              const textAnchor = isLeftSide ? "end" : "start";
              
              // Adjust label position to ensure it stays within viewBox bounds
              const labelWidth = 85;
              const padding = 15;
              
              if (isLeftSide) {
                // Left side labels - ensure they don't go off the left edge
                labelX = Math.max(labelWidth + padding, labelX);
              } else {
                // Right side labels - ensure they don't go off the right edge
                labelX = Math.min(500 - labelWidth - padding, labelX);
              }
              
              // Ensure labels don't go off top or bottom
              labelY = Math.max(padding + 14, Math.min(500 - padding, labelY));
              
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
                  
                  {/* Connector line from arc to label */}
                  <line
                    x1={centerX + radius * Math.cos(labelAngleRad)}
                    y1={centerY + radius * Math.sin(labelAngleRad)}
                    x2={centerX + (labelRadius - 10) * Math.cos(labelAngleRad)}
                    y2={centerY + (labelRadius - 10) * Math.sin(labelAngleRad)}
                    stroke="hsl(var(--muted-foreground) / 0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  
                  {/* CDS label with background for better readability */}
                  <rect
                    x={textAnchor === "end" ? labelX - 85 : labelX}
                    y={labelY - 14}
                    width="85"
                    height="22"
                    fill="hsl(var(--background) / 0.95)"
                    rx="5"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    className="text-sm font-medium pointer-events-none"
                    style={{ fill: cds.color }}
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
                  d={`M ${250 + 180 * Math.cos(-30 * Math.PI / 180)} ${250 + 180 * Math.sin(-30 * Math.PI / 180)} A 180 180 0 0 1 ${250 + 180 * Math.cos(30 * Math.PI / 180)} ${250 + 180 * Math.sin(30 * Math.PI / 180)}`}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="22"
                  strokeLinecap="round"
                  style={{ 
                    filter: `drop-shadow(0 0 6px #8b5cf640)`
                  }}
                />
                <rect
                  x="355"
                  y="115"
                  width="105"
                  height="38"
                  fill="hsl(var(--background) / 0.95)"
                  rx="5"
                />
                <text
                  x="365"
                  y="132"
                  textAnchor="start"
                  className="text-sm font-medium"
                  fill="#8b5cf6"
                >
                  Origin of
                </text>
                <text
                  x="365"
                  y="148"
                  textAnchor="start"
                  className="text-sm font-medium"
                  fill="#8b5cf6"
                >
                  replication
                </text>
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