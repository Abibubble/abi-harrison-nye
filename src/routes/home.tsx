import type { Route } from './+types/home';

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'Abi Harrison-Nye, Software Engineer' },
    {
      name: 'description',
      content: 'Software engineer and accessibility specialist.',
    },
  ];
}

// Placeholder until the content pages are built.
export default function Home() {
  return (
    <main>
      <h1>Abi Harrison-Nye</h1>
      <p>Software engineer and accessibility specialist. This site is being built.</p>
    </main>
  );
}
