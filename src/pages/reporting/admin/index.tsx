import ReportingAdminTable from "@/pages/reporting/admin/components/ReportingAdminTable";
import AdminAnalyticsView from "@/pages/reporting/admin/components/components/AdminAnalyticsView";

export default function Page() {

    return(
        <div className={'relative bg-black w-screen h-screen flex flex-col items-start justify-start px-[0px]'}>
            <AdminAnalyticsView />
            <ReportingAdminTable data={[]} isLoading={false} />
        </div>
    )

}
