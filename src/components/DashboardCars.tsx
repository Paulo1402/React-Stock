interface DashboardCardProps {
  title: string
  value: string | number
}

export default function DashboardCard({ title, value}: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      {title}
      <span>{value}</span>
    </div>
  )
}
