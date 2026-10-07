import { Button } from '../Button';
import styles from './PrintButton.module.css';

export function PrintButton() {
  return (
    <Button
      variant="secondary"
      className={styles.printButton}
      data-print="hide"
      onClick={() => {
        window.print();
      }}
    >
      Print or save as PDF
    </Button>
  );
}
