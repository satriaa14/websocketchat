package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/satriaa14/websocketchat/handler"
	"github.com/satriaa14/websocketchat/model"
)

func main() {

	port := os.Getenv("PORT")
	fmt.Print(port)

	// Create a simple file server
	fs := http.FileServer(http.Dir("./frontend"))
	http.Handle("/", fs)

	// Configure websocket route
	http.HandleFunc("/ws", handler.HandleConnections)

	// Start listening for incoming chat messages
	go model.SendMessages()

	// Start the server on localhost port 8000 and log any errors
	log.Println("http server started on :" + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
