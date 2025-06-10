import { useEffect, useState } from "react";
import { format, parseISO, set } from "date-fns";
import { MoodTracker } from "../components/dashboard/MoodTracker";
import { StressTracker } from "../components/dashboard/StressTracker";
import { SleepTracker } from "../components/dashboard/SleepTracker";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { TrackingHistory } from "../components/dashboard/TrackingHistory";

function Dashboard() {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const userId = auth.currentUser?.uid;

  const [moodRating, setMoodRating] = useState(3);
  const [stressRating, setStressRating] = useState(3);
  const [sleepRating, setSleepRating] = useState(3);

  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      const dataQuery = query(
        collection(db, "userData", userId, "trackingData")
      );

      const snapshot = await getDocs(dataQuery);

      const fetchedData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          date: doc.id,
          mood: data.mood,
          stress: data.stress,
          sleep: data.sleep,
        };
      });

      // Sort by date descending
      const sortedData = fetchedData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Take only the latest 7 entries, then reverse to show oldest to newest
      const latestSeven = sortedData.slice(0, 7).reverse();

      setTrackingData(latestSeven);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      const ref = doc(db, "userData", userId, "trackingData", date);
      await setDoc(ref, {
        mood: moodRating,
        stress: stressRating,
        sleep: sleepRating,
      });

      fetchTrackingData();
    } catch (error) {
      console.error("Error saving/updating journal:", error);
    }
  };

  return (
    // <div className="min-h-screen bg-white px-4 py-8">
    <div className="w-full h-full px-4 py-4">
      <main>
        {/* Header */}
        <div className="border-2 border-primary px-4 py-4 rounded mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <p className="notion-text">
            <input
              type="date"
              className="px-4 py-2 rounded-md bg-gray-100 cursor-pointer"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </p>
        </div>

        <div className="w-full flex flex-col gap-6 md:flex-row">
          {/* Left Column */}
          <div className="w-full flex flex-col gap-6">
            {/* Mood Tracker */}
            <MoodTracker
              moodRating={moodRating}
              setMoodRating={setMoodRating}
            />

            {/* Stress Tracker */}
            <StressTracker
              stressRating={stressRating}
              setStressRating={setStressRating}
            />

            {/* Sleep Tracker */}
            <SleepTracker
              sleepRating={sleepRating}
              setSleepRating={setSleepRating}
            />

            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>

          <div className="w-full flex flex-col gap-6">
            <TrackingHistory trackingData={trackingData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
