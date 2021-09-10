import { Component } from 'react';
import { Text, View } from '@tarojs/components';
import './index.scss';
import {connect} from "react-redux"

@connect(({test})=>({
  test
}))
export default class Index extends Component {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    render() {
      console.log(this.props.test)
        return (
            <View className="index">
                <Text>{this.props.test.name}</Text>
            </View>
        );
    }
}
