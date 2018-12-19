import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import api_keys from './api_keys'
import axios from 'axios' 

export default class App extends React.Component {
  state = {
    listings: []
  }

  componentDidMount(){
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + api_keys.coinMarketCapKey).then(res => {
        this.setState({
            listings: res.data.data
        })
    })
  }

  render() {
    // console.log(this.state.listings)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{color: 'white', fontSize: 24}}>
            Top 100 Cryptocurrencies
          </Text>
        </View>
        <ScrollView>
          {
            this.state.listings.map((listing, i) => {
              return (
                <View style={styles.textContainer} key={i}>
                  <Text style={styles.text}>
                    {listing.cmc_rank}
                  </Text>
                  <Text style={styles.text}>
                    {listing.symbol}
                  </Text>
                  <Text style={{color: listing.quote.USD.percent_change_24h < 0 ? 'red' : 'green'}}>
                    {listing.quote.USD.percent_change_24h.toFixed(2)}%
                  </Text>
                  <Text style={styles.text}>
                    ${listing.quote.USD.price.toFixed(2)}
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  textContainer: {
    borderBottomWidth: 0,
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
    height: 75,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {

  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
    backgroundColor: 'green',
    color: 'white'
  }
});
