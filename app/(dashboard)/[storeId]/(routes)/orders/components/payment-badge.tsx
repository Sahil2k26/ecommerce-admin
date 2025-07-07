

export function PaymentBadge({ isPaid }: { isPaid: boolean }) {

    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isPaid ? 'bg-green-100 text-green-800 border-green-800' : 'bg-red-100 text-red-800 border-red-800'}`}>
        {isPaid ? 'Paid' : 'Unpaid'}
    </span>

}