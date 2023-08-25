import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import { debounce } from 'lodash'
import { fallbackMovies, image185, searchMovies } from '../API/MovieDb';


var { width, height } = Dimensions.get('window')

function SearchScreen(props) {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    let movieName = 'Ant-Man and the Wasp: Quantumania';


    const handleSearch = (value)=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then((data)=>{
                console.log('got search results');
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([])
        }
      
    }


    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    // console.log(results)

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View className="mx-4 my-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movies'
                    placeholderTextColor='lightgray'
                    className="pb-1 pl-6 flex-1 items-center text-base font-semibold text-white tracking-wider"
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>


            {
                loading ? (
                    <Loading />
                ) :
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3"
                        >
                            <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>

                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, i) => {
                                        return (
                                            <TouchableWithoutFeedback key={i} onPress={() => navigation.push('Movie', item)}>
                                                <View className="space-y-2 mb-4">
                                                    <Image className="rounded-3xl"
                                                        // source={require('../assets/images/ant-man-and-the-wasp.jpeg')}
                                                        source={{uri: image185(item?.poster_path) || fallbackMovies}}
                                                        style={{ width: width * 0.44, height: height * 0.3 }}
                                                    />
                                                    <Text className="text-neutral-300 ml-1">
                                                        {
                                                            item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-white font-bold text-2xl">No Results</Text>
                            <Image source={require('../assets/images/no-movie.png')} className="h-56 w-56" />
                        </View>
                    )
            }

        </SafeAreaView>
    );
}

export default SearchScreen;