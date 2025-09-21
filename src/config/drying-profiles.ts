import { DryingProfile } from "../schemas/batch-schemas";

export interface DryingProfileConfig {
  id: DryingProfile;
  name: string;
  description: string;
  subtitle: string;
  temperature: number;
  humidity: number;
  airflow: number;
  targetWeightLoss: number;
  characteristics: string;
  details: string;
}

export const DRYING_PROFILES: DryingProfileConfig[] = [
  {
    id: DryingProfile.WET,
    name: "Wet",
    description: "Soft, more moisture",
    subtitle:
      "Temperature 18 - 20℃, Humidity 65 - 65%, Air flow 0.1 - 0.2 m/s, Target Weight Loss 20-25%",
    temperature: 19,
    humidity: 60,
    airflow: 0.15,
    targetWeightLoss: 22,
    characteristics: "Slow drying; keeps interior soft; short-term shelf life.",
    details:
      "Perfect for those who prefer softer, more tender biltong with higher moisture content.",
  },
  {
    id: DryingProfile.MEDIUM,
    name: "Medium",
    description: "Balanced texture and moisture",
    subtitle:
      "Temperature 20 - 22℃, Humidity 55 - 55%, Air flow 0.2 - 0.3 m/s, Target Weight Loss 35-40%",
    temperature: 21,
    humidity: 55,
    airflow: 0.25,
    targetWeightLoss: 38,
    characteristics: "Balanced drying; good texture; medium shelf life.",
    details:
      "The classic choice offering the perfect balance between tenderness and preservation.",
  },
  {
    id: DryingProfile.DRY,
    name: "Dry",
    description: "Firm texture, longer storage",
    subtitle:
      "Temperature 22 - 24℃, Humidity 45 - 55%, Air flow 0.3 - 0.5 m/s, Target Weight Loss 50-60%",
    temperature: 24,
    humidity: 50,
    airflow: 0.4,
    targetWeightLoss: 55,
    characteristics: "Fast drying; firm texture; extended shelf life.",
    details:
      "Ideal for longer storage and those who prefer a firmer, more traditional biltong texture.",
  },
];

// Helper function to get profile by ID
export function getDryingProfile(
  profileId: DryingProfile
): DryingProfileConfig | undefined {
  return DRYING_PROFILES.find((profile) => profile.id === profileId);
}

// Helper function to get default profile
export function getDefaultProfile(): DryingProfileConfig {
  return (
    DRYING_PROFILES.find((profile) => profile.id === DryingProfile.MEDIUM) ||
    DRYING_PROFILES[0]
  );
}
