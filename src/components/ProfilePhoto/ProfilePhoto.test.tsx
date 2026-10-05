import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProfilePhoto } from './ProfilePhoto';

describe('ProfilePhoto', () => {
  it('shows my initials as a placeholder, hidden from screen readers, until there is a photo', () => {
    const { container } = render(<ProfilePhoto photo={undefined} initials="AH" />);

    expect(container.firstElementChild).toHaveTextContent('AH');
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows the photo with its description once there is one', () => {
    render(
      <ProfilePhoto
        photo={{ src: '/abi.jpg', alt: 'Abi smiling, in front of a bookcase' }}
        initials="AH"
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Abi smiling, in front of a bookcase' }),
    ).toHaveAttribute('src', '/abi.jpg');
  });
});
