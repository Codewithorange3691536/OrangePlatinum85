export type CategoryType = 'all' | 'tshirt' | 'shirt' | 'mens' | 'womens' | 'children';

export interface Product {
  id: string;
  name: string;
  category: 'tshirt' | 'shirt';
  demographic: 'mens' | 'womens' | 'children';
  price: number;
  image: string;
  badge?: string;
  colorways: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  fabricSpec: string;
  weightGsm: number;
  description: string;
  features: string[];
  curriculumGoalId: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  image: string;
  experienceYears: number;
  bio: string;
  certifications: string[];
  signatureWorkout: {
    title: string;
    protocol: string;
    targetAdaptiveTrait: string;
  };
  athletesTrained: number;
}

export interface MemberStory {
  id: string;
  name: string;
  profession: string;
  goal: string;
  durationWeeks: number;
  metricBefore: string;
  metricAfter: string;
  keyMetricLabel: string;
  quote: string;
  apparelGear: string;
  image: string;
}

export interface CurriculumGoal {
  id: string;
  title: string;
  focus: string;
  intensity: string;
  recommendedApparel: string;
  description: string;
  protocols: string[];
  weeklyCommitment: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface TrialBooking {
  goalId: string;
  coachId: string;
  sessionDate: string;
  sessionTime: string;
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  apparelSize: string;
}
