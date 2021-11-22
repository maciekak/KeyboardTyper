import React, { useEffect, useState } from 'react';
import './Exercise.css';

type Row = {
    letters: Letter[];
}

type Letter = {
    value: string;
    isCorrect: boolean;
}

type MyProps = {
    mainText: string[];
};

type MyState = {
    rows: Row[];
    currentRow: number;
};

class Exercise extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        console.log("constructor", props.mainText);
        const rows_ = props.mainText.map((line: string) => {
            return { letters: [] };
        });
        this.state = { rows: rows_, currentRow: 0 };
    }

    keyHandler = (event: KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key.length === 1) {
            let currentRow = this.state.currentRow;
            currentRow = this.props.mainText[currentRow].length === this.state.rows[currentRow].letters.length ? currentRow + 1 : currentRow;
            if (currentRow === this.props.mainText.length) {
                currentRow--;
            }
            const correctText = this.props.mainText[currentRow];
            const newLetterIndex = this.state.rows[currentRow].letters.length;
            const isCorrect = !!correctText.charAt(newLetterIndex) && correctText[newLetterIndex] === event.key;
            const newRowLetters = [...this.state.rows[currentRow].letters, { value: event.key, isCorrect: isCorrect }];
            const updatedRows = this.state.rows.slice(0, currentRow).concat([{ letters: newRowLetters }]).concat(this.state.rows.slice(currentRow + 1))
            this.setState({ rows: updatedRows, currentRow: currentRow });
        } else if (event instanceof KeyboardEvent && event.key === 'Backspace') {
            let currentRow = this.state.currentRow;
            if (this.state.rows[0].letters.length === 0) {
                return;
            }
            const newRowLetters = this.state.rows[currentRow].letters.slice(0, -1);
            const updatedRows = this.state.rows.slice(0, currentRow).concat([{ letters: newRowLetters }]).concat(this.state.rows.slice(currentRow + 1))
            if (newRowLetters.length === 0) {
                currentRow = currentRow > 0 ? currentRow - 1 : 0;
            }

            this.setState({ rows: updatedRows, currentRow: currentRow });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyHandler);
    };


    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyHandler);
    };

    render() {
        return (
            <div>
                {this.state.rows.map((row, index) => 
                    <div>
                        <h1>{this.props.mainText[index]}</h1>
                        {row.letters.length > 0 &&
                            <div>
                            {row.letters.map(letter => <span className={letter.isCorrect ? 'good' : 'bad'}>{letter.value}</span>)}
                            </div>}
                        {row.letters.length == 0 &&
                            <div>
                                <span> </span>
                            </div>}
                    </div>
                )}
            </div>
        );
    }
}

export default Exercise;