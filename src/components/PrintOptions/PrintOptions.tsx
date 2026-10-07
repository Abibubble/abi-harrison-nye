import { useEffect, useState } from 'react';

import { PrintButton } from '../PrintButton';
import { RadioGroup } from '../RadioGroup';
import { Stack } from '../Stack';
import styles from './PrintOptions.module.css';

export type PrintLayout = 'clear' | 'compact';

const LAYOUTS = [
  {
    value: 'clear',
    label: 'Clear',
    hint: 'Larger text with more space between lines, which is easier to read',
  },
  {
    value: 'compact',
    label: 'Compact',
    hint: 'Smaller text with less space, on fewer pages. Nothing is left out.',
  },
] as const;

export function PrintOptions() {
  const [layout, setLayout] = useState<PrintLayout>('clear');

  useEffect(() => {
    const root = document.documentElement;
    if (layout === 'compact') {
      root.dataset.printLayout = layout;
    } else {
      delete root.dataset.printLayout;
    }
    return () => {
      delete root.dataset.printLayout;
    };
  }, [layout]);

  return (
    <div className={styles.options} data-print="hide">
      <Stack gap={3}>
        <RadioGroup
          legend="Print layout"
          name="print-layout"
          options={LAYOUTS}
          value={layout}
          onChange={setLayout}
        />
        <PrintButton />
      </Stack>
    </div>
  );
}
