import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThemedText = ({style ,size = 'normal-text', title=false, ...props}) => {
    const textSize = {
      h1: 30,
      h2: 24,
      h3: 12,
      'normal-text': 10
    }

  return (
      <Text 
        style={[{
          fontSize: textSize[size] || textSize['normal-text'],
          fontWeight: title ? '700' : '300',
        }, style]}
        {...props}
      />
  )
}

export default ThemedText

const styles = StyleSheet.create({})