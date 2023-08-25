import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMovies, image185 } from '../API/MovieDb';


var { width, height } = Dimensions.get('window')

function MovieList({ title, data, hideSeeAll }) {
    const navigation = useNavigation()

    let movieName = 'Ant-Man and the Wasp: Quantumania';

    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl ">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, i) => {
                        return (
                            <TouchableWithoutFeedback key={i} onPress={() => navigation.push('Movie', item)}>
                                <View className="space-y-1 mr-4">
                                    <Image
                                        // source={require('../assets/images/ant-man-and-the-wasp.jpeg')}
                                        source={{uri: image185(item.poster_path) || fallbackMovies}}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }

            </ScrollView>
        </View>
    );
}

export default MovieList;