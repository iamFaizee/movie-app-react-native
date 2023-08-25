import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { fallbackMovies, fallbackPersons, image185 } from '../API/MovieDb';

function Cast({cast, navigation}) {
    const personName = 'Keanu Reevs'
    const characterName = 'John Wick'
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{padding: 15}}
            >
                {
                    cast && cast.map((item,i) => {
                        return (
                            <TouchableOpacity key={i} className="mr-4 items-center" onPress={()=> navigation.navigate('Person', item)}>

                                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">

                                    <Image
                                        className="rounded-2xl h-24 w-20"
                                        // source={require('../assets/images/john-wick.jpg')}
                                        source={{uri: image185(item?.profile_path) || fallbackPersons}}
                                    />
                                </View>
                               <Text className=" text-white text-xs mt-1">
                                {
                                    item?.character.length>10 ? item?.character.slice(0,10)+'...' : item?.character
                                }
                               </Text>
                               <Text className=" text-neutral-400 text-xs mt-1">
                                {
                                    item?.original_name.length>10 ? item?.original_name.slice(0,10)+'...' : item?.original_name
                                }
                               </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

export default Cast;