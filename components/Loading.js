import React from 'react';
import { Dimensions, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';


var { width, height } = Dimensions.get('window')

function Loading(props) {
    return (
        <View style={{width, height}} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail thickness={9} size={110} color={theme.background} />
        </View>
    );
}

export default Loading;