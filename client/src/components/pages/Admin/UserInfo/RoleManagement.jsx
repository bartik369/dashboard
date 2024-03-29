import React from 'react';
import {useGetRolesRequestsQuery, useRolesRespondMutation} from "../../../../store/features/auth/authApi";
import "../../Admin/admin.css"
export default function RoleManagement() {

    const {data: getRolesRequest, isLoading, isError} = useGetRolesRequestsQuery();
    const [roleRespond] = useRolesRespondMutation()

    const approve =  async (request) => {
        const respondStatus = {
            id: request.userId,
            email: request.email,
            role: request.role,
            approve: true,
        };
        
        await roleRespond(respondStatus).unwrap()

    }
    const reject =  async (request) => {
        const respondStatus = {
            id: request.userId,
            email: request.email,
            displayname: request.displayname,
            role: request.role,
            approve: false,
        };

        await roleRespond(respondStatus).unwrap()
    }

    if (!getRolesRequest) {
        return (
            <div>
             there is not data
            </div>
        )
    }
  return (
    <div className="role-management">
        {getRolesRequest.map((request, index) => (
          <div className="info" key={index}>
            <span>{request.displayname}</span>
            <span>{request.email}</span>
            <span>{request.role}</span>
            <button className="btn_role" onClick={() =>approve(request)}>Ok</button>
            <button className="btn_role" onClick={() => reject(request) }>No</button>
          </div>
        ))
        }
      </div>
  )
}