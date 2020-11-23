/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.22
 *
 * @Description: Member Account summary navigation links TODO: Add CSS Styling
 *
 */
import React from 'react';
import {Link} from "react-router-dom";
function AccountSummaryLinks(){
    return(
        <div>
            <Link to={'/accountsummary'}>Account</Link>
            <Link to={'/accountsummary/profilesummary'}>Profile</Link>
            <Link to={'/accountsummary/passwordchange'}>Change Password</Link>
            <Link to={'/accountsummary/messages'}>Messages</Link>
            <Link to={'/accountsummary/manageposts'}>Manage Posts</Link>
        </div>
    );
}
export default AccountSummaryLinks