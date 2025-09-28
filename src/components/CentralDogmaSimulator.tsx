import { useState, useCallback } from "react";
import { PartsBin } from "./PartsBin";
import { PlasmidWorkspace } from "./PlasmidWorkspace";
import { SimulationPanel } from "./SimulationPanel";
import { AnimationCanvas } from "./AnimationCanvas";
import { CDSOption, SimulationState, ANIMATION_STEPS } from "@/types/central-dogma";
import { useToast } from "@/hooks/use-toast";

export function CentralDogmaSimulator() {
  const [selectedCDS, setSelectedCDS] = useState<CDSOption[]>([]);
  const [draggingCDS, setDraggingCDS] = useState<CDSOption | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isActive: false,
    isPaused: false,
    currentStep: 0,
    progress: 0
  });
  
  const { toast } = useToast();

  const handleCDSSelect = useCallback((cds: CDSOption) => {
    if (selectedCDS.length < 4 && !selectedCDS.find(existing => existing.id === cds.id)) {
      setSelectedCDS(prev => [...prev, cds]);
      toast({
        title: "CDS Added",
        description: `${cds.fullName} added to plasmid workspace`,
      });
    }
  }, [selectedCDS, toast]);

  const handleDragStart = useCallback((cds: CDSOption) => {
    setDraggingCDS(cds);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingCDS(null);
  }, []);

  const handleClearCDS = useCallback((index?: number) => {
    if (typeof index === 'number') {
      const removedCDS = selectedCDS[index];
      setSelectedCDS(prev => prev.filter((_, i) => i !== index));
      toast({
        title: "CDS Removed",
        description: `${removedCDS.fullName} removed from plasmid`,
      });
    } else {
      setSelectedCDS([]);
      toast({
        title: "All CDS Removed",
        description: "Plasmid is now empty",
      });
    }
  }, [selectedCDS, toast]);

  const handleStartSimulation = useCallback(() => {
    if (selectedCDS.length === 0) return;
    
    setSimulationState({
      isActive: true,
      isPaused: false,
      currentStep: 0,
      progress: 0
    });
    
    toast({
      title: "Simulation Started",
      description: "Watch the Central Dogma unfold!",
    });
  }, [selectedCDS, toast]);

  const handlePauseSimulation = useCallback(() => {
    setSimulationState(prev => ({
      ...prev,
      isPaused: true
    }));
    
    toast({
      title: "Simulation Paused",
      description: "Click Resume to continue",
    });
  }, [toast]);

  const handleResumeSimulation = useCallback(() => {
    setSimulationState(prev => ({
      ...prev,
      isPaused: false
    }));
    
    toast({
      title: "Simulation Resumed",
      description: "Continuing animation",
    });
  }, [toast]);

  const handleResetSimulation = useCallback(() => {
    setSimulationState({
      isActive: false,
      isPaused: false,
      currentStep: 0,
      progress: 0
    });
    
    toast({
      title: "Simulation Reset",
      description: "Ready to start again",
    });
  }, [toast]);

  const handleStepComplete = useCallback(() => {
    setSimulationState(prev => {
      const nextStep = prev.currentStep + 1;
      const newProgress = ((nextStep) / ANIMATION_STEPS.length) * 100;
      
      if (nextStep >= ANIMATION_STEPS.length) {
        // Simulation complete
        toast({
          title: "Simulation Complete!",
          description: `${selectedCDS.length > 1 ? 'Multiple proteins' : selectedCDS[0]?.fullName} successfully expressed!`,
        });
        
        return {
          isActive: false,
          isPaused: false,
          currentStep: 0,
          progress: 100
        };
      }
      
      return {
        ...prev,
        currentStep: nextStep,
        progress: newProgress
      };
    });
  }, [selectedCDS, toast]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Central Dogma Simulator
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of gene expression from DNA to protein
          </p>
        </div>

        {/* Main Interface */}
        {!simulationState.isActive ? (
          /* Three-panel layout for setup */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[700px]">
            {/* Parts Bin */}
            <div className="lg:col-span-1">
              <PartsBin
                selectedCDS={selectedCDS}
                onCDSSelect={handleCDSSelect}
                isSimulating={simulationState.isActive}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </div>

            {/* Plasmid Workspace */}
            <div className="lg:col-span-1">
              <PlasmidWorkspace
                selectedCDS={selectedCDS}
                onCDSSelect={handleCDSSelect}
                onClearCDS={handleClearCDS}
                isSimulating={simulationState.isActive}
                draggingCDS={draggingCDS}
              />
            </div>

            {/* Simulation Panel */}
            <div className="lg:col-span-1">
              <SimulationPanel
                selectedCDS={selectedCDS}
                simulationState={simulationState}
                onStartSimulation={handleStartSimulation}
                onPauseSimulation={handlePauseSimulation}
                onResumeSimulation={handleResumeSimulation}
                onResetSimulation={handleResetSimulation}
              />
            </div>
          </div>
        ) : (
          /* Full-screen animation layout */
          <div className="space-y-6">
            {/* Animation Canvas */}
            <div className="flex justify-center">
              <AnimationCanvas
                selectedCDS={selectedCDS}
                simulationState={simulationState}
                onStepComplete={handleStepComplete}
              />
            </div>

            {/* Compact control panel during simulation */}
            <div className="max-w-md mx-auto">
              <SimulationPanel
                selectedCDS={selectedCDS}
                simulationState={simulationState}
                onStartSimulation={handleStartSimulation}
                onPauseSimulation={handlePauseSimulation}
                onResumeSimulation={handleResumeSimulation}
                onResetSimulation={handleResetSimulation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}