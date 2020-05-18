import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import AnimateText from '../src/AnimateText';

let onChangeObserver;

jest.mock('@researchgate/react-intersection-observer', () => ({ children, onChange }) => {
    onChangeObserver = onChange;

    return children;
});

const renderWithProps = (props = {}) => render(
    <AnimateText { ...props }>
        One two three four five
    </AnimateText>,
);

describe('AnimateText with a single line', () => {
    it('should render correctly', () => {
        const { getByText } = renderWithProps();

        expect(getByText(/one/i)).toBeInTheDocument();
        expect(getByText(/five/i)).toBeInTheDocument();
    });

    it('should render with className', () => {
        const { getByTestId } = renderWithProps({ className: 'container-class' });

        expect(getByTestId('react-animate-text')).toHaveClass('container-class');
    });

    it('should have a transition duration of 2s', () => {
        const { getByTestId } = renderWithProps({ transitionDuration: 2 });

        expect(getByTestId('react-animate-text')).toHaveStyle({ transitionDuration: '2s' });
    });

    it('should have an initial delay of 1s', () => {
        const { getByText } = renderWithProps({ initialDelay: 1 });

        expect(getByText(/one/i)).toHaveStyle({ transitionDelay: '1s' });
    });

    it('should have an word animation delay of 2s', () => {
        const { getByText } = renderWithProps({ wordDelay: 2, initialDelay: 0 });

        expect(getByText(/one/i)).toHaveStyle({ transitionDelay: '0s' });
        expect(getByText(/two/i)).toHaveStyle({ transitionDelay: '2s' });
        expect(getByText(/three/i)).toHaveStyle({ transitionDelay: '4s' });
        expect(getByText(/four/i)).toHaveStyle({ transitionDelay: '6s' });
        expect(getByText(/five/i)).toHaveStyle({ transitionDelay: '8s' });
    });

    it('should set the aria-hidden attribute correctly', () => {
        const { getByTestId } = renderWithProps();

        act(() => {
            onChangeObserver({ isIntersecting: true });
        });

        expect(getByTestId('react-animate-text')).toHaveAttribute('aria-hidden', 'false');

        act(() => {
            onChangeObserver({ isIntersecting: false });
        });

        expect(getByTestId('react-animate-text')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should render correctly with show prop', () => {
        const { getByTestId, rerender } = renderWithProps({ show: false });

        expect(getByTestId('react-animate-text')).toHaveAttribute('aria-hidden', 'true');

        rerender(
            <AnimateText show>
                Example Text
            </AnimateText>,
        );

        expect(getByTestId('react-animate-text')).toHaveAttribute('aria-hidden', 'false');
    });

    it('should not show the text', () => {
        const { getByTestId } = renderWithProps({ shouldShow: false });

        expect(getByTestId('react-animate-text')).toHaveAttribute('aria-hidden', 'true');
    });
});

describe('AnimateText with multiple lines', () => {
    beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
            get() {
                const words = Array.prototype.slice.call(this.parentElement.children);
                const index = words.indexOf(this);

                // First line
                if (index < 2) {
                    return 0;
                }

                // Third line
                if (index > 2) {
                    return 20;
                }

                // Second line
                return 10;
            },
        });
    });

    it('should render correctly', () => {
        const { asFragment } = renderWithProps();

        expect(asFragment()).toMatchSnapshot();
    });

    it('should use the line delay correctly', () => {
        const { asFragment } = renderWithProps({ lineDelay: 1 });

        expect(asFragment()).toMatchSnapshot();
    });

    it('should use the line delay correctly along with word delay', () => {
        const { asFragment } = renderWithProps({ lineDelay: 1, wordDelay: 0.5 });

        expect(asFragment()).toMatchSnapshot();
    });
});
