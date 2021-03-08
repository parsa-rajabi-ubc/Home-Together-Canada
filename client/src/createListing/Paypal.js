/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.15
 *
 * @Description: Paypal Component
 *
 */

import React, {useState, useEffect} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import RadioButton from "../common/forms/RadioButton";
import PropTypes from "prop-types";
import Tooltip from "../common/forms/Tooltip";
import {PAYPAL_TEXT} from "../common/constants/TooltipText";


const MESSAGE = {
    THANK_YOU: "Thank you, ",
    PURCHASE: ". Your payment of $",
    ORDER_ID: " was successful! Your OrderID is - ",
    CANCELLED: "Your transaction was cancelled!",
    ERROR: "There was an error with your transaction (you were not charged). Please try again.",
}

export const PAYMENT_STATUS = {
    APPROVED: "Approved",
    CANCELLED: "Cancelled",
    ERROR: "Error",
}

const PAGE_TEXT = {
    TITLE: "Payment",
    LABEL: "Please select how many months you would like to purchase"
};

const purchaseOptionText = [
    {
        // how many months (label)
        label: "1 Month",
        // cost per month (value)
        value: 18
    },
    {
        label: "3 Months",
        value: 45
    },
    {
        label: "6 Months",
        value: 80
    },
    {
        label: "12 Months",
        value: 140
    },
]


const Paypal = (props) => {
    const {paymentStatus, onTransactionOrderIDChange} = props;
    const [numMonthsToPurchase, setNumMonthsToPurchase] = useState();
    const [orderID, setOrderID] = useState();

    useEffect(() => {
        onTransactionOrderIDChange(orderID);
    }, [orderID]);


    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: numMonthsToPurchase,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    }

    function onChange(e) {
        setNumMonthsToPurchase(e.target.value);
    }

    const onApprove = (data, actions) => {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message
            alert(MESSAGE.THANK_YOU + details.payer.name.given_name + MESSAGE.PURCHASE + numMonthsToPurchase + MESSAGE.ORDER_ID + details.id);
            paymentStatus(PAYMENT_STATUS.APPROVED);
        });
    }

    const onCancel = () => {
        alert(MESSAGE.CANCELLED);
        paymentStatus(PAYMENT_STATUS.CANCELLED);
    }

    const onError = () => {
        alert(MESSAGE.ERROR);
        paymentStatus(PAYMENT_STATUS.ERROR);
    }

    const paypalOptions = {
        //TODO: Replace this with Twila's Client-id
        "client-id": "AYknWru_AL6Z8b_yEfujCQyL1DAAzhO0aZuQvhfNcqY86bitoAEKQ4iu8Z7bSOjk0BE-tjm8HljYpoba",
        "buyer-country": "CA",
        "currency": "CAD",
        "intent": "capture",
    };

    const purchaseOption = purchaseOptionText.map(
        (option) =>
            <RadioButton key={option.value} label={option.label + " - $" + option.value} name={"months"}
                         value={option.value.toString()} onChange={onChange} blockElement={true}/>
    );
    return (
        <div>
            <h1 className={"page-title mb-5"}> {PAGE_TEXT.TITLE} </h1>
            <p className={"label inline mb-2"}>{PAGE_TEXT.LABEL}</p>
            <Tooltip text={PAYPAL_TEXT.PAYMENT} toolTipID={"paypal"}/>

            {purchaseOption}

            {numMonthsToPurchase &&
            <div className={"w-1/2 m-auto mt-20"}>
                <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButtons style={{layout: "horizontal"}}
                                   createOrder={createOrder}
                                   forceReRender={numMonthsToPurchase}
                                   onApprove={onApprove}
                                   onCancel={onCancel}
                                   onError={onError}
                    />
                </PayPalScriptProvider>
            </div>
            }
        </div>
    )
}

Paypal.propTypes = {
    paymentStatus: PropTypes.func.isRequired,
    onTransactionOrderIDChange: PropTypes.func.isRequired
};

export default Paypal;

