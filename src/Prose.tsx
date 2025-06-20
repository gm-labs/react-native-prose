import React from 'react'
import {
  View,
  ViewStyle,
  TextProps,
  UIManager,
  requireNativeComponent,
  Platform,
  Text as RNText,
  StyleSheet
} from 'react-native'
import {UITextView} from './UITextView'
import {AndroidTextView} from './AndroidTextView'

const LINKING_ERROR = `The view 'RNProseView' from 'react-native-prose' doesn't seem to be linked.`

export interface ProseProps extends TextProps {
  paragraphSpacing?: number
  lineHeight?: number
}

export interface RNProseViewProps extends ProseProps {
  children: React.ReactNode
  style: ViewStyle[]
}

const RNProseView =
  UIManager.getViewManagerConfig?.('RNProseView') != null
    ? requireNativeComponent<RNProseViewProps>('RNProseView')
    : () => {
        if (Platform.OS !== 'ios') return null
        throw new Error(LINKING_ERROR)
      }

interface ProseContextValue {
  isInsideProse: boolean
  lineHeight?: number
}

const ProseContext = React.createContext<ProseContextValue>({
  isInsideProse: false
})

export const useProseContext = () => React.useContext(ProseContext)

export function Prose({style, children, lineHeight, ...rest}: ProseProps) {
  const flattenedStyle = React.useMemo(
    () => StyleSheet.flatten([style]),
    [style]
  )

  const contextValue = React.useMemo(
    () => ({
      isInsideProse: true,
      lineHeight
    }),
    [lineHeight]
  )

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <ProseContext.Provider value={contextValue}>
        <RNProseView {...rest} style={[flattenedStyle]} lineHeight={lineHeight}>
          {children}
        </RNProseView>
      </ProseContext.Provider>
    )
  } else {
    return <View />
  }
}

export function ProseText(props: TextProps) {
  const {isInsideProse, lineHeight} = useProseContext()

  if (Platform.OS === 'ios') {
    return <UITextView selectable uiTextView {...props} />
  } else if (Platform.OS === 'android' && isInsideProse) {
    const androidStyle =
      isInsideProse && lineHeight ? [props.style, {lineHeight}] : props.style

    return <AndroidTextView {...props} style={androidStyle} />
  }
  return <RNText {...props} />
}
