export type ProjectCategory =
  | "Client Website"
  | "Web Application"
  | "Ecommerce"
  | "Portfolio";

export type OrbitShape = "circle" | "ellipse";

export type OrbitDirection = "clockwise" | "counterclockwise";

export type StarSize = "small" | "medium" | "large";

export type StarGlow =
  | "warm"
  | "cool"
  | "blue"
  | "cyan"
  | "violet"
  | "white";

export interface ProjectStar {
  size: StarSize;
  satellites: number;
  orbitShape: OrbitShape;
  orbitDirection: OrbitDirection;
  orbitDuration: number;
  orbitScaleX: number;
  orbitScaleY: number;
  glow: StarGlow;
  tilt?: number;
  secondaryOrbit?: {
    orbitDuration: number;
    orbitScaleX: number;
    orbitScaleY: number;
    orbitDirection: OrbitDirection;
    tilt?: number;
  };
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
  profile: ProjectProfile;
  star: ProjectStar;
}