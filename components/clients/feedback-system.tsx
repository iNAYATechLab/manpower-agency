/**
 * Step 190: Client Feedback & Rating System
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const feedbacks = [
  { client: "NEOM Construction", rating: 5, comment: "Excellent welders, on time", date: "2026-07-20" },
  { client: "Qatar Energy", rating: 4, comment: "Good, but 2 workers late", date: "2026-07-15" },
];

export function FeedbackSystem({ clientId }: { clientId?: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = () => {
    alert(`Feedback submitted for ${clientId || "client"}: ${rating}★ - ${comment}`);
    setComment("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Step 190: Client Feedback & Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm">Existing Feedback</p>
            {feedbacks.map((f, i) => (
              <div key={i} className="mt-2 rounded-lg border border-white/10 bg-[#2A1143] p-3">
                <p className="text-sm">
                  {f.client} — <span className="text-[#E5B84B]">★ {f.rating}</span>
                </p>
                <p className="text-xs text-white/60">{f.date} — {f.comment}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/10 bg-[#1D0B2E] p-3">
            <p className="text-sm font-medium">Submit Feedback</p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} className={`h-8 w-8 rounded ${rating >= n ? "bg-[#E5B84B] text-[#1D0B2E]" : "bg-white/10"}`}>
                  ★
                </button>
              ))}
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your feedback..." rows={2} className="mt-2 w-full rounded border border-white/10 bg-[#2A1143] px-3 py-2 text-sm" />
            <Button size="sm" onClick={submit} className="mt-2">
              Submit Rating
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
