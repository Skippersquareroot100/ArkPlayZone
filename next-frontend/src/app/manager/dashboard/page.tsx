import Link from "next/link";

export default function ManagerDashboard() {
    return (
        <div>
            <h1>Manager Dashboard</h1>
            <Link href="/manager/getAllStaff">View Staff</Link>
        </div>
    );
}