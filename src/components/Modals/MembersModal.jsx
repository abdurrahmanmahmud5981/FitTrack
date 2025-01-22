const MembersModal = ({ isOpen, onClose, members }) => {
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Booked Members</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    SN
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {members?.map((member, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                     {index + 1}
                    </td>
                    <td className="p-4 text-sm text-gray-800">
                      {member?.name || "Anonymous"}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{member?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="mt-4 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
export default MembersModal;