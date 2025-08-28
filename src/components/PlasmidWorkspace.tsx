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
        {/* Linear Plasmid Backbone */}
        <div className="w-full max-w-lg">
          {/* Backbone representation with slots */}
          <div className="relative">
            {/* Main backbone line */}
            <div className="h-3 bg-primary rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
            </div>
            
            {/* Feature markers along backbone */}
            <div className="absolute -top-2 left-12 w-2 h-2 bg-accent rounded-full border-2 border-foreground"></div>
            <div className="absolute -top-7 left-10 text-xs font-medium text-muted-foreground">ORI</div>
            
            <div className="absolute -top-2 right-12 w-2 h-2 bg-accent rounded-full border-2 border-foreground"></div>
            <div className="absolute -top-7 right-8 text-xs font-medium text-muted-foreground">Term</div>
            
            <div className="absolute -bottom-2 right-20 w-2 h-2 bg-accent rounded-full border-2 border-foreground"></div>
            <div className="absolute bottom-4 right-16 text-xs font-medium text-muted-foreground">CmR</div>
          </div>
        </div>
        
        {/* CDS Drop Zone Slot */}
        <div
          ref={dropZoneRef}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 min-h-[140px] w-full max-w-md flex items-center justify-center",
            selectedCDS 
              ? "border-primary bg-primary/10 shadow-lg" 
              : isDragOver 
                ? "border-primary bg-primary/20 shadow-xl scale-105 animate-pulse" 
                : "border-border bg-accent/30",
            !isSimulating && !selectedCDS && "hover:border-primary/50 hover:bg-accent/40"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedCDS ? (
            <div className="text-center space-y-3">
              {/* Protein visualization */}
              <div 
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white/20"
                style={{ 
                  backgroundColor: selectedCDS.color,
                  boxShadow: `0 0 20px ${selectedCDS.color}40`
                }}
              >
                {selectedCDS.name}
              </div>
              
              {/* Protein info */}
              <div>
                <h3 className="font-semibold text-foreground text-lg">{selectedCDS.fullName}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">{selectedCDS.description}</p>
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
          ) : (
            <div className="text-center space-y-3">
              {/* Empty slot indicator */}
              <div className={cn(
                "w-20 h-20 rounded-full border-2 border-dashed mx-auto flex items-center justify-center text-muted-foreground transition-all duration-300",
                isDragOver && "border-primary text-primary scale-110 border-solid bg-primary/10"
              )}>
                <span className="text-sm font-medium">CDS</span>
              </div>
              
              <div>
                <p className="text-lg font-medium text-muted-foreground">
                  {isDragOver ? "Drop CDS Here!" : "CDS Insertion Site"}
                </p>
                <p className="text-sm text-muted-foreground/80">
                  {isDragOver ? "Release to place CDS" : "Drag a coding sequence from the Parts Bin"}
                </p>
              </div>
            </div>
          )}
          
          {/* Glowing effect when dragging */}
          {isDragOver && (
            <div className="absolute inset-0 rounded-xl bg-primary/10 border-2 border-primary animate-pulse"></div>
          )}
        </div>
        
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