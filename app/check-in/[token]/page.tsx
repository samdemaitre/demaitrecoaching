import type { Metadata } from "next";
import WeeklyCheckIn from "@/components/WeeklyCheckIn";
import { getClientWeekByToken } from "@/lib/weekly-review/store";
import NotFoundCard from "@/components/weekly-review/NotFoundCard";

export const metadata: Metadata = {
  title: "Weekly check-in",
  robots: { index: false, follow: false },
};

export default async function CheckInPage({ params }: { params: { token: string } }) {
  const week = await getClientWeekByToken(params.token);
  if (!week) return <NotFoundCard kind="checkin" />;
  return <WeeklyCheckIn week={week} token={params.token} />;
}
