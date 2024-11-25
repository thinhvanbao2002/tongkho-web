import { ReactNode } from 'react'
import { Outlet } from 'react-router'

function AdminDashboardScreen({ children }: any) {
  return (
    <>
      <div>
        <h1>Admin Dash board</h1>
        {children}
      </div>
    </>
  )
}

export default AdminDashboardScreen
