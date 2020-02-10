import React from 'react';
import moment from 'moment';

const getAuctionManagementAction = (auction, auctionManagementHandlers) => {
    if(auctionManagementHandlers){
        let edit = "";
        let now = new Date();
        if(now < new Date(auction.start)){
            edit = (
              <li className="nav-item">
              <button type="button" className="btn btn-primary btn-sm" onClick={()=>auctionManagementHandlers.edit(auction._id)}>Edit</button>
            </li>                  
            )
        }

        let fulfilled = '';
        if(!auction.isLive && !auction.isFulfilled){
            if(now > new Date(auction.end)){
              fulfilled = (
                  <li className="nav-item">
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => auctionManagementHandlers.call(auction._id, 'fulfill')}>Fulfill</button>
                  </li> 
                )
            }
        }
        let declared = '';
        if(!auction.isLive && !auction.isDeclared){
          if(now > new Date(auction.end)){
              declared = (
                  <li className="nav-item">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => auctionManagementHandlers.call(auction._id, 'declare')}>Declare</button>
                  </li>
                )
          }
        }

    //     let showBids = ''
    //     if(now > new Date(auction.start)){
    //       showBids = (
    //           <li className="nav-item">
    //             <button type="button" data-toggle="collapse" data-target="#collapseBids" aria-expanded="false" aria-controls="collapseBids" className="btn btn-primary btn-sm" onClick={() => this.showBids(auction._id)}>Show Bids</button>
    //           </li>
    //         )
    //   }
    return (
        <React.Fragment>
            <ul className="nav nav-pills nav-fill">
                {edit} 
                {declared}                      
                {fulfilled}
                {/* {showBids}   */}
            </ul>
        
            {/* <div className="collapse mt-3" id="collapseBids">
                <ul className="list-group">{this.renderBids()}</ul>
            </div> */}
        </React.Fragment>
    )

    }
}

const getAuctionCardAction = (auction, bidHandler, auctionManagementHandlers) => {
    if(bidHandler){
        let currentBidVal = auction.currentBid + auction.bidStep;
        
        let action = '';
        let now = new Date();
        if(now > new Date(auction.start) && now < new Date(auction.end)){
        
        action = (
            <button type="button" 
            onClick={()=> bidHandler(auction._id, currentBidVal)} 
            className="btn btn-sm">Bid Rs {currentBidVal}</button>
        )
        }
        return action;
    }  

    if(auctionManagementHandlers){
        return getAuctionManagementAction(auction, auctionManagementHandlers);
    }

    let lastBidDetail = (<p className="card-text">Winning Bid : {auction.currentBid}</p>);
    if(auction.isLive){
        lastBidDetail = (<p className="card-text">Current Bid : {auction.currentBid}</p>)
    }
    let now = new Date();
    if(now < new Date(auction.start)){
        lastBidDetail = (<p className="card-text">Current Bid : {auction.currentBid}</p>)
    }
    return lastBidDetail;        
    
}

const getAuctionCard = (auction, bidHandler, auctionManagementHandlers) => {
    let liveBadge = '';
    if(auction.isLive){
        liveBadge = (<span className="badge">Live</span>)
    }          
    let start = '';
    if(auction.start){
        start = moment(auction.start).format('dddd DD/MM/YY h:mm A');
    }
    let end = '';
    if(auction.start){
        end = moment(auction.end).format('dddd DD/MM/YY h:mm A');
    }      
    
    return (
      <div className="col" key={auction._id}>
      <div className="card auctionCard">
        <div className="card-header">
        {auction.bar}
        </div>
        <div className="card-body">
        {auction.name} {liveBadge}
        </div>            
        <div className="card-body">
          <h5 className="card-title">{auction.prize}</h5>
        </div>
        <div className="card-body">
            <div>Starting Bid: {auction.startBid}</div>
            <div>Step : {auction.bidStep}</div>
        </div>
        <div className="card-body">
        {getAuctionCardAction(auction, bidHandler, auctionManagementHandlers)}
        </div>
        <div className="card-footer">
                <div><small className="text-muted">Start : {start}</small></div>
                <div><small className="text-muted">End : {end}</small></div>
        </div>
      </div>
    </div>
    )
  }

  export default getAuctionCard;