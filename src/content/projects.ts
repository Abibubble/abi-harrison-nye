export interface Project {
  name: string;
  summary: string;
  /** Technologies used, shown as tags */
  tech: string[];
  /** The live project, if there is one */
  href?: string;
  /** The code, if it's public */
  codeHref?: string;
}

/** Newest first. No projects have been added yet, so the page shows a holding message */
export const PROJECTS: Project[] = [];
