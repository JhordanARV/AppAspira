// src/components/Details/DetailSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DetailSection from './DetailSection'; // Assuming DetailSection is in the same directory

describe('DetailSection component', () => {
  it('renders the title and children correctly', () => {
    const titleText = "Test Title";
    const childText = "This is child content.";

    render(
      <DetailSection title={titleText}>
        <p>{childText}</p>
      </DetailSection>
    );

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('applies basic styling classes', () => {
     const titleText = "Styled Title";
     render(<DetailSection title={titleText}><p>Content</p></DetailSection>);

     const titleElement = screen.getByText(titleText);
     expect(titleElement).toHaveClass('text-xl', 'font-semibold', 'text-gray-700');
     const childContainer = screen.getByText('Content').parentElement;
     expect(childContainer).toHaveClass('bg-gray-50', 'p-4', 'rounded-md', 'shadow-sm');
  });
});
