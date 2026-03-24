//---- table: staff
export interface StaffDB {
    id_auth_staff: number
    id_auth_staff_role_fk: number
    username: string
    pass_hash: string
    name: string
    created_at: Date
    deleted_at: Date
}

// view: staff
export interface Staff extends StaffDB {
    role: string
}

// -------------------------------------------------------

// table: staff_roles
export interface StaffRoleDB {
    id_auth_staff_role: number
    name: string
    created_at: Date
}

// view: staff_roles
export interface staffRole extends StaffRoleDB { }