package handler

import (
	"log"
	"net/http"

	"github.com/satriaa14/websocketchat/model"
)

var upgrader = model.Upgrader

func HandleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	model.Clients[ws] = true

	for {
		var msg model.Message
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(model.Clients, ws)
			break
		}
		// Send the newly received message to the broadcast channel
		model.Broadcast <- msg
	}
}
