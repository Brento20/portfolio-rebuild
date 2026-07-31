export interface Project {
  id: string;
  title: string;
  url: string;
  location: string;
  category: "Client Website" | "Personal Project";

  summary: string;

  industries: string[];
  capabilities: string[];
  technologies: string[];

  featured: boolean;

  profile: {
    frontend: number;
    seo: number;
    design: number;
    cms: number;
    backend: number;
  };
}