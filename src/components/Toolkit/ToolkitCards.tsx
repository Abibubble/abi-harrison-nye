import {
  type ToolkitFolder,
  type ToolkitItem,
  fileType,
  viewableFile,
} from '../../content/toolkit';
import { Card } from '../Card';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { Stack } from '../Stack';
import { Time } from '../Time';
import styles from './Toolkit.module.css';

const { BASE_URL } = import.meta.env;

/**
 * A row for each of a resource's files, saying what kind of file it is and its size, with short
 * links to view it (PDFs only) and download it. Screen readers also hear which resource and file
 * each link is for, so it makes sense read on its own (WCAG 2.4.9). That comes after the visible
 * words, so speech control users can say what they see (WCAG 2.5.3)
 */
export function ToolkitFileLinks({ item }: { item: ToolkitItem }) {
  const viewable = viewableFile(item);

  return (
    <ul className={styles.files}>
      {item.files.map((file) => {
        const type = fileType(file) ?? 'File';

        return (
          <li key={file.path} className={styles.file}>
            <span>
              <span className={styles.label}>{type}</span>{' '}
              <span className={styles.meta}>({file.size})</span>
            </span>
            <span className={styles.fileLinks}>
              {file === viewable && (
                <>
                  {/* A new tab keeps the toolkit open, and the link says so before it's followed */}
                  <a href={`${BASE_URL}${file.path}`} target="_blank" rel="noreferrer">
                    View in a new tab
                    <ScreenReaderOnly>: {item.title}, PDF</ScreenReaderOnly>
                  </a>
                  {/* Real spaces, so copied text and reader views don't run the words together */}{' '}
                  <span>or</span>{' '}
                </>
              )}
              <a href={`${BASE_URL}${file.path}`} download>
                Download
                <ScreenReaderOnly>
                  : {item.title}, {type}, {file.size}
                </ScreenReaderOnly>
              </a>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

interface FolderCardProps {
  folder: ToolkitFolder;
  path: string;
  headingLevel: HeadingLevel;
}

export function ToolkitFolderCard({ folder, path, headingLevel }: FolderCardProps) {
  return (
    <Card as="article">
      <Stack gap={2}>
        <Heading level={headingLevel}>{folder.title}</Heading>
        <p>{folder.description}</p>
        <p className={styles.standalone}>
          <Link to={path}>Open the {folder.title} folder</Link>
        </p>
      </Stack>
    </Card>
  );
}

interface FileCardProps {
  item: ToolkitItem;
  path: string;
  headingLevel: HeadingLevel;
}

export function ToolkitFileCard({ item, path, headingLevel }: FileCardProps) {
  return (
    <Card as="article">
      <Stack gap={2}>
        <Heading level={headingLevel} className={styles.title}>
          <Link to={path}>{item.title}</Link>
        </Heading>
        <p className={styles.meta}>
          Last updated <Time date={item.updated} />
        </p>
        <p>{item.description}</p>
        <ToolkitFileLinks item={item} />
      </Stack>
    </Card>
  );
}
