

import React, {PureComponent} from 'react'
import { Text, FlatList, ActivityIndicator , Image, TouchableOpacity, Alert, View, SafeAreaView, Platform} from 'react-native'
import styles from './styles'

const MAX_PER_LIST = 5
const API= 'https://randomuser.me/api/'
let mounted = false

class Users extends PureComponent {

    constructor (props) {
        super(props)
    
        this.state = {
          usersList: [],
          loading: true,
          extraData: false,
          page: 1,
          onReachedLoading: false,
        }
      }    

    static navigationOptions = {
        title: 'List of Users'
    }

    async request(url = ''){
       return await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })
        .then((response)=> response.json())
        .catch(error => console.log('Error: ',error))
    }

    async componentDidMount(){
        mounted = true
        this.setState({
            loading: true,
        },async ()=> await this.onLoadMoreData())
    }

    componentWillUnmount(){
        mounted = false
    }
    
    alertPrompt = (message) => {
        Alert.alert(
            `Users index ${message}`,
            null,
            [
              { text: `Ok`}
            ]
          )
      }
    
    renderItem = ({ index, item })=>{
        const {name, picture,location } = item
        const { first,last ,title}  = name
        const {city} = location

        return(
            <TouchableOpacity 
                key= {'item_'+index}
                style={styles.renderItemWrapper}
                onPress={()=> this.alertPrompt(index)}>
                <Image
                    source={{ uri: picture.medium || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', cache: 'force-cache' }}
                    style={styles.imageStyle}
                    resizeMode= {'cover'}/>
                <View style={styles.userDetails}>
                    <Text style={styles.name}>{title +'. '+ first+ ' '+last}</Text>
                    <Text style={styles.city}>{`City: ${city}`}</Text>
                </View>    
            </TouchableOpacity>
        )
    }
    
     onLoadMoreData = async()=>{
        const {page, usersList} = this.state
        if(mounted){
            try{
                const user= await this.request(API+'?results='+MAX_PER_LIST+'&page='+page)
                let data = (page === 1)? user.results : [...usersList, ...user.results]
                this.setState({usersList: data, loading: false , onReachedLoading: false})
            }catch(error){
                console.log('Error fetching data: ', error)
            }
        }
    }

    onLoadMore=()=>{
        this.setState({
            page: this.state.page+1,
            onReachedLoading: true,
        }, async ()=> await this.onLoadMoreData())
    }

    onRefresh =()=>{
        console.log('onRefresh')
        this.setState({
            usersList: [],
            page: 1,
            loading: true
        },async ()=> await this.onLoadMoreData())
    }

    render(){
       const {usersList, loading, onReachedLoading} = this.state

      if(!loading){
        return(
        <SafeAreaView
        style={styles.container}>
        <FlatList
            keyExtractor={(_item, index) => 'key_' + index + '_user'}
            data = {usersList}
            renderItem ={this.renderItem}
            onEndReachedThreshold={(Platform.OS === 'ios')? 0:0.4}
            onEndReached = {this.onLoadMore}
            onRefresh={this.onRefresh}
            refreshing={loading}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            contentContainerStyle={{flexGrow: 1}}
            />
         {(onReachedLoading)? <View style={styles.bottomLoader}>
            <ActivityIndicator/>
            <Text style={styles.bottomLoaderLabel}>Loading more data</Text>
          </View>:  <></>}
        </SafeAreaView>    
       
        )
    }else{
        return <ActivityIndicator/>
    }
    }
}
export default Users
/**
 
 */
