import React from 'react';

import getAuctionCard from './auctionListCard';

  const getAuctionCards = (auctionArr, bidHandler, auctionManagementHandlers) => {
    return auctionArr.map((auction) => getAuctionCard(auction, bidHandler, auctionManagementHandlers));
  }  
  
  const getAuctionRows = (auctionList_, auctionsPerRow, bidHandler, auctionManagementHandlers) => {
      let auctionList = auctionList_.slice();

      let auctionListArrays = [];
      while(auctionList.length) {
        auctionListArrays.push(auctionList.splice(0,auctionsPerRow));
      }
      

      return auctionListArrays.map((arr, index) => {
        return (
        <div className="row" key={index}>
          {getAuctionCards(arr, bidHandler, auctionManagementHandlers)}
        </div>
        )
      })
    }

  export default getAuctionRows;