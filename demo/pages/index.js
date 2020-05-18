import React from 'react';
import AnimateText from '@moxy/react-animate-text';

import styles from './index.module.css';

const Home = () => (
    <div className={ styles.home }>
        <h1>react-animate-text</h1>
        <div className={ styles.animateText }>
            <AnimateText className={ styles.text1 } lineDelay={ 0.5 } wordDelay={ 0.2 }>
                This is a long text that will break into multiple lines.
            </AnimateText>
            <AnimateText className={ styles.text2 } wordDelay={ 1 } initialDelay={ 2 }>
                This is another text.
            </AnimateText>
        </div>
        <AnimateText className={ styles.text3 } wordDelay={ 1 } lineDelay={ 2 }>
            This text has a word delay and a line delay.
        </AnimateText>
        <AnimateText className={ styles.text4 } wordDelay={ 0.5 }>
            This text has different animations per word.
        </AnimateText>
    </div>
);

export default Home;
