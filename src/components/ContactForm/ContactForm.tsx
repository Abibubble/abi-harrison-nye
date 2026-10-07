import {
  type SubmitEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  type ContactMessage,
  EMPTY_MESSAGE,
  FIELD_IDS,
  MESSAGE_LIMIT,
  tidyMessage,
  validateMessage,
} from '../../contact/message';
import { sendMessage } from '../../contact/sendMessage';
import { PRIVACY_CONTACT_FORM_ID } from '../../content/statements';
import { Button } from '../Button';
import { Cluster } from '../Cluster';
import { ErrorSummary, type FormError } from '../ErrorSummary';
import { Link } from '../Link';
import { Notice } from '../Notice';
import { Stack } from '../Stack';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import styles from './ContactForm.module.css';

type Step = 'writing' | 'checking' | 'sending' | 'sent' | 'failed';

const CHECK_HEADING_ID = 'check-your-message';

interface ContactFormProps {
  send?: (message: ContactMessage) => Promise<void>;
}

const subscribeToNothing = () => () => undefined;

function useIsReady(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

function typedBeforeReady(): ContactMessage {
  const valueOf = (id: string) =>
    (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '';
  return {
    name: valueOf(FIELD_IDS.name),
    email: valueOf(FIELD_IDS.email),
    message: valueOf(FIELD_IDS.message),
  };
}

/** The confirmation step meets WCAG 3.3.6; a honeypot catches spam without a CAPTCHA */
export function ContactForm({ send = sendMessage }: ContactFormProps) {
  const [message, setMessage] = useState<ContactMessage>(EMPTY_MESSAGE);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [step, setStep] = useState<Step>('writing');
  const [honeypot, setHoneypot] = useState('');
  const ready = useIsReady();
  const checkHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);

  useLayoutEffect(() => {
    const typed = typedBeforeReady();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (typed.name || typed.email || typed.message) setMessage(typed);
  }, []);

  useEffect(() => {
    const from = previousStep.current;
    previousStep.current = step;
    if (from === step) return;

    if (step === 'checking' && from === 'writing') checkHeadingRef.current?.focus();
    if (step === 'sent' || step === 'failed') resultRef.current?.focus();
    if (step === 'writing') document.getElementById(FIELD_IDS.name)?.focus();
  }, [step]);

  function update(field: keyof ContactMessage, value: string) {
    setMessage((current) => ({ ...current, [field]: value }));
  }

  function checkMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Only spam bots fill in the hidden field. Let them think it worked, without sending anything
    if (honeypot) {
      setStep('sent');
      return;
    }

    const found = validateMessage(message);
    setErrors(found);
    if (found.length === 0) setStep('checking');
  }

  async function sendIt() {
    if (step === 'sending') return;
    setStep('sending');
    try {
      await send(tidyMessage(message));
      setStep('sent');
    } catch {
      setStep('failed');
    }
  }

  function startAgain() {
    setMessage(EMPTY_MESSAGE);
    setErrors([]);
    setStep('writing');
  }

  if (step === 'sent') {
    const { name, email } = tidyMessage(message);
    return (
      <Stack gap={4}>
        <Notice ref={resultRef} variant="success" title="Message sent">
          <p>
            Thanks{name ? `, ${name}` : ''}. I’ll reply to {email || 'you'} as soon as I can.
          </p>
        </Notice>
        <Button className={styles.contentWidthButton} variant="secondary" onClick={startAgain}>
          Send another message
        </Button>
      </Stack>
    );
  }

  if (step === 'checking' || step === 'sending' || step === 'failed') {
    const tidy = tidyMessage(message);
    return (
      <Stack gap={5}>
        {step === 'failed' && (
          <Notice ref={resultRef} variant="error" title="Your message wasn’t sent">
            <p>
              Something went wrong when sending it. Nothing you wrote has been lost, so you can try
              again, or change it first.
            </p>
          </Notice>
        )}
        <Stack as="section" gap={4} aria-labelledby={CHECK_HEADING_ID}>
          <h2 id={CHECK_HEADING_ID} ref={checkHeadingRef} tabIndex={-1}>
            Check your message
          </h2>
          <dl className={styles.summary}>
            <div>
              <dt>Your name</dt>
              <dd>{tidy.name}</dd>
            </div>
            <div>
              <dt>Your email address</dt>
              <dd>{tidy.email}</dd>
            </div>
            <div>
              <dt>Your message</dt>
              <dd className={styles.messageText}>{tidy.message}</dd>
            </div>
          </dl>
          <p>
            When you send it, your message comes to me by email through EmailJS, a service that
            delivers emails from websites. I’ll only use your email address to reply to you.{' '}
            <Link to={`/privacy#${PRIVACY_CONTACT_FORM_ID}`}>How your information is used</Link>.
          </p>
          <Cluster gap={3}>
            <Button onClick={() => void sendIt()}>
              {step === 'failed' ? 'Try sending again' : 'Send message'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setStep('writing');
              }}
            >
              Change your message
            </Button>
          </Cluster>
          <p role="status" className={styles.status}>
            {step === 'sending' ? 'Sending your message…' : ''}
          </p>
        </Stack>
      </Stack>
    );
  }

  return (
    <form noValidate onSubmit={checkMessage} className={styles.form}>
      <Stack gap={5}>
        <ErrorSummary errors={errors} />
        <TextField
          id={FIELD_IDS.name}
          name="name"
          label="Your name"
          autoComplete="name"
          value={message.name}
          error={errors.find((error) => error.fieldId === FIELD_IDS.name)?.message}
          onChange={(event) => {
            update('name', event.target.value);
          }}
        />
        <TextField
          id={FIELD_IDS.email}
          name="email"
          type="email"
          label="Your email address"
          hint="So I can reply to you. I won’t share it with anyone."
          autoComplete="email"
          spellCheck={false}
          autoCapitalize="none"
          value={message.email}
          error={errors.find((error) => error.fieldId === FIELD_IDS.email)?.message}
          onChange={(event) => {
            update('email', event.target.value);
          }}
        />
        <TextArea
          id={FIELD_IDS.message}
          name="message"
          label="Your message"
          characterLimit={MESSAGE_LIMIT}
          value={message.message}
          error={errors.find((error) => error.fieldId === FIELD_IDS.message)?.message}
          onChange={(event) => {
            update('message', event.target.value);
          }}
        />
        {/* Hidden from everyone, including screen readers and keyboards. Only bots fill it in */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Leave this empty</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => {
              setHoneypot(event.target.value);
            }}
          />
        </div>
        <Button className={styles.contentWidthButton} type={ready ? 'submit' : 'button'}>
          Continue
        </Button>
      </Stack>
    </form>
  );
}
