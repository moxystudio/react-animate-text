import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitText from '@moxy/react-split-text';
import IntersectionObserver from '@researchgate/react-intersection-observer';
import 'intersection-observer'; // Polyfill to support older browsers

const AnimateText = ({
    children,
    className,
    separator,
    visible,
    transitionDuration,
    initialDelay,
    lineDelay,
    wordDelay,
}) => {
    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(visible ?? false);

    useEffect(() => {
        const elements = [...containerRef.current.children];
        let prevOffset = 0;
        let delay = initialDelay;

        elements.forEach((word, index) => {
            const newLine = word.offsetTop > prevOffset;

            if (newLine) {
                delay += lineDelay;
            } else if (wordDelay && index > 0) {
                delay += wordDelay;
            }

            word.style.transitionDelay = `${delay}s`;

            prevOffset = word.offsetTop;
        });

        setIsReady(true);
    }, [initialDelay, lineDelay, wordDelay]);

    useEffect(() => {
        setShouldAnimate(visible);
    }, [visible]);

    const handleIntersection = useCallback(({ isIntersecting }) => {
        isIntersecting && setShouldAnimate(true);
    }, []);

    const renderAnimateText = () => (
        <div
            ref={ containerRef }
            data-testid="react-animate-text"
            aria-hidden={ !(isReady && shouldAnimate) }
            className={ classNames('react-animate-text_container', className) }
            style={ { transitionDuration: `${transitionDuration}s` } }>
            <SplitText separator={ separator } data-attribute="word" style={ { transitionDuration: `${transitionDuration}s` } }>
                { children }
            </SplitText>
        </div>
    );

    return typeof visible === 'boolean' ?
        renderAnimateText() :
        <IntersectionObserver onChange={ handleIntersection }>
            { renderAnimateText() }
        </IntersectionObserver>;
};

AnimateText.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    separator: PropTypes.string,
    visible: PropTypes.bool,
    transitionDuration: PropTypes.number,
    initialDelay: PropTypes.number,
    lineDelay: PropTypes.number,
    wordDelay: PropTypes.number,
};

AnimateText.defaultProps = {
    separator: ' ',
    transitionDuration: 0.8,
    initialDelay: 0,
    lineDelay: 0.3,
    wordDelay: 0,
};

export default AnimateText;
