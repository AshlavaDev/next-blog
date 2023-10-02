interface IDeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onDelete, onCancel }: IDeleteModalProps): JSX.Element {
  function handleDelete() {
    onDelete();
    onCancel();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative z-50 bg-white rounded-lg shadow-lg mx-auto max-w-sm p-4">
        <div className="px-6 py-4">
          <div className="text-lg font-bold mb-2">Confirm Delete?</div>
          <p className="text-gray-700 text-base">Please confirm as this action is final</p>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}