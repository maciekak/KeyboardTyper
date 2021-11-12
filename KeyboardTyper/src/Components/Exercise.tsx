import React, { useEffect, useState } from 'react';
import './Exercise.css';

type Letter = {
    value: string;
    isCorrect: boolean;
}

type MyProps = {
    mainText: string;
};

type MyState = {
    writtenText: string;
    letters: Letter[];
};

class Exercise extends React.Component<MyProps, MyState> {
    mainText: string;

    constructor(props: any) {
        super(props);
        this.state = { writtenText: "", letters: [] };

        this.mainText = props.mainText;
    }

    keyHandler = (event: any) => {
        console.log("dupa");
    }
    keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log("here123");
        console.log(event.key);
        const newLetterIndex = this.state.letters.length;
        const isCorrect = !!this.mainText.charAt(newLetterIndex) && this.mainText[newLetterIndex] == event.key;
        const newLetters = [...this.state.letters, { value: event.key, isCorrect: isCorrect}];
        this.setState({ writtenText: this.state.writtenText + event.key, letters: newLetters });
    };
    componentDidMount() {
        document.addEventListener("click", this.keyHandler, false);
        document.addEventListener("keydown", this.keyHandler);
    };


    componentWillUnmount() {
        document.removeEventListener("click", this.keyHandler, false);
        document.removeEventListener("keydown", this.keyHandler);
    };

    render() {
        return (
            <div onKeyPress={this.keyDownHandler}>
                <h1>{this.props.mainText}</h1>
                <div>
                    {this.state.letters.map(letter => <span className={letter.isCorrect ? 'good' : 'bad'}>{letter.value}</span>)}
                </div>
                <input value={this.state.writtenText} autoFocus/>
            </div>
        );
    }
}

export default Exercise;