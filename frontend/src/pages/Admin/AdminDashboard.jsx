import React, { useState } from "react";
import { Button } from './Button';
import { Menu } from "lucide-react";
import CreateChallenge from "./CreateChallenge"; // import the challenge component

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(""); // "" or "create-challenge" etc.

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-blue-200 p-5 w-64 transition-all ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <h1 className="text-xl font-bold text-center mb-6">AuraQuest</h1>
        <div className="space-y-4">
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Add Course</Button>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => setSelectedTab("create-challenge")}
          >
            Create Challenge
          </Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Add Assign</Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">See All Courses</Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Announcement</Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Create a Meet</Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">See Leaderboard</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            className="md:hidden bg-blue-500 hover:bg-blue-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="text-lg font-semibold">Anonymous Admin</div>
        </div>

        {/* Render based on selected tab */}
        {selectedTab === "create-challenge" ? (
          <CreateChallenge />
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome Back</h2>
            <h1 className="text-5xl font-bold text-blue-600 mt-2">Mr. Admin</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
