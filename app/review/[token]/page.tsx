import type { Metadata } from "next";
import WeeklyDashboard from "@/components/WeeklyDashboard";
import { getClientWeekByToken } from "@/lib/weekly-review/store";
import NotFoundCard from "@/components/weekly-review/NotFoundCard";

export const metadata: Metadata = {
  title: "Your week in review",
  robots: { index: false, follow: false },
};

export default async function ReviewPage({ params }: { params: { token: string } }) {
  const week = await getClientWeekByToken(params.token);
  if (!week) return <NotFoundCard kind="review" />;
  return <WeeklyDashboard week={week} />;
}
