import { OrderStatus } from "@prisma/client";


export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const statusClasses: Record<OrderStatus, string> = {
        [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-800',
        [OrderStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-800',
        [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-800',
        [OrderStatus.DELIVERED]: 'bg-blue-100 text-blue-800 border-blue-800',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </span>
    );
}