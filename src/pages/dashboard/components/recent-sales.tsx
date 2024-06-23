import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useEffect, useState} from "react";
import {
    getRecentPurchases,
} from "../../../../amplify/utils/queryUtils.ts";
import {RecentPurchase} from "../../../../amplify/utils/model.ts";

export default function RecentSales() {
    const [recentPurchases, setRecentPurchases] = useState<RecentPurchase[]>([]);
     useEffect( () =>{
        async function fetchRecentPurchases(){
            const purchases = await getRecentPurchases(5);
            setRecentPurchases(purchases.invoices);
        }
        fetchRecentPurchases();
    }, [])
    return (
        <div className="space-y-8">
            {recentPurchases.map((purchase) => (
                <div key={purchase.pk} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`/avatars/${purchase.pk}.png`} alt="Avatar" />
                        <AvatarFallback>{purchase.customerName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{purchase.customerName}</p>
                        <p className="text-sm text-muted-foreground">{purchase.email}</p>
                    </div>
                    <div className="ml-auto font-medium">${purchase.totalAmount.toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
}
