export interface Article {
  title: string;
  /** Where it was published, such as a blog or magazine */
  publication: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  href: string;
}

/** Newest first, added by hand. None have been added yet, so the page shows a holding message */
export const ARTICLES: Article[] = [];
