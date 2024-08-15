import { AdminLayout } from "@/components/layouts/AdminLayout";

export function AdminDashboard() {
    return (
        <AdminLayout 
            title="Dashboard"
            current="dashboard"
            breadcrumbs={[
                {
                    label: 'Dashboard'
                }
            ]}
        >
            <div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, alias. Rerum est repudiandae optio aspernatur dolores amet facilis vitae deleniti?</p></div>
        </AdminLayout>
    )
}