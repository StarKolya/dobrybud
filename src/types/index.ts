export type PackageId = "basic" | "design" | "premium";

export interface CalculatorPackage {
  id: PackageId;
  pricePerSqm: number;
}

export interface CalculatorInput {
  packageId: PackageId;
  areaSqm: number;
  district?: string;
}

export interface ProjectCard {
  id: string;
  image: string;
  budget: string;
  durationMonths: number;
  areaSqm: number;
  resultValue: string;
}

export interface Testimonial {
  id: string;
  avatarImage?: string;
  beforeImage: string;
  afterImage: string;
}

export interface Stage {
  title: string;
  description: string;
}
