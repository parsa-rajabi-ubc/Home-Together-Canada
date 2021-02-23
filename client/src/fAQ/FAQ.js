/**
 * @Author:     Alex Qin
 * @Created:    2021.02.16
 *
 * @Description: Constants for FAQ Page
 *
 */

import {FAQ_TEXT as TEXT,FAQ_TITLE as TITLE} from "./constant/FAQText"
import React from 'react';

function FAQ(){
    return (
        <div className={"tos-page-layout"}>

            <h1 className={"page-title"}>{TITLE}</h1>
            <br/>

            <h2 className={"point-title"}>{TEXT[0].Q1}</h2>
            <p className={"text"}>{TEXT[0].A1}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[1].Q2}</h2>
            <p className={"text"}>{TEXT[1].A2}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[2].Q3}</h2>
            <p className={"text"}>{TEXT[2].A3}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[3].Q4}</h2>
            <p className={"text"}>{TEXT[3].A4}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[4].Q5}</h2>
            <p className={"text"}>{TEXT[4].A5}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[5].Q6}</h2>
            <p className={"text"}>{TEXT[5].A6}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[6].Q7}</h2>
            <p className={"text"}>{TEXT[6].A7}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[7].Q8}</h2>
            <p className={"text"}>{TEXT[7].A8}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[8].Q9}</h2>
            <p className={"text"}>{TEXT[8].A9}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[9].Q10}</h2>
            <p className={"text"}>{TEXT[9].A10}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[10].Q11}</h2>
            <p className={"text"}>{TEXT[10].A11}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[11].Q12}</h2>
            <p className={"text"}>{TEXT[11].A12}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[12].Q13}</h2>
            <p className={"text"}>{TEXT[12].A13}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[13].Q14}</h2>
            <p className={"text"}>{TEXT[13].A14}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[14].Q15}</h2>
            <p className={"text"}>{TEXT[14].A15}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[15].Q16}</h2>
            <p className={"text"}>{TEXT[15].A16}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[16].Q17}</h2>
            <p className={"text"}>{TEXT[16].A17}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[17].Q18}</h2>
            <p className={"text"}>{TEXT[17].A18}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[18].Q19}</h2>
            <p className={"text"}>{TEXT[18].A19}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[19].Q20}</h2>
            <p className={"text"}>{TEXT[19].A20}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[20].Q21}</h2>
            <p className={"text"}>{TEXT[20].A21}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[21].Q22}</h2>
            <p className={"text"}>{TEXT[21].A22}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[22].Q23}</h2>
            <p className={"text"}>{TEXT[22].A23}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[23].Q24}</h2>
            <p className={"text"}>{TEXT[23].A24}</p>
            <br/>

            <h2 className={"point-title"}>{TEXT[24].Q25}</h2>
            <p className={"text"}>{TEXT[24].A25}</p>
            <br/>

        </div>
    );
}

export default FAQ;