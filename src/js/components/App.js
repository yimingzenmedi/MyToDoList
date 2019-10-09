import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div
                style={{width: '100%', height: '100%'}}
            >
                {this.props.children}
            </div>
        );
    }
}

export default App;