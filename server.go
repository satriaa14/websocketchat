package main

import (
	"log"
	"net/http"

	"github.com/satriaa14/websocketchat/handler"
	"github.com/satriaa14/websocketchat/model"
)

func main() {
	// Create a simple file server
	fs := http.FileServer(http.Dir("./frontend"))
	http.Handle("/", fs)

	// Configure websocket route
	http.HandleFunc("/ws", handler.HandleConnections)

	// Start listening for incoming chat messages
	go model.SendMessages()

	// Start the server on localhost port 8000 and log any errors
	log.Println("http server started on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
