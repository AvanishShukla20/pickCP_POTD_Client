import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../utils/api";
import { isSameDay } from "date-fns";
import { toast } from "react-toastify";

export default function MainSection() {
  const [user, setUser] = useState(null);
  const [potd, setPOTD] = useState(null);
  const [solvedDates, setSolvedDates] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateOpts, setGenerateOpts] = useState({
    rating: "",
    tag: "",
    random: false,
  });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    API.get("/cf/get-solved-dates")
      .then((res) => res.data.dates.map((d) => new Date(d)))
      .then(setSolvedDates)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const disableFuture = (date) => date > new Date();

  const canMark =
    potd &&
    !solvedDates.find((d) => isSameDay(d, new Date())) &&
    !disableFuture(new Date());

  const handleMarkSolved = async () => {
    try {
      await API.post("/cf/mark-potd", {
        problemId: `${potd.contestId}-${potd.index}`,
      });
      setSolvedDates((prev) => [...prev, new Date()]);
      setPOTD(null);
      toast.success("🎉 Marked as completed!");
    } catch {
      toast.error("Failed to mark POTD.");
    }
  };

  const handleGeneratePOTD = async () => {
    if (!user?.codeforcesHandle) {
      toast.error("Please set your CF handle.");
      return;
    }
    setIsGenerating(true);
    try {
      const payload = {
        rating: generateOpts.rating || undefined,
        tags: generateOpts.tag
          ? generateOpts.tag
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          : [],
        random: generateOpts.random,
        codeforcesHandle: user.codeforcesHandle,
      };
      const res = await API.post("/cf/potd",
         payload);
      setPOTD(res.data.problem);
      toast.success("✅ POTD generated!");
    } catch {
      toast.error("Failed to generate POTD.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        👋 Hello, {user?.name}
      </h1>

      <a
        href={`https://codeforces.com/profile/${user?.codeforcesHandle}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-8 bg-blue-800 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
      >
        🔗 View CF Profile
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-1 bg-blue-800" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              👤 Your Profile
            </h2>
            <p className="mb-2 text-blue-800">
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p className="mb-2 text-blue-800">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="mb-2 text-blue-800">
              <span className="font-medium">College:</span> {user?.college}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-1 bg-blue-800" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📌 Generate Today's POTD
            </h2>

            {/* Updated: Manual Rating Input */}
            <label className="block mb-2 text-gray-700">Rating (Optional)</label>
            <input
              type="number"
              min={800}
              max={3500}
              step={100}
              placeholder="e.g. 800, 900, 1900"
              className="w-full border text-blue-800 border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-200"
              value={generateOpts.rating}
              onChange={(e) =>
                setGenerateOpts({ ...generateOpts, rating: e.target.value })
              }
            />

            <label className="block mb-2 text-gray-700">Tag (Optional)</label>
            <input
              className="w-full border text-blue-800 border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. dp, greedy, math"
              value={generateOpts.tag}
              onChange={(e) =>
                setGenerateOpts({ ...generateOpts, tag: e.target.value })
              }
            />

            <div className="flex items-center mb-4">
              <input
                id="randomCheck"
                type="checkbox"
                className="h-4 w-4 text-blue-800 focus:ring-blue-300 border-gray-300 rounded"
                checked={generateOpts.random}
                onChange={(e) =>
                  setGenerateOpts({
                    ...generateOpts,
                    random: e.target.checked,
                  })
                }
              />
              <label htmlFor="randomCheck" className="ml-2 text-gray-700">
                Random Problem
              </label>
            </div>

            <button
              onClick={handleGeneratePOTD}
              disabled={isGenerating}
              className="w-full bg-blue-800 text-white font-medium py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "🎯 Generate POTD"}
            </button>
          </div>
        </div>
      </div>

      {potd && canMark && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            🔥 Today's Problem
          </h3>
          <a
            href={`https://codeforces.com/problemset/problem/${potd.contestId}/${potd.index}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-800 underline hover:text-blue-600 text-lg font-medium"
          >
            {potd.name}
          </a>
          <div className="mt-4">
            <button
              onClick={handleMarkSolved}
              disabled={!canMark}
              className={`px-6 py-2 font-medium rounded-full text-white transition ${
                canMark
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              ✅ Mark Completed
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center items-center shadow-lg p-6 max-w-md mx-auto">
        <Calendar
          className="!border-0 text-gray-900"
          onClickDay={(date) => {
            if (!disableFuture(date) && isSameDay(date, new Date()) && canMark) {
              handleMarkSolved();
            }
          }}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const solved = solvedDates.some((d) => isSameDay(d, date));
              return [
                "text-sm",
                "transition-colors",
                "text-gray-900",
                "duration-200",
                "ease-in-out",
                solved
                  ? "bg-green-400 text-white rounded-full"
                  : "hover:bg-blue-100 text-gray-900 rounded-md",
              ].join(" ");
            }
          }}
          tileDisabled={({ date }) => disableFuture(date)}
        />
      </div>
    </div>
  );
}
