import { Button } from '../Button';
import styles from './PrintButton.module.css';

/**
 * Opens the browser's print dialog, where people can also save the page as a PDF. It needs
 * JavaScript, so it's hidden without it, and it's left off the printed page itself.
 */
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
