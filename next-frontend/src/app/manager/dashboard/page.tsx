import Link from "next/link";

export default function ManagerDashboard() {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <nav>
        <Link href="/manager/getAllStaff">View Staff</Link> <br />
        <Link href="/logout">Logout</Link>
      </nav>
    </div>
  );
}
