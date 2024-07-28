import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

export default function TvScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}
            > Tv Screen
            </Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}