export interface CDSOption {
  id: string;
  name: string;
  fullName: string;
  color: string;
  description: string;
}

export interface SimulationState {
  isActive: boolean;
  isPaused: boolean;
  currentStep: number;
  progress: number;
}

export interface AnimationStep {
  title: string;
  description: string;
  duration: number;
}

export const CDS_OPTIONS: CDSOption[] = [
  {
    id: 'egfp',
    name: 'EGFP',
    fullName: 'Enhanced Green Fluorescent Protein',
    color: '#00FF00',
    description: 'A bright green fluorescent protein widely used in molecular biology research.'
  },
  {
    id: 'mrfp1',
    name: 'mRFP1',
    fullName: 'Monomeric Red Fluorescent Protein 1',
    color: '#FF0000',
    description: 'A monomeric red fluorescent protein derived from DsRed.'
  },
  {
    id: 'mtagbfp2',
    name: 'mTagBFP2',
    fullName: 'Monomeric Tag Blue Fluorescent Protein 2',
    color: '#0000FF',
    description: 'A bright blue fluorescent protein optimized for mammalian expression.'
  }
];

export const ANIMATION_STEPS: AnimationStep[] = [
  { title: 'DNA Setup', description: 'Double helix DNA structure is established', duration: 3000 },
  { title: 'DNA Unwinding', description: 'DNA strands separate at the transcription start site', duration: 3000 },
  { title: 'RNA Polymerase Binding', description: 'RNA polymerase enzyme binds to the promoter region', duration: 3000 },
  { title: 'Transcription Initiation', description: 'RNA polymerase begins synthesizing mRNA', duration: 3000 },
  { title: 'mRNA Formation', description: 'Messenger RNA is transcribed from the DNA template', duration: 3000 },
  { title: 'Ribosome Binding', description: 'Ribosome binds to the mRNA molecule', duration: 3000 },
  { title: 'tRNA Recruitment', description: 'Transfer RNA molecules bring amino acids to the ribosome', duration: 3000 },
  { title: 'Protein Synthesis', description: 'Amino acids are linked together to form a polypeptide chain', duration: 3000 },
  { title: 'Protein Folding', description: 'The polypeptide chain folds into its functional 3D structure', duration: 3000 },
  { title: 'Protein Complete', description: 'The fluorescent protein is complete and begins to glow', duration: 3000 }
];