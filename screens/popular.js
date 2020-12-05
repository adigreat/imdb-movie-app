import React,{Commponent, Component} from 'react'
import {View,StylSheet,FlatList, ViewComponent} from 'react-native'
import {Card} from 'react-native-elements'
import axios from 'axios'
import {RFValue} from 'react-native-responsive-fontsize'
export default class PopularMoviesScreen extends Component{
    constructor(){
        this.state={
            data:[]
            
        }
    }
    componentDidMount() {
        this.getData();
      }
    
      timeConvert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} hrs ${minutes} mins`;
      }
    
      getData = () => {
        const url = "http://localhost:5000/popular-movies";
        axios
          .get(url)
          .then(response => {
           
            this.setState({ data: response.data.data });
          })
          .catch(error => {
            console.log(error.message);
          });
      };
      keyExtracter=(item,index)=>index.toString();
renderItems=({item,index})=>{
    return(
        <Card
        key={"card-${index}"}
        image={{uri:item.poster_link}}
        imageProps={{resizeMode:"cover"}}
        featuredTitle={item.title}
      featuredSubtitle={'${item.realease_date.split("-")[0]} | {this.timeConvert(item.duration)}'}
      featuredSubtitleStyle={styles.Subtitle}
        >

        </Card>
    )
}
render(){
  const{data}=this.state;
  return(
    <View
    style ={styles.container}
    >
<FlatList
data={data}
keyExtractor={this.keyExtracter}
renderItem= {this.renderItems}
/>
    </View>
  )
}
}
const styles =StyleSheet.create({
  container:{flex:1 ,backgroundcolor:'#fff'},
  title:{color:'#fff',allignself:'flex-start',paddingLeft:RFValue(15), fontsize:RFValue(25), marginTop: RFValue(65) },
  subtitle: { fontWeight: "bold", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(15) },
  subtitle: { fontWeight: "bold", alignSelf: "flex-start", paddingLeft: RFValue(15), fontSize: RFValue(15) },
  
})