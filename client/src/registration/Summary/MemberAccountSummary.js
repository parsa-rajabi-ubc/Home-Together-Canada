/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.21
 *
 * @Description: Member Account Summary Static Form
 *
 */
import React from 'react';
import AccountSummaryLinks from "../../common/forms/AccountSummaryLinks";
import {Route, Switch} from "react-router-dom";
import MemberRegistrationForm from "../MemberRegistrationForm";
import Error404 from "../../common/error/Error404";
import ChangePassword from "../../common/forms/ChangePassword";
import MemberProfileForm from "../MemberProfileForm";
import EmptyPage from "../../common/forms/EmptyPage";
import MemberAccountDummyValues from "./MemberAccountDummyValues";

function MemberAccountSummary(){

    return(
        <div>
            {/*Section for subpage navigation*/}
            <AccountSummaryLinks/>
            {/*container for subpage contents*/}
            <div>
                <Switch>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/accountsummary"} exact render={()=> <MemberRegistrationForm values={MemberAccountDummyValues}/>}/>
                    <Route path={"/accountsummary/profilesummary"} render={()=> <MemberProfileForm values={MemberAccountDummyValues}/>}/>
                    <Route path={"/accountsummary/passwordchange"} render={()=> <ChangePassword oldPassword={MemberAccountDummyValues.password} label={"Password Change: "}  onChange={()=>null}/>}/>
                    <Route path={"/accountsummary/messages"} component={EmptyPage}/>
                    <Route path={"/accountsummary/manageposts"} component={EmptyPage}/>
                    <Route component={Error404} />
                </Switch>
            </div>
        </div>
    );
}
export default MemberAccountSummary