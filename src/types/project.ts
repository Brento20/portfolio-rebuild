export type ProjectCategory =
  | "Client Website"
  | "Web Application"
  | "Ecommerce"
  | "Portfolio";

export type StarSize = "small" | "medium" | "large";

export type StarGlow =
  | "warm"
  | "cool"
  | "blue"
  | "cyan"
  | "violet"
  | "white";

export type OrbitDirection = "clockwise" | "counterclockwise";

export interface SatelliteConfig {
  size: number;
  angle?: number;
}

export interface OrbitConfig {
  radius: number;
  ellipse: number;
  tilt?: number;
  duration: number;
  direction: OrbitDirection;
  satellites: SatelliteConfig[];
}

export interface ProjectStar {
  size: StarSize;
  glow: StarGlow;
  orbits: OrbitConfig[];
}

export interface ProjectProfile {
  design: number;
  development: number;
  seo: number;
  accessibility: number;
  infrastructure: number;
  performance: number;
  cms: number;
  strategy: number;
}

export interface Project {
  id: string;
  title: string;
  url: string;
  location: string;
  category: ProjectCategory;
  summary: string;
  industries: string[];
  capabilities: string[];
  technologies: string[];
  featured: boolean;
  /** Screenshot path under /public, shown in the project drawer */
  image?: string;
  profile: ProjectProfile;
  star: ProjectStar;
}