import {
  type ToolkitFolder,
  type ToolkitItem,
  fileType,
  viewableFile,
} from '../../content/toolkit';
import { Card } from '../Card';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Time } from '../Time';
import styles from './Toolkit.module.css';

const { BASE_URL } = import.meta.env;

/**
 * Links to view a resource's PDF and download each of its files. Each says which resource and what
 * kind of file it is, so it makes sense read on its own (WCAG 2.4.9)
 */
export function ToolkitFileLinks({ item }: { item: ToolkitItem }) {
  const viewable = viewableFile(item);

  return (
    <ul className={styles.links}>
      {viewable && (
        <li>
          {/* A new tab keeps the toolkit open, and the link says so before it's followed */}
          <a href={`${BASE_URL}${viewable.path}`} target="_blank" rel="noreferrer">
            View {item.title} as a PDF (opens in a new tab)
          </a>
        </li>
      )}
      {item.files.map((file) => (
        <li key={file.path}>
          <a href={`${BASE_URL}${file.path}`} download>
            Download {item.title} as a {fileType(file) ?? 'file'} ({file.size})
          </a>
        </li>
      ))}
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
