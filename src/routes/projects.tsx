import { PageHeading } from '../components/PageHeading';
import { ProjectItem } from '../components/ProjectItem';
import { Stack } from '../components/Stack';
import { type Project, PROJECTS } from '../content/projects';
import { pageTitle } from '../content/site';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/projects';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Projects'),
    description: 'Things I’ve built outside work.',
    path: '/projects',
  });
}

export function ProjectsPage({ projects }: { projects: readonly Project[] }) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Projects</PageHeading>
        <p>Things I’ve built outside work.</p>
      </Stack>
      {projects.length > 0 ? (
        <Stack as="ul" gap={5}>
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectItem project={project} headingLevel={2} />
            </li>
          ))}
        </Stack>
      ) : (
        <p>I’m adding my projects here soon.</p>
      )}
    </Stack>
  );
}

export default function Projects() {
  return <ProjectsPage projects={PROJECTS} />;
}
