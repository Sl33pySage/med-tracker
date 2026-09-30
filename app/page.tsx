"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    async function logMedication() {
      try {
        const response = await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to save");
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }
    logMedication();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 text-center">
      <div>
        {status === "loading" && (
          <>
            <div className="text-7xl animate-pulse mb-4">⏳</div>
            <h1 className="text-3xl font-bold text-gray-7xl">Recording...</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Logging your medication now.
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-7xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-7xl">Logged!</h1>
            <p className="text-green-600 mt-2 text-lg font-medium">
              You can safely close this link.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-7xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-red-7xl">Error Saving</h1>
            <p className="text-red-500 mt-2 text-lg">
              Please check connection and try again.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
