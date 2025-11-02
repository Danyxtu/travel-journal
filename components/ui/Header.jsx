import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ThemedText from '../ThemedText'
const Header = ({title = '', children, style}) => {
  return (
    <View style={styles.header}>
        <View>
          <ThemedText style={[styles.title, style]} title={true}>
            {title}
          </ThemedText>
        </View>
        {children}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    paddingLeft: 0,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
})