'use client';

import { useState } from 'react';

export default function YookassaPage() {
    const [amount, setAmount] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');

    const [paymentIdText, setPaymentIdText] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const createPayment = async () => {
        console.log("OK");
        const response = await fetch('/api/ykassa/createPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount }),
        });

        console.log(response);

        const data = await response.json();
        if (data.confirmationUrl) {
            setPaymentUrl(data.confirmationUrl);
        }
    };

    const checkPayment = async () => {
        console.log("Start checking...");

        if (!paymentIdText) {
            console.log("Payment ID is empty!");
            return;
        }

        try {
            const response = await fetch(`/api/ykassa/checkPayment?paymentId=${paymentIdText}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data.status) {
                setPaymentStatus(data.status);
            } else {
                console.log("Ошибка: нет статуса в ответе.");
            }
        } catch (error) {
            console.error("Ошибка проверки платежа:", error);
        }
    };



    return (
        <div>
            <h1>Оплата через YooKassa</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Сумма"
            />
            <button onClick={createPayment}>Оплатить</button>
            {paymentUrl && <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Перейти к оплате</a>}

            <h2>Проверить оплату  YooKassa</h2>
            <input
                type='text'
                value={paymentIdText}
                onChange={(event) => setPaymentIdText(event.target.value)}
                placeholder='PaymentId'
            />
            <button onClick={checkPayment}>Проверить</button>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
}
