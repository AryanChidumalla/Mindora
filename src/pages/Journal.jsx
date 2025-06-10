import { useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function Journal() {
  const today = new Date().toISOString().split("T")[0];

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'new' | 'edit', entry: {...} }

  const userId = auth.currentUser?.uid;

  const fetchEntries = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const entriesRef = collection(db, "userData", userId, "journals");
      const snapshot = await getDocs(entriesRef);
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(fetched);
    } catch (error) {
      console.error("Failed to fetch journals", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSaveOrUpdate = async (entry, mode) => {
    if (!userId) return;
    try {
      const ref = doc(
        db,
        "userData",
        userId,
        "journals",
        entry.date || entry.id
      );

      console.log(entry.id);
      if (mode === "new") {
        await setDoc(ref, {
          title: entry.title,
          body: entry.body,
          createdAt: new Date(),
        });
      } else {
        await updateDoc(ref, {
          title: entry.title,
          body: entry.body,
          createdAt: new Date(),
        });
      }

      setModal(null);
      fetchEntries();
    } catch (error) {
      console.error("Error saving/updating journal:", error);
    }
  };

  const handleDelete = async (entryId) => {
    if (!userId) return;

    const confirm = window.confirm("Delete this journal?");
    if (!confirm) return;

    try {
      const ref = doc(db, "userData", userId, "journals", entryId);
      await deleteDoc(ref);
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      setModal(null);
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  const openModal = (mode, entry = null) => {
    setModal({
      mode,
      entry: entry || {
        title: "",
        body: "",
        date: today,
      },
    });
  };

  const closeModal = () => setModal(null);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6">
      <div className="border-2 border-primary px-4 py-4 rounded">
        <h1 className="text-xl font-bold">Journal</h1>
      </div>

      <button
        className="self-end bg-primary text-white px-4 py-2 rounded-md"
        onClick={() => openModal("new")}
      >
        New
      </button>

      {loading ? (
        <div className="text-center mt-6">Loading entries...</div>
      ) : entries.length === 0 ? (
        <div className="text-center mt-6 text-gray-500">
          No journal entries yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border-2 border-primary p-4 rounded-md cursor-pointer"
              onClick={() => openModal("edit", entry)}
            >
              <div className="font-bold text-lg line-clamp-1">
                {entry.title}
              </div>
              <div className="text-sm line-clamp-3">{entry.body}</div>
              <div className="text-xs mt-2 text-gray-500">{entry.id}</div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="absolute inset-0 flex items-center justify-center px-4 py-4 z-30 md:px-24 py-12">
          <div
            className="bg-black absolute inset-0 opacity-50 z-10"
            onClick={closeModal}
          ></div>

          <div className="bg-white border-2 rounded-md border-primary px-12 py-6 gap-4 h-full flex flex-col z-20 w-full max-w-4xl">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">
                {modal.mode === "edit" ? "Edit Journal" : "New Journal"}
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Back
              </button>
            </div>

            <label className="font-medium">Date</label>
            <input
              type="date"
              // type={modal.mode === "new" ? "date" : "text"}
              disabled={modal.mode === "edit"}
              // readOnly
              value={modal.entry.date || modal.entry.id}
              onChange={(e) =>
                setModal((prev) => ({
                  ...prev,
                  entry: { ...prev.entry, date: e.target.value },
                }))
              }
              className="border-2 border-primary px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
            />

            <label className="font-medium">Title</label>
            <input
              type="text"
              value={modal.entry.title}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 100)
                  setModal((prev) => ({
                    ...prev,
                    entry: { ...prev.entry, title: val },
                  }));
              }}
              className="border-2 border-primary px-4 py-2 rounded-md"
            />
            <div className="self-end text-sm text-gray-500">
              {modal.entry.title.length} / 100
            </div>

            <label className="font-medium">Body</label>
            <textarea
              rows="8"
              value={modal.entry.body}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 500)
                  setModal((prev) => ({
                    ...prev,
                    entry: { ...prev.entry, body: val },
                  }));
              }}
              className="border-2 border-primary px-4 py-2 rounded-md resize-none"
            />
            <div className="self-end text-sm text-gray-500">
              {modal.entry.body.length} / 500
            </div>

            <div className="flex justify-between mt-4">
              {modal.mode === "edit" && (
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(modal.entry.id)}
                >
                  Delete
                </button>
              )}
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => handleSaveOrUpdate(modal.entry, modal.mode)}
              >
                {modal.mode === "edit" ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;
