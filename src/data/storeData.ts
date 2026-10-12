import { Product, Coach, MemberStory, CurriculumGoal } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_strength_athlete_1791699143183.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Vanguard 420GSM Heavyweight T-Shirt',
    category: 'tshirt',
    demographic: 'mens',
    price: 94,
    image: '/src/assets/images/apparel_oversized_tshirt_1791699195949.jpg',
    badge: 'Signature Edition',
    colorways: ['Pure Obsidian', 'Gunmetal Matte', 'Raw Silver'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabricSpec: '100% Combed Heavy Cotton with Silver-Ion Antimicrobial Weave',
    weightGsm: 420,
    description: 'An architectural silhouette engineered with structured drop-shoulder seams. Built to withstand maximal barbell friction without losing tensile form.',
    features: [
      'Reinforced double-needle collar that never sags',
      'High-density 420 GSM micro-brushed drape',
      'Side-slit venting for unrestricted overhead movement',
      'Thermoregulating cold-touch interior face'
    ],
    curriculumGoalId: 'hypertrophy'
  },
  {
    id: 'prod-02',
    name: 'Kinetic Ergonomic Compression Shirt',
    category: 'shirt',
    demographic: 'mens',
    price: 118,
    image: '/src/assets/images/apparel_mens_shirt_1791699158811.jpg',
    badge: 'Pro Grade',
    colorways: ['Stealth Carbon', 'Onyx Ribbed'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabricSpec: '78% Bonded Polyamide / 22% Elastane Dual-Density Grid',
    weightGsm: 260,
    description: 'Graduated anatomical compression mapped to latissimus and pectoral kinetic chains. Reduces muscular vibration during eccentric load phases.',
    features: [
      'Zone-mapped compression for scapular stabilization',
      'Laser-cut capillary ventilation along the spine',
      'Zero-friction bonded flatlock seams',
      'Reflective metallic silver branding badge'
    ],
    curriculumGoalId: 'hypertrophy'
  },
  {
    id: 'prod-03',
    name: 'Aura High-Gauge Women’s Training Tee',
    category: 'tshirt',
    demographic: 'womens',
    price: 88,
    image: '/src/assets/images/apparel_womens_tee_1791699171543.jpg',
    badge: 'Core Performance',
    colorways: ['Deep Noir', 'Silver Ash'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabricSpec: 'Hydrophobic Micro-Rib Lyocell & Spun Modal Matrix',
    weightGsm: 210,
    description: 'Cut specifically for high-mobility Olympic weightlifting and functional cadence. Form-fitting without constriction, tailored to emphasize athletic beauty.',
    features: [
      'Sculpted raglan armholes for full shoulder extension',
      'Immediate moisture evacuation technology',
      'Subtle metallic silver hem branding',
      'Anti-odor zinc-pyrithione permanent infusion'
    ],
    curriculumGoalId: 'velocity'
  },
  {
    id: 'prod-04',
    name: 'Cadence Long-Sleeve Performance Shirt',
    category: 'shirt',
    demographic: 'womens',
    price: 125,
    image: '/src/assets/images/hero_strength_athlete_1791699143183.jpg',
    badge: 'Endurance Spec',
    colorways: ['Black Ash', 'Smoked Platinum'],
    sizes: ['XS', 'S', 'M', 'L'],
    fabricSpec: 'Seamless Circular Knit with Thermal Mesh Micro-Channels',
    weightGsm: 240,
    description: 'Engineered for conditioning sessions in cold brutalist spaces. Keeps core body temperature optimized while allowing rapid heat dissipation.',
    features: [
      'Integrated thumb-loops for bar grip stability',
      'Seamless tubular torso construction',
      'UV 50+ rated yarn for outdoor transition workouts',
      'High-tensile stretch recovery'
    ],
    curriculumGoalId: 'velocity'
  },
  {
    id: 'prod-05',
    name: 'Cadet Junior High-Velocity Active Tee',
    category: 'tshirt',
    demographic: 'children',
    price: 58,
    image: '/src/assets/images/apparel_children_active_1791699185095.jpg',
    badge: 'Youth Athletic',
    colorways: ['Matte Black', 'Track Silver'],
    sizes: ['S', 'M', 'L', 'XL'],
    fabricSpec: 'Anti-Tear Ripstop Poly-Cotton Breathable Blend',
    weightGsm: 190,
    description: 'Designed for young athletes building foundation agility and track mechanics. Built with abrasion-resistant yarn that withstands rigorous daily training.',
    features: [
      'Growth-adaptive 4-way mechanical stretch',
      'Chafe-free ergonomic neckband',
      'Quick-wash rapid dry within 45 minutes',
      'High-contrast safety reflective accents'
    ],
    curriculumGoalId: 'junior'
  },
  {
    id: 'prod-06',
    name: 'Ascent Junior Kinetic Warmup Shirt',
    category: 'shirt',
    demographic: 'children',
    price: 68,
    image: '/src/assets/images/apparel_children_active_1791699185095.jpg',
    badge: 'Junior Foundation',
    colorways: ['Obsidian Black', 'Graphite'],
    sizes: ['S', 'M', 'L', 'XL'],
    fabricSpec: 'Lightweight Brushed Micro-Fleece & Aerodynamic Weave',
    weightGsm: 220,
    description: 'Lightweight technical warmup shirt for developing champions. Delivers ideal muscular pre-heating before sprinting and multi-plane conditioning.',
    features: [
      'Soft brushed interior prevents dermal irritation',
      'Reinforced elbow articulation panels',
      'Breathable underarm mesh inserts',
      'Athletic taper fit'
    ],
    curriculumGoalId: 'junior'
  }
];

export const COACHES: Coach[] = [
  {
    id: 'coach-marcus',
    name: 'Marcus Vance',
    role: 'Head Strength Architect',
    image: '/src/assets/images/coach_marcus_vance_1791699229975.jpg',
    experienceYears: 14,
    bio: 'Former collegiate strength director turned brutalist performance engineer. Marcus has conditioned over 40 national-level barbell athletes and powerlifters.',
    certifications: [
      'CSCS (Certified Strength & Conditioning Specialist)',
      'USA Weightlifting Senior National Coach',
      'EXOS Performance Specialist'
    ],
    signatureWorkout: {
      title: 'The 900kg Threshold',
      protocol: '5x5 Deficit Deadlifts at 82% into 6x30m Trap Bar Neutral Carries',
      targetAdaptiveTrait: 'Posterior chain force velocity & nervous system resilience'
    },
    athletesTrained: 820
  },
  {
    id: 'coach-elena',
    name: 'Elena Rostova',
    role: 'Olympic Mechanics & Kinetic Velocity',
    image: '/src/assets/images/coach_elena_rostova_1791699242443.jpg',
    experienceYears: 11,
    bio: 'World championship snatch medalist specializing in biomechanical precision, triple extension transfer, and maximal power output.',
    certifications: [
      'Olympic Weightlifting Level 3 Master Coach',
      'FMS (Functional Movement Screen) Level 2',
      'M.S. Applied Biomechanics'
    ],
    signatureWorkout: {
      title: 'Kinetic Snatch Blitz',
      protocol: '7-Stage Snatch Complex (Pull + Hang + Overhead Squat) followed by 500m Max Erg Wattage',
      targetAdaptiveTrait: 'Instantaneous rate of force development & hip hinge explosion'
    },
    athletesTrained: 650
  },
  {
    id: 'coach-kai',
    name: 'Dr. Kai Chen',
    role: 'Director of Biomechanics & Youth Athletics',
    image: '/src/assets/images/coach_kai_chen_1791699254981.jpg',
    experienceYears: 9,
    bio: 'Doctor of Physical Therapy focused on structural longevity, sprint mechanics, and injury-proofing the next generation of youth athletes.',
    certifications: [
      'DPT (Doctor of Physical Therapy)',
      'NSCA-CPT Advanced Biomechanics',
      'Track & Field Speed Dynamics Specialist'
    ],
    signatureWorkout: {
      title: 'Velocity Sprint Calibration',
      protocol: 'Heavy Sled Deceleration into 40m Unresisted Acceleration at 100% Force',
      targetAdaptiveTrait: 'Tendon stiffness, stride frequency & rotational kinetic energy'
    },
    athletesTrained: 940
  }
];

export const CURRICULUM_GOALS: CurriculumGoal[] = [
  {
    id: 'hypertrophy',
    title: 'Absolute Force & Density',
    focus: 'Maximal myofibrillar hypertrophy, posterior chain density & barbell mastery',
    intensity: 'High Mechanical Tension (RPE 8.5 - 9.5)',
    recommendedApparel: 'Vanguard 420GSM Heavyweight Tee & Compression Shirt',
    description: 'Targeted strength cycles designed to build raw mechanical strength and structural spinal stability under uncompromising loads.',
    protocols: [
      'Compound Barbell Force (Squat, Deadlift, Bench, Press)',
      'Loaded Carries & Core Bracing Over 120s Sets',
      'Eccentric Tempo Resistance for Hypertrophy'
    ],
    weeklyCommitment: '4 sessions / week · 75 min'
  },
  {
    id: 'velocity',
    title: 'High-Velocity Conditioning',
    focus: 'Lactate threshold buffering, VO2 max elevation & multi-plane agility',
    intensity: 'Variable Aerobic/Anaerobic Cadence (HR 165 - 192 BPM)',
    recommendedApparel: 'Aura High-Gauge Tee & Cadence Long-Sleeve Shirt',
    description: 'Brutal interval protocols combining concept2 ergs, assault runners, and kettlebell ballistics to test mental and cardiovascular grit.',
    protocols: [
      'High-Output Interval Wave Calibrations',
      'Zone 5 Threshold Sprints & Assault Erg Sprints',
      'Dynamic Plyometric Force Absorption'
    ],
    weeklyCommitment: '3 sessions / week · 60 min'
  },
  {
    id: 'longevity',
    title: 'Structural Resilience & Recovery',
    focus: 'Joint decompression, fascia gliding, postural equilibrium & nervous down-regulation',
    intensity: 'Restorative & Kinetic Flow (RPE 5.0 - 6.5)',
    recommendedApparel: 'Oversized Rest T-Shirt & Thermal Heavywear',
    description: 'The antidote to heavy training. We rebuild damaged connective tissue, restore hip capsule rotation, and re-center the kinetic spine.',
    protocols: [
      'End-Range Isometric Joint Conditioning',
      'Postural Realignment & Scapular Mobility',
      'Cold-Water & Breath Downregulation Cycles'
    ],
    weeklyCommitment: '2 sessions / week · 45 min'
  },
  {
    id: 'junior',
    title: 'Junior Athletic Development',
    focus: 'Youth foundation mechanics, spatial awareness, speed mechanics & character',
    intensity: 'Progressive Skill & Agility (Ages 10-17)',
    recommendedApparel: 'Cadet Junior Active Tee & Ascent Warmup Shirt',
    description: 'Empowering future athletes with pristine movement patterns, disciplined team camaraderie, and progressive speed training.',
    protocols: [
      'Linear & Lateral Acceleration Drills',
      'Bodyweight Relative Strength & Core Mastery',
      'Competitive Team Circuit Scrimmages'
    ],
    weeklyCommitment: '3 sessions / week · 50 min'
  }
];

export const MEMBER_STORIES: MemberStory[] = [
  {
    id: 'story-01',
    name: 'Julian Sterling',
    profession: 'Architectural Director',
    goal: 'Hypertrophy & Spinal Restoration',
    durationWeeks: 24,
    metricBefore: '110kg Deadlift · Chronic Lower Back Pain',
    metricAfter: '225kg Deadlift · Zero Pain & +8kg Lean Mass',
    keyMetricLabel: '+115kg Absolute Force',
    quote: 'KINETIC NOIR isn’t just a brand—it is a physical doctrine. The gear takes brutal punishment on the platform, and Coach Marcus taught me that strength is our greatest moral shield.',
    apparelGear: 'Vanguard 420GSM Tee + Compression Base',
    image: '/src/assets/images/apparel_mens_shirt_1791699158811.jpg'
  },
  {
    id: 'story-02',
    name: 'Soraya Lindqvist',
    profession: 'Aerospace Systems Engineer',
    goal: 'Olympic Weightlifting & Power Density',
    durationWeeks: 16,
    metricBefore: '42kg Snatch · Stiff Overhead Mobility',
    metricAfter: '88kg Snatch · Clean Split Jerk at 105kg',
    keyMetricLabel: '+46kg Snatch Record',
    quote: 'The level of technical detail in Elena’s coaching mirrors the tolerances I work with in aerospace. The apparel fits like a second skin without any distracting fabric bunching.',
    apparelGear: 'Aura High-Gauge Training Tee',
    image: '/src/assets/images/apparel_womens_tee_1791699171543.jpg'
  },
  {
    id: 'story-03',
    name: 'Leo & Nathan Thorne',
    profession: 'Father & Junior Track Athlete (14 yrs)',
    goal: 'Sprint Mechanics & Youth Character',
    durationWeeks: 20,
    metricBefore: '5.22s 40-Yard Dash · Ankle Pronation',
    metricAfter: '4.64s 40-Yard Dash · Regional Track Finalist',
    keyMetricLabel: '-0.58s Sprint Time',
    quote: 'Watching my son train alongside world-class mentors changed how he approaches school and life. He lives in his Cadet Junior shirt—it withstands his daily sprint sessions without a single tear.',
    apparelGear: 'Cadet Junior High-Velocity Active Tee',
    image: '/src/assets/images/apparel_children_active_1791699185095.jpg'
  }
];

export const BRAND_STATS = [
  { label: 'Athletes in Community', value: '14,800+' },
  { label: 'Weekly Platform Hours', value: '38,400 hrs' },
  { label: 'Average Force Increase', value: '+34.8%' },
  { label: 'Apparel Tensile Rating', value: '420 GSM' }
];
