import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface order {
  id: string;
  isPaid: boolean;
  total: number;
  createdAt: string;
  orderItems: Array<{
    id: string;
    amount: number;
    product: {
      title: string;
      images: Array<{
        url: string;
      }>;
    };
  }>;
};


export function OrderCard({ order }: { order: order }) {
  // Assurez-vous que `order.orderItems` est toujours un tableau
  const items = order.orderItems || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm text-muted-foreground">
            Order #{order.id}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.createdAt), "PPP")}
          </p>
        </div>
        <Badge
          variant="secondary"
          // className={statusColors[order.isPaid ? "PAID" : "UNPAID"]}
        >
          {order.isPaid ? "Paid" : "Unpaid"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.product.images[0]?.url || "/placeholder.png"}
                alt={item.product.title}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-muted-foreground">
                  Amount: ${item.amount}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="text-right text-lg font-bold">
              Total: {order.total}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

