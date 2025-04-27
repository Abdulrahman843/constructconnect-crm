import { connectDB } from "@/lib/mongodb";
import { Chat } from "@/models/Chat";

export const runtime = 'nodejs'; // ✅ for MongoDB compatibility

type ChatType = {
  _id: string;
  userMessage: string;
  botReply: string;
  createdAt: string;
};

export default async function AdminChatsPage() {
  await connectDB();

  const chats = (await Chat.find().sort({ createdAt: -1 }).lean()) as ChatType[];

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Chat History</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-3 text-left">User Message</th>
              <th className="p-3 text-left">Bot Reply</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr key={chat._id} className="border-t">
                <td className="p-3">{chat.userMessage}</td>
                <td className="p-3">{chat.botReply}</td>
                <td className="p-3">{new Date(chat.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
