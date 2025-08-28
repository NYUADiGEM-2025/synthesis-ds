import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CDS_OPTIONS, CDSOption } from "@/types/central-dogma";
import { cn } from "@/lib/utils";

interface PartsBinProps {
  selectedCDS: CDSOption | null;
  onCDSSelect: (cds: CDSOption) => void;
  isSimulating: boolean;
}

export function PartsBin({ selectedCDS, onCDSSelect, isSimulating }: PartsBinProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-foreground">Parts Bin</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Click a Coding Sequence (CDS) to place it on the plasmid
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {CDS_OPTIONS.map((cds) => (
          <Button
            key={cds.id}
            variant="outline"
            className={cn(
              "w-full p-4 h-auto flex-col items-start text-left transition-all duration-200",
              selectedCDS?.id === cds.id && "border-primary bg-primary/10",
              isSimulating && "opacity-50 cursor-not-allowed",
              !isSimulating && "hover:bg-accent/50"
            )}
            onClick={() => !isSimulating && onCDSSelect(cds)}
            disabled={isSimulating}
          >
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: cds.color }}
              />
              <span className="font-semibold">{cds.name}</span>
            </div>
            <div className="text-xs text-muted-foreground">{cds.fullName}</div>
          </Button>
        ))}
        
        <div className="mt-6 p-4 bg-accent/20 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Instructions:</h4>
          <ol className="text-xs text-muted-foreground space-y-1">
            <li>1. Select a CDS from above</li>
            <li>2. CDS will appear on the plasmid</li>
            <li>3. Click "Start Simulation" to begin</li>
            <li>4. Watch the Central Dogma unfold!</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}