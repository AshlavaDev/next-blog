interface IDeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  onDelete,
  onCancel,
}: IDeleteModalProps): JSX.Element {
  function handleDelete() {
    onDelete();
    onCancel();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
      <div className="relative z-50 mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-lg font-bold">Confirm Delete?</div>
          <p className="text-base text-gray-700">
            Please confirm as this action is final
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
