new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false, // True if email and username have been filled in
        namanya: null
    },

    created: function() {
        var self = this;

        this.ws = new WebSocket('ws://' + window.location.host + '/ws');

        this.ws.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            console.log(self.username);

            if (self.username === msg.username) {
                self.chatContent += '<div class="right">' + emojione.toImage(msg.message) + '&nbsp;&nbsp;&nbsp;<div class="chip">' +
                    '<img src=" ' + self.image(msg.username) + '"/>' // Avatar
                    +
                    msg.username +
                    '</div>' +
                    '</div><br/><br/>'; // Parse emojis
            } else {
                self.chatContent += '<div class="chip">' +
                    '<img src=" ' + self.image(msg.username) + '"/>' // Avatar
                    +
                    msg.username +
                    '</div>' +
                    emojione.toImage(msg.message) + '<br/>'; // Parse emojis
            }

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
        });
    },

    methods: {
        send: function() {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }));
                this.newMsg = ''; // Reset newMsg
            }
        },

        join: function() {
            if (!this.email) {
                Materialize.toast('You must enter an email', 5000);
                return
            }
            if (!this.username) {
                Materialize.toast('You must choose a username', 5000);
                return
            }
            this.email = $('<p>').html(this.email).text();
            this.username = $('<p>').html(this.username).text();

            this.namanya = $('<p>').html(this.username).text();
            this.joined = true;
        },

        image: function(username) {
            var init = username.charAt(0).toUpperCase();
            var men = "https://randomuser.me/api/portraits/men/";
            var woman = "https://randomuser.me/api/portraits/women/";
            if (init === "A") {
                return men += '1.jpg';
            }
            if (init === "B") {
                return woman += '1.jpg';
            }
            if (init === "C") {
                return men += '2.jpg';
            }
            if (init === "D") {
                return woman += '2.jpg';
            }
            if (init === "E") {
                return men += '3.jpg';
            }
            if (init === "F") {
                return woman += '3.jpg';
            }
            if (init === "G") {
                return men += '4.jpg';
            }
            if (init === "H") {
                return woman += '4.jpg';
            }
            if (init === "I") {
                return men += '5.jpg';
            }
            if (init === "J") {
                return woman += '5.jpg';
            }
            if (init === "K") {
                return men += '6.jpg';
            }
            if (init === "L") {
                return woman += '6.jpg';
            }
            if (init === "M") {
                return men += '7.jpg';
            }
            if (init === "N") {
                return woman += '7.jpg';
            }
            if (init === "O") {
                return men += '8.jpg';
            }
            if (init === "P") {
                return woman += '8.jpg';
            }
            if (init === "Q") {
                return men += '9.jpg';
            }
            if (init === "R") {
                return woman += '9.jpg';
            }
            if (init === "S") {
                return men += '10.jpg';
            }
            if (init === "T") {
                return woman += '10.jpg';
            }
            if (init === "U") {
                return men += '11.jpg';
            }
            if (init === "V") {
                return woman += '30.jpg';
            }
            if (init === "W") {
                return men += '12.jpg';
            }
            if (init === "X") {
                return woman += '12.jpg';
            }
            if (init === "Y") {
                return men += '13.jpg';
            }
            if (init === "Z") {
                return woman += '13.jpg';
            }

        }

    }
});