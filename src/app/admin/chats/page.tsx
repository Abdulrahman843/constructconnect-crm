import { connectDB } from "@/lib/mongodb";
import { Chat } from "@/models/Chat";
import { Types } from "mongoose";

export const runtime = 'nodejs'; // ✅ for MongoDB compatibility

type ChatType = {
  _id: string;
  userMessage: string;
  botReply: string;
  createdAt: string;
};

export default async function AdminChatsPage() {
  await connectDB();

  const rawChats = await Chat.find().sort({ createdAt: -1 }).lean();

  const chats: ChatType[] = rawChats.map(chat => {
    const id = chat._id instanceof Types.ObjectId 
      ? chat._id.toString()
      : typeof chat._id === 'object' && chat._id !== null && 'toString' in chat._id
        ? (chat._id as { toString(): string }).toString()
        : String(chat._id);

    return {
      _id: id,
      userMessage: typeof chat.userMessage === 'string' ? chat.userMessage : "",
      botReply: typeof chat.botReply === 'string' ? chat.botReply : "",
      createdAt: chat.createdAt
        ? new Date(chat.createdAt as Date | string | number).toISOString()
        : new Date().toISOString()
    };
  });

  return (
    <div className="py-8 px-4 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-700 text-center sm:text-left">
        Chat History
      </h1>

      {/* ✅ Make table scrollable on small screens */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto text-sm sm:text-base">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="p-2 sm:p-3 text-left">User Message</th>
              <th className="p-2 sm:p-3 text-left">Bot Reply</th>
              <th className="p-2 sm:p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <tr key={chat._id} className="border-t">
                  <td className="p-2 sm:p-3 break-words max-w-[250px]">{chat.userMessage}</td>
                  <td className="p-2 sm:p-3 break-words max-w-[250px]">{chat.botReply}</td>
                  <td className="p-2 sm:p-3 whitespace-nowrap">{new Date(chat.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No chat history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
