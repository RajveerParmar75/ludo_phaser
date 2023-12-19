class SocketConnection {
  constructor(authToken, gameMode) {
    this.socketObj = null;
    this.authToken = authToken;
    this.gameMode = gameMode;
    this.sRootUrl = "http://192.168.1.4:4000";
    this.connect();
  }

  connect() {
    console.log("socket done");
    this.socketObj = io(this.sRootUrl, {
      transports: ["websocket", "polling"],
      query: {
        authorization: this.authToken,
        game: "ludo",
      },
    });

    this.socketObj.on("connect", () => {
      this.handleConnect();
    });

    this.socketObj.on("disconnect", () => {
      console.log("Connection disconnected");
    });

    this.socketObj.on("error", (error) => {
      console.log("Connection error", error);
    });

    this.socketObj.on("resWaiting", (data) => {
      console.log(data);
    });
  }

  handleConnect() {
    console.log("Connected to Socket", this.socketObj.id);
    this.socketObj.emit("reqFindMatch", { mode: this.gameMode });
  }

  socketEvent(eventName) {
    // Logic to handle specific socket events
  }
}

// Usage
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVkZjJiZGFjNmVhZjM1YmJhNzQxZmEiLCJ1c2VyTmFtZSI6IjYzNTMwNzQ5NzEiLCJ1c2VyVHlwZSI6InVzZXIiLCJjdXJyZW50X3Rva2VuIjoxNzE1OTksImlhdCI6MTcwMjg5NTk4NCwiZXhwIjoxNzAyOTgyMzg0fQ.PWV6LEIruma-a-PCQBKnl0j269OTQMAwi7RkZy7PrVg";
const gameMode = "2p";
