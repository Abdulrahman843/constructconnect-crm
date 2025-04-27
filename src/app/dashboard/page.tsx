export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Widgets */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Clients</h2>
            <p className="text-2xl mt-2 font-bold">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Projects</h2>
            <p className="text-2xl mt-2 font-bold">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl mt-2 font-bold">£32,400</p>
          </div>
        </div>
      </div>
    );
  }
  