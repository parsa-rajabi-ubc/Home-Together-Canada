/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.26
 *
 * @Description: Component to scroll to the top of the page after re-rending
 * @Source: https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
 *
 */

import {useEffect} from 'react';
import {withRouter} from 'react-router-dom';

function ScrollToTop({history}) {
    useEffect(() => {
        const listener = history.listen(() => {
            //Scrolls to the top of the page
            window.scrollTo(0, 0);
        });
        return () => {
            listener();
        }
    }, []);

    return null;
}

export default withRouter(ScrollToTop);