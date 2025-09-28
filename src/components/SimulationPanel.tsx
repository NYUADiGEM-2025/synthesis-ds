import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CDSOption, SimulationState, ANIMATION_STEPS } from "@/types/central-dogma";
import { Play, Pause, RotateCcw } from "lucide-react";

interface SimulationPanelProps {
  selectedCDS: CDSOption[];
  simulationState: SimulationState;
  onStartSimulation: () => void;
  onPauseSimulation: () => void;
  onResumeSimulation: () => void;
  onResetSimulation: () => void;
}

export function SimulationPanel({
  selectedCDS,
  simulationState,
  onStartSimulation,
  onPauseSimulation,
  onResumeSimulation,
  onResetSimulation
}: SimulationPanelProps) {
  const currentStep = ANIMATION_STEPS[simulationState.currentStep];
  const canStart = selectedCDS.length > 0 && !simulationState.isActive;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground">Simulation Controls</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
        {/* Primary Controls */}
        <div className="space-y-3">
          {!simulationState.isActive ? (
            <Button
              className="w-full"
              size="lg"
              onClick={onStartSimulation}
              disabled={selectedCDS.length === 0 || simulationState.isActive}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Simulation
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                className="w-full"
                variant="secondary"
                onClick={simulationState.isPaused ? onResumeSimulation : onPauseSimulation}
              >
                {simulationState.isPaused ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                )}
              </Button>
              
              <Button
                className="w-full"
                variant="outline"
                onClick={onResetSimulation}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          )}
        </div>

        {/* Progress Tracking */}
        {simulationState.isActive && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">{Math.round(simulationState.progress)}%</span>
              </div>
              <Progress value={simulationState.progress} className="h-2" />
            </div>
            
            <div className="bg-accent/20 rounded-lg p-3">
              <div className="text-sm font-semibold text-foreground mb-1">
                Step {simulationState.currentStep + 1}/10: {currentStep?.title}
              </div>
              {simulationState.isPaused && (
                <div className="text-xs text-muted-foreground">
                  Simulation paused
                </div>
              )}
            </div>
          </div>
        )}

        {/* Educational Caption Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2 text-primary">Current Process</h4>
          <p className="text-xs text-foreground leading-tight">
            {simulationState.isActive 
              ? currentStep?.description 
              : "Select a coding sequence and start the simulation to watch the Central Dogma in action - the fundamental process of gene expression from DNA to RNA to protein."
            }
          </p>
        </div>

        {/* Target Protein Information */}
        {selectedCDS.length > 0 && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
            <h3 className="font-semibold text-sm text-foreground mb-2">Target Proteins</h3>
            <div className="space-y-2">
              {selectedCDS.map((cds, index) => (
                <div key={`${cds.id}-${index}`} className="flex items-center gap-2 p-2 rounded-lg bg-accent/30">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cds.color }}
                  />
                  <div className="text-left min-w-0">
                    <p className="text-xs font-medium truncate">{cds.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{cds.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Central Dogma Reference */}
        <div className="bg-muted/20 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Central Dogma</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">DNA</span>
              <span>→</span>
              <span className="font-medium text-primary">RNA</span>
              <span>→</span>
              <span className="font-medium text-primary">Protein</span>
            </div>
            <p className="mt-2 leading-tight">
              The flow of genetic information from DNA through RNA to proteins
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}