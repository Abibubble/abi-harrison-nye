import { ContactForm } from '../components/ContactForm';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { pageTitle } from '../content/site';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/contact';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Contact'),
    description: 'Send me a message, and I’ll reply by email.',
    path: '/contact',
  });
}

export default function Contact() {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Contact</PageHeading>
        <p>Send me a message using this form, and I’ll reply by email.</p>
        <p>All fields are required. You’ll be able to check your message before it’s sent.</p>
      </Stack>
      <ContactForm />
    </Stack>
  );
}
