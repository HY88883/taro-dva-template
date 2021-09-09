import { Component } from 'react';
import './app.scss';
import { connect, Provider } from 'react-redux';
import configStore from '@/config/dva';

const store = configStore();

class App extends Component {
    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    render() {
        return <Provider store={store}>{this.props.children}</Provider>;
    }
}

export default App;
