import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

class Player extends Schema {
	@type("number") x: number;
	@type("number") y: number;

	constructor() {
		super();

		this.x = 128;
		this.y = 128;
	}
}

class State extends Schema {
	@type("string") currentTurn: string;
	@type({ map: Player }) players = new MapSchema();
}

export class GameRoom extends Room {
	onCreate () {
		this.setState(new State());

		this.onMessage("move", (client, message) => {
			var player = this.state.players[client.sessionId]
			
			player.x += message.x;
			player.y += message.y;
		});
	}

	onJoin(client: Client) {
		var p = new Player();
		this.state.players[client.sessionId] = p;
	}

	onLeave(client: Client) {
		delete this.state.players[client.sessionId];
	}
}