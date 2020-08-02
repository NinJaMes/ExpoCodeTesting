
import { vs, ms } from 'react-native-size-matters'
import { StyleSheet } from 'react-native'
import { ifIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignSelf: 'center',
        marginLeft: vs(8),
        marginRight: vs(8),
        marginBottom: getBottomSpace() + ms(5) 
    },
    bottomLoader:{
        position: 'absolute',
        bottom: 0,
        flex: 1, 
        backgroundColor: 'gray', 
        elevation: 15, 
        flexDirection: 'column',
        alignItems: 'center',
        alignContent:'center', 
        width: '100%',
        paddingTop: vs(8),
        paddingBottom: vs(8)
    },
    bottomLoaderLabel:{
        fontSize: vs(10),
        fontWeight: 'bold'
    },
    itemSeparator:{
     borderBottomColor: '#041816',
     borderBottomWidth: 1
    },
    renderItemWrapper:{
        flexDirection: 'row', 
        paddingLeft: ms(8), 
        paddingRight: ms(8), 
        paddingTop: vs(8), 
        paddingBottom: vs(8)
    },
    userDetails:{
        flexDirection: 'column',
        paddingLeft: vs(4)
    },
    name:{
        fontSize: vs(12),
        fontWeight: 'bold'
    },
    city:{
        fontSize: vs(10),
        fontWeight: '300'
    },
    imageStyle: {width: vs(40), height: vs(40)}

})

export default styles