import type { Project } from '../../content/projects';
import { AbbrText } from '../Abbr';
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

export function ProjectItem({ project, headingLevel }: ProjectItemProps) {
  return (
    <Card as="article">
      <Stack gap={3}>
        <Heading level={headingLevel}>{project.name}</Heading>
        <p>
          <AbbrText>{project.summary}</AbbrText>
        </p>
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
