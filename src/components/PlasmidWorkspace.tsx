import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CDSOption } from "@/types/central-dogma";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlasmidWorkspaceProps {
  selectedCDS: CDSOption | null;
  onClearCDS: () => void;
  isSimulating: boolean;
}

export function PlasmidWorkspace({ selectedCDS, onClearCDS, isSimulating }: PlasmidWorkspaceProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-foreground">Plasmid Workspace</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Circular Plasmid SVG */}
          <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-md">
            {/* Plasmid backbone circle */}
            <circle
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              className="opacity-80"
            />
            
            {/* Origin of replication (ORI) */}
            <circle
              cx="160"
              cy="40"
              r="8"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
            />
            <text
              x="160"
              y="25"
              textAnchor="middle"
              className="text-xs font-semibold fill-foreground"
            >
              ORI
            </text>
            
            {/* Chloramphenicol resistance (CmR) */}
            <circle
              cx="280"
              cy="160"
              r="8"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
            />
            <text
              x="295"
              y="165"
              textAnchor="start"
              className="text-xs font-semibold fill-foreground"
            >
              CmR
            </text>
            
            {/* Terminator */}
            <circle
              cx="160"
              cy="280"
              r="8"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
            />
            <text
              x="160"
              y="300"
              textAnchor="middle"
              className="text-xs font-semibold fill-foreground"
            >
              Term
            </text>
            
            {/* CDS insertion site */}
            <rect
              x="30"
              y="140"
              width="60"
              height="40"
              rx="8"
              fill={selectedCDS ? selectedCDS.color + "40" : "none"}
              stroke={selectedCDS ? selectedCDS.color : "hsl(var(--border))"}
              strokeWidth="2"
              strokeDasharray={selectedCDS ? "0" : "4,4"}
              className={cn(
                "transition-all duration-200",
                !selectedCDS && "opacity-60"
              )}
            />
            
            {/* CDS label or placeholder */}
            <text
              x="60"
              y="165"
              textAnchor="middle"
              className={cn(
                "text-xs font-semibold transition-all duration-200",
                selectedCDS ? "fill-foreground" : "fill-muted-foreground"
              )}
            >
              {selectedCDS ? selectedCDS.name : "CDS"}
            </text>
            
            {/* Plasmid center label */}
            <text
              x="160"
              y="155"
              textAnchor="middle"
              className="text-sm font-bold fill-foreground"
            >
              pSB1C3
            </text>
            <text
              x="160"
              y="170"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              ~3.0 kb
            </text>
          </svg>
          
          {/* Remove CDS button */}
          {selectedCDS && !isSimulating && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 opacity-80 hover:opacity-100"
              onClick={onClearCDS}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        {/* Status indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {selectedCDS ? (
            <div className="bg-primary/10 border border-primary rounded-lg px-3 py-1">
              <span className="text-xs font-medium text-primary">
                Ready for simulation
              </span>
            </div>
          ) : (
            <div className="bg-muted/50 border border-muted rounded-lg px-3 py-1">
              <span className="text-xs text-muted-foreground">
                Select a CDS to begin
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}