import React, { useState } from "react";

const Room = () => {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(2);

  const handleCreateRoom = () => {
    console.log("Room Name:", roomName);
    console.log("Max Players:", maxPlayers);
    // Xử lý logic tạo phòng tại đây
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-4/5 max-w-md p-4 rounded-2xl shadow-lg bg-white">
        <div>
          <h2 className="text-xl font-bold text-center mb-4">Create a Room</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              className="w-full border-black px-2"
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <p className="text-sm font-medium text-gray-700">Max Players</p>
            <select
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
