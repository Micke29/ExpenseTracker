import React from 'react';
import { Redirect } from 'react-router';

import Header from '../components/Header';
import Balance from '../components/Balance';
import IncomeExpenses from '../components/IncomeExpenses';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';

function Account() {

    if (!sessionStorage.getItem('userId')) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <Header />
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
            </div>
        </>
    );
}

export default Account;
