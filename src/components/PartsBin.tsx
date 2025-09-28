import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CDS_OPTIONS, CDSOption } from "@/types/central-dogma";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PartsBinProps {
  selectedCDS: CDSOption[];
  onCDSSelect: (cds: CDSOption) => void;
  isSimulating: boolean;
  onDragStart: (cds: CDSOption) => void;
  onDragEnd: () => void;
}

export function PartsBin({ selectedCDS, onCDSSelect, isSimulating, onDragStart, onDragEnd }: PartsBinProps) {
  const [draggedItem, setDraggedItem] = useState<CDSOption | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, cds: CDSOption) => {
    if (isSimulating) return;
    
    setDraggedItem(cds);
    onDragStart(cds);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', cds.id);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    onDragEnd();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground">Parts Bin</CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-tight">
          Drag & drop or click a Coding Sequence (CDS) to place it on the plasmid
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 overflow-y-auto max-h-[calc(100vh-300px)]">
        {CDS_OPTIONS.map((cds) => (
          <div
            key={cds.id}
            draggable={!isSimulating && selectedCDS.length < 4}
            onDragStart={(e) => handleDragStart(e, cds)}
            onDragEnd={handleDragEnd}
            className={cn(
              "relative cursor-grab active:cursor-grabbing transition-all duration-200",
              draggedItem?.id === cds.id && "opacity-50 scale-95",
              isSimulating && "cursor-not-allowed"
            )}
          >
            <Button
              variant="outline"
              className={cn(
                "flex w-full p-3 pr-10 h-auto flex-col items-start text-left transition-all duration-200 relative whitespace-normal break-words leading-snug",
                selectedCDS.find(selected => selected.id === cds.id) && "border-primary bg-primary/10 shadow-md",
                isSimulating && "opacity-50 cursor-not-allowed",
                !isSimulating && selectedCDS.length < 4 && !selectedCDS.find(selected => selected.id === cds.id) && "hover:bg-accent/50 hover:scale-[1.02] hover:shadow-lg",
                !isSimulating && selectedCDS.find(selected => selected.id === cds.id) && "opacity-60"
              )}
              onClick={() => !isSimulating && selectedCDS.length < 4 && !selectedCDS.find(selected => selected.id === cds.id) && onCDSSelect(cds)}
              disabled={isSimulating || selectedCDS.length >= 4 || !!selectedCDS.find(selected => selected.id === cds.id)}
            >
              {/* Drag indicator */}
              {!isSimulating && selectedCDS.length < 4 && !selectedCDS.find(selected => selected.id === cds.id) && (
                <div className="absolute top-2 right-2 text-muted-foreground/50">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <circle cx="2" cy="2" r="1"/>
                    <circle cx="6" cy="2" r="1"/>
                    <circle cx="10" cy="2" r="1"/>
                    <circle cx="2" cy="6" r="1"/>
                    <circle cx="6" cy="6" r="1"/>
                    <circle cx="10" cy="6" r="1"/>
                    <circle cx="2" cy="10" r="1"/>
                    <circle cx="6" cy="10" r="1"/>
                    <circle cx="10" cy="10" r="1"/>
                  </svg>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-1 w-full whitespace-normal break-words">
                <div 
                  className="w-5 h-5 rounded-full shadow-sm border border-white/50 flex-shrink-0"
                  style={{ 
                    backgroundColor: cds.color,
                    boxShadow: `0 0 6px ${cds.color}40`
                  }}
                />
                <span className="font-semibold text-sm whitespace-normal break-words">{cds.name}</span>
              </div>
              
              <div className="text-xs text-muted-foreground mb-1 font-medium whitespace-normal break-words">{cds.fullName}</div>
              <div className="text-xs text-muted-foreground/80 leading-tight line-clamp-2">{cds.description}</div>
              
              {selectedCDS.find(selected => selected.id === cds.id) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
              )}
            </Button>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-accent/30">
          <h4 className="font-semibold text-sm mb-2 text-foreground">Instructions:</h4>
          <ol className="text-xs text-muted-foreground space-y-1 leading-tight">
            <li>1. Drag a CDS to the plasmid workspace</li>
            <li>2. Or click to select (if none selected)</li>
            <li>3. Click "Start Simulation" to begin</li>
            <li>4. Watch transcription and translation!</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}