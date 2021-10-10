import React, { Component } from "react";
import Board, { BoardContainer } from "react-trello";
import BasicModal from "./modal";
import Card from "react-trello";
import { DragHandleRounded } from "@mui/icons-material";

const cards = require("./data.json");

const data = {
  lanes: [
    {
      id: "APPLIED",
      title: "Submitted Applications",
      style: { width: 350 },
      cards: [],
    },
    {
      id: "WISHLIST",
      title: "Job Wishlist",
      style: { width: 350 },
      cards: [],
    },
    {
      id: "REJECTED",
      title: "Rejected offers",
      style: { width: 350 },
      cards: [],
    },
  ],
};

const handleDragStart = (cardId, laneId) => {
  console.log("drag started");
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

// mutation send back the targetLaneId as LaneId
const handleDragEnd = (
  cardId,
  sourceLaneId,
  targetLaneId,
  cardDetails,
  position
) => {
  // console.log("drag ended");
  // console.log(`cardId: ${cardId}`);
  // console.log(`sourceLaneId: ${sourceLaneId}`);
  // console.log(`targetLaneId: ${targetLaneId}`);
  // console.log(`cardDetails : ${cardDetails}`);
  // console.log("postion", position);
};

//need to create modal to pop when clicked
// const onCardClick = (cardId, metadata) => {

// };

console.log(BoardContainer.id);

class App extends Component {
  state = { boardData: data };

  setEventBus = (eventBus) => {
    this.setState({ eventBus });
  };

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(this.state.boardData);
    });
  }

  // default lane id to pass in with the mutation
  addCard = () => {
    const boardData = [...this.state.boardData];
    boardData.lanes[0].cards.push();

    // this.state.eventBus.publish({
    //   type: "ADD_CARD",

    //   card: {
    //     id: "Card1",
    //     title: "Engineer",
    //     laneId: "WISHLIST",
    //   },
    // });
    this.setState({ boardData });
  };

  // //this is where we query the DB , get the jobs and create actual cards
  // newData = () => {
  //   const boardData = [...this.state.boardData];
  //   boardData.lanes[0].cards
  //     .push
  //     /// whatever in here
  //     ();
  //   // const allCards = cards.(data =>  {
  //   //   type: "UPDATE_CARD",
  //   //   laneId: `${cards.laneId}`,
  //   //   card: {
  //   //     id: `${cards.id}`,
  //   //     title: `${cards.title}`,
  //   //   },
  //   // });
  //   // this.state.eventBus.publish(allCards);

  //   this.setState({ boardData });
  // };

  // shouldReceiveNewData = (nextData) => {
  //   // console.log("New card has been added");
  //   // console.log(nextData);
  // };

  handleCardAdd = (card, laneId) => {
    // console.log(`New card added to lane ${laneId}`);
    // console.dir(card);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Kaban Board</h3>
        </div>
        <div className="App-intro">
          {/* <button onClick={this.completeCard} style={{ margin: 5 }}>
            Complete Buy Milk
          </button>
          <button onClick={this.addCard} style={{ margin: 5 }}>
            Add Blocked
          </button> */}
          <React.Fragment>
            {/* should load array of applications uploaded - need to push to array if added a new app */}
            <Board
              // editable
              onCardAdd={this.handleCardAdd}
              data={this.state.boardData}
              draggable={false}
              onDataChange={this.newData}
              eventBusHandle={this.setEventBus}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default App;
