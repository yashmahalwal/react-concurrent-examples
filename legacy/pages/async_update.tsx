import React from "react";

interface Props {}
interface State {
    value: number;
}

class AsyncBatchIncorrect extends React.Component<Props, State> {
    static displayName: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    componentDidMount() {
        console.log("Incorrect");
        this.setState({ value: 10 });
        console.log("State is set to 10");
        this.setState({ value: this.state.value + 1 });
        console.log(this.state.value);
    }

    render() {
        return (
            <>
                <p>Incorrect:</p>
                <h1>State: {this.state.value}</h1>
            </>
        );
    }
}

class AsyncBatchCorrect extends React.Component<Props, State> {
    static displayName: string;
    constructor(props: Props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    componentDidMount() {
        console.log("Correct");
        this.setState({ value: 10 }, () => {
            console.log("State is set to 10");
            this.setState(
                ({ value }) => ({
                    value: value + 1
                }),
                () => console.log(this.state.value)
            );
        });
    }

    render() {
        return (
            <>
                <p>Correct:</p>
                <h1>State: {this.state.value}</h1>
            </>
        );
    }
}

const AsyncBatch: React.FunctionComponent = () => (
    <>
        <AsyncBatchIncorrect />
        <hr />
        <AsyncBatchCorrect />
    </>
);

AsyncBatch.displayName = "AsynchronousStateUpdate";
AsyncBatchIncorrect.displayName = "Incorrect";
AsyncBatchCorrect.displayName = "Correct";
export default AsyncBatch;
