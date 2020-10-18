import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../services/api'

interface Orphaanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanageMap(){
    
    const [ orphanages, setOrphanages ] = useState<Orphaanage[]>([])
    const navigate = useNavigation()

    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    })

    function handleNavigateToOrphanageDetails(id: number) {

        navigate.navigate('OrphanageDetails', { id })

    }
    
    function handleNavigatoToCreateOrphanage() {

        navigate.navigate('SelectMapPosition')

    }

    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map} 
            provider={PROVIDER_GOOGLE} 
            initialRegion={{
                latitude: -23.5221271,
                longitude: -47.4980838,
                latitudeDelta: 0.012,
                longitudeDelta: 0.012,

            }} 
            >
            
            {orphanages.map(orphanage => {
                return (
                    <Marker 
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8
                        }}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                    >

                        <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)} >
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )
            })}
                
            </MapView>

            <View style={styles.footer} >
                <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigatoToCreateOrphanage}>
                <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View> )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 46,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 8,
  
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
    
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,

      justifyContent: 'center',
      alignItems: 'center',
    },
  })
  