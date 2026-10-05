import type { Project } from '../../content/projects';
import { Card } from '../Card';
import { Cluster } from '../Cluster';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { TagList } from '../Tag';

interface ProjectItemProps {
  project: Project;
  headingLevel: HeadingLevel;
}

/**
 * One side project. Its links name the project, so each one makes sense on its own when listed with
 * every other link on the page (WCAG 2.4.9).
 */
export function ProjectItem({ project, headingLevel }: ProjectItemProps) {
  return (
    <Card as="article">
      <Stack gap={3}>
        <Heading level={headingLevel}>{project.name}</Heading>
        <p>{project.summary}</p>
        {project.tech.length > 0 && (
          <TagList tags={project.tech} label={`Technologies used for ${project.name}`} />
        )}
        {(project.href ?? project.codeHref) && (
          <Cluster gap={4}>
            {project.href && <Link href={project.href}>See {project.name}</Link>}
            {project.codeHref && (
              <Link href={project.codeHref}>Read the code for {project.name}</Link>
            )}
          </Cluster>
        )}
      </Stack>
    </Card>
  );
}
